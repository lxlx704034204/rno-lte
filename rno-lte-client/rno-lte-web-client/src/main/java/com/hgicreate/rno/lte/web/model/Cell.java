package com.hgicreate.rno.lte.web.model;

import lombok.Data;

@Data
public class Cell {
    private String cellId, cellName, enodebId, manufacturer, bandType, coverType, coverScene, remoteCell, relatedParam, relatedResouce, areaName;
    private Long areaId;
    // 有空值的列
    private Integer eci, pci, azimuth, stationSpace, earfcn, tac, eDowntilt, mDowntilt, totalDowntilt, bandWidth, bandIndicator, bandAmount;
    private Double longitude, latitude, antennaHeight;

    private Area area;
}
