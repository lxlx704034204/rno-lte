package com.hgicreate.rno.lte.structanls.client;

import com.hgicreate.rno.lte.structanls.model.Job;
import com.hgicreate.rno.lte.structanls.model.Report;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Component
public class CommonRestClientFallback implements CommonRestClient {

    @Override
    public Job saveJob(@RequestBody Job job) {
        log.debug("保存任务失败。");
        return null;
    }

    @Override
    public Job getOneJob(@RequestBody Job job) {
        log.debug("获取任务失败。");
        return null;
    }

    @Override
    public Job getJobByJobId(@PathVariable("jobId") Long jobId) {
        log.debug("通过ID获取任务失败");
        return null;
    }

    @Override
    public Report saveReport(@RequestBody Report report) {
        log.debug("保存任务报告失败。");
        return null;
    }
}
