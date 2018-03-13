package com.hgicreate.rno.lte.web.controller.pciafp;

import com.hgicreate.rno.lte.web.client.intermatrix.InterMatrixTaskRestClient;
import com.hgicreate.rno.lte.web.client.pciafp.PciAfpServiceRestClient;
import com.hgicreate.rno.lte.web.client.pciafp.PciAfpTaskRestClient;
import com.hgicreate.rno.lte.web.model.*;
import com.hgicreate.rno.lte.web.model.datamgt.DataCollectRecord;
import com.hgicreate.rno.lte.web.model.datamgt.DataCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import com.hgicreate.rno.lte.web.model.intermatrix.InterMatrixTask;
import com.hgicreate.rno.lte.web.model.pciafp.PciAfpTaskInfo;
import com.hgicreate.rno.lte.web.model.pciafp.PciAfpTaskObj;
import com.hgicreate.rno.lte.web.model.pciafp.Threshold;
import com.hgicreate.rno.lte.web.service.CommonRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.hadoop.fs.FsShell;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Controller
@SessionAttributes("account")
@RequestMapping({"/pciAfp", "/pa"})
public class PciAfpClientController {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final CommonRestService commonRestService;

    private final PciAfpServiceRestClient pciAfpServiceRestClient;

    private final PciAfpTaskRestClient pciAfpTaskRestClient;

    private final InterMatrixTaskRestClient interMatrixTaskRestClient;

    private final FsShell fsShell;

    @Value("${rno.hdfs-file-path}")
    private String uploadRoot;

    public PciAfpClientController(CommonRestService commonRestService, PciAfpServiceRestClient pciAfpServiceRestClient, PciAfpTaskRestClient pciAfpTaskRestClient, InterMatrixTaskRestClient interMatrixTaskRestClient, FsShell fsShell) {
        this.commonRestService = commonRestService;
        this.pciAfpServiceRestClient = pciAfpServiceRestClient;
        this.pciAfpTaskRestClient = pciAfpTaskRestClient;
        this.interMatrixTaskRestClient = interMatrixTaskRestClient;
        this.fsShell = fsShell;
    }

    /**
     * 将account注入到session中
     */
    @ModelAttribute("account")
    public String user(String account) {
        return account == null ? "" : account;
    }

    /**
     * 访问首页
     */
    @GetMapping
    public String indexGet(Map<String, Object> model, String account, SessionStatus sessionStatus) {
        log.debug("访问PCI计算页面。account={}", account);

        if (!commonRestService.validateUser(account)) {
            model.put("error", "非法登录用户，请选择正常渠道登录，谢谢！");
            sessionStatus.setComplete();
            return "rno_fail";
        }

        model.put("areaObj", commonRestService.getAreaByAccount(account, -1));
        return "pciAfp/rno_lte_pci_afp";
    }

    /**
     * 返回首页
     */
    @PostMapping
    public String indexPost(Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId, HttpSession session) {
        log.debug("访问首页。account={},cityId={}", account, cityId);
        if (null != session.getAttribute("taskObj")) {
            session.removeAttribute("taskObj");
        }
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        return "pciAfp/rno_lte_pci_afp";
    }

    /**
     * 跳转到任务信息页面
     */
    @RequestMapping("/createTask")
    public String createTask(HttpSession session, Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId) {
        log.debug("进入方法：createTask。account={},cityId={}", account, cityId);
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        model.put("matrix", interMatrixTaskRestClient.getLatelyLteMatrixByCityId(cityId));
        PciAfpTaskObj taskObj = new PciAfpTaskObj();
        taskObj.setTaskInfo(new PciAfpTaskInfo());
        session.setAttribute("taskObj", taskObj);
        return "pciAfp/rno_lte_pci_afp_task";
    }

