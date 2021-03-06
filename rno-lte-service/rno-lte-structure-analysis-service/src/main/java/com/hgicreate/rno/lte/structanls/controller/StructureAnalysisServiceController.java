package com.hgicreate.rno.lte.structanls.controller;

import com.hgicreate.rno.lte.structanls.model.*;
import com.hgicreate.rno.lte.structanls.service.CommonRestService;
import com.hgicreate.rno.lte.structanls.service.StructAnlsRestService;
import com.hgicreate.rno.lte.structanls.service.StructAnlsSparkService;
import com.hgicreate.rno.lte.structanls.task.JobExecutor;
import com.hgicreate.rno.lte.structanls.tool.ZipFileHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@CrossOrigin
@RestController
public class StructureAnalysisServiceController {

    private final CommonRestService commonRestService;

    private final StructAnlsRestService structAnlsRestService;

    private final StructAnlsSparkService structAnlsSparkService;

    private final JobExecutor jobExecutor;
    @Value("${rno.run-mode:always}")
    private String runMode;
    @Value("${rno.job-type-code:RNO_LTE_STRUCT_ANLS}")
    private String jobTypeCode;

    public StructureAnalysisServiceController(CommonRestService commonRestService, StructAnlsRestService structAnlsRestService, StructAnlsSparkService structAnlsSparkService, JobExecutor jobExecutor) {
        this.commonRestService = commonRestService;
        this.structAnlsRestService = structAnlsRestService;
        this.structAnlsSparkService = structAnlsSparkService;
        this.jobExecutor = jobExecutor;
    }

