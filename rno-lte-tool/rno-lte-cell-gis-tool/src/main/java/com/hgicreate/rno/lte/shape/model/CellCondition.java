package com.hgicreate.rno.lte.shape.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CellCondition {
    private long cityId;
    private double outdoorRadius;
    private double indoorRadius;
    private boolean increment;
    private int batch;
    private double similarDis;
}
