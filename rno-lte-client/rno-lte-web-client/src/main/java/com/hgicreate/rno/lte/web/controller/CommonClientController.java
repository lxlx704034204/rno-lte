package com.hgicreate.rno.lte.web.controller;

import com.hgicreate.rno.lte.web.model.Page;
import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.service.CommonRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.Map;

@Slf4j
@Controller
@SessionAttributes("account")
public class CommonClientController {

    private CommonRestService commonRestService;

    public CommonClientController(CommonRestService commonRestService) {
        this.commonRestService = commonRestService;
    }

    /**
     * 访问首页
     */
    @GetMapping("/")  //如果不指定action会拦截对css js 等资源的访问
    public String indexGet() {
        return "index";
    }

    /**
     * 查询指定job的报告
     */
    @RequestMapping("/queryReportByPage")
    @ResponseBody
    public PageResultBody queryReportByPage(Long jobId, Page page) {
        log.debug("进入方法:queryReportByPage.jobId={},page={}", jobId, page);
        PageCondBody<Long> condBody = new PageCondBody<>();
        condBody.setCond(jobId);
        condBody.setPage(page);
        return commonRestService.queryReportByPage(condBody);
    }

    /**
     * 终止任务
     */
    @RequestMapping("/stopJobByJobId")
    @ResponseBody
    public Map<String, Object> stopJobByJobId(Long jobId) {
        log.debug("进入方法：stopJobByJobId。jobId={}", jobId);
        return commonRestService.stopJobByJobId(jobId);
    }
}
