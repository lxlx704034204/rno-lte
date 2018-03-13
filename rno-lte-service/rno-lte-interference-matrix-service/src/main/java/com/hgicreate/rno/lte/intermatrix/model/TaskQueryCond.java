package com.hgicreate.rno.lte.intermatrix.model;

import lombok.Data;

@Data
public class TaskQueryCond {
    private String isMine;
    private String account;
    private String jobType;
    private long cityId;
    private String taskName;
    private String taskStatus;
    private String meaTime;
    private String startSubmitTime;
    private String endSubmitTime;
    private int start;
    private int end;
}
