package com.hgicreate.rno.mrorigin.handler;

import com.hgicreate.rno.mrorigin.record.EnodebRecord;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Collection;

/**
 * Created by chen.c10 on 2016/11/28.
 * 解析MR原始文件
 */
public class EnodebHandler {

    public static void handleEnodeb(String enodebId, Collection<Path> paths, Path scNcTmpDir, Path scTmpDir) {
        EnodebRecord enodebRecord = EnodebRecord.newEnodebRecord();

        paths.forEach(enodebRecord::readFile);

        enodebRecord.statistics();

        saveToFile(Paths.get(scNcTmpDir.toString(), enodebId), enodebRecord.getScNcResult());

        saveToFile(Paths.get(scTmpDir.toString(), enodebId), enodebRecord.getScResult());

        enodebRecord.clear();
    }

    private static void saveToFile(Path dest, String result) {
        try {
            Files.write(dest, result.getBytes(), StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.CREATE);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
