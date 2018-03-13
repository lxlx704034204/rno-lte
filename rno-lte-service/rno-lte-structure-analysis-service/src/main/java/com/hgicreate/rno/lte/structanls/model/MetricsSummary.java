package com.hgicreate.rno.lte.structanls.model;

import lombok.Data;

@Data
public class MetricsSummary {
    private Long jobId;
    private String cellId;
    private String cellName;
    private String weakFlag;
    private String overlapFlag;
    private Integer overCnt;
    private String overFlag;
    private Integer over16Cnt;
    private String over16Flag;
}
