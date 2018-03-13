package com.hgicreate.rno.lte.shape.mapper.postgres;

import com.hgicreate.rno.lte.shape.model.GisCell;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostgresMapper {
    void batchInsertOutdoorGisCell(GisCell cell);

    void batchInsertIndoorGisCell(GisCell cell);

    Long deleteGisCellByCityId(long cityId);
}
