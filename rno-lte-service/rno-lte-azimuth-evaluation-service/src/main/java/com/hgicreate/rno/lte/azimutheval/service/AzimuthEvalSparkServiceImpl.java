package com.hgicreate.rno.lte.azimutheval.service;

import com.hgicreate.rno.lte.azimutheval.mapper.SparkMapper;
import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalResult;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AzimuthEvalSparkServiceImpl implements AzimuthEvalSparkService {

    private final SparkMapper sparkMapper;

    public AzimuthEvalSparkServiceImpl(SparkMapper sparkMapper) {
        this.sparkMapper = sparkMapper;
    }

    @Override
    public List<AzimuthEvalResult> calcAzimuth(long jobId, long cityId, String begTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("jobId", jobId);
        map.put("cityId", cityId);
        map.put("begTime", begTime);
        map.put("endTime", endTime);
        return sparkMapper.calcAzimuth(map);
    }

    @Override
    public boolean hasData(String evalType, long cityId, String begTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("cityId", cityId);
        map.put("begTime", begTime);
        map.put("endTime", endTime);

        long mrCnt = sparkMapper.queryLteMrDataCnt(map);
        long structureCnt = sparkMapper.queryLteStructureDataCnt(map);
        boolean flag;
        if ("type1".equalsIgnoreCase(evalType)) {
            flag = mrCnt > 0;
        } else if ("type2".equalsIgnoreCase(evalType)) {
            flag = structureCnt > 0;
        } else {
            flag = mrCnt > 0 || structureCnt > 0;
        }
        return flag;
    }
}
