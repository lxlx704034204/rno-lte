package com.hgicreate.rno.lte.structanls.model;

import lombok.Data;

@Data
public class OverCover {
    private String cellId;
    private String cellName;
    private int cellPci;
    private int cellEarfcn;
    private double cellLon;
    private double cellLat;
    private double stationSpace;
    private String ncellId;
    private String ncellName;
    private int ncellPci;
    private int ncellEarfcn;
    private double ncellLon;
    private double ncellLat;
    private int ncellCnt;
    private int totalCnt;
    private double ncellPer;
    private double dis;
}
