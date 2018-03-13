package com.hgicreate.rno.lte.structanls.service;

import com.hgicreate.rno.lte.structanls.model.MetricsSummary;
import com.hgicreate.rno.lte.structanls.model.OverCover;
import com.hgicreate.rno.lte.structanls.model.OverlapCover;

import java.util.List;

public interface StructAnlsSparkService {

    /**
     * 检查是否有数据
     */
    boolean hasData(long cityId, String begTime, String endTime);

    /**
     * 计算重叠覆盖
     */
    List<OverlapCover> calcOverlapCover(long jobId, long cityId, String begTime, String endTime);

    /**
     * 通过任务ID查找任务结果
     */
    List<OverCover> queryOverCoverResultByJobId(long jobId);

    /**
     * 处理过覆盖
     */
    Long handleOverCover(long jobId, long cityId, String begTime, String endTime);

    /**
     * 计算指标汇总
     */
    List<MetricsSummary> calcMetricsSummary(long jobId, long cityId, String begTime, String endTime);
}
