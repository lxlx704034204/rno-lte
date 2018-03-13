package com.hgicreate.rno.mrorigin.record;

import com.hgicreate.rno.mrorigin.constant.Constant;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by chen.c10 on 2016/12/01.
 * 小区记录
 */
public class CellRecord {
    private String pci;
    private String earfcn;

    private boolean initialized = false;

    private long objNum;
    private long filteredObjNum;

    private long scGt105Gt0Cnt;

    private long scGt110Gt0Cnt;

    private long scGt110Eq1Cnt;
    private long scGt110Eq2Cnt;
    private long scGt110Eq3Cnt;
    private long scGt110Eq4Cnt;
    private long scGt110Eq5Cnt;
    private long scGt110Eq6Cnt;
    private long scGt110Eq7Cnt;
    private long scGt110Eq8Cnt;
    private long scGt110Eq9Cnt;

    private long scLe110Gt0Cnt;

    private long scGt110NcScGt6Gt3Cnt;
    private long scGt110NcScGt6Gt4Cnt;
    private long scGt110NcScGt6Gt5Cnt;
    private long scGt110NcScGt6Gt6Cnt;

    private long scGt110NcScGt10Gt3Cnt;
    private long scGt110NcScGt10Gt4Cnt;
    private long scGt110NcScGt10Gt5Cnt;
    private long scGt110NcScGt10Gt6Cnt;

    private AoaProjection aoaProjection = new AoaProjection();

    private Map<String, NcRecord> ncells = new HashMap<>();
    private Map<String, ObjRecord> currentObjects = new HashMap<>();

    public void setPci(String pci) {
        this.pci = pci;
    }

    public void setEarfcn(String earfcn) {
        this.earfcn = earfcn;
    }

    public boolean isInitialized() {
        return initialized;
    }

    public void setInitialized() {
        this.initialized = true;
    }

    private void incrementScGt110NcScGt6Gt3Cnt() {
        ++scGt110NcScGt6Gt3Cnt;
    }

    private void incrementScGt110NcScGt6Gt4Cnt() {
        ++scGt110NcScGt6Gt4Cnt;
        incrementScGt110NcScGt6Gt3Cnt();
    }

    private void incrementScGt110NcScGt6Gt5Cnt() {
        ++scGt110NcScGt6Gt5Cnt;
        incrementScGt110NcScGt6Gt4Cnt();
    }

    private void incrementScGt110NcScGt6Gt6Cnt() {
        ++scGt110NcScGt6Gt6Cnt;
        incrementScGt110NcScGt6Gt5Cnt();
    }

    private void incrementScGt110NcScGt10Gt3Cnt() {
        ++scGt110NcScGt10Gt3Cnt;
    }

    private void incrementScGt110NcScGt10Gt4Cnt() {
        ++scGt110NcScGt10Gt4Cnt;
        incrementScGt110NcScGt10Gt3Cnt();
    }

    private void incrementScGt110NcScGt10Gt5Cnt() {
        ++scGt110NcScGt10Gt5Cnt;
        incrementScGt110NcScGt10Gt4Cnt();
    }

    private void incrementScGt110NcScGt10Gt6Cnt() {
        ++scGt110NcScGt10Gt6Cnt;
        incrementScGt110NcScGt10Gt5Cnt();
    }

    public void incrementObjNum() {
        ++objNum;
    }

    public ObjRecord findCurrentObj(String objKey) {
        return currentObjects.computeIfAbsent(objKey.intern(), k -> new ObjRecord(ncells));
    }

    void fileEnd() {
        currentObjects.values().forEach(e -> {
            // 统计总记录数，非线程安全。
            filteredObjNum++;
            // 处理每个obj的记录，非线程安全。
            handleObj(e.fileEnd());
            // 清空该obj
            e.clear();
        });
        currentObjects.clear();
    }

