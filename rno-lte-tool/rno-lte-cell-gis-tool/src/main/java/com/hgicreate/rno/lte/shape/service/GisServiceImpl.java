package com.hgicreate.rno.lte.shape.service;

import com.hgicreate.rno.lte.shape.dao.CommonDao;
import com.hgicreate.rno.lte.shape.dao.SpatialDbDao;
import com.hgicreate.rno.lte.shape.model.CellCondition;
import com.hgicreate.rno.lte.shape.model.GisCell;
import com.hgicreate.rno.lte.shape.tool.CellShapeProcessorFactory;
import com.hgicreate.rno.lte.shape.tool.StationSpacingTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class GisServiceImpl implements GisService {

    private final CommonDao commonDao;

    private final SpatialDbDao spatialDbDao;

    public GisServiceImpl(CommonDao commonDao, SpatialDbDao spatialDbDao) {
        this.commonDao = commonDao;
        this.spatialDbDao = spatialDbDao;
    }

    @Override
    public void transform2Gis(CellCondition condition) {
        final CellShapeProcessorFactory.CellShapeProcessor processor = CellShapeProcessorFactory.createProcessorWithRadius(condition.getOutdoorRadius(), condition.getIndoorRadius());

        List<GisCell> outdoorCells = commonDao.listOutdoorGisCellByCityId(condition.getCityId());
        outdoorCells.parallelStream().forEach(processor::buildSector);
        StationSpacingTool.stationSpacingProcessor(outdoorCells, condition.getSimilarDis());

        List<GisCell> indoorCells = commonDao.listIndoorGisCellByCityId(condition.getCityId());
        indoorCells.parallelStream().forEach(processor::buildCircle);
        indoorCells.forEach(e -> e.setStationSpace(0d));

        saveResult(outdoorCells, indoorCells, condition);
    }

    private void saveResult(List<GisCell> outdoorCells, List<GisCell> indoorCells, CellCondition condition) {
        if (!condition.isIncrement()) {
            long deleteCnt = spatialDbDao.deleteGisCellByCityId(condition.getCityId());
            log.debug("一共删除： {} 行", deleteCnt);
        }

        commonDao.batchUpdateGisCell(outdoorCells);
        spatialDbDao.batchInsertOutdoorGisCell(outdoorCells);

        commonDao.batchUpdateGisCell(indoorCells);
        spatialDbDao.batchInsertIndoorGisCell(indoorCells);
    }
}
