package com.hgicreate.rno.lte.structanls.client;

import com.hgicreate.rno.lte.structanls.model.MetricsSummary;
import com.hgicreate.rno.lte.structanls.model.OverlapCover;
import com.hgicreate.rno.lte.structanls.model.StructAnlsTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class StructAnlsTaskRestClientFallback implements StructAnlsTaskRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public StructAnlsTask queryTaskRecordByJobId(long jobId) {
        log.debug("获取任务记录失败。");
        return null;
    }

    @Override
    public Boolean updateTaskStatus(long jobId, String jobStatus) {
        log.debug("更新任务状态失败。");
        return false;
    }

    @Override
    public List<MetricsSummary> queryMetricsSummariesByJobId(long jobId) {
        log.debug("获取指标汇总结果失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveMetricsSummaries(List<MetricsSummary> metricsSummaries) {
        log.debug("保存指标汇总结果失败。");
        return 0L;
    }

    @Override
    public List<OverlapCover> queryOverlapCoversByJobId(long jobId) {
        log.debug("重叠覆盖结果失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveOverlapCovers(List<OverlapCover> overlapCovers) {
        log.debug("保存重叠覆盖结果失败。");
        return 0L;
    }
}
