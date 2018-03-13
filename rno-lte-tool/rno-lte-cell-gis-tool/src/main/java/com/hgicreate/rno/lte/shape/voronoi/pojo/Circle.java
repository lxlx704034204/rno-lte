package com.hgicreate.rno.lte.shape.voronoi.pojo;

import lombok.Data;

/**
 * Created by chen.c10 on 2016/12/08.
 * 圆
 */
@Data
public class Circle {
    private Site center;//外界圆圆心
    private double radius;//外接圆半径

    private Circle(Site center, double radius) {
        this.center = center;
        this.radius = radius;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Circle circle = (Circle) o;

        return Double.compare(circle.radius, radius) == 0 && center != null ? center.equals(circle.center) : circle.center == null;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = center != null ? center.hashCode() : 0;
        temp = Double.doubleToLongBits(radius);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    static Circle createCircumcircleFromVertexs(Site site1, Site site2, Site site3) {

        double x1 = site1.getX();
        double x2 = site2.getX();
        double x3 = site3.getX();
        double y1 = site1.getY();
        double y2 = site2.getY();
        double y3 = site3.getY();
        double x=((y2-y1)*(y3*y3-y1*y1+x3*x3-x1*x1)-(y3-y1)*(y2*y2-y1*y1+x2*x2-x1*x1))/(2*(x3-x1)*(y2-y1)-2*((x2-x1)*(y3-y1)));
        double y=((x2-x1)*(x3*x3-x1*x1+y3*y3-y1*y1)-(x3-x1)*(x2*x2-x1*x1+y2*y2-y1*y1))/(2*(y3-y1)*(x2-x1)-2*((y2-y1)*(x3-x1)));

        Site center = new Site(x, y);
        return new Circle(center, Site.distance(center, site1));
    }

    //判断点是否在三角形外接圆的内部
    boolean isInCircle(Site site) {
        return Site.distance(this.center, site) < this.radius;
    }

    static Edge createCenterLigature(Circle circle1,Circle circle2){
        return new Edge(circle1.center,circle2.center);
    }
}
