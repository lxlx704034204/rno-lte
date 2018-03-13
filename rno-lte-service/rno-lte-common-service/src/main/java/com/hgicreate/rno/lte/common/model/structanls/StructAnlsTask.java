package com.hgicreate.rno.lte.common.model.structanls;

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
@Table(name = "RNO_LTE_STRUCT_ANLS_JOB")
public class StructAnlsTask extends AbstractTask {
    @Id
    private Long jobId;
    @Column(name = "city_id", nullable = false)
    private Long areaId;
    private Date begMeaTime, endMeaTime, createTime, modTime;
    private String dlFileName, finishState, status;

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
