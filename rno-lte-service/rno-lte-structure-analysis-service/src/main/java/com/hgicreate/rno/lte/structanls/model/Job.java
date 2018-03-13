package com.hgicreate.rno.lte.structanls.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Job implements Serializable {
    private long jobId;
    private String jobName;
    private String creator;
    private String jobType;
    private Integer priority;
    private Date createTime;
    private Date launchTime, completeTime;
    private String description, jobRunningStatus, status;
}
