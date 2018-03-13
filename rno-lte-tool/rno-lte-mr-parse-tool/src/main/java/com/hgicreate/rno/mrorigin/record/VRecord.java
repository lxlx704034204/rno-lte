package com.hgicreate.rno.mrorigin.record;

/**
 * Created by chen.c10 on 2016/12/02.
 * 数据记录
 */
class VRecord {
    private int scRsrp;
    private int ncRsrp;
    private int diff;

    int getScRsrp() {
        return scRsrp;
    }

    int getDiff() {
        return diff;
    }

    VRecord(int scRsrp, int ncRsrp, int diff) {
        this.scRsrp = scRsrp;
        this.ncRsrp = ncRsrp;
        this.diff = diff;
    }

    void update(int scRsrp, int ncRsrp, int diff) {
        if (ncRsrp > this.ncRsrp) {
            this.scRsrp = scRsrp;
            this.ncRsrp = ncRsrp;
            this.diff = diff;
        }
    }
}
