package com.hgicreate.rno.mrorigin.handler;

import com.hgicreate.rno.mrorigin.constant.Constant;
import com.hgicreate.rno.mrorigin.record.CellRecord;
import com.hgicreate.rno.mrorigin.record.EnodebRecord;
import com.hgicreate.rno.mrorigin.record.ObjRecord;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Enumeration;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 * Created by chen.c10 on 2016/12/01.
 * 文件处理类
 */
public class FileHandler {
    private int scPciIndex;
    private int scEarfcnIndex;
    private int scRsrpIndex;
    private int scAoaIndex;
    private int ncPciIndex;
    private int ncEarfcnIndex;
    private int ncRsrpIndex;

    private boolean objEmpty = true;
    private StringBuilder sb = new StringBuilder();
    private EnodebRecord enodebRecord;
    private CellRecord currentCell;
    private ObjRecord currentStructObj;

    private FileHandler(EnodebRecord enodebRecord) {
        this.enodebRecord = enodebRecord;
    }

    public static FileHandler newFileHandler(EnodebRecord enodebRecord) {
        return new FileHandler(enodebRecord);
    }

    public void readFile(Path filePath) {
        if (filePath.endsWith(".xml")) {
            readXmlFile(filePath);
        } else if (filePath.endsWith(".zip")) {
            readZipFile(filePath);
        } else {
            readGzipFile(filePath);
        }
    }

