package com.hgicreate.rno.lte.common.controller.azimutheval;

import com.hgicreate.rno.lte.common.model.*;
import com.hgicreate.rno.lte.common.model.azimutheval.AzimuthEvalResult;
import com.hgicreate.rno.lte.common.model.azimutheval.AzimuthJobRecord;
import com.hgicreate.rno.lte.common.service.azimutheval.AzimuthEvalResultService;
import com.hgicreate.rno.lte.common.service.azimutheval.AzimuthEvalTaskService;
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
@RequestMapping("/azimuthEval")
public class AzimuthEvalTaskController {
    private final AzimuthEvalTaskService azimuthEvalTaskService;
    private final AzimuthEvalResultService azimuthEvalResultService;

    public AzimuthEvalTaskController(AzimuthEvalTaskService azimuthEvalTaskService, AzimuthEvalResultService azimuthEvalResultService) {
        this.azimuthEvalTaskService = azimuthEvalTaskService;
        this.azimuthEvalResultService = azimuthEvalResultService;
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
        org.springframework.data.domain.Page result = azimuthEvalTaskService.findAll(cond, pageable);

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
    public AbstractTask queryTaskRecordByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法：queryTaskRecordByJobId。jobId={}", jobId);
        return azimuthEvalTaskService.findOne(jobId);
    }

    /**
     * 提交LTE 方位角评估分析计算任务
     */
    @PostMapping("/submitTask")
    public SubmitResult submitTask(@RequestBody AzimuthJobRecord cond) {
        log.debug("进入方法:submitTask.cond={}", cond);
        SubmitResult submitResult = azimuthEvalTaskService.submitTask(cond);
        log.debug("离开方法：submitTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 更新task状态
     */
    @RequestMapping(value = "/updateTaskStatus/{jobId}", method = POST)
    public boolean updateTaskStatus(@PathVariable("jobId") long jobId, String jobStatus) {
        log.debug("进入方法：updateTaskStatus。jobId={},jobStatus={}", jobId, jobStatus);
        return azimuthEvalTaskService.updateTaskStatus(jobId, jobStatus);
    }

    /**
     * 根据任务ID获取计算结果
     */
    @GetMapping("/queryResult/{jobId}")
    public List<AzimuthEvalResult> queryResultByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryResultByJobId.jobId={}", jobId);
        return azimuthEvalResultService.findAzimuthEvalResultsByJobId(jobId);
    }

    /**
     * 保存天线方位角结果
     */
    @PostMapping("/saveResult")
    public long saveResult(@RequestBody List<AzimuthEvalResult> azimuthEvalResults) {
        log.debug("进入方法:saveResult.size={}", azimuthEvalResults.size());
        List<AzimuthEvalResult> results = azimuthEvalResultService.saveAzimuthEvalResults(azimuthEvalResults);
        log.debug("退出方法:saveResult.size={}", results.size());
        return results.size();
    }
}
