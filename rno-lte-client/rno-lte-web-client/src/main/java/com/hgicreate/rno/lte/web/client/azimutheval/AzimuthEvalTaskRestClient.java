package com.hgicreate.rno.lte.web.client.azimutheval;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.TaskQueryCond;
import com.hgicreate.rno.lte.web.model.azimutheval.AzimuthJobRecord;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = AzimuthEvalTaskRestClientFallback.class, path = "/azimuthEval")
public interface AzimuthEvalTaskRestClient {
    /**
     * 分页获取LTE天线方位角评估任务的信息
     */
    @RequestMapping(value = "/queryTaskByPage", method = POST)
    PageResultBody queryTaskByPage(@RequestBody PageCondBody<TaskQueryCond> condBody);

    /**
     * 提交LTE 方位角评估分析计算任务
     */
    @RequestMapping(value = "/submitTask", method = POST)
    SubmitResult submitTask(@RequestBody AzimuthJobRecord cond);
}
