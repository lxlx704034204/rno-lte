package com.hgicreate.rno.lte.web.controller.structanls;

import com.hgicreate.rno.lte.web.client.structanls.StructAnlsTaskRestClient;
import com.hgicreate.rno.lte.web.client.structanls.StructureAnalysisRestClient;
import com.hgicreate.rno.lte.web.model.*;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import com.hgicreate.rno.lte.web.service.CommonRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import java.nio.charset.Charset;
import java.util.Map;

@Slf4j
@Controller
@SessionAttributes("account")
@RequestMapping({"/structureAnalysis", "/sa"})
public class StructureAnalysisClientController {

    private final CommonRestService commonRestService;

    private final StructAnlsTaskRestClient structAnlsTaskRestClient;

    private final StructureAnalysisRestClient structureAnalysisRestClient;

    public StructureAnalysisClientController(CommonRestService commonRestService, StructAnlsTaskRestClient structAnlsTaskRestClient, StructureAnalysisRestClient structureAnalysisRestClient) {
        this.commonRestService = commonRestService;
        this.structAnlsTaskRestClient = structAnlsTaskRestClient;
        this.structureAnalysisRestClient = structureAnalysisRestClient;
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
        log.debug("访问结构优化页面。account={}", account);

        if (!commonRestService.validateUser(account)) {
            model.put("error", "非法登录用户，请选择正常渠道登录，谢谢！");
            sessionStatus.setComplete();
            return "rno_fail";
        }

        model.put("areaObj", commonRestService.getAreaByAccount(account, -1));
        return "rno_lte_structure_analysis";
    }

    /**
     * 返回首页
     */
    @PostMapping
    public String indexPost(Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId) {
        log.debug("访问结构优化页面。account={},cityId={}", account, cityId);
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        return "rno_lte_structure_analysis";
    }

    /**
     * 新建任务页面
     */
    @RequestMapping("/createTask")
    public String createTask(Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId) {
        log.debug("进入新建任务页。cityId={}", cityId);
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        return "rno_lte_structure_analysis_task";
    }

    /**
     * 分页查询LTE结构分析计算任务信息
     */
    @RequestMapping("/queryTaskByPage")
    @ResponseBody
    public PageResultBody queryTaskByPage(@ModelAttribute("account") String account, TaskQueryCond cond, Page page) {
        log.debug("进入方法：queryTaskByPage。cond = {},page = {}", cond, page);
        cond.setAccount(account);
        PageCondBody<TaskQueryCond> condBody = new PageCondBody<>();
        condBody.setCond(cond);
        condBody.setPage(page);
        return structAnlsTaskRestClient.queryTaskByPage(condBody);
    }

    /**
     * 提交LTE结构优化任务
     */
    @RequestMapping("/submitTask")
    @ResponseBody
    public SubmitResult submitTask(@ModelAttribute("account") String account, SubmitTaskCond cond) {
        log.debug("进入方法:submitTask。cond={}, account={}", cond, account);
        cond.setAccount(account);

        String msg = "未知错误";
        SubmitResult submitResult = new SubmitResult();
        submitResult.setFlag(false);

        try {
            submitResult = structAnlsTaskRestClient.submitTask(cond);
            if (null != submitResult && submitResult.isFlag()) {
                submitResult = structureAnalysisRestClient.startTask(submitResult.getJobId());
            }
        } catch (Exception e) {
            e.printStackTrace();
            msg = "创建天线方位角评估任务失败！";
            log.error(msg);
        }
        if (submitResult == null) {
            submitResult = new SubmitResult();
            submitResult.setFlag(false);
            submitResult.setResult(msg);
        }
        log.debug("退出方法：submitTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 下载结果文件
     */
    @RequestMapping("/downloadResultFile")
    @ResponseBody
    public ResponseEntity downloadResultFile(long jobId) {
        log.debug("进入方法：downloadResultFile。下载LTE结构优化结果文件， jobId=" + jobId);
        FileResult fileResult = structureAnalysisRestClient.downloadResultFile(jobId);

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
}
