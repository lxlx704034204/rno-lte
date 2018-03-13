package com.hgicreate.rno.lte.structanls.client;

import com.hgicreate.rno.lte.structanls.model.MetricsSummary;
import com.hgicreate.rno.lte.structanls.model.OverlapCover;
import com.hgicreate.rno.lte.structanls.model.StructAnlsTask;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = StructAnlsTaskRestClientFallback.class, path = "/structAnls")
public interface StructAnlsTaskRestClient {
    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    @GetMapping("/queryTaskRecord/{jobId}")
    StructAnlsTask queryTaskRecordByJobId(@PathVariable("jobId") long jobId);

    /**
     * 更新task状态
     */
    @PostMapping("/updateTaskStatus/{jobId}")
    Boolean updateTaskStatus(@PathVariable("jobId") long jobId, @RequestParam("jobStatus") String jobStatus);

    /**
     * 根据任务ID获取指标汇总结果
     */
    @GetMapping("/queryMetricsSummaries/{jobId}")
    List<MetricsSummary> queryMetricsSummariesByJobId(@PathVariable("jobId") long jobId) ;

    /**
     * 保存指标汇总结果
     */
    @PostMapping("/saveMetricsSummaries")
    Long saveMetricsSummaries(@RequestBody List<MetricsSummary> metricsSummaries) ;

    /**
     * 根据任务ID获取重叠覆盖结果
     */
    @GetMapping("/queryOverlapCovers/{jobId}")
    List<OverlapCover> queryOverlapCoversByJobId(@PathVariable("jobId") long jobId) ;

    /**
     * 保存重叠覆盖结果
     */
    @PostMapping("/saveOverlapCovers")
    Long saveOverlapCovers(@RequestBody List<OverlapCover> overlapCovers) ;
}
