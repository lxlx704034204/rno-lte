package com.hgicreate.rno.lte.shape.mapper;

import com.hgicreate.rno.lte.shape.model.GisCell;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommonMapper {
    List<GisCell> listOutdoorGisCellByCityId(long cityId);

    List<GisCell> listIndoorGisCellByCityId(long cityId);

    List<Long> findCity();

    void writeBackStationSpace(GisCell cell);
}
