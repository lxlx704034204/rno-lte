package com.hgicreate.rno.mrorigin.parser;

import com.hgicreate.rno.mrorigin.constant.Constant;
import com.hgicreate.rno.mrorigin.handler.EnodebHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Created by chen.c10 on 2016/11/28.
 * 解析MR原始文件
 */
public class Parser {
    private static final Logger logger = LoggerFactory.getLogger(Parser.class);

    private Parser() {
    }

    public static Parser newParser() {
        return new Parser();
    }

    public void doParser(String src, String dest) throws Exception {
        AtomicInteger cnt = new AtomicInteger();
        AtomicLong time = new AtomicLong();

        Path destDir = Paths.get(dest);
        Files.createDirectories(destDir);

        Path scNcTmpDir = Files.createTempDirectory(destDir, Constant.SC_NC_TMP_DIR);

        Path scTmpDir = Files.createTempDirectory(destDir, Constant.SC_TMP_DIR);

        handleGroup(src).entrySet().parallelStream().forEach(e -> {
            LocalDateTime start = LocalDateTime.now();

            EnodebHandler.handleEnodeb(e.getKey(), e.getValue(), scNcTmpDir, scTmpDir);
            e.getValue().clear();

            LocalDateTime end = LocalDateTime.now();
            Duration use = Duration.between(start, end);
            logger.info("基站:\t{}\t用时:\t{}\t共完成:\t{}\t总用时:\t{}", e.getKey(), use, cnt.incrementAndGet(), Duration.ofNanos(time.addAndGet(use.getSeconds() * 1000000 + use.getNano())));
        });

        handleResult(destDir, scNcTmpDir, scTmpDir);
    }

    private void handleResult(Path destDir, Path scNcTmpDir, Path scTmpDir) {
        mergeFiles(Paths.get(destDir.toString(), Constant.SC_NC_FILENAME), scNcTmpDir, Constant.SC_NC_TITLE);
        mergeFiles(Paths.get(destDir.toString(), Constant.SC_FILENAME), scTmpDir, Constant.SC_TITLE);
    }

    private void mergeFiles(Path resultFile, Path filesDir, String title) {
        if (Files.isDirectory(filesDir)) {
            try {
                Files.write(resultFile, title.getBytes(), StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.CREATE);
                Files.list(filesDir).filter(e -> !Files.isDirectory(e)).forEach(e -> {
                            try {
                                Files.write(resultFile, Files.readAllBytes(e), StandardOpenOption.APPEND);
                                Files.deleteIfExists(e);
                            } catch (IOException e1) {
                                e1.printStackTrace();
                            }
                        }
                );
                Files.deleteIfExists(filesDir);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private Map<String, List<Path>> handleGroup(String src) {
        if (!Files.isDirectory(Paths.get(src))) {
            return Collections.emptyMap();
        }

        Map<String, List<Path>> pathMap = null;
        try {
            pathMap = Files.walk(Paths.get(src)).filter(e -> {
                if (Files.isDirectory(e)) {
                    return false;
                }
                String filename = e.getFileName().toString().toUpperCase();
                return !(!(filename.endsWith(".XML") || filename.endsWith(".ZIP") || filename.endsWith(".GZ")) || !filename.contains("_MRO_")) && filename.split(Constant.FILE_NAME_SEPARATOR).length == 6;
            }).collect(Collectors.groupingBy(e -> e.getFileName().toString().split(Constant.FILE_NAME_SEPARATOR)[4]));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null == pathMap ? Collections.emptyMap() : pathMap;
    }
}
