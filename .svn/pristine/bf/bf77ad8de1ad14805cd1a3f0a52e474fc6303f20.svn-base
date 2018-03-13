package com.hgicreate.rno.lte.web.controller.azimutheval;

import com.hgicreate.rno.lte.web.client.azimutheval.AzimuthEvalServiceRestClient;
import com.hgicreate.rno.lte.web.client.azimutheval.AzimuthEvalTaskRestClient;
import com.hgicreate.rno.lte.web.model.*;
import com.hgicreate.rno.lte.web.model.azimutheval.AzimuthJobRecord;
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
@RequestMapping({"/azimuthEvaluation", "/ae"})
public class AzimuthEvaluationClientController {

    private final CommonRestService commonRestService;

    private final AzimuthEvalTaskRestClient azimuthEvalTaskRestClient;

    private final AzimuthEvalServiceRestClient azimuthEvalServiceRestClient;

    public AzimuthEvaluationClientController(CommonRestService commonRestService, AzimuthEvalTaskRestClient azimuthEvalTaskRestClient, AzimuthEvalServiceRestClient azimuthEvalServiceRestClient) {
        this.commonRestService = commonRestService;
        this.azimuthEvalTaskRestClient = azimuthEvalTaskRestClient;
        this.azimuthEvalServiceRestClient = azimuthEvalServiceRestClient;
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
        log.debug("访问天线方位角评估页面。account={}", account);

        if (!commonRestService.validateUser(account)) {
            model.put("error", "非法登录用户，请选择正常渠道登录，谢谢！");
            sessionStatus.setComplete();
            return "rno_fail";
        }

        model.put("areaObj", commonRestService.getAreaByAccount(account, -1));
        return "azimuthEval/rno_lte_azimuth_evaluation";
    }

    /**
     * 返回首页
     */
    @PostMapping
    public String indexPost(Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId) {
        log.debug("访问首页。account={},cityId={}", account, cityId);
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        return "azimuthEval/rno_lte_azimuth_evaluation";
    }

    /**
     * 跳转到任务信息页面
     */
    @RequestMapping("/createTask")
    public String createTask(Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId) {
        log.debug("进入新建任务页。account={},cityId={}", account, cityId);
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        return "azimuthEval/rno_lte_azimuth_evaluation_task";
    }

    /**
     * 查询Lte方位角计算任务
     */
    @RequestMapping("/queryTaskByPage")
    @ResponseBody
    public PageResultBody queryTaskByPage(@ModelAttribute("account") String account, TaskQueryCond cond, Page page) {
        log.debug("进入方法:queryAzimuthEvaluationTaskByPage。cond = {},page = {}", cond, page);
        cond.setAccount(account);
        PageCondBody<TaskQueryCond> condBody = new PageCondBody<>();
        condBody.setCond(cond);
        condBody.setPage(page);
        return azimuthEvalTaskRestClient.queryTaskByPage(condBody);
    }

    /**
     * 提交LTE 方位角评估分析计算任务
     */
    @RequestMapping("/submitTask")
    @ResponseBody
    public SubmitResult submitTask(@ModelAttribute("account") String account, AzimuthJobRecord cond) {
        log.debug("进入方法:submitTask。cond={}, account={}", cond, account);
        cond.setAccount(account);

        String msg = "未知错误";
        SubmitResult submitResult = new SubmitResult();
        submitResult.setFlag(false);

        try {
            submitResult = azimuthEvalTaskRestClient.submitTask(cond);
            if (null != submitResult && submitResult.isFlag()) {
                submitResult = azimuthEvalServiceRestClient.startTask(submitResult.getJobId());
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
        log.debug("进入方法：downloadResultFile。下载LTE干扰矩阵结果文件， jobId=" + jobId);
        FileResult fileResult = azimuthEvalServiceRestClient.downloadResultFile(jobId);

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
