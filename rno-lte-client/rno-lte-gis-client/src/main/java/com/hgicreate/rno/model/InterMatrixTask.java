package com.hgicreate.rno.model;

import lombok.Data;

import java.util.Date;

@Data
public class InterMatrixTask {
    private long jobId;
    private long areaId;
    private Date begMeaTime;
    private Date endMeaTime;
    private Date createTime;
    private long recordNum;
    private String dlFilename;
    private String finishState;
    private String type, status, taskName, dataDescription, sfFiles;
    private double sameFreqCellCoefWeight;
    private double switchRatioWeight;

    private Area area;
}
