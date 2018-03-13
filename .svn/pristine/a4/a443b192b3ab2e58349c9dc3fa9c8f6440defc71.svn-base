package com.hgicreate.rno.lte.shape.tool;

import com.hgicreate.rno.lte.shape.model.GisCell;

/**
 * Created by chen.c10 on 2016/11/18.
 * 生成图形
 */
public class CellShapeProcessorFactory {
    private static final double defAngle = 45;
//    private static final double defOutdoorRadius = 80;
//    private static final double defIndoorRadius = 15;

    public static CellShapeProcessor createProcessorWithRadius(double outdoorRadius, double indoorRadius) {
        return new CellShapeProcessor(defAngle, outdoorRadius, indoorRadius);
    }

    public static class CellShapeProcessor {
        // 每度到米的映射
        private static final double RADIAN_UNIT = 111110;

        // 扇形张角，度
        double angle;
        // 室外小区，扇形半径，米
        double outdoorRadius;
        // 室内小区，圆形半径，米
        double indoorRadius;

        // 角度的弧度值。
        double rAngle;
        // 三角形的半径,弧度值
        double tRadius;

        private CellShapeProcessor(double angle, double outdoorRadius, double indoorRadius) {
            this.angle = angle;
            this.outdoorRadius = outdoorRadius;
            this.indoorRadius = indoorRadius;

            this.rAngle = Math.toRadians(angle);
            this.tRadius = outdoorRadius / RADIAN_UNIT * 2 / Math.cos(rAngle / 2);
        }

        public void buildSector(GisCell cell) {
            double lon = cell.getLon();
            double lat = cell.getLat();
            // 角度转弧度，很关键。Math.sin 等三角函数都是用弧度值
            double azimuth = cell.getAzimuth() * 2 * Math.PI / 360;

            double sAngle = (azimuth - rAngle / 2);
            double sx = lon + tRadius * Math.sin(sAngle);
            double sy = lat + tRadius * Math.cos(sAngle);

            double eAngle = (azimuth + rAngle / 2);
            double ex = lon + tRadius * Math.sin(eAngle);
            double ey = lat + tRadius * Math.cos(eAngle);

            cell.setRadius(outdoorRadius);
            cell.setSx(sx);
            cell.setSy(sy);
            cell.setEx(ex);
            cell.setEy(ey);
        }

        public void buildCircle(GisCell cell) {
            cell.setRadius(indoorRadius);
        }
    }
}
