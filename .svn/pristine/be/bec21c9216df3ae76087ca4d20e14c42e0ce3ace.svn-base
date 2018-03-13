package com.hgicreate.rno.lte.structanls.service;

import com.hgicreate.rno.lte.structanls.model.MetricsSummary;
import com.hgicreate.rno.lte.structanls.model.OverlapCover;
import com.hgicreate.rno.lte.structanls.model.StructAnlsTask;

import java.util.List;

public interface StructAnlsRestService {
    /**
     * 更新任务自身状态
     */
    void updateOwnProgress(long jobId, String jobStatus);

    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    StructAnlsTask queryTaskRecordByJobId(long jobId);

    /**
     * 批量入库
     */
    Long batchInsertMetricsSummaries(List<MetricsSummary> results);

    List<MetricsSummary> queryMetricsSummariesByJobId(long jobId);

    /**
     * 批量入库
     */
    Long batchInsertOverlapCovers(List<OverlapCover> results);

    List<OverlapCover> queryOverlapCoversByJobId(long jobId);
}
