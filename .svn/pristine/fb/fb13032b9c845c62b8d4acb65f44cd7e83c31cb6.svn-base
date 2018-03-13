package com.hgicreate.rno.lte.pciafp.controller;

import com.hgicreate.rno.lte.pciafp.model.*;
import com.hgicreate.rno.lte.pciafp.service.CommonRestService;
import com.hgicreate.rno.lte.pciafp.service.PciAfpRestService;
import com.hgicreate.rno.lte.pciafp.service.PciAfpSparkService;
import com.hgicreate.rno.lte.pciafp.task.JobExecutor;
import com.hgicreate.rno.lte.pciafp.tool.FileTool;
import com.hgicreate.rno.lte.pciafp.tool.ZipFileHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Slf4j
@RestController
public class PciAfpServiceController {

    private final CommonRestService commonRestService;
    private final PciAfpRestService pciAfpRestService;
    private final PciAfpSparkService pciAfpSparkService;
    private final JobExecutor jobExecutor;
    @Value("${rno.run-mode:always}")
    private String runMode;
    @Value("${rno.job-type-code:RNO_PCI_AFP_PLAN}")
    private String jobTypeCode;

    public PciAfpServiceController(CommonRestService commonRestService, PciAfpRestService pciAfpRestService, PciAfpSparkService pciAfpSparkService, JobExecutor jobExecutor) {
        this.commonRestService = commonRestService;
        this.pciAfpRestService = pciAfpRestService;
        this.pciAfpSparkService = pciAfpSparkService;
        this.jobExecutor = jobExecutor;
    }

