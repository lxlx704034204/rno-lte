package com.hgicreate.rno.lte.shape.voronoi.pojo;

import lombok.Data;

import java.util.Collection;
import java.util.List;

/**
 * Created by chen.c10 on 2016/12/14.
 * 维诺图
 */
@Data
public class Voronoi {
    private DelaunayTriangle motherTriangle;
    private Collection<Site> sites;
    private List<DelaunayTriangle> delaunayTriangles;
    private List<ThiessenPolygon> thiessenPolygons;

    public Voronoi(DelaunayTriangle motherTriangle, Collection<Site> sites) {
        this.motherTriangle = motherTriangle;
        this.sites = sites;
    }
}
