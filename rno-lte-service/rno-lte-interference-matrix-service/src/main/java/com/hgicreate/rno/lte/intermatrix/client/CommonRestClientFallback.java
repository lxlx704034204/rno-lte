package com.hgicreate.rno.lte.intermatrix.client;

import com.hgicreate.rno.lte.intermatrix.model.Job;
import com.hgicreate.rno.lte.intermatrix.model.JobProfile;
import com.hgicreate.rno.lte.intermatrix.model.JobStatus;
import com.hgicreate.rno.lte.intermatrix.model.Report;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CommonRestClientFallback implements CommonRestClient {
    @Override
    public Job saveJob(Job job) {
        log.debug("保存任务失败。");
        return null;
    }

    @Override
    public Job getOneJob(Job job) {
        log.debug("获取可用任务失败。");
        return null;
    }

    @Override
    public Job getJobByJobId(Long jobId) {
        log.debug("获取任务失败。");
        return null;
    }

    @Override
    public Report saveReport(Report report) {
        log.debug("保存报告失败。");
        return null;
    }
}
