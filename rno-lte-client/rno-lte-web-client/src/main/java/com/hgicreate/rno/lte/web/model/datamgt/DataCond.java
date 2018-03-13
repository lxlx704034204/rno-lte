package com.hgicreate.rno.lte.web.model.datamgt;

import lombok.Data;

@Data
public class DataCond {
    private long jobId;
    private long cityId;
    private String type;
    private String factory;
    private String meaBegTime;
    private String meaEndTime;
    private int start;
    private int end;
}
