package com.hgicreate.rno.lte.web.client.intermatrix;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.DataCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "${rno.lte.service.interference-matrix:rno-lte-interference-matrix-service}", fallback = InterMatrixServiceRestClientFallback.class)
public interface InterMatrixServiceRestClient {
    /**
     * 分页查询数据记录
     */
    @PostMapping("/queryDataRecordByPage")
    PageResultBody queryDataRecordByPage(@RequestBody PageCondBody<DataCond> condBody);

    /**
     * 根据任务ID获取计算结果
     */
    @GetMapping("/downloadResultFile/{jobId}")
    FileResult downloadResultFile(@PathVariable("jobId") long jobId);

    /**
     * 查询数据总数
     */
    @PostMapping("/queryDataCnt")
    long queryDataCnt(@RequestBody DataCond dataCond);

    /**
     * 立即开始任务
     */
    @GetMapping("/startTask/{jobId}")
    SubmitResult startTask(@PathVariable("jobId") long jobId);
}
