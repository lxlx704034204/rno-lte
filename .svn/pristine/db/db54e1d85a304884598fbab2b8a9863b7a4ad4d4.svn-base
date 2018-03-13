package com.hgicreate.rno.lte.pciafp.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Data
public class PciAfpTask implements Serializable {
    private long jobId;
    private long areaId;
    private Date begMeaTime, endMeaTime, createTime, modTime;
    private String dlFileName, finishState, status, evalType;
    private String planType;
    private String convergenceType;// 收敛方式类型
    private String optimizeCells;
    private boolean checkNCell;
    private boolean exportAssoTable;
    private boolean exportMidPlan;
    private boolean exportNcCheckPlan;
    private double ks = 0.02;
    private String sfFiles; // 扫频文件名串
    private String freqAdjType; // 频率调整方案类型
    private String d1Freq;// d1频点
    private String d2Freq;// d2频点
    private long matrixDataCollectId = 0; // 干扰矩阵文件ID
    private long flowDataCollectId = 0; // 流量文件ID
    private int matrixType = 0; //已有干扰矩阵ID

    private Job job;
    private Area area;

    public boolean isZipResultFile() {
        return !(!this.isExportAssoTable() && !this.isExportMidPlan()
                && !this.isExportNcCheckPlan());
    }

    public List<String> getsfFilenames() {
        return Arrays.asList(null == sfFiles ? new String[0]
                : sfFiles.trim().split(","));
    }
}
