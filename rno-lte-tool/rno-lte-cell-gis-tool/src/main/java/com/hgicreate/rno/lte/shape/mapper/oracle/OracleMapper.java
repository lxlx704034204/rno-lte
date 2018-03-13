package com.hgicreate.rno.lte.shape.mapper.oracle;

import com.hgicreate.rno.lte.shape.model.GisCell;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OracleMapper {
    void batchInsertOutdoorGisCell(GisCell cell);

    void batchInsertIndoorGisCell(GisCell cell);

    Long deleteGisCellByCityId(long cityId);
}
