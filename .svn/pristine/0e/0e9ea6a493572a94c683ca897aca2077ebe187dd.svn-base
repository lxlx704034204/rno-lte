package com.hgicreate.rno.lte.common.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "RNO_LTE_JOB_REPORT")
@SequenceGenerator(name = "SEQ_RNO_LTE_JOB_REPORT", sequenceName = "SEQ_RNO_LTE_JOB_REPORT", allocationSize = 1)
public class Report implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_RNO_LTE_JOB_REPORT")
    private Long reportId;
    private Long jobId;
    private String stage;
    private Date begTime;
    private Date endTime;
    private String state;
    private Integer reportType = 1;
    private String attMsg = "";

    public void setSystemFields(String stage, Date begTime, Date endTime, String state, String attMsg) {
        this.stage = stage;
        this.begTime = begTime;
        this.endTime = endTime;
        this.state = state;
        this.attMsg = attMsg;
        this.reportType = 2;// 系统类型
    }

    public void setFields(String stage, Date begTime, Date endTime, String state, String attMsg) {
        this.stage = stage;
        this.begTime = begTime;
        this.endTime = endTime;
        this.state = state;
        this.attMsg = attMsg;
        this.reportType = 1;// 业务类型
    }
}
