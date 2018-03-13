package com.hgicreate.rno.lte.web.client.pciafp;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.TaskQueryCond;
import com.hgicreate.rno.lte.web.model.pciafp.PciAfpTaskObj;
import com.hgicreate.rno.lte.web.model.pciafp.Threshold;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = PciAfpTaskRestClientFallback.class, path = "/pciAfp")
public interface PciAfpTaskRestClient {
    /**
     * 分页获取LTE天线方位角评估任务的信息
     */
    @PostMapping("/queryTaskByPage")
    PageResultBody queryTaskByPage(@RequestBody PageCondBody<TaskQueryCond> condBody);

    /**
     * 提交LTE 方位角评估分析计算任务
     */
    @PostMapping("/submitTask")
    SubmitResult submitTask(@RequestBody PciAfpTaskObj cond);

    /**
     * 获取获取特定模块的阈值
     */
    @GetMapping("/getThresholds/{moduleType}")
    List<Threshold> getThresholdsByModuleType(@PathVariable("moduleType") String moduleType);
}
