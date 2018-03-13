package com.hgicreate.rno.lte.common.model.pciafp;

import com.hgicreate.rno.lte.common.model.AbstractTask;
import com.hgicreate.rno.lte.common.model.Area;
import com.hgicreate.rno.lte.common.model.Job;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "RNO_LTE_PCI_JOB")
public class PciAfpTask extends AbstractTask {
    @Id
    private Long jobId;
    @Column(name = "city_id", nullable = false)
    private Long areaId;
    private Long flowDataCollectId, matrixDataCollectId;
    private Date begMeaTime, endMeaTime, createTime, modTime;
    private String dlFileName, finishState, status, planType, optimizeCells, freqAdjType;
    @Column(name = "conver_type")
    private String convergenceType;// 收敛方式类型
    @Column(name = "is_check_ncell")
    private Boolean checkNCell;
    @Column(name = "is_export_assotable")
    private Boolean exportAssoTable;
    @Column(name = "is_export_midplan")
    private Boolean exportMidPlan;
    @Column(name = "is_export_nccheckplan")
    private Boolean exportNcCheckPlan;
    @Column(name = "sf_file_names")
    private String sfFiles; // 扫频文件名串
    @Column(name = "d1freq")
    private String d1Freq;// d1频点
    @Column(name = "d2freq")
    private String d2Freq;// d2频点
    @Column(name = "ks_corr_val")
    private Double ks = 0.02;
    @Column(name = "get_matrix_type")
    private Integer matrixType = 0; //已有干扰矩阵ID

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Job job;

    @OneToOne
    @JoinColumn(name = "city_id", insertable = false, updatable = false)
    private Area area;

    @PrePersist
    public void prePersist() {
        Date now = new Date();
        createTime = now;
        modTime = now;
        finishState = "排队中";
        status = "N";
    }

    @PreUpdate
    public void preUpdate() {
        modTime = new Date();
    }
}
