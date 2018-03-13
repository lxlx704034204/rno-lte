package com.hgicreate.rno.lte.common.controller;

import com.hgicreate.rno.lte.common.model.PageCondBody;
import com.hgicreate.rno.lte.common.model.PageResultBody;
import com.hgicreate.rno.lte.common.model.Report;
import com.hgicreate.rno.lte.common.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Slf4j
@CrossOrigin
@RestController
public class ReportController {

    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    /**
     * 通过区域级别获取区域
     */
    @GetMapping("/getReportsByJobId")
    public PagedResources<Resource<Report>> getReportsByJobId(@RequestParam("jobId") long jobId, @RequestParam("page") int page, @RequestParam("size") int size, PagedResourcesAssembler<Report> assembler) {
        log.debug("进入方法：getReportsByJobId。jobId={},page={},size={}", jobId, page, size);
        Page<Report> reports = reportService.getReportsByJobId(jobId, new PageRequest(page, size));
        log.debug("退出方法：getReportsByJobId。reports.size={}", reports.getSize());
        return assembler.toResource(reports);
    }

    /**
     * 查询指定job的报告
     */
    @RequestMapping("/queryReportByPage")
    public PageResultBody queryReportByPage(@RequestBody PageCondBody<Long> condBody) {
        log.debug("进入方法:queryReportByPage。condBody = {}", condBody);
        Long jobId = condBody.getCond();
        com.hgicreate.rno.lte.common.model.Page page = condBody.getPage();

        Pageable pageable = new PageRequest(page.getCurrentPage() - 1, page.getPageSize());
        org.springframework.data.domain.Page result = reportService.getReportsByJobId(jobId, pageable);

        page.setTotalCnt(result.getTotalElements());
        page.setTotalPageCnt(result.getTotalPages());
        page.setForcedStartIndex(-1);

        PageResultBody resultBody = new PageResultBody();
        resultBody.setResult("success");
        resultBody.setData(result.getContent() == null ? Collections.emptyList() : result.getContent());
        resultBody.setPage(page);
        return resultBody;
    }

    /**
     * 增加一条新的报告记录
     */
    @PostMapping("/saveReport")
    public Report saveReport(@RequestBody Report report) {
        log.debug("进入方法:saveReport。report = {}", report);
        return reportService.saveReport(report);
    }
}
