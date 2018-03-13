package com.hgicreate.rno.lte.web.client.structanls;

import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@FeignClient(name = "${rno.lte.service.structure-analysis:rno-lte-structure-analysis-service}", fallback = StructureAnalysisRestClientFallback.class)
public interface StructureAnalysisRestClient {
    /**
     * 立即开始任务
     */
    @GetMapping("/startTask/{jobId}")
    SubmitResult startTask(@PathVariable("jobId") long jobId);

    /**
     * 根据任务ID获取计算结果
     */
    @RequestMapping(value = "/downloadResultFile/{jobId}", method = GET)
    FileResult downloadResultFile(@PathVariable("jobId") long jobId);
}
