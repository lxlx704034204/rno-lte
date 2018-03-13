package com.hgicreate.rno.lte.web.model.azimutheval;

import lombok.Data;

@Data
public class AzimuthResult {
    private String cellId;
    private int azimuth;
    private int azimuth1;
    private int azimuth2;
    private int diff1;
    private int diff2;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AzimuthResult that = (AzimuthResult) o;

        return cellId != null ? cellId.equals(that.cellId) : that.cellId == null;
    }

    @Override
    public int hashCode() {
        return cellId != null ? cellId.hashCode() : 0;
    }
}
