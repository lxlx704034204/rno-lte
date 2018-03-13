package com.hgicreate.rno.lte.common.model.cellmgr;

import com.hgicreate.rno.lte.common.model.Area;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "RNO_LTE_CELL")
public class Cell {
    @Id
    private String cellId;
    private String enodebId, cellName, manufacturer, bandType, coverType, coverScene, remoteCell, relatedParam, relatedResouce;
    private Long areaId;
    // 有空值的列
    private Integer eci, pci, azimuth, stationSpace, earfcn, tac, eDowntilt, mDowntilt, totalDowntilt, bandWidth, bandIndicator, bandAmount;
    private Double longitude, latitude, antennaHeight;

    @ManyToOne
    @JoinColumn(name = "areaId", insertable = false, updatable = false)
    private Area area;

    @Transient
    private String areaName;

    @PostLoad
    public void postLoad() {
        if (null != area) {
            areaName = area.getName();
        }
    }
}
