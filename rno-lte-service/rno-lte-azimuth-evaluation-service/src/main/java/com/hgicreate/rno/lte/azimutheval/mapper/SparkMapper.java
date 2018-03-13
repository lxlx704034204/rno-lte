package com.hgicreate.rno.lte.azimutheval.mapper;

import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalResult;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SparkMapper {
    Long queryLteMrDataCnt(Map<String, Object> map);

    Long queryLteStructureDataCnt(Map<String, Object> map);

    List<AzimuthEvalResult> calcAzimuth(Map<String, Object> map);
}
