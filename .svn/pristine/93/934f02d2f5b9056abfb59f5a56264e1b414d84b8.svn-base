package com.hgicreate.rno.lte.azimutheval.service;

import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalResult;
import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalTask;

import java.util.List;

public interface AzimuthEvalRestService {
    /**
     * 更新任务自身状态
     */
    void updateOwnProgress(long jobId, String jobStatus);

    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    AzimuthEvalTask queryTaskRecordByJobId(long jobId);

    /**
     * 批量入库
     */
    Long batchInsertResult(List<AzimuthEvalResult> results);

    List<AzimuthEvalResult> queryResultByJobId(long jobId);
}