    @RequestMapping("/taskPageJump")
    public String taskPageJump(@ModelAttribute("account") String account, @SessionAttribute PciAfpTaskObj taskObj) {
        log.debug("进入方法：taskPageJump。account={}", account);
        List<Threshold> thresholds = taskObj.getThresholds();
        if (null == thresholds) {
            thresholds = pciAfpTaskRestClient.getThresholdsByModuleType("LTEINTERFERCALC");
            for (Threshold r : thresholds) {
                String code = r.getCode();
                if (code.equals("SAMEFREQCELLCOEFWEIGHT") || code.equals("SWITCHRATIOWEIGHT") || code.equals("MINMEASURESUM")
                        || code.equals("MINCORRELATION") || code.equals("DISLIMIT")) {
                    r.setFlag(false);
                }
            }
            taskObj.setThresholds(thresholds);
        }
        return "pciAfp/rno_lte_pci_afp_param";
    }

    @RequestMapping("/paramPageJump")
    public String paramPageJump(@ModelAttribute("account") String account, String direction, @SessionAttribute PciAfpTaskObj taskObj, Map<String, Object> model) {
        log.debug("进入方法：paramPageJump。direction={}", direction);
        PciAfpTaskInfo taskInfo = taskObj.getTaskInfo();
        if ("forward".equals(direction)) {
            if (taskInfo.isUseSf()) {
                DataCond cond = new DataCond();
                cond.setCityId(taskInfo.getCityId());
                cond.setMeaBegTime(taskInfo.getBegMeaTime());
                cond.setMeaEndTime(taskInfo.getEndMeaTime());
                cond.setFactory("ALL");

                Page page = new Page();

                PageCondBody<DataCond> condBody = new PageCondBody<>();
                condBody.setCond(cond);
                condBody.setPage(page);

                PageResultBody resultBody = pciAfpServiceRestClient.querySfFileByPage(condBody);

                model.put("sfFileInfo", resultBody.getData());
            }
            return "pciAfp/rno_lte_pci_afp_overview";
        } else {
            long cityId = taskInfo.getCityId();
            model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
            model.put("matrix", interMatrixTaskRestClient.getLatelyLteMatrixByCityId(cityId));
            return "pciAfp/rno_lte_pci_afp_task";
        }
    }

    @RequestMapping("/overviewPageJump")
    public String overviewPageJump(@ModelAttribute("account") String account) {
        log.debug("进入方法：overviewPageJump。account={}", account);
        return "pciAfp/rno_lte_pci_afp_param";
    }

    /**
     * 查询计算任务
     */
    @RequestMapping("/queryTaskByPage")
    @ResponseBody
    public PageResultBody queryTaskByPage(@ModelAttribute("account") String account, TaskQueryCond cond, Page page) {
        log.debug("进入方法:queryTaskByPage。cond = {},page = {}", cond, page);
        cond.setAccount(account);
        PageCondBody<TaskQueryCond> condBody = new PageCondBody<>();
        condBody.setCond(cond);
        condBody.setPage(page);
        PageResultBody resultBody = pciAfpTaskRestClient.queryTaskByPage(condBody);
        log.debug("退出方法:queryTaskByPage。resultBody = {}", resultBody);
        return resultBody;
    }

