package com.hgicreate.rno.lte.intermatrix.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Job implements Serializable {
    private long jobId;
    private String jobName;
    private String creator;
    private String jobType;
    private String description;
    private Integer priority;
    private Date createTime;
    private Date launchTime;
    private Date completeTime;
    private String jobRunningStatus;
    private String status;

    public void init() {
        Date now = new Date();
        createTime = now;
        launchTime = now;
        completeTime = now;
        jobRunningStatus = JobStatus.Waiting.toString();
        status = "N";
        priority = 1;
    }

    public boolean canStop() {
        return JobStatus.Waiting.toString().equalsIgnoreCase(jobRunningStatus) || JobStatus.Running.toString().equalsIgnoreCase(jobRunningStatus);
    }

    public void stop() {
        jobRunningStatus = JobStatus.Stopped.toString();
    }
}
