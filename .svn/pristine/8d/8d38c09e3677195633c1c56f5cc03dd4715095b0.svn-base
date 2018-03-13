package com.hgicreate.rno.mrorigin.record;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by chen.c10 on 2016/12/02.
 * 采样点记录
 */
public class ObjRecord {
    private ObjCountRecord objCountRecord = new ObjCountRecord();
    private Map<String, VRecord> ncToRecord = new HashMap<>();
    private Map<String, NcRecord> ncells;

    ObjRecord(Map<String, NcRecord> ncells) {
        this.ncells = ncells;
    }

    public void holdLine(String ncKey, int scRsrp, int ncRsrp) {
        int diff = ncRsrp - scRsrp;
        ncToRecord.computeIfAbsent(ncKey.intern(), k -> new VRecord(scRsrp, ncRsrp, diff)).update(scRsrp, ncRsrp, diff);
        ncells.computeIfAbsent(ncKey.intern(), k -> new NcRecord()).addDiff(diff);
    }

    public void updateScAoa(int scAoa) {
        objCountRecord.updateScAoa(scAoa);
    }

    private void statistics() {
        ncToRecord.forEach((k, v) -> {
            ncells.get(k).addFilteredDiff(v.getDiff());
            objCountRecord.handleValue(v.getScRsrp(), v.getDiff());
        });
    }

    ObjCountRecord fileEnd() {
        statistics();
        return objCountRecord;
    }

    void clear() {
        ncells = null;
        ncToRecord.clear();
        ncToRecord = null;
        objCountRecord = null;
    }
}
