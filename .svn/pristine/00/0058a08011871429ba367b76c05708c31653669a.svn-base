package com.hgicreate.rno.lte.shape.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
public class GisCell implements Serializable {
    private String cellId;
    private String cellName;
    private Long areaId;
    private Double lon;
    private Double lat;
    private Integer earfcn;
    private Integer pci;
    private String bandType;
    private String coverType;
    private Integer azimuth;
    private Double stationSpace;

    // 圆或者扇形的半径，单位米
    private Double radius;

    // oracle入库使用的三角形数据，弧度值
    private Double sx;
    private Double sy;
    private Double ex;
    private Double ey;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GisCell gisCell = (GisCell) o;
        return Objects.equals(cellId, gisCell.cellId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cellId);
    }
}
