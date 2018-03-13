package com.hgicreate.rno.lte.pciafp.schedule;

import com.hgicreate.rno.lte.pciafp.model.Job;
import com.hgicreate.rno.lte.pciafp.model.JobStatus;
import com.hgicreate.rno.lte.pciafp.service.CommonRestService;
import com.hgicreate.rno.lte.pciafp.task.JobExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ScheduledTasks {

    private final CommonRestService commonRestService;
    private final JobExecutor jobExecutor;
    @Value("${rno.run-mode:always}")
    private String runMode;
    @Value("${rno.job-type-code:RNO_PCI_AFP_PLAN}")
    private String jobTypeCode;

    public ScheduledTasks(CommonRestService commonRestService, JobExecutor jobExecutor) {
        this.commonRestService = commonRestService;
        this.jobExecutor = jobExecutor;
    }

    @Scheduled(fixedDelayString = "${rno.scheduler.fixed-delay}")
    public void runParseTask() {
        if (runMode.equals("scheduler")) {
            log.debug("定时器检查是否可领取新的PCI计算任务。");
            try {
                Job job = new Job();
                job.setJobRunningStatus(JobStatus.Waiting.toString());
                job.setJobType(jobTypeCode);

                job = commonRestService.getOneJob(job);

                // 从数据库中取得将运行的数据解析导入任务
                if (job != null && job.getJobId() > 0) {
                    log.debug("定时器领取到新的PCI计算任务。");
                    jobExecutor.runJobInternal(job.getJobId());
                }
            } catch (Exception e) {
                e.printStackTrace();
                log.error("定时器检查并运行定时失败！");
            }
        }
    }
}