    /**
     * 分页查询扫频文件信息
     */
    @RequestMapping(value = "/querySfFileByPage", method = POST)
    public PageResultBody querySfFileByPage(@RequestBody PageCondBody<DataCond> condBody) {
        log.debug("进入方法:querySfFileByPage。condBody = {}", condBody);
        DataCond cond = condBody.getCond();
        Page page = condBody.getPage();

        cond.setStart(page.getPageSize() * (page.getCurrentPage() - 1) + 1);
        cond.setEnd(page.getPageSize() * page.getCurrentPage());

        List<Map<String, String>> data = pciAfpSparkService.querySfFileByPage(cond);

        if (page.getTotalCnt() < 0) {
            Long totalCnt = pciAfpSparkService.querySfFileCnt(cond);
            if (totalCnt != null) {
                page.setTotalCnt(totalCnt);
            }
        }

        page.setTotalPageCnt(page.getTotalCnt() / page.getPageSize() + (page.getTotalCnt() % page.getPageSize() == 0 ? 0 : 1));
        page.setForcedStartIndex(-1);

        PageResultBody resultBody = new PageResultBody();
        resultBody.setResult("success");
        resultBody.setData(data == null ? Collections.emptyList() : data);
        resultBody.setPage(page);
        return resultBody;
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
     * 下载PCI结果文件
     */
    @RequestMapping(value = "/downloadResultFile/{jobId}", method = GET)
    public FileResult downloadResultFile(@PathVariable("jobId") long jobId) {
        log.debug("进入方法：downloadResultFile。下载PCI规划结果文件， jobId={}", jobId);

        String msg;
        FileResult fileResult = new FileResult();
        fileResult.setResult(false);
        fileResult.setStatusCode(HttpStatus.NOT_FOUND.value());

//        PciAfpTaskInfo taskInfo = pciAfpService.queryPciPlanJobRecByJobId(jobId);
        PciAfpTask taskInfo = pciAfpRestService.queryTaskRecordByJobId(jobId);

        if (null == taskInfo) {
            msg = "不存在该" + jobId + "任务信息";
            log.info(msg);
            fileResult.setMsg(msg);
            return fileResult;
        }

        // 获取pci规划任务中的待优化小区字段
        String optimizeCellStr = taskInfo.getOptimizeCells();
        if (null == optimizeCellStr || optimizeCellStr.isEmpty()) {
            msg = "不存在变PCI小区表！";
            log.info(msg);
            fileResult.setMsg(msg);
            return fileResult;
        }

        List<String> optimizeCells = new ArrayList<>();
        for (String c : optimizeCellStr.trim().split(",")) {
            if (!"".equals(c.trim())) {
                optimizeCells.add(c);
            }
        }

        // 区域ID
        long cityId = taskInfo.getAreaId();
        Map<String, Cell> cellMap = pciAfpSparkService.getLteCellMapByAreaId(cityId);

        if (cellMap.isEmpty()) {
            msg = "该区域" + cityId + "不存在系统小区信息";
            log.info(msg);
            fileResult.setMsg(msg);
            return fileResult;
        }

        // 确定临时目录存在
        Path tmpDir = null;
        try {
            // 确定临时目录存在
            Path downloadPath = Paths.get(System.getProperty("java.io.tmpdir"), "download");
            Files.createDirectories(downloadPath);
            tmpDir = Files.createTempDirectory(downloadPath, "pci");
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (null == tmpDir || Files.notExists(tmpDir)) {
            msg = "创建临时目录失败";
            log.info(msg);
            fileResult.setMsg(msg);
            return fileResult;
        }

        List<String> sourceFileList = new ArrayList<>();
        boolean result = true;
        // 下载的Pci规划文件名称
        String dlFileName;
        // 下载的Pci规划文件全路径
        String dlFileRealPath;
        // 导出关联度表
        if (taskInfo.isExportAssoTable()) {
            // System.out.println("进来关联表生成方法");
            // 下载的Pci规划文件名称
            dlFileName = jobId + "_PCI优化关联度排序表.xlsx";
            dlFileRealPath = Paths.get(tmpDir.toString(), dlFileName).toString();

            try {
                List<Cell2Rela> res = pciAfpRestService.queryRelevancyTableByJobId(jobId);
                // 可以生成excel结果文件
                if (FileTool.createAssoTableToExcel(dlFileRealPath, res)) {
                    sourceFileList.add(dlFileRealPath);
                }
            } catch (Exception e) {
                e.printStackTrace();
                log.info("获取Pci规划结果源文件中，读取关联表数据出错！");
                result = false;
            }
        }
        // 导出中间方案
        if (result && taskInfo.isExportMidPlan()) {
            // System.out.println("进来中间方案生成方法");
            long DataNum = pciAfpRestService.queryMidPlanCntByJobId(jobId);
            //log.debug("DataNum={}", DataNum);
            if (DataNum >= 1) {
                for (int n = 1; n <= DataNum; n++) {
                    // 下载的Pci规划文件名称
                    dlFileName = jobId + "_PCI优化中间方案_" + n + ".xlsx";
                    // 下载的Pci规划文件全路径
                    dlFileRealPath = Paths.get(tmpDir.toString(), dlFileName).toString();

                    List<Map<String, Object>> res1 = new ArrayList<>();
                    List<Map<String, Object>> res2 = new ArrayList<>();
                    Map<String, Object> one1;
                    Map<String, Object> one2;

                    String cellId;
                    Cell cell;
                    try {
                        List<PlanItem> midPlanRes = pciAfpRestService.queryMidPlanByJobId(jobId, n);
                        List<Cell2Inter> topCellRes = pciAfpRestService.queryTopCellByJobId(jobId, n);

                        for (PlanItem item : midPlanRes) {
                            one1 = new HashMap<>();
                            cellId = item.getCellId();

                            cell = cellMap.get(cellId);
                            if (cell == null) {
                                log.info("小区找不到对应工参数据：cellId ={}", cellId);
                                one1.put("oldPci", -1);
                                one1.put("oldEarfcn", -1);
                                one1.put("cellName", "未知小区");
                            } else {
                                // 小区名，pci,频点
                                one1.put("cellName", cell.getName());
                                one1.put("oldPci", cell.getPci());
                                one1.put("oldEarfcn", cell.getEarfcn());
                            }
                            one1.put("cellId", cellId);
                            int newEarfcn = item.getEarfcn();
                            if (newEarfcn == -1) {
                                if (cell == null) {
                                    one1.put("newEarfcn", "找不到对应工参数据");
                                } else {
                                    one1.put("newEarfcn", "找不到对应MR数据");
                                }
                            } else {
                                one1.put("newEarfcn", newEarfcn);
                            }
                            int newPci = item.getPci();
                            if (newPci == -1) {
                                if (cell == null) {
                                    one1.put("newPci", "找不到对应工参数据 ");
                                } else {
                                    one1.put("newPci", "找不到对应MR数据");
                                }
                            } else {
                                one1.put("newPci", newPci);
                            }
                            one1.put("oriInterVal", item.getOldInterVal());
                            one1.put("relaVal", item.getNewInterVal());

                            if (optimizeCells.contains(cellId)) {
                                one1.put("remark", "修改小区");
                            } else {
                                one1.put("remark", "MR其他小区");
                            }
                            res1.add(one1);
                        }
                        for (Cell2Inter inter : topCellRes) {
                            one2 = new HashMap<>();
                            one2.put("cell", inter.getCellId());
                            one2.put("inter", inter.getInterVal());
                            res2.add(one2);
                        }
                        // 可以生成excel结果文件
                        if (FileTool.createMidPlanToExcel(dlFileRealPath, res1, res2)) {
                            sourceFileList.add(dlFileRealPath);
                        }

                    } catch (Exception e) {
                        e.printStackTrace();
                        log.info("获取Pci规划结果源文件中，读取中间方案数据出错");
                        result = false;
                    }
                }
            }
        }
        // 导出邻区核查方案
        if (result && taskInfo.isExportNcCheckPlan()) {
            // System.out.println("进来邻区核查方案生成方法");
            // 下载的Pci规划文件名称
            dlFileName = jobId + "_PCI优化邻区核查方案.xlsx";

            // 下载的Pci规划文件全路径
            dlFileRealPath = Paths.get(tmpDir.toString(), dlFileName).toString();

            try {
                List<PlanItem> ncCheckRes = pciAfpRestService.queryNcCheckPlanByJobId(jobId);

                List<Map<String, Object>> res = collectResult(ncCheckRes, cellMap, optimizeCells);

                // 可以生成excel结果文件
                if (FileTool.createExcelFile(dlFileRealPath, res)) {
                    sourceFileList.add(dlFileRealPath);
                }
            } catch (Exception e) {
                e.printStackTrace();
                log.info("获取Pci规划结果源文件中，读取邻区核查数据出错");
                result = false;
            }
        }
        // 导出d1d2小区表
        if (result && null != taskInfo.getSfFiles() && taskInfo.getSfFiles().trim().isEmpty()) {
            // System.out.println("进来邻区核查方案生成方法");
            // 下载的Pci规划文件名称
            dlFileName = jobId + "_D1小区表.csv";
            // 下载的Pci规划文件全路径
            dlFileRealPath = Paths.get(tmpDir.toString(), dlFileName).toString();
            String d1Path = dlFileRealPath;

            try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(dlFileRealPath), "GBK"))) {
                List<Cell2Inter> d1CellRes = pciAfpRestService.queryD1CellByJobId(jobId);
                // 标题头
                String line = "小区标识," + "频点," + "干扰值";
                bw.write(line);
                bw.newLine();
                for (Cell2Inter inter : d1CellRes) {
                    bw.write(inter.getCellId() + "," + inter.getEarfcn() + "," + inter.getInterVal());
                    bw.newLine();
                }
            } catch (IOException e) {
                log.info("Pci规划计算的d1频数据不存在!");
                result = false;
            }

            if (result) {
                // 下载的Pci规划文件名称
                dlFileName = jobId + "_D2小区表.csv";
                // 下载的Pci规划文件全路径
                dlFileRealPath = Paths.get(tmpDir.toString(), dlFileName).toString();

                try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(dlFileRealPath), "GBK"))) {
                    List<Cell2Inter> d2CellRes = pciAfpRestService.queryD2CellByJobId(jobId);
                    // 标题头
                    String line = "小区标识," + "频点," + "干扰值";
                    bw.write(line);
                    bw.newLine();
                    for (Cell2Inter inter : d2CellRes) {
                        bw.write(inter.getCellId() + "," + inter.getEarfcn() + "," + inter.getInterVal());
                        bw.newLine();
                    }
                    sourceFileList.add(d1Path);
                    sourceFileList.add(dlFileRealPath);
                } catch (IOException e) {
                    log.info("Pci规划计算的d2频数据不存在!");
                }
            }
        }
        // 下载的Pci规划文件名称
        dlFileName = jobId + "_PCI优化方案.xlsx";
        // 下载的Pci规划文件全路径
        dlFileRealPath = Paths.get(tmpDir.toString(), dlFileName).toString();

        try {
            List<PlanItem> bestPlanRes = pciAfpRestService.queryBestPlanByJobId(jobId);
            List<Map<String, Object>> res = collectResult(bestPlanRes, cellMap, optimizeCells);

            if (FileTool.createExcelFile(dlFileRealPath, res)) {
                sourceFileList.add(dlFileRealPath);
            }

            String outFileName = dlFileName;
            Path outFilePath = Paths.get(dlFileRealPath);
            if (sourceFileList.size() > 1) {
                outFileName = jobId + "_PCI优化.zip";
                outFilePath = Paths.get(ZipFileHandler.add2Zip(sourceFileList, outFileName));
            }

            if (Files.exists(outFilePath)) {
                msg = "文件下载成功。";
                log.debug(msg);
                fileResult.setResult(true);
                fileResult.setMsg(msg);
                fileResult.setStatusCode(HttpStatus.CREATED.value());
                fileResult.setFilename(outFileName);

                byte[] fileBody = Files.readAllBytes(outFilePath);
                fileResult.setFileBody(fileBody);
                fileResult.setFileLength(fileBody.length);
            } else {
                msg = "Pci规划结果文件不存在！,文件路径:" + outFilePath;
                log.error(msg);
                fileResult.setMsg(msg);
            }
        } catch (Exception e) {
            e.printStackTrace();
            msg = "获取Pci规划结果源文件中，读取数据出错";
            log.info(msg);
            fileResult.setMsg(msg);
        }
        return fileResult;
    }

    private List<Map<String, Object>> collectResult(List<PlanItem> list, Map<String, Cell> cellMap, List<String> optimizeCells) {
        List<Map<String, Object>> result = new ArrayList<>();
        Map<String, Object> one;
        String cellId;
        Cell cell;
        for (PlanItem item : list) {
            one = new HashMap<>();
            cellId = item.getCellId();
            cell = cellMap.get(cellId);
            if (cell == null) {
                log.info("小区找不到对应工参数据：cellId ={}", cellId);
                one.put("cellName", "未知小区");
                one.put("oldPci", -1);
                one.put("oldEarfcn", -1);
            } else {
                // 小区名，pci,频点
                one.put("cellName", cell.getName());
                one.put("oldPci", cell.getPci());
                one.put("oldEarfcn", cell.getEarfcn());
            }
            one.put("cellId", cellId);
            int newEarfcn = item.getEarfcn();
            if (newEarfcn == -1) {
                if (cell == null) {
                    one.put("newEarfcn", "找不到对应工参数据");
                } else {
                    one.put("newEarfcn", "找不到对应MR数据 ");
                }
            } else {
                one.put("newEarfcn", newEarfcn);
            }
            int newPci = item.getPci();
            if (newPci == -1) {
                if (cell == null) {
                    one.put("newPci", "找不到对应工参数据");
                } else {
                    one.put("newPci", "找不到对应MR数据");
                }
            } else {
                one.put("newPci", newPci);
            }
            one.put("oriInterVal", item.getOldInterVal());
            one.put("interVal", item.getNewInterVal());

            if (optimizeCells.contains(cellId)) {
                one.put("remark", "修改小区");
            } else {
                one.put("remark", "MR其他小区");
            }
            result.add(one);
        }
        return result;
    }
}
