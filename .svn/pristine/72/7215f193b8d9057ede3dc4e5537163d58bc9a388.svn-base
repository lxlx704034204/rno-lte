package com.hgicreate.rno.lte.common.controller.intermatrix;

import com.hgicreate.rno.lte.common.model.*;
import com.hgicreate.rno.lte.common.model.intermatrix.InterMatrixTask;
import com.hgicreate.rno.lte.common.model.intermatrix.InterferenceMatrixTaskRecord;
import com.hgicreate.rno.lte.common.service.intermatrix.InterMatrixTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Slf4j
@RestController
@RequestMapping("/interMatrix")
public class InterMatrixTaskController {
    private final InterMatrixTaskService interMatrixTaskService;

    public InterMatrixTaskController(InterMatrixTaskService interMatrixTaskService) {
        this.interMatrixTaskService = interMatrixTaskService;
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
        org.springframework.data.domain.Page result = interMatrixTaskService.findAll(cond, pageable);

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
        return interMatrixTaskService.findOne(jobId);
    }

    /**
     * 提交LTE 方位角评估分析计算任务
     */
    @PostMapping("/submitTask")
    public SubmitResult submitTask(@RequestBody InterferenceMatrixTaskRecord cond) {
        log.debug("进入方法:submitTask.cond={}", cond);
        SubmitResult submitResult;
        try {
            submitResult = interMatrixTaskService.submitTask(cond);
        } catch (Exception e) {
            e.printStackTrace();
            submitResult = new SubmitResult();
            submitResult.setFlag(false);
            submitResult.setResult("提交任务失败。");
        }
        log.debug("离开方法：submitTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 更新task状态
     */
    @RequestMapping(value = "/updateTaskStatus/{jobId}", method = POST)
    public boolean updateTaskStatus(@PathVariable("jobId") long jobId, String jobStatus) {
        log.debug("进入方法：updateTaskStatus。jobId={},jobStatus={}", jobId, jobStatus);
        return interMatrixTaskService.updateTaskStatus(jobId, jobStatus);
    }

    /**
     * 在当前城市范围内检查任务名是否重复，重复为false
     */
    @GetMapping("/checkTaskName/{cityId}")
    public boolean checkTaskName(@PathVariable("cityId") long cityId, String taskName) {
        log.debug("进入方法:checkTaskName.cityId={},taskName={}", cityId, taskName);
        boolean bool = !interMatrixTaskService.existsByTaskNameAndAreaId(taskName, cityId);
        log.debug("进入方法:checkTaskName.bool={}", bool);
        return bool;
    }

    /**
     * 检查这周是否计算过lte干扰矩阵
     */
    @GetMapping("/isExistedTaskThisWeek/{cityId}")
    public Map<String, Object> isExistedTaskThisWeek(@PathVariable("cityId") long cityId) {
        log.debug("进入方法:isExistedTaskThisWeek.cityId={}", cityId);
        return interMatrixTaskService.isExistedTaskThisWeek(cityId);
    }

    /**
     * 获取最近十次lte干扰矩阵信息
     */
    @GetMapping("/getLatelyLteMatrix/{cityId}")
    public List<InterMatrixTask> getLatelyLteMatrixByCityId(@PathVariable("cityId") long cityId) {
        log.debug("进入方法:getLatelyLteMatrixByCityId.cityId={}", cityId);
        return interMatrixTaskService.getLatelyLteMatrixByCityId(cityId);
    }
}