    private void handleObj(ObjCountRecord objCountRecord) {

        if (objCountRecord.getScGt105Cnt() > 0) {
            scGt105Gt0Cnt++;
        }

        if (objCountRecord.getScGt110Cnt() > 0) {
            scGt110Gt0Cnt++;
        }

        switch (objCountRecord.getScGt110Cnt()) {
            case 1:
                scGt110Eq1Cnt++;
            case 2:
                scGt110Eq2Cnt++;
            case 3:
                scGt110Eq3Cnt++;
            case 4:
                scGt110Eq4Cnt++;
            case 5:
                scGt110Eq5Cnt++;
            case 6:
                scGt110Eq6Cnt++;
            case 7:
                scGt110Eq7Cnt++;
            case 8:
                scGt110Eq8Cnt++;
            case 9:
                scGt110Eq9Cnt++;
        }

        if (objCountRecord.getScLe110Cnt() > 0) {
            scLe110Gt0Cnt++;
        }

        if (objCountRecord.getScGt110NcScGt6Cnt() > 6) {
            incrementScGt110NcScGt6Gt6Cnt();
        } else if (objCountRecord.getScGt110NcScGt6Cnt() > 5) {
            incrementScGt110NcScGt6Gt5Cnt();
        } else if (objCountRecord.getScGt110NcScGt6Cnt() > 4) {
            incrementScGt110NcScGt6Gt4Cnt();
        } else if (objCountRecord.getScGt110NcScGt6Cnt() > 3) {
            incrementScGt110NcScGt6Gt3Cnt();
        }

        if (objCountRecord.getScGt110NcScGt10Cnt() > 6) {
            incrementScGt110NcScGt10Gt6Cnt();
        } else if (objCountRecord.getScGt110NcScGt10Cnt() > 5) {
            incrementScGt110NcScGt10Gt5Cnt();
        } else if (objCountRecord.getScGt110NcScGt10Cnt() > 4) {
            incrementScGt110NcScGt10Gt4Cnt();
        } else if (objCountRecord.getScGt110NcScGt10Cnt() > 3) {
            incrementScGt110NcScGt10Gt3Cnt();
        }

        aoaProjection.add(objCountRecord.getScAoa());
    }

    StringBuilder getScNcValue(StringBuilder sb, String cellId) {
        ncells.forEach((k, v) -> {
            sb.append(cellId).append(Constant.RES_SEPARATOR)
                    .append(pci).append(Constant.RES_SEPARATOR)
                    .append(earfcn).append(Constant.RES_SEPARATOR)
                    .append(k).append(Constant.RES_SEPARATOR);
            v.getValue(sb);
            sb.append(objNum).append(Constant.RES_SEPARATOR)
            .append(filteredObjNum).append(Constant.NEW_LINE);
        });
        return sb;
    }

    StringBuilder getScValue(StringBuilder sb) {
        sb.append(filteredObjNum).append(Constant.RES_SEPARATOR)
                .append(scGt105Gt0Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Gt0Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq1Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq2Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq3Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq4Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq5Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq6Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq7Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq8Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110Eq9Cnt).append(Constant.RES_SEPARATOR)
                .append(scLe110Gt0Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt6Gt3Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt6Gt4Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt6Gt5Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt6Gt6Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt10Gt3Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt10Gt4Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt10Gt5Cnt).append(Constant.RES_SEPARATOR)
                .append(scGt110NcScGt10Gt6Cnt).append(Constant.RES_SEPARATOR)
                .append(aoaProjection.calcAngle());
        return sb;
    }

    void clear() {
        currentObjects = null;

        ncells.clear();
        ncells = null;

        aoaProjection = null;
    }

    private class AoaProjection {
        private double xProj = 0;
        private double yProj = 0;
        private boolean empty = true;

        private void add(int aoa) {
            // 过滤空值，约定1000为空
            if (aoa != 1000) {
                if (empty) {
                    empty = false;
                }
                double objAngle = Math.toRadians(aoa / 2.0);
//                xProj += -Math.sin(objAngle);
                xProj += Math.sin(objAngle);
                yProj += Math.cos(objAngle);
            }
        }

        private String calcAngle() {
            if (empty) {
                return "";
            }
            long calcAngle = Math.round(Math.toDegrees(Math.atan2(xProj, yProj)));
            return String.valueOf(calcAngle < 0 ? calcAngle + 360 : calcAngle);
        }
    }
}