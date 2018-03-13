package com.hgicreate.rno.lte.shape.voronoi;

import com.hgicreate.rno.lte.shape.voronoi.pojo.*;

import java.util.*;
import java.util.stream.Collectors;

public class VoronoiFactory {

    public static Voronoi createVoronoi(Collection<Site> sites) {
        // 生成外围三角形
        DelaunayTriangle motherTriangle = createMotherTriangle(sites);
        // 初始化维诺图
        Voronoi voronoi = new Voronoi(motherTriangle, sites);
        // 生成德劳奈三角形
        List<DelaunayTriangle> delaunayTriangles = bulidDelaunayTriangles(motherTriangle, sites);
        // 移除与最外围三角形共顶点的三角行
        delaunayTriangles.removeIf(e -> e.isVertex(motherTriangle.getSite1()) || e.isVertex(motherTriangle.getSite2()) || e.isVertex(motherTriangle.getSite3()));
        // 德劳奈三角网加入维诺图
        voronoi.setDelaunayTriangles(delaunayTriangles);
        // 生成泰森多边形
        List<ThiessenPolygon> thiessenPolygons = produceThiessenPolygon(delaunayTriangles);
        // 加入维诺图
        voronoi.setThiessenPolygons(thiessenPolygons);

        return voronoi;
    }

    private static DelaunayTriangle createMotherTriangle(Collection<Site> sites) {
        DoubleSummaryStatistics xStatistics = sites.stream().mapToDouble(Site::getX).summaryStatistics();
        DoubleSummaryStatistics yStatistics = sites.stream().mapToDouble(Site::getY).summaryStatistics();
        double xMin = xStatistics.getMin();
        double xMax = xStatistics.getMax();
        double yMin = yStatistics.getMin();
        double yMax = yStatistics.getMax();
        double xMinExtend = xMin - (xMax - xMin) * 0.05;
        double xMaxExtend = xMax + (xMax - xMin) * 0.05;
        double yMinExtend = yMin - (yMax - yMin) * 0.05;
        double yMaxExtend = yMax + (yMax - yMin) * 0.05;
        // 构建一个以左下角 (xMinExtend,yMinExtend) 为直角顶点，(xMinExtend,yMaxExtend+(yMaxExtend-yMinExtend)) ,(xMaxExtend+(xMaxExtend-xMinExtend),yMinExtend) 锐角顶点的直角三角形。
        return new DelaunayTriangle(new Site(xMinExtend, yMinExtend), new Site(xMinExtend, 2 * yMaxExtend - yMinExtend), new Site(2 * xMaxExtend - xMinExtend, yMinExtend));
    }

    //根据点集构造Delaunay三角形网
    private static List<DelaunayTriangle> bulidDelaunayTriangles(DelaunayTriangle motherTriangle, Collection<Site> sites) {
        // 初始化Delaunay三角形网
        List<DelaunayTriangle> allTriangle = new ArrayList<>();
        allTriangle.add(motherTriangle);

        // 向三角网中依次打点
        sites.forEach(e -> {
            //添加到受影响的三角形链表
            List<DelaunayTriangle> influenedTriangles = allTriangle.parallelStream().filter(f -> f.isInCircumcircle(e)).collect(Collectors.toList());

            //移除受影响的三角形
            allTriangle.removeAll(influenedTriangles);

            // 受影响三角形为1，直接生成3个三角形
            if (influenedTriangles.size() == 1) {
                allTriangle.addAll(influenedTriangles.get(0).produceNewDelaunayTriangles(e));

            } else {
                //查找受影响三角形的公共边
                Set<Edge> commonEdges = findCommonEdges(influenedTriangles);

                //从受影响的三角形链表中，形成新的三角形链表
                List<DelaunayTriangle> newTriangles = influenedTriangles.stream().flatMap(f -> f.produceNewDelaunayTriangles(e).stream()).distinct().collect(Collectors.toList());

                //将受影响三角形中的公共边所在的新形成的三角形排除
                newTriangles.removeIf(g -> g.containEdges(commonEdges));

                //对新形成的三角形进行局部优化,并将优化后的新形成的三角形添加到三角形链表中
                Set<DelaunayTriangle> triangles = LOP(newTriangles);
                allTriangle.addAll(triangles);
            }
        });

        return allTriangle;
    }

    //对新形成的三角形进行局部优化
    private static Set<DelaunayTriangle> LOP(List<DelaunayTriangle> triangles) {
        //拷贝新形成的三角
        Set<DelaunayTriangle> resultTriList = new HashSet<>(triangles);

        for (int i = 0; i < triangles.size(); i++) {
            DelaunayTriangle triangle1 = triangles.get(i);
            for (int j = i + 1; j < triangles.size(); j++) {
                DelaunayTriangle triangle2 = triangles.get(j);
                //形成两个新的三角形
                List<DelaunayTriangle> newTriangles = DelaunayTriangle.adjustDiagonal(triangle1, triangle2);
                //是否返回新三角形
                if (newTriangles.size() == 2) {
                    //移除需要调整的三角形
                    resultTriList.remove(triangle1);
                    resultTriList.remove(triangle2);

                    //形成两个新的三角形
                    resultTriList.addAll(newTriangles);
                }
            }
        }
        return resultTriList;
    }

    //找出受影响的三角形的公共边
    private static Set<Edge> findCommonEdges(List<DelaunayTriangle> influenedTriangles) {
        Set<Edge> commonEdges = new HashSet<>();
        Edge tmpEdge;
        for (int i = 0; i < influenedTriangles.size(); i++) {
            for (int j = i + 1; j < influenedTriangles.size(); j++) {
                tmpEdge = DelaunayTriangle.findCommonEdge(influenedTriangles.get(i), influenedTriangles.get(j));
                if (tmpEdge != null) {
                    commonEdges.add(tmpEdge);
                }
            }
        }
        return commonEdges;
    }

    //生成泰森多边形
    private static List<ThiessenPolygon> produceThiessenPolygon(List<DelaunayTriangle> triangles) {
        // 顶点到边的映射，边到三角的映射
        Map<Site, Map<Edge, List<DelaunayTriangle>>> site2Edges2Triangles = new HashMap<>();

        triangles.forEach(e -> {
            e.findEagesByVertex(e.getSite1()).forEach(f -> site2Edges2Triangles.computeIfAbsent(e.getSite1(), k -> new HashMap<>()).computeIfAbsent(f, k -> new ArrayList<>()).add(e));

            e.findEagesByVertex(e.getSite2()).forEach(f -> site2Edges2Triangles.computeIfAbsent(e.getSite2(), k -> new HashMap<>()).computeIfAbsent(f, k -> new ArrayList<>()).add(e));

            e.findEagesByVertex(e.getSite3()).forEach(f -> site2Edges2Triangles.computeIfAbsent(e.getSite3(), k -> new HashMap<>()).computeIfAbsent(f, k -> new ArrayList<>()).add(e));
        });

        return site2Edges2Triangles.entrySet().stream().map(e -> new ThiessenPolygon(e.getKey(), e.getValue().entrySet().stream().map(f -> {
            if (f.getValue().size() == 1) {
                return f.getValue().get(0).produceRayEdge(f.getKey());
            } else {
                return DelaunayTriangle.createCircumcircleLigature(f.getValue().get(0), f.getValue().get(1));
            }
        }).collect(Collectors.toList()))).collect(Collectors.toList());
    }
}

