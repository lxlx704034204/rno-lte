package com.hgicreate.rno.model;

import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

@Data
public class Cell {

    private String cellId;
    private String cellName, manufacturer, bandType, coverType, coverScene, remoteCell, relatedParam, relatedResouce;
    private String enodebId;
    private int eci, pci, azimuth, stationSpace;
    private long areaId;
    private double longitude, latitude;
    // 有空值的列

    private Integer earfcn, tac, eDowntilt, mDowntilt, totalDowntilt, bandWidth, bandIndicator, bandAmount;
    private Double antennaHeight;
    private Area area;
    private String areaName;
}
