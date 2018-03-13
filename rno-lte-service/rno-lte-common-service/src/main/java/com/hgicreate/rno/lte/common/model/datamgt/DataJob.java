package com.hgicreate.rno.lte.common.model.datamgt;

import com.hgicreate.rno.lte.common.model.Area;
import com.hgicreate.rno.lte.common.model.Job;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "RNO_LTE_DATA_JOB")
public class DataJob implements Serializable {
    //数据类型 所属城市 文件名称 上传时间 导入完成时间 上传帐号 状态
    @Id
    private Long jobId;
    private Long areaId;
    private String dataType;
    private String filename;
    private String oriFilename;
    private Long fileSize;
    private String fullPath;
    private String fileStatus;
    private Boolean firstLineTitle;

    @OneToOne(cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Job job;

    @ManyToOne
    @JoinColumn(name = "areaId", insertable = false, updatable = false)
    private Area area;
}
