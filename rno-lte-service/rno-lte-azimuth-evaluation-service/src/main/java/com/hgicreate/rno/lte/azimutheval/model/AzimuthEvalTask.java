package com.hgicreate.rno.lte.azimutheval.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class AzimuthEvalTask implements Serializable {
    private long jobId;
    private long areaId;
    private Date begMeaTime, endMeaTime, createTime, modTime;
    private String dlFileName, finishState, status, evalType;
    private Job job;
    private Area area;
}