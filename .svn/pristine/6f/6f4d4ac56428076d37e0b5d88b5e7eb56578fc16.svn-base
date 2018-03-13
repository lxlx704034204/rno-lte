package com.hgicreate.rno.lte.web.controller.intermatrix;

import com.hgicreate.rno.lte.web.client.intermatrix.InterMatrixServiceRestClient;
import com.hgicreate.rno.lte.web.client.intermatrix.InterMatrixTaskRestClient;
import com.hgicreate.rno.lte.web.model.*;
import com.hgicreate.rno.lte.web.model.datamgt.DataCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import com.hgicreate.rno.lte.web.model.intermatrix.InterferenceMatrixSubmitResult;
import com.hgicreate.rno.lte.web.model.intermatrix.InterferenceMatrixTaskRecord;
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
@RequestMapping({"/interferMatrix", "/im"})
public class InterferenceMatrixClientController {

    private final CommonRestService commonRestService;

    private final InterMatrixTaskRestClient interMatrixTaskRestClient;

    private final InterMatrixServiceRestClient interMatrixServiceRestClient;

    public InterferenceMatrixClientController(CommonRestService commonRestService, InterMatrixTaskRestClient interMatrixTaskRestClient, InterMatrixServiceRestClient interMatrixServiceRestClient) {
        this.commonRestService = commonRestService;
        this.interMatrixTaskRestClient = interMatrixTaskRestClient;
        this.interMatrixServiceRestClient = interMatrixServiceRestClient;
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
        log.debug("访问干扰矩阵计算页面。account={}", account);

        if (!commonRestService.validateUser(account)) {
            model.put("error", "非法登录用户，请选择正常渠道登录，谢谢！");
            sessionStatus.setComplete();
            return "rno_fail";
        }

        model.put("areaObj", commonRestService.getAreaByAccount(account, -1));
        return "rno_lte_interfer_matrix";
    }

    /**
     * 返回首页
     */
    @PostMapping
    public String indexPost(Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId) {
        log.debug("访问首页。account={},cityId={}", account, cityId);
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        return "rno_lte_interfer_matrix";
    }

    /**
     * 跳转到任务信息页面
     */
    @RequestMapping("/createTask")
    public String createTask(Map<String, Object> model, @ModelAttribute("account") String account, @RequestParam(defaultValue = "-1") long cityId) {
        log.debug("进入方法：createTask。account={},cityId={}", account, cityId);
        model.put("areaObj", commonRestService.getAreaByAccount(account, cityId));
        return "rno_lte_interfer_matrix_add";
    }

    /**
     * 查询Lte干扰矩阵计算任务
     */
    @RequestMapping("/queryTaskByPage")
    @ResponseBody
    public PageResultBody queryTaskByPage(@ModelAttribute("account") String account, TaskQueryCond cond, Page page) {
        log.debug("进入方法：queryTaskByPage。cond = {},page = {}", cond, page);
        cond.setAccount(account);
        cond.recognizeSubmitTime();
        PageCondBody<TaskQueryCond> condBody = new PageCondBody<>();
        condBody.setCond(cond);
        condBody.setPage(page);
        log.debug("queryTaskByPage。condBody={}", condBody);
        return interMatrixTaskRestClient.queryTaskByPage(condBody);
    }

    /**
     * 检查这周是否计算过lte干扰矩阵
     */
    @RequestMapping("/isExistedTaskThisWeek")
    @ResponseBody
    public Map<String, Object> isExistedTaskThisWeek(long cityId) {
        log.debug("进入方法:isExistedTaskThisWeek.cityId={}", cityId);
        return interMatrixTaskRestClient.isExistedTaskThisWeek(cityId);
    }

    /**
     * 通过城市ID检查任务名是否可用
     */
    @RequestMapping("/checkTaskName")
    @ResponseBody
    public String checkTaskName(long cityId, String taskName) {
        log.debug("进入方法:checkTaskName.cityId={},taskName={}", cityId, taskName);
        boolean result = interMatrixTaskRestClient.checkTaskName(cityId, taskName);
        if (result) {
            return "success";
        }
        return "fail";
    }

    /**
     * 分页加载数据记录
     */
    @RequestMapping("/queryDataRecordByPage")
    @ResponseBody
    public PageResultBody queryDataRecordByPage(DataCond cond, Page page) {
        log.debug("进入方法:queryDataRecordByPage.cond={},page={}", cond, page);
        PageCondBody<DataCond> condBody = new PageCondBody<>();
        cond.setMeaBegTime(cond.getMeaBegTime().replace("-", ""));
        cond.setMeaEndTime(cond.getMeaEndTime().replace("-", ""));

        condBody.setCond(cond);
        condBody.setPage(page);
        return interMatrixServiceRestClient.queryDataRecordByPage(condBody);
    }

    /**
     * 新增LTE干扰矩阵计算任务
     */
    @RequestMapping("/submitTask")
    @ResponseBody
    public InterferenceMatrixSubmitResult submitTask(@ModelAttribute("account") String account, InterferenceMatrixTaskRecord cond) {
        log.debug("进入方法:submitTask。cond={}, account={}", cond, account);
        cond.setAccount(account);

        InterferenceMatrixSubmitResult submitResult = new InterferenceMatrixSubmitResult();
        submitResult.setDateRight(true);
        submitResult.setDataType(cond.getDataType());
        submitResult.setResult(false);

        String msg;
        try {
            // 判断日期范围是否存在MR数据
            DataCond dataCond = new DataCond();
            dataCond.setCityId(cond.getCityId());
            dataCond.setMeaBegTime(cond.getMeaBegTime().replace("-", ""));
            dataCond.setMeaEndTime(cond.getMeaEndTime().replace("-", ""));
            dataCond.setType("MR");
            long mrCnt = interMatrixServiceRestClient.queryDataCnt(dataCond);
            dataCond.setType("HO");
            long hoCnt = interMatrixServiceRestClient.queryDataCnt(dataCond);

            // 数据量
            long sfCnt = cond.getSfFileCounts();
            long recordNum = mrCnt + hoCnt + sfCnt;
            String dataDescription = "MR:" + mrCnt + ";HO:" + hoCnt + ";SF:" + sfCnt;
            cond.setRecordNum(recordNum);
            cond.setDataDescription(dataDescription);

            boolean mrExist = mrCnt > 0;
            boolean hoExist = hoCnt > 0;
            submitResult.setMrExist(mrExist);
            submitResult.setHoExist(hoExist);
            log.debug("submitTask.submitResult={}", submitResult);
            if (mrExist || hoExist) {
                SubmitResult result = interMatrixTaskRestClient.submitTask(cond);
                if (null != result && result.isFlag()) {
                    result = interMatrixServiceRestClient.startTask(result.getJobId());
                }
                if (null != result) {
                    submitResult.setResult(result.isFlag());
                    msg = result.getResult();
                    log.info(msg);
                } else {
                    msg = "任务提交失败！";
                    log.error(msg);
                }
            } else {
                msg = "没有数据，不提交任务！";
                log.error(msg);
            }
        } catch (Exception e) {
            e.printStackTrace();
            msg = "创建任务失败！";
            log.error(msg);
        }
        submitResult.setMsg(msg);
        log.debug("退出方法：submitTask.submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 下载结果文件
     */
    @RequestMapping("/downloadResultFile")
    @ResponseBody
    public ResponseEntity downloadResultFile(long jobId) {
        log.debug("进入方法：downloadResultFile。下载LTE干扰矩阵结果文件， jobId=" + jobId);
        FileResult fileResult = interMatrixServiceRestClient.downloadResultFile(jobId);

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
