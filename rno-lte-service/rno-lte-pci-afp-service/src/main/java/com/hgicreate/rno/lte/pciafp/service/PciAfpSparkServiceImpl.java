package com.hgicreate.rno.lte.pciafp.service;

import com.hgicreate.rno.lte.pciafp.mapper.SparkMapper;
import com.hgicreate.rno.lte.pciafp.model.Cell;
import com.hgicreate.rno.lte.pciafp.model.CellToParameter;
import com.hgicreate.rno.lte.pciafp.model.DataCond;
import com.hgicreate.rno.lte.pciafp.model.InterMatrixResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class PciAfpSparkServiceImpl implements PciAfpSparkService {

    private final SparkMapper sparkMapper;

    public PciAfpSparkServiceImpl(SparkMapper sparkMapper) {
        this.sparkMapper = sparkMapper;
    }

    @Override
    public Long querySfFileCnt(DataCond cond) {
        return sparkMapper.querySfFileCnt(cond);
    }

    @Override
    public List<Map<String, String>> querySfFileByPage(DataCond cond) {
        return sparkMapper.querySfFileByPage(cond);
    }

    @Override
    public CellToParameter getParamForCellsMapByAreaId(long areaId) {

        List<String> cellList = new ArrayList<>();
        Map<String, Integer> cellToOriPci = new HashMap<>();
        Map<String, double[]> cellToLonLat = new HashMap<>();
        Map<String, Integer> cellToEarfcn = new HashMap<>();
        Map<String, List<String>> enodebToCells = new HashMap<>();
        Map<String, String> cell2Enodeb = new HashMap<>();
        List<Cell> lteCells = sparkMapper.getLteCellsByAreaId(areaId);
        if (lteCells == null || lteCells.isEmpty()) {
            return null;
        }
        String cid, eid;
        List<String> cells;
        for (Cell cell : lteCells) {
            try {
                cid = cell.getId();
                if (!cellList.contains(cid)) {
                    eid = cell.getEnodebId();
                    cellList.add(cid);
                    cellToOriPci.put(cid, cell.getPci());
                    cellToLonLat.put(cid, new double[]{cell.getLongitude(), cell.getLatitude()});
                    cellToEarfcn.put(cid, cell.getEarfcn());
                    cell2Enodeb.put(cid, eid);
                    cells = enodebToCells.computeIfAbsent(eid, k -> new ArrayList<>());
                    if (!cells.contains(cid)) {
                        cells.add(cid);
                    }
                }
            } catch (Exception e) {
                // e.printStackTrace();
            }
        }

        CellToParameter cellToParameter = new CellToParameter();
        cellToParameter.setCellList(cellList);
        cellToParameter.setCellToOriPci(cellToOriPci);
        cellToParameter.setCellToLonLat(cellToLonLat);
        cellToParameter.setCellToEarfcn(cellToEarfcn);
        cellToParameter.setEnodebToCells(enodebToCells);
        cellToParameter.setCell2Enodeb(cell2Enodeb);
        return cellToParameter;
    }

    @Override
    public Map<String, Cell> getLteCellMapByAreaId(long areaId) {
        log.debug("进入方法：getLteCellMapByAreaId。areaId=" + areaId);
        List<Cell> lteCells = sparkMapper.getLteCellsByAreaId(areaId);
        if (lteCells == null || lteCells.size() == 0) {
            return Collections.emptyMap();
        }
        Map<String, Cell> cellMap = new HashMap<>();
        for (Cell cell : lteCells) {
            cellMap.put(cell.getId(), cell);
        }
        return cellMap;
    }

    @Override
    public List<String> queryMrMeaDate(Map<String, Object> map) {
        return sparkMapper.queryMrMeaDate(map);
    }

    @Override
    public void createMrTempTable(Map<String, Object> map) {
        sparkMapper.createMrTempTable(map);
    }

    @Override
    public List<String> queryHoMeaDate(Map<String, Object> map) {
        return sparkMapper.queryHoMeaDate(map);
    }

    @Override
    public void createHoTempTable(Map<String, Object> map) {
        sparkMapper.createHoTempTable(map);
    }

    @Override
    public List<String> querySfMeaDate(Map<String, Object> map) {
        return sparkMapper.querySfMeaDate(map);
    }

    @Override
    public void createSfTempTable(Map<String, Object> map) {
        sparkMapper.createSfTempTable(map);
    }

    @Override
    public List<String> queryFlowMeaDate(Map<String, Object> map) {
        return sparkMapper.queryFlowMeaDate(map);
    }

    @Override
    public void createFlowTempTable(Map<String, Object> map) {
        sparkMapper.createFlowTempTable(map);
    }

    @Override
    public Long createMatrix(Map<String, Object> map) {
        return sparkMapper.createMatrix(map);
    }

    @Override
    public Long createMatrixWithoutSf(Map<String, Object> map) {
        return sparkMapper.createMatrixWithoutSf(map);
    }

    @Override
    public List<Map<String, Object>> getSFd1d2Cell(long jobId) {
        return sparkMapper.getSFd1d2Cell(jobId);
    }

    @Override
    public List<InterMatrixResult> getMatrix(long jobId) {
        return sparkMapper.getMatrix(jobId);
    }

    @Override
    public List<Map<String, Object>> getFlow(Map<String, Object> map) {
        return sparkMapper.getFlow(map);
    }
}
