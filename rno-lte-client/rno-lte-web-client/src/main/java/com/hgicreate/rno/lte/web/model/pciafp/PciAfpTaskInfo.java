package com.hgicreate.rno.lte.web.model.pciafp;

import lombok.Data;

import java.util.Arrays;
import java.util.List;

/**
 * PCI任务消息类
 */
@Data
public class PciAfpTaskInfo {
    private String account;
    private long jobId;
    private long cityId;
    private String dlFileName;
    private String finishState;
    private String taskName;
    private String taskDesc;
    private long provinceId;
    private String cityName;
    private String provinceName;
    private String begMeaTime;
    private String endMeaTime;
    private String planType;
    private String convergenceType;// 收敛方式类型
    private String optimizeCells;
    private boolean checkNCell;
    private boolean exportAssoTable;
    private boolean exportMidPlan;
    private boolean exportNcCheckPlan;
    private boolean useFlow;
    private boolean useSf;
    private double ks = 0.02;
    private String sfFiles; // 扫频文件名串
    private String freqAdjType; // 频率调整方案类型
    private String d1Freq;// d1频点
    private String d2Freq;// d2频点
    private String sourceType;
    private long matrixDataCollectId = 0; // 干扰矩阵文件ID
    private long flowDataCollectId = 0; // 流量文件ID
    private int matrixType = 0; //已有干扰矩阵ID

    public boolean isZipResultFile() {
        return !(!this.isExportAssoTable() && !this.isExportMidPlan()
                && !this.isExportNcCheckPlan());
    }

    public List<String> getsfFilenames() {
        return Arrays.asList(null == sfFiles ? new String[0]
                : sfFiles.trim().split(","));
    }
}
