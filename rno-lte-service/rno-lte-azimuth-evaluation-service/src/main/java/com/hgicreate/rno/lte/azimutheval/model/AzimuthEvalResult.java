package com.hgicreate.rno.lte.azimutheval.model;

import lombok.Data;

@Data
public class AzimuthEvalResult {
    private long jobId;
    private String cellId;
    private int azimuth;
    private int azimuth1;
    private int azimuth2;
    private int diff1;
    private int diff2;
}
