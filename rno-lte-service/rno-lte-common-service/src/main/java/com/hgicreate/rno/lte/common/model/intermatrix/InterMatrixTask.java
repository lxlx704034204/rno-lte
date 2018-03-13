package com.hgicreate.rno.lte.common.model.intermatrix;

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
@Table(name = "RNO_LTE_INTER_MATRIX_JOB")
public class InterMatrixTask extends AbstractTask {
    @Id
    private Long jobId;
    @Column(name = "city_id", nullable = false)
    private Long areaId;
    @Column(name = "start_mea_date", nullable = false)
    private Date begMeaTime;
    @Column(name = "end_mea_date", nullable = false)
    private Date endMeaTime;
    @Column(name = "create_date", nullable = false)
    private Date createTime;
    private Long recordNum;
    @Column(name = "file_name")
    private String dlFilename;
    @Column(name = "work_status")
    private String finishState;
    private String type, status, taskName, dataDescription, sfFiles;
    @Column(name = "samefreqcellcoefweight", nullable = false)
    private Double sameFreqCellCoefWeight;
    @Column(name = "switchratioweight", nullable = false)
    private Double switchRatioWeight;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Job job;
    @OneToOne
    @JoinColumn(name = "city_id", insertable = false, updatable = false)
    private Area area;

    @PrePersist
    public void prePersist() {
        createTime = new Date();
        finishState = "排队中";
        status = "Y";
    }
}
