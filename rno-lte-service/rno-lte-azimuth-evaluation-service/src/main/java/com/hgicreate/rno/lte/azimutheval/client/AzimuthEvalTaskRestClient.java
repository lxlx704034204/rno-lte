package com.hgicreate.rno.lte.azimutheval.client;

import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalResult;
import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalTask;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = AzimuthEvalTaskRestClientFallback.class, path = "/azimuthEval")
public interface AzimuthEvalTaskRestClient {
    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    @GetMapping("/queryTaskRecord/{jobId}")
    AzimuthEvalTask queryTaskRecordByJobId(@PathVariable("jobId") long jobId);

    /**
     * 更新task状态
     */
    @PostMapping("/updateTaskStatus/{jobId}")
    boolean updateTaskStatus(@PathVariable("jobId") long jobId, @RequestParam("jobStatus") String jobStatus);

    /**
     * 根据任务ID获取计算结果
     */
    @GetMapping("/queryResult/{jobId}")
    List<AzimuthEvalResult> queryResultByJobId(@PathVariable("jobId") long jobId);

    /**
     * 保存天线方位角结果
     */
    @PostMapping("/saveResult")
    Long saveResult(@RequestBody List<AzimuthEvalResult> azimuthEvalResults);
}
