package com.hgicreate.rno.lte.common.model.structanls;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "RNO_LTE_STRUCT_MS_RES")
public class MetricsSummary implements Serializable {
    @Id
    @SequenceGenerator(name = "SEQ_RNO_LTE_STRUCT_MS_RES", sequenceName = "SEQ_RNO_LTE_STRUCT_MS_RES", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_RNO_LTE_STRUCT_MS_RES")
    private Long id;
    private Long jobId;
    private String cellId;
    private String cellName;
    private String weakFlag;
    private String overlapFlag;
    private Integer overCnt;
    private String overFlag;
    @Column(name = "over16_Cnt")
    private Integer over16Cnt;
    @Column(name = "over16_Flag")
    private String over16Flag;
}
