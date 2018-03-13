package com.hgicreate.rno.lte.intermatrix.service;

import com.hgicreate.rno.lte.intermatrix.mapper.SparkMapper;
import com.hgicreate.rno.lte.intermatrix.model.DataCond;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class InterMatrixSparkServiceImpl implements InterMatrixSparkService {
    private final SparkMapper sparkMapper;

    public InterMatrixSparkServiceImpl(SparkMapper sparkMapper) {
        this.sparkMapper = sparkMapper;
    }

    @Override
    public Long queryDataRecordCnt(DataCond cond) {
        Long cnt = null;
        switch (cond.getType()) {
            case "MR":
                cnt = sparkMapper.queryMrDataRecordCnt(cond);
                break;
            case "HO":
                cnt = sparkMapper.queryHoDataRecordCnt(cond);
                break;
            case "SF":
                cnt = sparkMapper.querySfDataRecordCnt(cond);
                break;
            default:
                break;
        }
        return cnt == null ? 0L : cnt;
    }

    @Override
    public List<Map<String, Object>> queryDataRecordByPage(DataCond cond) {
        List<Map<String, Object>> result = null;
        switch (cond.getType()) {
            case "MR":
                result = sparkMapper.queryMrDataRecordByPage(cond);
                break;
            case "HO":
                result = sparkMapper.queryHoDataRecordByPage(cond);
                break;
            case "SF":
                result = sparkMapper.querySfDataRecordByPage(cond);
                break;
            default:
                break;
        }
        return result == null ? Collections.emptyList() : result;
    }

    @Override
    public Long queryDataCnt(DataCond cond) {
        Long cnt = null;
        switch (cond.getType()) {
            case "MR":
                cnt = sparkMapper.queryMrDataCnt(cond);
                break;
            case "HO":
                cnt = sparkMapper.queryHoDataCnt(cond);
                break;
            case "SF":
                cnt = sparkMapper.querySfDataCnt(cond);
                break;
            default:
                break;
        }
        return cnt == null ? 0L : cnt;
    }

    private Long createTempTable(DataCond cond) {
        Long cnt = null;
        switch (cond.getType()) {
            case "MR":
                cnt = sparkMapper.createMrTempTable(cond);
                break;
            case "HO":
                cnt = sparkMapper.createHoTempTable(cond);
                break;
            case "SF":
                cnt = sparkMapper.createSfTempTable(cond);
                break;
            default:
                break;
        }
        return cnt == null ? 0L : cnt;
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
    public List<Map<String, Object>> queryResultByJobId(long jobId) {
        return sparkMapper.queryResultByJobId(jobId);
    }

    @Override
    public void handleTempTable(DataCond cond) {
        if (queryDataCnt(cond) > 0) {
            createTempTable(cond);
        }
    }
}