    /**
     * 立即开始任务
     */
    @GetMapping("/startTask/{jobId}")
    public SubmitResult startTask(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:startTask.jobId={}", jobId);
        String msg;
        SubmitResult submitResult = new SubmitResult();
        submitResult.setFlag(false);
        try {
            // 如果运行模式是定时模式，文件上传成功后就直接结束
            if (runMode.equals("always")) {
                log.debug("运行模式是 always 模式，直接执行任务。jobId={}", jobId);
                Job job = commonRestService.getJobByJobId(jobId);
                if (null != job && job.getJobId() > 0) {
                    new Thread(() -> jobExecutor.runJobInternal(job.getJobId())).start();
                    submitResult.setFlag(true);
                    msg = "任务已经启动，请耐心等待。。。";
                    log.debug(msg);
                } else {
                    msg = "任务信息有误，无法启动任务。";
                    log.error(msg);
                }
            } else {
                submitResult.setFlag(true);
                msg = "任务非及时模式，请耐心等待。。。";
                log.debug(msg);
            }
        } catch (Exception e) {
            e.printStackTrace();
            msg = "启动任务失败！";
            log.error(msg);
        }
        submitResult.setResult(msg);
        log.debug("退出方法：startTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 下载结果文件
     */
    @RequestMapping("/downloadResultFile/{jobId}")
    @ResponseBody
    public FileResult downloadResultFile(@PathVariable("jobId") long jobId) {
        log.info("进入方法：downloadResultFile，下载LTE结构优化结果文件， jobId=" + jobId);

        String msg = "未知错误";
        FileResult fileResult = new FileResult();
        fileResult.setResult(false);
        fileResult.setStatusCode(HttpStatus.NOT_FOUND.value());

        if (jobId <= 0) {
            msg = "任务ID不存在";
            log.error(msg);
            fileResult.setMsg(msg);
            return fileResult;
        }

        try {
            // 确定临时目录存在
            Path downloadPath = Paths.get(System.getProperty("java.io.tmpdir"), "download");
            Files.createDirectories(downloadPath);
            Path tmpDir = Files.createTempDirectory(downloadPath, "structure_");

            StructAnlsTask record = structAnlsRestService.queryTaskRecordByJobId(jobId);
            log.debug("LTE结构优化分析的数据信息：" + record);
            if (record == null) {
                msg = "不存在该" + jobId + "任务信息";
                log.error(msg);
                fileResult.setMsg(msg);
                return fileResult;
            }

            String cityName = record.getArea().getName();

            // 指标文件集合
            List<Path> files = new ArrayList<>();

            // 重叠覆盖部分
            // 获取结果
            List<OverlapCover> overlapCovers = structAnlsRestService.queryOverlapCoversByJobId(jobId);

            //结果为空，无法提供下载
            if (!overlapCovers.isEmpty()) {
                // 生成临时文件
                Path overlapCoverFile = Paths.get(tmpDir.toString(), cityName + "_重叠覆盖.csv");
                Files.createFile(overlapCoverFile);
                // 生成文件
                try (BufferedWriter writer = Files.newBufferedWriter(overlapCoverFile, Charset.forName("GBK"), StandardOpenOption.TRUNCATE_EXISTING)) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("城市").append(",")
                            .append("DATATYPE").append(",")
                            .append("CELLID").append(",")
                            .append("总采样点数").append(",")
                            .append("大于负105dBm的采样点数").append(",")
                            .append("大于负110dBm的采样点数").append(",")
                            .append("覆盖率大于负105dBm").append(",")
                            .append("覆盖率大于负110dBm").append(",")
                            .append("db6内3邻区采样数").append(",")
                            .append("db6内4邻区采样数").append(",")
                            .append("db6内5邻区采样数").append(",")
                            .append("db6内6邻区采样数").append(",")
                            .append("db10内3邻区采样数").append(",")
                            .append("db10内4邻区采样数").append(",")
                            .append("db10内5邻区采样数").append(",")
                            .append("db10内6邻区采样数").append(",")
                            .append("db6内3邻区采样比例").append(",")
                            .append("db6内4邻区采样比例").append(",")
                            .append("db6内5邻区采样比例").append(",")
                            .append("db6内6邻区采样比例").append(",")
                            .append("db10内3邻区采样比例").append(",")
                            .append("db10内4邻区采样比例").append(",")
                            .append("db10内5邻区采样比例").append(",")
                            .append("db10内6邻区采样比例").append(",")
                            .append("无邻区采样点数").append(",")
                            .append("邻区1个及以上采样数").append(",")
                            .append("邻区2个及以上采样数").append(",")
                            .append("邻区3个及以上采样数").append(",")
                            .append("邻区4个及以上采样数").append(",")
                            .append("邻区5个及以上采样数").append(",")
                            .append("邻区6个及以上采样数").append(",")
                            .append("邻区7个及以上采样数").append(",")
                            .append("邻区8个及以上采样数").append(",")
                            .append("邻区9个及以上采样数");
                    writer.write(sb.toString());
                    writer.newLine();
                    overlapCovers.forEach(e -> {
                                sb.setLength(0);
                                sb.append(cityName).append(",")
                                        .append("仅同频").append(",")
                                        .append(e.getCellId()).append(",")
                                        .append(filterNumber(e.getTotalCnt())).append(",")
                                        .append(filterNumber(e.getScGt105Gt0Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Gt0Cnt())).append(",")
                                        .append(filterNumber(e.getScGt105Gt0Per())).append(",")
                                        .append(filterNumber(e.getScGt110Gt0Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt3Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt4Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt5Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt6Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt3Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt4Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt5Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt6Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt3Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt4Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt5Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt6Gt6Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt3Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt4Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt5Per())).append(",")
                                        .append(filterNumber(e.getScGt110NcScGt10Gt6Per())).append(",")
                                        .append(0).append(",")
                                        .append(filterNumber(e.getScGt110Eq1Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq2Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq3Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq4Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq5Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq6Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq7Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq8Cnt())).append(",")
                                        .append(filterNumber(e.getScGt110Eq9Cnt()));
                                try {
                                    writer.write(sb.toString());
                                    writer.newLine();
                                } catch (IOException e1) {
                                    e1.printStackTrace();
                                }
                            }
                    );
                    writer.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                //文件不存在，不能提供下载
                if (!Files.exists(overlapCoverFile)) {
                    msg = "重叠覆盖的结果文件不存在！";
                    log.error(msg);
                } else {
                    msg = "重叠覆盖的结果文件完成！";
                    log.info(msg);
                    files.add(overlapCoverFile);
                }
            } else {
                msg = jobId + " 重叠覆盖的结果数据不存在！";
                log.error(msg);
            }

            // 过覆盖部分
            // 获取结果
            List<OverCover> overCovers = structAnlsSparkService.queryOverCoverResultByJobId(jobId);

            //结果为空，无法提供下载
            if (!overCovers.isEmpty()) {
                // 生成临时文件
                Path overCoverFile = Paths.get(tmpDir.toString(), cityName + "_过覆盖.csv");
                Files.createFile(overCoverFile);
                // 生成文件
                try (BufferedWriter writer = Files.newBufferedWriter(overCoverFile, Charset.forName("GBK"), StandardOpenOption.TRUNCATE_EXISTING)) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("城市").append(",").append("CELLID").append(",").append("小区名")
                            .append(",").append("小区PCI").append(",").append("小区频点")
                            .append(",").append("小区经度").append(",").append("小区纬度")
                            .append(",").append("邻区ID").append(",").append("邻区名")
                            .append(",").append("邻区PCI").append(",").append("邻区频点")
                            .append(",").append("邻区经度").append(",").append("邻区纬度")
                            .append(",").append("总采样点数").append(",").append("邻区采样点数").append(",").append("采样比例")
                            .append(",").append("距离").append(",").append("理想覆盖距离");
                    writer.write(sb.toString());
                    writer.newLine();
                    overCovers.forEach(e -> {
                                sb.setLength(0);
                                sb.append(cityName).append(",")
                                        .append(e.getCellId()).append(",")
                                        .append(e.getCellName()).append(",")
                                        .append(e.getCellPci()).append(",")
                                        .append(e.getCellEarfcn()).append(",")
                                        .append(e.getCellLon()).append(",")
                                        .append(e.getCellLat()).append(",")
                                        .append(e.getNcellId()).append(",")
                                        .append(e.getNcellName()).append(",")
                                        .append(e.getNcellPci()).append(",")
                                        .append(e.getNcellEarfcn()).append(",")
                                        .append(e.getNcellLon()).append(",")
                                        .append(e.getNcellLat()).append(",")
                                        .append(e.getTotalCnt()).append(",")
                                        .append(e.getNcellCnt()).append(",")
                                        .append(e.getNcellPer()).append(",")
                                        .append(e.getDis()).append(",")
                                        .append(e.getStationSpace());
                                try {
                                    writer.write(sb.toString());
                                    writer.newLine();
                                } catch (IOException e1) {
                                    e1.printStackTrace();
                                }
                            }
                    );
                    writer.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                //文件不存在，不能提供下载
                if (!Files.exists(overCoverFile)) {
                    msg = "过覆盖的结果文件不存在！";
                    log.error(msg);
                } else {
                    msg = "过覆盖的结果文件完成！";
                    log.info(msg);
                    files.add(overCoverFile);
                }
            } else {
                msg = jobId + " 过覆盖的结果数据不存在！";
                log.error(msg);
            }

            // 指标汇总部分
            // 获取结果
            List<MetricsSummary> metricsSummaries = structAnlsRestService.queryMetricsSummariesByJobId(jobId);

            //结果为空，无法提供下载
            if (!metricsSummaries.isEmpty()) {
                // 生成临时文件
                Path metricsSummaryFile = Paths.get(tmpDir.toString(), cityName + "_指标汇总.csv");
                Files.createFile(metricsSummaryFile);
                // 生成文件
                try (BufferedWriter writer = Files.newBufferedWriter(metricsSummaryFile, Charset.forName("GBK"), StandardOpenOption.TRUNCATE_EXISTING)) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("城市").append(",").append("CELLID").append(",").append("小区名")
                            .append(",").append("弱覆盖").append(",").append("重叠覆盖")
                            .append(",").append("过覆盖").append(",").append("过覆盖数")
                            .append(",").append("1.6过覆盖").append(",").append("1.6过覆盖数");
                    writer.write(sb.toString());
                    writer.newLine();
                    metricsSummaries.forEach(e -> {
                                sb.setLength(0);
                                sb.append(cityName).append(",")
                                        .append(e.getCellId()).append(",")
                                        .append(e.getCellName()).append(",")
                                        .append(e.getWeakFlag()).append(",")
                                        .append(e.getOverlapFlag()).append(",")
                                        .append(e.getOverFlag()).append(",")
                                        .append(e.getOverCnt()).append(",")
                                        .append(e.getOver16Flag()).append(",")
                                        .append(e.getOver16Cnt());
                                try {
                                    writer.write(sb.toString());
                                    writer.newLine();
                                } catch (IOException e1) {
                                    e1.printStackTrace();
                                }
                            }
                    );
                    writer.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                }

                //文件不存在，不能提供下载
                if (!Files.exists(metricsSummaryFile)) {
                    msg = "指标汇总的结果文件不存在！";
                    log.error(msg);
                } else {
                    msg = "指标汇总的结果文件完成！";
                    log.info(msg);
                    files.add(metricsSummaryFile);
                }
            } else {
                msg = jobId + " 指标汇总的结果数据不存在！";
                log.error(msg);
            }

            // 压缩文件
            Path currentFile = Paths.get(tmpDir.toString(), record.getDlFileName());
            // 如果本地存在同名文件则删除
            Files.deleteIfExists(currentFile);
            // 生成压缩文件
            if (files.size() > 0) {
                ZipFileHandler.zip(currentFile, files.toArray(new Path[0]));
            }

            if (Files.exists(currentFile)) {
                msg = "文件下载成功。";
                log.debug(msg);
                fileResult.setResult(true);
                fileResult.setMsg(msg);
                fileResult.setStatusCode(HttpStatus.CREATED.value());
                fileResult.setFilename(currentFile.getFileName().toString());

                byte[] fileBody = Files.readAllBytes(currentFile);
                fileResult.setFileBody(fileBody);
                fileResult.setFileLength(fileBody.length);
                return fileResult;
            } else {
                //文件不存在，不能提供下载
                msg = "结构优化结果文件不存在！";
                log.error(msg);
                fileResult.setMsg(msg);
                return fileResult;
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error(msg);
            fileResult.setMsg(msg);
            return fileResult;
        }
    }

    private Object filterNumber(Object num) {
        return Objects.equals(num, -1) ? "" : num;
    }
}
