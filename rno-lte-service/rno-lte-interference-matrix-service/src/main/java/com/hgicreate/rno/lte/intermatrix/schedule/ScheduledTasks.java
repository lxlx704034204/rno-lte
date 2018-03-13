package com.hgicreate.rno.lte.intermatrix.schedule;

import com.hgicreate.rno.lte.intermatrix.model.Job;
import com.hgicreate.rno.lte.intermatrix.model.JobStatus;
import com.hgicreate.rno.lte.intermatrix.service.CommonRestService;
import com.hgicreate.rno.lte.intermatrix.task.JobExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ScheduledTasks {

    private final JobExecutor jobExecutor;

    private final CommonRestService commonRestService;

    @Value("${rno.run-mode:always}")
    private String runMode;
    @Value("${rno.job-type-code:RNO_LTE_INTERFER_MATRIX}")
    private String jobTypeCode;

    @Autowired
    public ScheduledTasks(JobExecutor jobExecutor, CommonRestService commonRestService) {
        this.jobExecutor = jobExecutor;
        this.commonRestService = commonRestService;
    }

    @Scheduled(fixedDelayString = "${rno.scheduler.fixed-delay}")
    public void runParseTask() {
        if (runMode.equals("scheduler")) {
            log.debug("定时器检查是否可领取新的Lte干扰矩阵计算任务。");
            try {
                Job job = new Job();
                job.setJobRunningStatus(JobStatus.Waiting.toString());
                job.setJobType(jobTypeCode);

                job = commonRestService.getOneJob(job);

                // 从数据库中取得将运行的数据解析导入任务
                if (job != null && job.getJobId() > 0) {
                    log.debug("定时器领取到新的Lte干扰矩阵计算任务。");
                    jobExecutor.runJobInternal(job.getJobId());
                }
            } catch (Exception e) {
                e.printStackTrace();
                log.error("定时器检查并运行定时失败！");
            }
        }
    }
}
