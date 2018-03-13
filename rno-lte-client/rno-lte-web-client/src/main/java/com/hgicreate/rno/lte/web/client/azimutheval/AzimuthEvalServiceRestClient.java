package com.hgicreate.rno.lte.web.client.azimutheval;

import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "${rno.lte.service.azimuth-evaluation:rno-lte-azimuth-evaluation-service}", fallback = AzimuthEvalServiceRestClientFallback.class)
public interface AzimuthEvalServiceRestClient {
    /**
     * 立即开始任务
     */
    @GetMapping("/startTask/{jobId}")
    SubmitResult startTask(@PathVariable("jobId") long jobId);

    /**
     * 根据任务ID获取计算结果
     */
    @GetMapping("/downloadResultFile/{jobId}")
    FileResult downloadResultFile(@PathVariable("jobId") long jobId);
}
