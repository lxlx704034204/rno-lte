package com.hgicreate.rno.lte.web.model;

import lombok.Data;

@Data
public class SubmitTaskCond {
    private long jobId;
    private String account;
    private String taskName;
    private String taskDesc;
    private long cityId;
    private String cityName;
    private String begMeaTime;
    private String endMeaTime;
    private String dlFileName;
}
