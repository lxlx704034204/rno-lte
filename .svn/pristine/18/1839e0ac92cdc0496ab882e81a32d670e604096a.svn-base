package com.hgicreate.rno.lte.intermatrix.service;

import com.hgicreate.rno.lte.intermatrix.model.InterMatrixTask;

public interface InterMatrixTaskRestService {
    /**
     * 更新任务自身状态
     */
    void updateOwnProgress(long jobId, String jobStatus);

    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    InterMatrixTask queryTaskRecordByJobId(long jobId);
}
