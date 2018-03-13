package com.hgicreate.rno.lte.web.client.intermatrix;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.TaskQueryCond;
import com.hgicreate.rno.lte.web.model.intermatrix.InterMatrixTask;
import com.hgicreate.rno.lte.web.model.intermatrix.InterferenceMatrixTaskRecord;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = InterMatrixTaskRestClientFallback.class, path = "/interMatrix")
public interface InterMatrixTaskRestClient {
    /**
     * 分页获取任务信息
     */
    @PostMapping("/queryTaskByPage")
    PageResultBody queryTaskByPage(@RequestBody PageCondBody<TaskQueryCond> condBody);

    /**
     * 提交任务
     */
    @PostMapping("/submitTask")
    SubmitResult submitTask(@RequestBody InterferenceMatrixTaskRecord cond);

    /**
     * 获取本周的LTE干扰矩阵任务
     */
    @GetMapping("/isExistedTaskThisWeek/{cityId}")
    Map<String, Object> isExistedTaskThisWeek(@PathVariable("cityId") long cityId);

    /**
     * 在当前城市范围内检查任务名是否重复，重复为false
     */
    @GetMapping("/checkTaskName/{cityId}")
    boolean checkTaskName(@PathVariable("cityId") long cityId, @RequestParam("taskName") String taskName);

    /**
     * 获取最近十次lte干扰矩阵信息
     */
    @GetMapping("/getLatelyLteMatrix/{cityId}")
    List<InterMatrixTask> getLatelyLteMatrixByCityId(@PathVariable("cityId") long cityId);
}
