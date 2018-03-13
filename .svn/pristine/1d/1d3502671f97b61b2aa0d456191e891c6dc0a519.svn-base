package com.hgicreate.rno.mrorigin.record;

import com.hgicreate.rno.mrorigin.constant.Constant;
import com.hgicreate.rno.mrorigin.handler.FileHandler;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by chen.c10 on 2016/12/01.
 * 基站记录
 */
public class EnodebRecord {
    private Map<String, CellRecord> cellToRecord = new HashMap<>();
    private FileHandler fileHandler = FileHandler.newFileHandler(this);

    private String scNcResult;
    private String scResult;

    public String getScNcResult() {
        return scNcResult;
    }

    public String getScResult() {
        return scResult;
    }

    private EnodebRecord() {
    }

    public CellRecord findCurrentCell(String cellId) {
        return cellToRecord.computeIfAbsent(cellId.intern(), k -> new CellRecord());
    }

    public static EnodebRecord newEnodebRecord() {
        return new EnodebRecord();
    }

    public void readFile(Path filePath) {
        fileHandler.readFile(filePath);
    }

    public void fileEnd() {
        cellToRecord.values().forEach(CellRecord::fileEnd);
    }

    public void statistics() {
        StringBuilder sb = new StringBuilder();
        StringBuilder sb2 = new StringBuilder();
        cellToRecord.forEach((a, b) -> {

                    b.getScNcValue(sb2, a);

                    sb.append(a).append(Constant.RES_SEPARATOR);
                    b.getScValue(sb);
                    sb.append(Constant.NEW_LINE);

                    b.clear();
                }
        );
        scResult = sb.toString();
        scNcResult = sb2.toString();
    }

    public void clear() {
        cellToRecord.clear();
        cellToRecord = null;

        fileHandler.clear();
        fileHandler = null;

        scResult = null;
        scNcResult = null;
    }
}