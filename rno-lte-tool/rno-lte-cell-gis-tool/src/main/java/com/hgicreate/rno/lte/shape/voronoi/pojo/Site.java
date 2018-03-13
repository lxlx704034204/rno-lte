package com.hgicreate.rno.lte.shape.voronoi.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Site {
    private double x;
    private double y;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Site site = (Site) o;

        return Double.compare(site.x, x) == 0 && Double.compare(site.y, y) == 0;
    }

    static boolean equals(Site site1, Site site2) {
        return site1 != null ? site1.equals(site2) : site2 == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        temp = Double.doubleToLongBits(x);
        result = (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(y);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    //经纬度转墨卡托
    public static Site lonLat2MercatorSite(double lon, double lat) {
        double x = lon * 20037508.34 / 180;
        double y = Math.toDegrees(Math.log(Math.tan(Math.toRadians((90 + lat) / 2)))) * 20037508.34 / 180;
        return new Site(x, y);
    }

    //墨卡托转经纬度
//    public Site mercator2LonLat(double x, double y) {
//        double lon = x / 20037508.34 * 180;
//        double lat = Math.toDegrees(2 * Math.atan(Math.exp(Math.toRadians(y / 20037508.34 * 180))) - Math.PI / 2);
//        return new Site(lon, lat);
//    }

    void isNaN() {
        if (Double.isNaN(x) || Double.isNaN(y) || Double.isInfinite(x) || Double.isInfinite(y)) {
            System.out.println("x=" + x + ",y=" + y);
        }
    }

    //找出亮点的中点
    static Site findMidPoint(Site a, Site b) {
        return new Site((a.x + b.x) / 2.0, (a.y + b.y) / 2.0);
    }

    public static double distance(Site a, Site b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    public double direction(Site site) {
        // 向北为0，顺时针为正。东西为x，向东为正。南北为y，向南为正。atan2的参数分别为(对边，邻边),以this为原点。
        double angle = Math.toDegrees(Math.atan2(site.x - this.x, site.y - this.y));
        return angle < 0 ? angle + 360 : angle;
    }

    //根据两点求以第一个点为起点的射线边
    static Edge produceRayEdge(Site start, Site direction, double multiple, boolean reverse) {
        double xComponent = direction.x - start.x;
        double yComponent = direction.y - start.y;

        if (reverse) {
            return new Edge(start, new Site(-multiple * xComponent + start.x, -multiple * yComponent + start.y));
        }

        return new Edge(start, new Site(multiple * xComponent + start.x, multiple * yComponent + start.y));
    }
}