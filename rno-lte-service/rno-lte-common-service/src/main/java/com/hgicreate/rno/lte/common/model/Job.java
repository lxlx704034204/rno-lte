package com.hgicreate.rno.lte.common.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "RNO_LTE_JOB")
@SequenceGenerator(name = "SEQ_RNO_LTE_JOB", sequenceName = "SEQ_RNO_LTE_JOB", allocationSize = 1)
public class Job implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_RNO_LTE_JOB")
    private Long jobId;
    @Column(nullable = false)
    private String jobName;
    @Column(nullable = false)
    private String creator;
    @Column(nullable = false)
    private String jobType;
    private Integer priority;
    private Date createTime;
    private Date launchTime, completeTime;
    private String description, jobRunningStatus, status;

    @PrePersist
    public void prePersist() {
        createTime = new Date();
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
