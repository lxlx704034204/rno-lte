package com.hgicreate.rno.mrorigin.record;

import com.hgicreate.rno.mrorigin.constant.Constant;

/**
 * Created by chen.c10 on 2016/12/02.
 * 数据记录
 */
class NcRecord {
    private long totalCnt = 0;
    private long rsrpTimes0 = 0;
    private long rsrpTimes1 = 0;
    private long rsrpTimes2 = 0;
    private long rsrpTimes3 = 0;
    private long filteredTotalCnt = 0;
    private long filteredRsrpTimes1 = 0;

    private void incrementTotalCnt() {
        ++totalCnt;
    }

    private void incrementRsrpTimes0() {
        ++rsrpTimes0;
        incrementTotalCnt();
    }

    private void incrementRsrpTimes1() {
        ++rsrpTimes1;
        incrementRsrpTimes0();
    }

    private void incrementRsrpTimes2() {
        ++rsrpTimes2;
        incrementRsrpTimes1();
    }

    private void incrementRsrpTimes3() {
        ++rsrpTimes3;
        incrementRsrpTimes2();
    }

    private void incrementFilteredTotalCnt() {
        ++filteredTotalCnt;
    }

    private void incrementFilteredRsrpTimes1() {
        ++filteredRsrpTimes1;
        incrementFilteredTotalCnt();
    }

    private void handleDiff(int diff) {
        if (diff > 0) {
            incrementRsrpTimes3();
        } else if (diff > -3) {
            incrementRsrpTimes2();
        } else if (diff > -6) {
            incrementRsrpTimes1();
        } else if (diff > -12) {
            incrementRsrpTimes0();
        } else {
            incrementTotalCnt();
        }
    }

    private void handleFilteredDiff(int diff) {
        if (diff >= -6) {
            incrementFilteredRsrpTimes1();
        } else {
            incrementFilteredTotalCnt();
        }
    }

    StringBuilder getValue(StringBuilder sb) {
        sb.append(totalCnt).append(Constant.RES_SEPARATOR)
                .append(rsrpTimes0).append(Constant.RES_SEPARATOR)
                .append(rsrpTimes1).append(Constant.RES_SEPARATOR)
                .append(rsrpTimes2).append(Constant.RES_SEPARATOR)
                .append(rsrpTimes3).append(Constant.RES_SEPARATOR)
                .append(filteredTotalCnt).append(Constant.RES_SEPARATOR)
                .append(filteredRsrpTimes1).append(Constant.RES_SEPARATOR);
        return sb;
    }

    void addDiff(int diff) {
        handleDiff(diff);
    }

    void addFilteredDiff(int diff) {
        handleFilteredDiff(diff);
    }

}
