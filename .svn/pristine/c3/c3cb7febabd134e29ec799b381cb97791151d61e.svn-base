package com.hgicreate.rno.lte.web.client.pciafp;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.DataCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient(name = "${rno.lte.service.pci-afp:rno-lte-pci-afp-service}", fallback = PciAfpServiceRestClientFallback.class)
public interface PciAfpServiceRestClient {
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

    /**
     * 分页查询扫频文件信息
     */
    @RequestMapping(value = "/querySfFileByPage", method = POST)
    PageResultBody querySfFileByPage(@RequestBody PageCondBody<DataCond> condBody);
}
