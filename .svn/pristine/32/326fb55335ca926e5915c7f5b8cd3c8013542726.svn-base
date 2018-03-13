package com.hgicreate.rno.lte.shape.tool;

import com.hgicreate.rno.lte.shape.model.GisCell;
import com.hgicreate.rno.lte.shape.voronoi.VoronoiFactory;
import com.hgicreate.rno.lte.shape.voronoi.pojo.Edge;
import com.hgicreate.rno.lte.shape.voronoi.pojo.Site;
import com.hgicreate.rno.lte.shape.voronoi.pojo.ThiessenPolygon;
import com.hgicreate.rno.lte.shape.voronoi.pojo.Voronoi;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by chen.c10 on 2016/12/14.
 * 站间距工具
 */
public class StationSpacingTool {

    public static void stationSpacingProcessor(List<GisCell> cells, double similarDis) {
        Map<Site, List<GisCell>> similarSite2Cells = StationSpacingTool.mergeSimilarCell(cells, similarDis);
        Voronoi voronoi = StationSpacingTool.createVoronoi(similarSite2Cells);
        StationSpacingTool.calcStationSpacing(voronoi.getThiessenPolygons(), similarSite2Cells);
    }

    private static Map<Site, List<GisCell>> mergeSimilarCell(List<GisCell> cells, double similarDis) {
        Map<Site, List<GisCell>> similarSite2Cells = new HashMap<>();

        cells.stream().sorted(Comparator.comparing(GisCell::getLon).thenComparing(GisCell::getLat)).forEach(e -> {
            Site site = Site.lonLat2MercatorSite(e.getLon(), e.getLat());
            Optional<Site> siteOptional = similarSite2Cells.keySet().parallelStream().filter(f -> Site.distance(f, site) < similarDis).sorted(Comparator.comparing(f -> Site.distance(f, site))).findFirst();
            if (siteOptional.isPresent()) {
                similarSite2Cells.get(siteOptional.get()).add(e);
            } else {
                similarSite2Cells.computeIfAbsent(site, k -> new ArrayList<>()).add(e);
            }
        });

        return similarSite2Cells;
    }

    private static Voronoi createVoronoi(Map<Site, List<GisCell>> similarSite2Cells) {
        List<Site> sites = similarSite2Cells.keySet().stream().sorted(Comparator.comparing(Site::getX).thenComparing(Site::getY)).collect(Collectors.toList());

        return VoronoiFactory.createVoronoi(sites);
    }

    private static void calcStationSpacing(List<ThiessenPolygon> thiessenPolygons, Map<Site, List<GisCell>> similarSite2Cells) {
        thiessenPolygons.forEach(e -> {
            // double[]保存3个值，分别是A点与站点夹角，中点与站点夹角，B点与站点夹角。所有角度都用方位角的定义方式，即，向北为0度，顺时针为正。
            // 取一条线段的两个端点和中点与站点的角度，因为切面张角为120度，只要这三个点有一个在张角的范围内，说明该线段与张角相切。
            Map<Edge, double[]> edgeMap = new HashMap<>();
            e.getEdges().forEach(f -> {
                // A B的角度已处理为正。
                double angleA = e.getSample().direction(f.getA());
                double angleB = e.getSample().direction(f.getB());

                // 不可能出现负值，不用做小于0判断。
                double angleM = (angleA + angleB) / 2;
                // 两角之差的绝对值大于180度，说明锐角跨越了0度。
                if (Math.abs(angleA - angleB) > 180) {
                    angleM = angleM + 180;
                }
                // 有可能大于360度
                angleM = angleM >= 360 ? angleM - 360 : angleM;

                edgeMap.put(f, new double[]{angleA, angleM, angleB});
            });

            similarSite2Cells.get(e.getSample()).forEach(f -> {
                double azimuth = f.getAzimuth();
                double sAngleT = azimuth - 60;
                double sAngle = sAngleT < 0 ? sAngleT + 360 : sAngleT;
                double eAngleT = azimuth + 60;
                double eAngle = eAngleT >= 360 ? eAngleT - 360 : eAngleT;

                Set<Edge> cutEdges = new HashSet<>();
                edgeMap.forEach((k, v) -> {
                    // 判断线段是否在张角内，如果张角跨越0度，要对两边分别处理
                    if (sAngle > eAngle) {
                        if (((v[0] >= 0 && v[0] <= sAngle) || (v[0] >= eAngle && v[0] <= 360)) || ((v[1] >= 0 && v[1] <= sAngle) || (v[1] >= eAngle && v[1] <= 360)) || ((v[2] >= 0 && v[2] <= sAngle) || (v[2] >= eAngle && v[2] <= 360))) {
                            cutEdges.add(k);
                        }
                    } else {
                        if ((v[0] >= sAngle && v[0] <= eAngle) || (v[1] >= sAngle && v[1] <= eAngle) || (v[2] >= sAngle && v[2] <= eAngle)) {
                            cutEdges.add(k);
                        }
                    }
                });
                double dis = Math.round(cutEdges.stream().mapToDouble(g -> Edge.distance(g, e.getSample())).summaryStatistics().getAverage());
                f.setStationSpace(dis > 5000 ? 5000 : dis);
            });
        });
    }
}
