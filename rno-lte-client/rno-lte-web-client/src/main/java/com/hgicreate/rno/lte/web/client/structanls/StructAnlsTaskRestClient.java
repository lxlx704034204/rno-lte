package com.hgicreate.rno.lte.web.client.structanls;

import com.hgicreate.rno.lte.web.model.*;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = StructAnlsTaskRestClientFallback.class, path = "/structAnls")
public interface StructAnlsTaskRestClient {
    /**
     * 分页获取LTE结构优化任务的信息
     */
    @RequestMapping(value = "/queryTaskByPage", method = POST)
    PageResultBody queryTaskByPage(@RequestBody PageCondBody<TaskQueryCond> condBody);

    /**
     * 提交LTE结构优化任务
     */
    @RequestMapping(value = "/submitTask", method = POST)
    SubmitResult submitTask(@RequestBody SubmitTaskCond cond);
}
