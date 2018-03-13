package com.hgicreate.rno.lte.common.controller.structanls;

import com.hgicreate.rno.lte.common.model.*;
import com.hgicreate.rno.lte.common.model.structanls.MetricsSummary;
import com.hgicreate.rno.lte.common.model.structanls.OverlapCover;
import com.hgicreate.rno.lte.common.service.structanls.StructAnlsResultService;
import com.hgicreate.rno.lte.common.service.structanls.StructAnlsTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Slf4j
@RestController
@RequestMapping("/structAnls")
public class StructAnlsTaskController {
    private final StructAnlsTaskService structAnlsTaskService;
    private final StructAnlsResultService structAnlsResultService;

    public StructAnlsTaskController(StructAnlsTaskService structAnlsTaskService, StructAnlsResultService structAnlsResultService) {
        this.structAnlsTaskService = structAnlsTaskService;
        this.structAnlsResultService = structAnlsResultService;
    }

    /**
     * 查询数据记录
     */
    @PostMapping("/queryTaskByPage")
    public PageResultBody queryTaskByPage(@RequestBody PageCondBody<TaskQueryCond> condBody) {
        log.debug("进入方法:queryTaskByPage。condBody = {}", condBody);
        TaskQueryCond cond = condBody.getCond();
        Page page = condBody.getPage();

        Pageable pageable = new PageRequest(page.getCurrentPage() - 1, page.getPageSize(), Sort.Direction.DESC, "createTime");
        org.springframework.data.domain.Page result = structAnlsTaskService.findAll(cond, pageable);

        page.setTotalCnt(result.getTotalElements());
        page.setTotalPageCnt(result.getTotalPages());
        page.setForcedStartIndex(-1);

        PageResultBody resultBody = new PageResultBody();
        resultBody.setResult("success");
        resultBody.setData(result.getContent() == null ? Collections.emptyList() : result.getContent());
        resultBody.setPage(page);
        log.debug("退出方法：queryTaskByPage。resultBody={}", resultBody);
        return resultBody;
    }

    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    @GetMapping("/queryTaskRecord/{jobId}")
    public AbstractTask queryTaskRecordByJobId(@PathVariable("jobId") long jobId, String jobType) {
        log.debug("进入方法：queryTaskRecordByJobId。jobId={},jobType={}", jobId, jobType);
        return structAnlsTaskService.findOne(jobId);
    }

    /**
     * 提交LTE 方位角评估分析计算任务
     */
    @PostMapping("/submitTask")
    public SubmitResult submitTask(@RequestBody SubmitTaskCond cond) {
        log.debug("进入方法:submitTask.cond={}", cond);
        SubmitResult submitResult = structAnlsTaskService.submitTask(cond);
        log.debug("离开方法：submitTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 更新task状态
     */
    @RequestMapping(value = "/updateTaskStatus/{jobId}", method = POST)
    public boolean updateTaskStatus(@PathVariable("jobId") long jobId, String jobStatus) {
        log.debug("进入方法：updateTaskStatus。jobId={},jobStatus={}", jobId, jobStatus);
        return structAnlsTaskService.updateTaskStatus(jobId, jobStatus);
    }

    /**
     * 根据任务ID获取指标汇总结果
     */
    @GetMapping("/queryMetricsSummaries/{jobId}")
    public List<MetricsSummary> queryMetricsSummariesByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryMetricsSummariesByJobId.jobId={}", jobId);
        List<MetricsSummary> metricsSummaries = structAnlsResultService.findMetricsSummariesByJobId(jobId);
        log.debug("退出方法:queryMetricsSummariesByJobId.metricsSummaries.size={}", metricsSummaries.size());
        return metricsSummaries;
    }

    /**
     * 保存指标汇总结果
     */
    @PostMapping("/saveMetricsSummaries")
    public long saveMetricsSummaries(@RequestBody List<MetricsSummary> metricsSummaries) {
        log.debug("进入方法:saveMetricsSummaries.size={}", metricsSummaries.size());
        List<MetricsSummary> results = structAnlsResultService.saveMetricsSummaries(metricsSummaries);
        log.debug("退出方法:saveMetricsSummaries.size={}", results.size());
        return results.size();
    }

    /**
     * 根据任务ID获取重叠覆盖结果
     */
    @GetMapping("/queryOverlapCovers/{jobId}")
    public List<OverlapCover> queryOverlapCoversByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryOverlapCoversByJobId.jobId={}", jobId);
        List<OverlapCover> overlapCovers = structAnlsResultService.findOverlapCoversByJobId(jobId);
        log.debug("退出方法:queryOverlapCoversByJobId.overlapCovers.size={}", overlapCovers.size());
        return overlapCovers;
    }

    /**
     * 保存重叠覆盖结果
     */
    @PostMapping("/saveOverlapCovers")
    public long saveOverlapCovers(@RequestBody List<OverlapCover> overlapCovers) {
        log.debug("进入方法:saveOverlapCovers.size={}", overlapCovers.size());
        List<OverlapCover> results = structAnlsResultService.saveOverlapCovers(overlapCovers);
        log.debug("退出方法:saveOverlapCovers.size={}", results.size());
        return results.size();
    }
}