    private void readXmlFile(Path filePath) {
        try {
            readInputStream(Files.newInputStream(filePath));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void readZipFile(Path filePath) {
        try (ZipFile zf = new ZipFile(filePath.toFile())) {
            Enumeration<? extends ZipEntry> e = zf.entries();
            ZipEntry ze;
            while (e.hasMoreElements()) {
                ze = e.nextElement();
                if (!ze.isDirectory() && ze.getSize() > 0) {
                    readInputStream(zf.getInputStream(ze));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void readGzipFile(Path filePath) {
        try {
            readInputStream(new GZIPInputStream(Files.newInputStream(filePath)));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void readInputStream(InputStream is) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            if (br.lines().map(String::trim).filter(e -> !e.isEmpty()).allMatch(this::line)) {
                System.out.println("空文件。");
            }
        }
    }

    private boolean line(String line) {
        // 按照出现频率排列
        if (line.startsWith(Constant.V_FLAG)) {
            v(line);
        } else if (line.startsWith(Constant.OBJ_START_FLAG)) {
            object(line);
        } else if (line.startsWith(Constant.OBJ_END_FLAG)) {
            objectEnd();
        }
//        else if (line.startsWith(Constant.FILE_HEADER_FLAG)) {
//            fileHeader(line);
//        }
        else if (line.startsWith(Constant.SMR_FLAG)) {
            return smr(line);
        } else if (line.startsWith(Constant.MEA_END_FLAG)) {
            measurementEnd();
            return false;
        }
        return true;
    }

//    private void fileHeader(String fileHeader) {
//        beginIndex = fileHeader.indexOf(Constant.START_TIME_FLAG) + Constant.START_TIME_FLAG.length();
//        startTime = fileHeader.substring(beginIndex, fileHeader.indexOf(Constant.INDEX_END_FLAG, beginIndex)).intern();
//        startDate = startTime.split(Constant.DATE_TIME_SPLITER)[0].intern();
//        //TODO 不需要以天为粒度出数据。不对时间进行处理。
//    }

    private boolean smr(String smr) {
        String[] cols = smr.substring(smr.indexOf(Constant.CONTENT_START_FLAG) + 1, smr.lastIndexOf(Constant.CONTENT_END_FLAG)).intern().split(Constant.V_SEPARATOR);
        if (cols.length > 6) {
            for (int i = 0; i < cols.length; i++) {
                findCol(i, cols[i]);
            }
            return true;
        }
        return false;
    }

    private void findCol(int index, String col) {
        switch (col) {
            case Constant.SC_PCI_FLAG:
                scPciIndex = index;
                break;
            case Constant.SC_EARFCN_FLAG:
                scEarfcnIndex = index;
                break;
            case Constant.SC_RSRP_FLAG:
                scRsrpIndex = index;
                break;
            case Constant.SC_AOA_FLAG:
                scAoaIndex = index;
                break;
            case Constant.NC_PCI_FLAG:
                ncPciIndex = index;
                break;
            case Constant.NC_EARFCN_FLAG:
                ncEarfcnIndex = index;
                break;
            case Constant.NC_RSRP_FLAG:
                ncRsrpIndex = index;
        }
    }

    private void object(String object) {
        // 进入一个新obj，为空标记置1
        objEmpty = true;

        int beginIndex = object.indexOf(Constant.OBJ_ID_FLAG) + Constant.OBJ_ID_FLAG.length();
        String objectId = object.substring(beginIndex, object.indexOf(Constant.INDEX_END_FLAG, beginIndex)).intern();

        // 如果objId 类似 169108225:38400:2的格式，说明第一个有效measurement不存在，跳过该文件。
        if (objectId.contains(Constant.OBJ_SEPARATOR_1) || objectId.contains(Constant.OBJ_SEPARATOR_2)) {
            String[] os = objectId.split(Constant.OBJ_SEPARATOR_2)[0].split(Constant.OBJ_SEPARATOR_1);
            sb.setLength(0);
            sb.append(os[0].intern()).append(Constant.CELL_SEPARATOR).append(os[1].intern());
        } else {
            sb.setLength(0);
            sb.append(Long.parseLong(objectId) / 256).append(Constant.CELL_SEPARATOR).append(Long.parseLong(objectId) % 256);
        }
        currentCell = enodebRecord.findCurrentCell(sb.toString().intern());

        sb.setLength(0);
        beginIndex = object.indexOf(Constant.OBJ_TIMESTAMP_FLAG) + Constant.OBJ_TIMESTAMP_FLAG.length();
        sb.append(object.substring(beginIndex, object.indexOf(Constant.INDEX_END_FLAG, beginIndex)).intern()).append(Constant.RES_SEPARATOR);

        beginIndex = object.indexOf(Constant.OBJ_MMEUES1APID_FLAG) + Constant.OBJ_MMEUES1APID_FLAG.length();
        sb.append(object.substring(beginIndex, object.indexOf(Constant.INDEX_END_FLAG, beginIndex)).intern()).append(Constant.RES_SEPARATOR);

        beginIndex = object.indexOf(Constant.OBJ_MMECODE_FLAG) + Constant.OBJ_MMECODE_FLAG.length();
        sb.append(object.substring(beginIndex, object.indexOf(Constant.INDEX_END_FLAG, beginIndex)).intern());

        currentStructObj = currentCell.findCurrentObj(sb.toString());
    }

    private void objectEnd() {
        // 如果obj 非空 计数器加1
        if (!objEmpty) {
            currentCell.incrementObjNum();
        }
    }

    private void v(String v) {

        // 进入v obj为空标识置0
        if (objEmpty) {
            objEmpty = false;
        }

        String[] vs = v.substring(v.indexOf(Constant.CONTENT_START_FLAG) + 1, v.lastIndexOf(Constant.CONTENT_END_FLAG)).split(Constant.V_SEPARATOR);

        if (notNull(vs[ncPciIndex]) && notNull(vs[ncEarfcnIndex]) && notNull(vs[scRsrpIndex]) && notNull(vs[ncRsrpIndex])) {

            if (!currentCell.isInitialized()) {
                currentCell.setPci(vs[scPciIndex].intern());
                currentCell.setEarfcn(vs[scEarfcnIndex].intern());
                currentCell.setInitialized();
            }

            sb.setLength(0);
            sb.append(vs[ncPciIndex]).append(Constant.RES_SEPARATOR).append(vs[ncEarfcnIndex]);

            currentStructObj.holdLine(sb.toString().intern(), Integer.valueOf(vs[scRsrpIndex]) - 140, Integer.valueOf(vs[ncRsrpIndex]) - 140);

            if (notNull(vs[scAoaIndex])) {
                currentStructObj.updateScAoa(Integer.valueOf(vs[scAoaIndex]));
            }
        }
    }

    private static boolean notNull(String str) {
        return !Constant.NULL_STR.equals(str);
    }

    private void measurementEnd() {
        enodebRecord.fileEnd();
    }

    public void clear() {
        sb.setLength(0);
        sb = null;
        enodebRecord = null;
        currentCell = null;
        currentStructObj = null;
    }
}
