package com.hgicreate.rno.mrorigin.record;

/**
 * Created by chen.c10 on 2016/12/02.
 * 采样点记录
 */
class ObjCountRecord {
    // scAoa 取值为0到719的整数，并且最终结果要求取最小值，所以约定大于取值上届的1000表示空。
    private int scAoa = 1000;
    private int scGt105Cnt;
    private int scGt110Cnt;
    private int scGt110NcScGt6Cnt;
    private int scGt110NcScGt10Cnt;
    private int scLe110Cnt;

    int getScAoa() {
        return scAoa;
    }

    int getScGt105Cnt() {
        return scGt105Cnt;
    }

    int getScGt110Cnt() {
        return scGt110Cnt;
    }

    int getScGt110NcScGt6Cnt() {
        return scGt110NcScGt6Cnt;
    }

    int getScGt110NcScGt10Cnt() {
        return scGt110NcScGt10Cnt;
    }

    int getScLe110Cnt() {
        return scLe110Cnt;
    }

    void updateScAoa(int scAoa) {
        // 1000 表示空，用一个判断就可以覆盖，比-1方便
        if (scAoa < this.scAoa) {
            this.scAoa = scAoa;
        }
    }

    void handleValue(int scRsrp, int diff) {
        if (scRsrp > -105) {
            scGt105Cnt++;
        }
        if (scRsrp > -110) {
            scGt110Cnt++;
            if (diff > -6) {
                scGt110NcScGt6Cnt++;
            }
            if (diff > -10) {
                scGt110NcScGt10Cnt++;
            }
        } else {
            scLe110Cnt++;
        }
    }
}