    /**
     * 下载结果文件
     */
    @RequestMapping("/downloadResultFile")
    @ResponseBody
    public ResponseEntity downloadResultFile(long jobId) {
        log.debug("进入方法：downloadResultFile。下载PCI计算结果文件， jobId=" + jobId);
        FileResult fileResult = pciAfpServiceRestClient.downloadResultFile(jobId);

        if (null == fileResult) {
            log.error("未获取到文件！");
            return new ResponseEntity<>("未获取到文件！", HttpStatus.SERVICE_UNAVAILABLE);
        }

        if (fileResult.isResult()) {
            byte[] fileBody = fileResult.getFileBody();

            if (fileResult.getFileLength() != fileBody.length) {
                log.error("文件流不完整！");
                return new ResponseEntity<>("文件流不完整！", HttpStatus.SERVICE_UNAVAILABLE);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentDispositionFormData("attachment", fileResult.getFilename(), Charset.forName("UTF-8"));
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

            log.debug(fileResult.getMsg());
            return new ResponseEntity<>(fileBody, headers, HttpStatus.valueOf(fileResult.getStatusCode()));
        } else {
            log.error(fileResult.getMsg());
            return new ResponseEntity<>(fileResult.getMsg(), HttpStatus.valueOf(fileResult.getStatusCode()));
        }
    }

    /**
     * 获取最近十次 LTE 干扰矩阵信息
     */
    @RequestMapping("/getLatelyLteMatrix")
    @ResponseBody
    public List<InterMatrixTask> getLatelyLteMatrixByCityId(long cityId) {
        log.debug("进入方法：getLatelyLteMatrixByCityId,cityId={}", cityId);
        List<InterMatrixTask> interMatrixTasks = interMatrixTaskRestClient.getLatelyLteMatrixByCityId(cityId);
        log.debug("离开方法：getLatelyLteMatrixByCityId,interMatrixTasks={}", interMatrixTasks);
        return interMatrixTasks;
    }

    @RequestMapping("/storageTask")
    @ResponseBody
    public Map<String, Object> storageTask(@ModelAttribute("account") String account, PciAfpTaskInfo taskInfo, @SessionAttribute PciAfpTaskObj taskObj) {
        log.debug("进入方法：storageTask。taskInfo={}", taskInfo);
        taskInfo.setAccount(account);
        taskObj.setTaskInfo(taskInfo);
        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("msg", "保存任务信息成功！");
        return result;
    }

    @RequestMapping("/storageParam")
    @ResponseBody
    public Map<String, Object> storageParam(@ModelAttribute("account") String account, HttpServletRequest request, @SessionAttribute PciAfpTaskObj taskObj) {
        Map<String, String> threshold = new HashMap<>();
        threshold.put("SAMEFREQCELLCOEFWEIGHT", request.getParameter("SAMEFREQCELLCOEFWEIGHT"));
        threshold.put("SWITCHRATIOWEIGHT", request.getParameter("SWITCHRATIOWEIGHT"));
        threshold.put("CELLM3RINTERFERCOEF", request.getParameter("CELLM3RINTERFERCOEF"));
        threshold.put("CELLM6RINTERFERCOEF", request.getParameter("CELLM6RINTERFERCOEF"));
        threshold.put("CELLM30RINTERFERCOEF", request.getParameter("CELLM30RINTERFERCOEF"));
        threshold.put("BEFORENSTRONGCELLTAB", request.getParameter("BEFORENSTRONGCELLTAB"));
        threshold.put("TOPNCELLLIST", request.getParameter("TOPNCELLLIST"));
        threshold.put("INCREASETOPNCELLLIST", request.getParameter("INCREASETOPNCELLLIST"));
        threshold.put("CONVERMETHOD1TARGETVAL", request.getParameter("CONVERMETHOD1TARGETVAL"));
        threshold.put("CONVERMETHOD2TARGETVAL", request.getParameter("CONVERMETHOD2TARGETVAL"));
        threshold.put("CONVERMETHOD2SCOREN", request.getParameter("CONVERMETHOD2SCOREN"));
        threshold.put("MINCORRELATION", request.getParameter("MINCORRELATION"));
        threshold.put("MINMEASURESUM", request.getParameter("MINMEASURESUM"));
        threshold.put("DISLIMIT", request.getParameter("DISLIMIT"));
        log.debug("进入方法：storageParam。threshold={}", threshold);

        List<Threshold> thresholds = taskObj.getThresholds();
        thresholds.forEach(e -> {
            if (threshold.containsKey(e.getCode())) {
                e.setDefaultVal(threshold.get(e.getCode()));
            }
        });
        taskObj.setThresholds(thresholds);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("msg", "保存阈值成功！");
        return result;
    }

    @RequestMapping("/storageOverview")
    @ResponseBody
    public Map<String, Object> storageOverview(@ModelAttribute("account") String account, String direction, String optimizeCells,
                                               @RequestParam(required = false) List<String> filename, MultipartHttpServletRequest request,
                                               @SessionAttribute PciAfpTaskObj taskObj) {
        log.debug("进入方法：storageOverview。optimizeCells={},filename={}", optimizeCells, filename);
        Map<String, Object> result = new HashMap<>();

        PciAfpTaskInfo taskInfo = taskObj.getTaskInfo();
        taskInfo.setOptimizeCells(optimizeCells);

        if ("forward".equals(direction)) {
            long cityId = taskInfo.getCityId();

            // 如果启用扫频文件则保存文件名
            if (taskInfo.isUseSf()) {
                StringBuilder sb = new StringBuilder();
                filename.forEach(e -> sb.append(e).append(","));
                taskInfo.setSfFiles(sb.substring(0, sb.length() - 1));
            }
            // 如果使用导入干扰矩阵方式则获取上传文件
            if (taskInfo.getMatrixType() == 2) {
                Iterator<String> itr = request.getFileNames();
                while (itr.hasNext()) {
                    MultipartFile mpf = request.getFile(itr.next());
                    if (null != mpf) {
                        // 使用java8 nio处理文件
                        try {
                            Path uploadPath = Files.createDirectories(Paths.get(System.getProperty("java.io.tmpdir"), "upload"));
                            Path path = Files.createTempFile(uploadPath, "matrix", ".csv");
                            String newFileName = path.getFileName().toString();
                            // 保存文件
                            Files.copy(mpf.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                            log.debug("upload path={}", path);

                            // 上传到HDFS
                            String dstDir = uploadRoot + "/" + LocalDate.now().format(DATE_TIME_FORMATTER) + "/";
                            if (!fsShell.test(dstDir)) {
                                fsShell.mkdir(dstDir);
                            }
                            String dstPath = dstDir + newFileName;
                            if (fsShell.test(dstPath)) {
                                fsShell.rmr(dstPath);
                            }
                            fsShell.put(path.toString(), dstPath);
                            log.debug("hdfs path={}", dstPath);
                            Files.deleteIfExists(path);

                            DataCollectRecord dataRecord = new DataCollectRecord();
                            dataRecord.setAccount(account);
                            dataRecord.setBusinessDataType(24);
                            dataRecord.setBusinessTime(new Date());
                            dataRecord.setCityId(cityId);
                            dataRecord.setFileName(newFileName);
                            dataRecord.setFileSize(mpf.getSize());
                            dataRecord.setFileStatus("等待解析");
                            dataRecord.setFullPath(dstPath);
                            dataRecord.setOriFileName(mpf.getOriginalFilename());
                            dataRecord.setUploadTime(new Date());

                            taskObj.setDataRecord(dataRecord);

                            log.info("文件上传完成 :{}", mpf.getOriginalFilename());
                        } catch (Exception e) {
                            e.printStackTrace();
                            log.error("文件上传失败 :{}", mpf.getOriginalFilename());
                        }
                    }
                }
            }
            log.debug("taskObj={}", taskObj);

            try {
                SubmitResult submitResult = pciAfpTaskRestClient.submitTask(taskObj);
                if (null != submitResult && submitResult.isFlag()) {
                    submitResult = pciAfpServiceRestClient.startTask(submitResult.getJobId());
                }
                if (null == submitResult || !submitResult.isFlag()) {
                    result.put("result", "fail");
                    result.put("msg", "提交任务失败");
                    return result;
                }
            } catch (Exception e) {
                e.printStackTrace();
                log.error("创建天线方位角评估任务失败！");
            }
        }

        result.put("result", "success");
        result.put("msg", "保存参数成功");
        return result;
    }
}
