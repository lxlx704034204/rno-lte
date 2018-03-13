package com.hgicreate.rno.lte.structanls.mapper;

import com.hgicreate.rno.lte.structanls.model.MetricsSummary;
import com.hgicreate.rno.lte.structanls.model.OverCover;
import com.hgicreate.rno.lte.structanls.model.OverlapCover;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SparkMapper {
    Long queryLteMrDataCnt(Map<String, Object> map);

    Long queryLteStructureDataCnt(Map<String, Object> map);

    List<OverlapCover> calcOverlapCover(Map<String, Object> map);

    List<OverCover> calcOverCover(Map<String, Object> map);

    Long handleOverCover(Map<String, Object> map);

    List<OverCover> queryOverCoverResultByJobId(long jobId);

    List<MetricsSummary> calcMetricsSummary(Map<String, Object> map);
}
