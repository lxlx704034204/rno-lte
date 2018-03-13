package com.hgicreate.rno.lte.shape.voronoi.pojo;

import lombok.Data;

import java.util.*;

@Data
public class DelaunayTriangle {
    //三角形三点
    private Site site1;
    private Site site2;
    private Site site3;
    //三角形三边
    private Edge edge1;
    private Edge edge2;
    private Edge edge3;
    // 外切圆
    private Circle circumcircle;

    public DelaunayTriangle(Site site1, Site site2, Site site3) {
        this.circumcircle = Circle.createCircumcircleFromVertexs(site1, site2, site3);
        this.site1 = site1;
        this.site2 = site2;
        this.site3 = site3;
        this.edge1 = new Edge(site2, site3);
        this.edge2 = new Edge(site1, site3);
        this.edge3 = new Edge(site1, site2);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DelaunayTriangle triangle = (DelaunayTriangle) o;

        return (Site.equals(site1, triangle.site1) && Site.equals(site2, triangle.site2) && Site.equals(site3, triangle.site3)) ||
                (Site.equals(site1, triangle.site1) && Site.equals(site2, triangle.site3) && Site.equals(site3, triangle.site2)) ||
                (Site.equals(site1, triangle.site2) && Site.equals(site2, triangle.site1) && Site.equals(site3, triangle.site3)) ||
                (Site.equals(site1, triangle.site2) && Site.equals(site2, triangle.site3) && Site.equals(site3, triangle.site1)) ||
                (Site.equals(site1, triangle.site3) && Site.equals(site2, triangle.site1) && Site.equals(site3, triangle.site2)) ||
                (Site.equals(site1, triangle.site3) && Site.equals(site2, triangle.site2) && Site.equals(site3, triangle.site1));
    }

    @Override
    public int hashCode() {
        int result = site1 != null ? site1.hashCode() : 0;
        result += site2 != null ? site2.hashCode() : 0;
        result += site3 != null ? site3.hashCode() : 0;
        return result;
    }

    public List<Edge> findEages() {
        List<Edge> edges = new ArrayList<>();
        edges.add(edge1);
        edges.add(edge2);
        edges.add(edge3);
        return edges;
    }

    public List<Edge> findEagesByVertex(Site site) {
        List<Edge> edges = new ArrayList<>();
        if (edge1.isEndpoint(site)) {
            edges.add(edge1);
        }
        if (edge2.isEndpoint(site)) {
            edges.add(edge2);
        }
        if (edge3.isEndpoint(site)) {
            edges.add(edge3);
        }
        return edges;
    }

    public boolean isVertex(Site site) {
        return Site.equals(site, site1) || Site.equals(site, site2) || Site.equals(site, site3);
    }

    public static Edge createCircumcircleLigature(DelaunayTriangle triangle1, DelaunayTriangle triangle2) {
        return Circle.createCenterLigature(triangle1.circumcircle, triangle2.circumcircle);
    }

    //找出两个三角形的公共边
    public static Edge findCommonEdge(DelaunayTriangle triangle1, DelaunayTriangle triangle2) {
        if (triangle1.containEdge(triangle2.edge1)) {
            return triangle2.edge1;
        } else if (triangle1.containEdge(triangle2.edge2)) {
            return triangle2.edge2;
        } else if (triangle1.containEdge(triangle2.edge3)) {
            return triangle2.edge3;
        } else {
            return null;
        }
    }

    //找出两个三角形的公共边
    private static boolean isAdjacent(DelaunayTriangle triangle1, DelaunayTriangle triangle2) {
        return !triangle1.equals(triangle2) && (triangle1.containEdge(triangle2.edge1) || triangle1.containEdge(triangle2.edge2) || triangle1.containEdge(triangle2.edge3));
    }

    private boolean containEdge(Edge edge) {
        return edge.equals(edge1) || edge.equals(edge2) || edge.equals(edge3);
    }

    public boolean containEdges(Collection<Edge> edges) {
        for (Edge edge : edges) {
            if (containEdge(edge)) {
                return true;
            }
        }
        return false;
    }

    public boolean isInCircumcircle(Site site) {
        return circumcircle.isInCircle(site);
    }

    //将点与受影响的三角形三点连接，形成新的三个三角形添加到三角形链中
    public Set<DelaunayTriangle> produceNewDelaunayTriangles(Site point) {
        Set<DelaunayTriangle> allTriangles = new HashSet<>();
        allTriangles.add(new DelaunayTriangle(site1, site2, point));
        allTriangles.add(new DelaunayTriangle(site1, site3, point));
        allTriangles.add(new DelaunayTriangle(site2, site3, point));
        return allTriangles;
    }

    private Site oppositeVertex(Edge edge) {
        if (edge.isEndpoint(site1) && edge.isEndpoint(site2)) {
            return site3;
        } else if (edge.isEndpoint(site1) && edge.isEndpoint(site3)) {
            return site2;
        } else {
            return site1;
        }
    }

    /**
     * 调整三角形的对角线，如果三角形不相邻或者不需要调整，都返回空集合
     */
    public static List<DelaunayTriangle> adjustDiagonal(DelaunayTriangle triangle1, DelaunayTriangle triangle2) {
        List<DelaunayTriangle> newTriangles = new ArrayList<>();
        //找出两个三角形的公共边
        // 如果有公共边说明三角形相邻，需要判断对角线
        if (isAdjacent(triangle1, triangle2)){
            Edge commonEdge = findCommonEdge(triangle1, triangle2);
            //新对角线的点
            Site a = triangle1.oppositeVertex(commonEdge);
            //找出对角线的另一点
            Site b = triangle2.oppositeVertex(commonEdge);

            // 如果该点在另一个三角形的外接圆内，说明对角线需要更新
            if (triangle2.isInCircumcircle(a) || triangle1.isInCircumcircle(b)) {
                //形成两个新的三角形
                newTriangles.add(new DelaunayTriangle(a, b, commonEdge.getA()));
                newTriangles.add(new DelaunayTriangle(a, b, commonEdge.getB()));
            }
        }
        return newTriangles;
    }

    public void isNaN() {
        circumcircle.getCenter().isNaN();
    }

    private boolean isInTriangle(Site site) {
        Vector vector0 = new Vector(site3, site1);
        Vector vector1 = new Vector(site2, site1);
        Vector vector2 = new Vector(site, site1);
        double dot00 = vector0.dot(vector0);
        double dot01 = vector0.dot(vector1);
        double dot02 = vector0.dot(vector2);
        double dot11 = vector1.dot(vector1);
        double dot12 = vector1.dot(vector2);
        double denominator = dot00 * dot11 - dot01 * dot01;

        double u = (dot11 * dot02 - dot01 * dot12) / denominator;

        double v = (dot00 * dot12 - dot01 * dot02) / denominator;

        return !(u <= 0 || u >= 1) && !(v <= 0 || v >= 1) && u + v < 1;
    }

    // 外接圆圆心是否在三角形内部
    private boolean isCircumCircleCenterInTriangle() {
        return isInTriangle(circumcircle.getCenter());
    }

    //根据两点求以第一个点为起点的射线边
    public Edge produceRayEdge(Edge direction) {
        return Edge.produceRayEdge(circumcircle.getCenter(), direction, !isCircumCircleCenterInTriangle());
    }

    class Vector {
        private double x;
        private double y;

        Vector(Site a, Site b) {
            this.x = a.getX() - b.getX();
            this.y = a.getY() - b.getY();
        }

        double dot(Vector other) {
            return x * other.x + y * other.y;
        }
    }
}