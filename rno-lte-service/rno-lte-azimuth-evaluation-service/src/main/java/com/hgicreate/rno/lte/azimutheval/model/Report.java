package com.hgicreate.rno.lte.azimutheval.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class Report implements Serializable {
    private long reportId;
    private long jobId;
    private String stage;
    private Date begTime;
    private Date endTime;
    private String state;
    private int reportType = 1;
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
