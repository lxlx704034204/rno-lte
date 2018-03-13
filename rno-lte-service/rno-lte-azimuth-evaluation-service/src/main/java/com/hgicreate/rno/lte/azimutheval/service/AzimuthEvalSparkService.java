package com.hgicreate.rno.lte.azimutheval.service;

import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalResult;

import java.util.List;

public interface AzimuthEvalSparkService {
    /**
     * 计算方位角评估
     */
    List<AzimuthEvalResult> calcAzimuth(long jobId, long cityId, String begTime, String endTime);

    /**
     * 查询是否有数据
     */
    boolean hasData(String evalType, long cityId, String begTime, String endTime);
}
