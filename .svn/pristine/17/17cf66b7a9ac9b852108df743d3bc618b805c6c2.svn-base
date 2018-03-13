package com.hgicreate.rno.lte.shape.voronoi.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Edge {
    private Site a;
    private Site b;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Edge edge = (Edge) o;

        return (Site.equals(a, edge.a) && Site.equals(b, edge.b)) || (Site.equals(a, edge.b) && Site.equals(b, edge.a));
    }

    @Override
    public int hashCode() {
        int result = a != null ? a.hashCode() : 0;
        result += b != null ? b.hashCode() : 0;
        return result;
    }

    //找出两点的中点
    private Site findMidPoint() {
        return Site.findMidPoint(a, b);
    }

    //判断点是否在边上
    boolean isEndpoint(Site site) {
        return site.equals(a) || site.equals(b);
    }

    public static double distance(Edge edge, Site site) {
        if (edge.isEndpoint(site)) {
            return 0;
        }
        double xpa = site.getX() - edge.getA().getX();
        double xba = edge.getB().getX() - edge.getA().getX();
        double ypa = site.getY() - edge.getA().getY();
        double yba = edge.getB().getY() - edge.getA().getY();
        return Math.sqrt(Math.pow(xpa, 2) + Math.pow(ypa, 2) + Math.pow(xpa * xba + ypa * yba, 2) / (Math.pow(xba, 2) + Math.pow(yba, 2)));
    }

    private double length() {
        return Site.distance(a, b);
    }

    //根据两点求以第一个点为起点的射线边
    static Edge produceRayEdge(Site start, Edge direction, boolean reverse) {
        return Site.produceRayEdge(start, direction.findMidPoint(), 2, reverse);
    }
}