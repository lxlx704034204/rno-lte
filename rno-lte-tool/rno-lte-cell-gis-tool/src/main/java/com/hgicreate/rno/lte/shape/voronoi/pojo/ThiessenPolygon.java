package com.hgicreate.rno.lte.shape.voronoi.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * Created by chen.c10 on 2016/12/12.
 * 泰森多边形
 */
@Data
@AllArgsConstructor
public class ThiessenPolygon {
    private Site sample;
    private List<Edge> edges;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ThiessenPolygon that = (ThiessenPolygon) o;

        return sample != null ? sample.equals(that.sample) : that.sample == null;
    }

    @Override
    public int hashCode() {
        return sample != null ? sample.hashCode() : 0;
    }
}
