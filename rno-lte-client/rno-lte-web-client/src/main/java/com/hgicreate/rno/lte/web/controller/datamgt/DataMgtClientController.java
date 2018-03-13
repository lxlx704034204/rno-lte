package com.hgicreate.rno.lte.web.controller.datamgt;

import com.hgicreate.rno.lte.web.client.datamgt.DataMgtRestClient;
import com.hgicreate.rno.lte.web.model.Page;
import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.datamgt.DataRecordCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileContainer;
import com.hgicreate.rno.lte.web.model.datamgt.FileSaveResult;
import com.hgicreate.rno.lte.web.service.CommonRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Controller
@SessionAttributes("account")
@RequestMapping({"/dataMgt", "/dm"})
public class DataMgtClientController {

    private final CommonRestService commonRestService;

    private final DataMgtRestClient dataMgtRestClient;

    public DataMgtClientController(CommonRestService commonRestService, DataMgtRestClient dataMgtRestClient) {
        this.commonRestService = commonRestService;
        this.dataMgtRestClient = dataMgtRestClient;
    }

    /**
     * 将account注入到session中
     */
    @ModelAttribute("account")
    public String user(String account) {
        return account == null ? "" : account;
    }

    @GetMapping
    public String index(Map<String, Object> model, String account, SessionStatus sessionStatus) {
        log.debug("进入数据管理页。");
        if (null == account || !commonRestService.validateUser(account)) {
            model.put("error", "非法登录用户，请选择正常渠道登录，谢谢！");
            sessionStatus.setComplete();
            return "rno_fail";
        }
        model.put("areaObj", commonRestService.getAreaByAccount(account, -1));
        return "rno_lte_data_mgt";
    }

    @GetMapping("/data")
    @ResponseBody
    public PageResultBody queryDataRecord(@ModelAttribute("account") String account, DataRecordCond cond, Page page) {
        log.debug("进入方法：queryDataRecord。cond={},page={}", cond, page);
        PageCondBody<DataRecordCond> condBody = new PageCondBody<>();
        cond.recognizeCreateTime();
        condBody.setCond(cond);
        condBody.setPage(page);
        log.debug("开始访问服务：queryDataRecord。condBody={}", condBody);
        PageResultBody resultBody = dataMgtRestClient.queryDataRecord(condBody);
        log.debug("退出方法：queryDataRecord。resultBody={}", resultBody);
        return resultBody;
    }

    @PostMapping("/data")
    @ResponseBody
    public FileSaveResult importFile(@ModelAttribute("account") String account, DataRecordCond cond, MultipartFile file) {
        log.debug("进入方法：importFile。cond={}", cond);
        cond.setCreator(account);
        FileSaveResult fileSaveResult = new FileSaveResult();
        fileSaveResult.setMsg("未知错误。");
        if (null != file && !file.isEmpty()) {
            log.debug("importFile。oriFilename={}", file.getOriginalFilename());
            FileCond<DataRecordCond> fileCond = new FileCond<>();
            fileCond.setCond(cond);
            try {
                FileContainer fileContainer = new FileContainer();
                fileContainer.setFilename(file.getOriginalFilename());
                fileContainer.setFileBody(file.getBytes());
                fileContainer.setFileLength(file.getSize());
                fileCond.setFileContainer(fileContainer);
            } catch (IOException e) {
                e.printStackTrace();
            }
            fileSaveResult = dataMgtRestClient.importFile(fileCond);
        } else {
            fileSaveResult.setMsg("未获取到上传文件。");
        }
        log.debug("退出方法：importFile。fileSaveResult={}", fileSaveResult);
        return fileSaveResult;
    }
}
