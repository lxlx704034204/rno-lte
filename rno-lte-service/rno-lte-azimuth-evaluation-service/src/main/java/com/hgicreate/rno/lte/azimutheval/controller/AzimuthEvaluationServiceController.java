package com.hgicreate.rno.lte.azimutheval.controller;

import com.hgicreate.rno.lte.azimutheval.model.*;
import com.hgicreate.rno.lte.azimutheval.service.AzimuthEvalRestService;
import com.hgicreate.rno.lte.azimutheval.service.CommonRestService;
import com.hgicreate.rno.lte.azimutheval.task.JobExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
public class AzimuthEvaluationServiceController {

    private final CommonRestService commonRestService;

    private final AzimuthEvalRestService azimuthEvalRestService;

    private final JobExecutor jobExecutor;

    @Value("${rno.run-mode:always}")
    private String runMode;

    public AzimuthEvaluationServiceController(CommonRestService commonRestService, AzimuthEvalRestService azimuthEvalRestService, JobExecutor jobExecutor) {
        this.commonRestService = commonRestService;
        this.azimuthEvalRestService = azimuthEvalRestService;
        this.jobExecutor = jobExecutor;
    }

    /**
     * 立即开始任务
     */
    @GetMapping("/startTask/{jobId}")
    public SubmitResult startTask(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:startTask.jobId={}", jobId);
        String msg = "未知错误";
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
            }else {
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
        log.debug("退出方法：submitTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 下载结果文件
     */
    @RequestMapping("/downloadResultFile/{jobId}")
    @ResponseBody
    public FileResult downloadResultFile(@PathVariable("jobId") long jobId) {
        log.info("进入方法：downloadResultFile，下载LTE方位角评估结果文件， jobId=" + jobId);

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

        // 确定临时目录存在
        try {
            // 确定临时目录存在
            Path downloadPath = Paths.get(System.getProperty("java.io.tmpdir"), "download");
            Files.createDirectories(downloadPath);
            Path tmpDir = Files.createTempDirectory(downloadPath, "azimuth_");

            AzimuthEvalTask record = azimuthEvalRestService.queryTaskRecordByJobId(jobId);
            log.debug("LTE天线方位角评估的数据信息：" + record);
            if (record == null) {
                msg = "不存在该" + jobId + "任务信息";
                log.error(msg);
                fileResult.setMsg(msg);
                return fileResult;
            }

            String dlFileName = record.getDlFileName();
            Path currentFile = Paths.get(tmpDir.toString(), dlFileName);

            // 获取结果
            List<AzimuthEvalResult> results = azimuthEvalRestService.queryResultByJobId(record.getJobId());

            //结果为空，无法提供下载
            if (results == null || results.isEmpty()) {
                msg = "方位角计算的结果数据不存在！";
                log.error(msg);
                fileResult.setMsg(msg);
                return fileResult;
            }

            StringBuilder sb = new StringBuilder();
            if ("type1".equalsIgnoreCase(record.getEvalType())) {
                sb.append("城市").append(",").append("小区").append(",").append("原方位角");
                sb.append(",").append("算法一").append(",").append("算法一差值");
                sb.append("\n");
                results.forEach(e -> sb.append(record.getArea().getName()).append(",")
                        .append(e.getCellId()).append(",")
                        .append(filterNumber(e.getAzimuth())).append(",")
                        .append(filterNumber(e.getAzimuth1())).append(",")
                        .append(filterNumber(e.getDiff1())).append("\n"));
            } else if ("type2".equalsIgnoreCase(record.getEvalType())) {
                sb.append("城市").append(",").append("小区").append(",").append("原方位角");
                sb.append(",").append("算法二").append(",").append("算法二差值");
                sb.append("\n");
                results.forEach(e -> sb.append(record.getArea().getName()).append(",")
                        .append(e.getCellId()).append(",")
                        .append(filterNumber(e.getAzimuth())).append(",")
                        .append(filterNumber(e.getAzimuth2())).append(",")
                        .append(filterNumber(e.getDiff2())).append("\n"));
            } else {
                sb.append("城市").append(",").append("小区").append(",").append("原方位角");
                sb.append(",").append("算法一").append(",").append("算法一差值");
                sb.append(",").append("算法二").append(",").append("算法二差值");
                sb.append("\n");
                results.forEach(e -> sb.append(record.getArea().getName()).append(",")
                        .append(e.getCellId()).append(",")
                        .append(filterNumber(e.getAzimuth())).append(",")
                        .append(filterNumber(e.getAzimuth1())).append(",")
                        .append(filterNumber(e.getDiff1())).append(",")
                        .append(filterNumber(e.getAzimuth2())).append(",")
                        .append(filterNumber(e.getDiff2())).append("\n"));
            }

            Files.copy(new ByteArrayInputStream(sb.toString().getBytes("GBK")), currentFile, StandardCopyOption.REPLACE_EXISTING);

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
                msg = "天线方位角结果文件不存在！";
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

    private Object filterNumber(int num) {
        return num == -1 ? "" : num;
    }
}
