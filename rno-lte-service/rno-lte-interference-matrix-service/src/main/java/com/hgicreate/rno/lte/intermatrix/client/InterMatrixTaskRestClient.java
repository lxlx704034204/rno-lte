package com.hgicreate.rno.lte.intermatrix.client;

import com.hgicreate.rno.lte.intermatrix.model.InterMatrixTask;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = InterMatrixTaskRestClientFallback.class, path = "/interMatrix")
public interface InterMatrixTaskRestClient {
    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    @GetMapping("/queryTaskRecord/{jobId}")
    InterMatrixTask queryTaskRecordByJobId(@PathVariable("jobId") long jobId);

    /**
     * 更新task状态
     */
    @PostMapping("/updateTaskStatus/{jobId}")
    boolean updateTaskStatus(@PathVariable("jobId") long jobId, @RequestParam("jobStatus") String jobStatus);
}
