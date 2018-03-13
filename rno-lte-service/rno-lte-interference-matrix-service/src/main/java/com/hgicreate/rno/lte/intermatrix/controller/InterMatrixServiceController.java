package com.hgicreate.rno.lte.intermatrix.controller;

import com.hgicreate.rno.lte.intermatrix.model.*;
import com.hgicreate.rno.lte.intermatrix.service.CommonRestService;
import com.hgicreate.rno.lte.intermatrix.service.InterMatrixSparkService;
import com.hgicreate.rno.lte.intermatrix.service.InterMatrixTaskRestService;
import com.hgicreate.rno.lte.intermatrix.task.JobExecutor;
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
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin
@RestController
public class InterMatrixServiceController {

    private final CommonRestService commonRestService;

    private final InterMatrixTaskRestService interMatrixTaskRestService;

    private final InterMatrixSparkService interMatrixSparkService;

    private final JobExecutor jobExecutor;

    @Value("${rno.run-mode:always}")
    private String runMode;

    @Value("${rno.job-type-code:RNO_LTE_INTERFER_MATRIX}")
    private String jobTypeCode;

    public InterMatrixServiceController(CommonRestService commonRestService, InterMatrixTaskRestService interMatrixTaskRestService, InterMatrixSparkService interMatrixSparkService, JobExecutor jobExecutor) {
        this.commonRestService = commonRestService;
        this.interMatrixTaskRestService = interMatrixTaskRestService;
        this.interMatrixSparkService = interMatrixSparkService;
        this.jobExecutor = jobExecutor;
    }

    /**
     * 分页查询数据记录
     */
    @PostMapping("/queryDataRecordByPage")
    public PageResultBody queryDataRecordByPage(@RequestBody PageCondBody<DataCond> condBody) {
        log.debug("进入方法:queryDataRecordByPage。condBody = {}", condBody);
        DataCond cond = condBody.getCond();
        Page page = condBody.getPage();
        cond.setStart(page.getPageSize() * (page.getCurrentPage() - 1) + 1);
        cond.setEnd(page.getPageSize() * page.getCurrentPage());

        List<Map<String, Object>> data = interMatrixSparkService.queryDataRecordByPage(cond);

        if (page.getTotalCnt() < 0) {
            Long totalCnt = interMatrixSparkService.queryDataRecordCnt(cond);
            if (totalCnt != null) {
                page.setTotalCnt(totalCnt);
            }
        }
        page.setTotalPageCnt(page.getTotalCnt() / page.getPageSize() + (page.getTotalCnt() % page.getPageSize() == 0 ? 0 : 1));
        page.setForcedStartIndex(-1);

        PageResultBody resultBody = new PageResultBody();
        resultBody.setResult("success");
        resultBody.setData(data);
        resultBody.setPage(page);
        return resultBody;
    }

    /**
     * 查询数据量
     */
    @PostMapping("/queryDataCnt")
    public Long queryDataCnt(@RequestBody DataCond cond) {
        log.debug("进入方法:queryDataCnt.cond={}", cond);
        return interMatrixSparkService.queryDataCnt(cond);
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
        log.debug("退出方法：submitTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 下载结果文件
     */
    @RequestMapping("/downloadResultFile/{jobId}")
    @ResponseBody
    public FileResult downloadResultFile(@PathVariable("jobId") long jobId) {
        log.info("进入方法：downloadResultFile，下载LTE干扰矩阵结果文件， jobId=" + jobId);

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
            Path tmpDir = Files.createTempDirectory(downloadPath, "matrix_");

            InterMatrixTask record = interMatrixTaskRestService.queryTaskRecordByJobId(jobId);
            log.debug("LTE天线方位角评估的数据信息：" + record);
            if (record == null) {
                msg = "不存在该" + jobId + "任务信息";
                log.error(msg);
                fileResult.setMsg(msg);
                return fileResult;
            }

            String dlFileName = record.getArea().getName() + "_" + jobId + "_LTE干扰矩阵结果.csv";
            Path currentFile = Paths.get(tmpDir.toString(), dlFileName);
            Files.createFile(currentFile);

            //获取干扰矩阵数据
            List<Map<String, Object>> results = interMatrixSparkService.queryResultByJobId(jobId);

            //结果为空，无法提供下载
            if (results == null || results.isEmpty()) {
                msg = "干扰矩阵计算的结果数据不存在！";
                log.error(msg);
                fileResult.setMsg(msg);
                return fileResult;
            }

            try (BufferedWriter writer = Files.newBufferedWriter(currentFile, Charset.forName("GBK"), StandardOpenOption.TRUNCATE_EXISTING)) {
                // 标题头
                String line = "小区标识," + "邻区标识," + "关联度," + "小区PCI," + "邻区PCI," + "小区频点," + "邻区频点," + "MR关联度," + "HO关联度," + "扫频关联度";

                // 写入标题头
                writer.write(line);
                writer.newLine();

                // 写入数据
                results.forEach(e -> {
                    try {
                        writer.write(e.get("cell_id").toString());
                        writer.write(",");
                        writer.write(e.get("ncell_id").toString());
                        writer.write(",");
                        writer.write(e.get("rela_val").toString());
                        writer.write(",");
                        writer.write(e.get("cell_pci").toString());
                        writer.write(",");
                        writer.write(e.get("ncell_pci").toString());
                        writer.write(",");
                        writer.write(e.get("cell_earfcn").toString());
                        writer.write(",");
                        writer.write(e.get("ncell_earfcn").toString());
                        writer.write(",");
                        writer.write(e.get("mr_rela").toString());
                        writer.write(",");
                        writer.write(e.get("ho_rela").toString());
                        writer.write(",");
                        writer.write(e.get("sf_rela").toString());
                        writer.newLine();
                    } catch (IOException e1) {
                        e1.printStackTrace();
                    }
                });

                writer.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }

            if (Files.exists(currentFile)) {
                msg = "文件下载成功。";
                log.debug(msg);
                fileResult.setResult(true);
                fileResult.setMsg(msg);
                fileResult.setStatusCode(HttpStatus.CREATED.value());
                fileResult.setFilename(currentFile.toString());

                byte[] fileBody = Files.readAllBytes(currentFile);
                fileResult.setFileBody(fileBody);
                fileResult.setFileLength(fileBody.length);
                return fileResult;
            } else {
                //文件不存在，不能提供下载
                msg = "干扰矩阵结果文件不存在！";
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
}
