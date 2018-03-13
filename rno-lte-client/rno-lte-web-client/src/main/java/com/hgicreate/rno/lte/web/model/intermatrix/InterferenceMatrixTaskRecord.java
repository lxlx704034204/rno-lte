package com.hgicreate.rno.lte.web.model.intermatrix;

import lombok.Data;

@Data
public class InterferenceMatrixTaskRecord {
    private String account;
    private String taskName;
    private String taskDesc;
    private int cityId;
    private String cityName;
    private String meaBegTime;
    private String meaEndTime;
    private String dataType;
    private String dataDescription;
    private long recordNum;
    private double sameFreqCellCoefWeight;
    private double switchRatioWeight;
    private String sfFiles; // 扫频文件名串
    private String freqAdjType; // 频率调整方案类型
    private String d1Freq;// d1频点
    private String d2Freq;// d2频点
    private long sfFileCounts;
}
