package com.hgicreate.rno.lte.structanls.service;

import com.hgicreate.rno.lte.structanls.mapper.SparkMapper;
import com.hgicreate.rno.lte.structanls.model.MetricsSummary;
import com.hgicreate.rno.lte.structanls.model.OverCover;
import com.hgicreate.rno.lte.structanls.model.OverlapCover;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StructAnlsSparkServiceImpl implements StructAnlsSparkService {

    private final SparkMapper sparkMapper;

    public StructAnlsSparkServiceImpl(SparkMapper sparkMapper) {
        this.sparkMapper = sparkMapper;
    }

    @Override
    public boolean hasData(long cityId, String begTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("cityId", cityId);
        map.put("begTime", begTime);
        map.put("endTime", endTime);

        long mrCnt = sparkMapper.queryLteMrDataCnt(map);
        long structureCnt = sparkMapper.queryLteStructureDataCnt(map);
        return mrCnt > 0 && structureCnt > 0;
    }

    @Override
    public List<OverlapCover> calcOverlapCover(long jobId, long cityId, String begTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("jobId", jobId);
        map.put("cityId", cityId);
        map.put("begTime", begTime);
        map.put("endTime", endTime);
        return sparkMapper.calcOverlapCover(map);
    }

    @Override
    public Long handleOverCover(long jobId, long cityId, String begTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("jobId", jobId);
        map.put("cityId", cityId);
        map.put("begTime", begTime);
        map.put("endTime", endTime);
        return sparkMapper.handleOverCover(map);
    }

    @Override
    public List<OverCover> queryOverCoverResultByJobId(long jobId) {
        return sparkMapper.queryOverCoverResultByJobId(jobId);
    }

    @Override
    public List<MetricsSummary> calcMetricsSummary(long jobId, long cityId, String begTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("jobId", jobId);
        map.put("cityId", cityId);
        map.put("begTime", begTime);
        map.put("endTime", endTime);
        return sparkMapper.calcMetricsSummary(map);
    }
}
