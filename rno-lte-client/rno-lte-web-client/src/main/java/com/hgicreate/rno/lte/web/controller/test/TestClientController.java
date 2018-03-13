package com.hgicreate.rno.lte.web.controller.test;

import com.hgicreate.rno.lte.web.client.test.Test2RestClient;
import com.hgicreate.rno.lte.web.client.test.TestRestClient;
import com.hgicreate.rno.lte.web.model.Cell;
import com.hgicreate.rno.lte.web.model.CellMgrCond;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;
import java.util.Collections;

@Slf4j
@Controller
public class TestClientController {

    private final TestRestClient testRestClient;

    private final Test2RestClient test2RestClient;

    public TestClientController(TestRestClient testRestClient, Test2RestClient test2RestClient) {
        this.testRestClient = testRestClient;
        this.test2RestClient = test2RestClient;
    }

    @GetMapping("/get3")
    @ResponseBody
    public String get() {
        log.debug("进入方法:test.");
        log.debug("test1={}", testRestClient.getAreaByAccount2("liuyp", -1));
        log.debug("test2={}", test2RestClient.getAreaByAccount3("liuyp", -1));
        return "in";
    }

    @GetMapping("/get4")
    @ResponseBody
    public String get4() {
        log.debug("进入方法:get4.");
        CellMgrCond cond = new CellMgrCond();
        cond.setAreaIds(Collections.singletonList(440100L));
//        cond.setCellId("681269-6");
        cond.setCellName("广州西区芳村大道D-ZLH-103");
//        cond.setENodeB("681269");
//        cond.setPci(254);

        cond.setCurrentPage(0);
        cond.setPageSize(25);
        log.debug("cond={}", cond);
        log.debug("test1={}", test2RestClient.findByPage(cond));
        log.debug("test5={}", test2RestClient.getReportsByJobId(2, 0, 5));
        log.debug("test6={}", test2RestClient.getReportsByJobId2(2, 0, 5));
        log.debug("test6={}", test2RestClient.getReportsByJobId3(2, 0, 5));
        return "in2";
    }

    @GetMapping("/get5")
    @ResponseBody
    public Collection<Cell> get5() {
        log.debug("进入方法:get4.");
        CellMgrCond cond = new CellMgrCond();
        cond.setAreaIds(Collections.singletonList(440100L));
//        cond.setCellId("681269-6");
        cond.setCellName("广州西区芳村大道D-ZLH-103");
//        cond.setENodeB("681269");
//        cond.setPci(254);

        cond.setCurrentPage(0);
        cond.setPageSize(25);
        log.debug("cond={}", cond);

//        PagedResources<Cell> cells = test2RestClient.findByPage(cond);
        PagedResources<Cell> cells = test2RestClient.findByPage2(cond);
//        PagedResources<Resource<Cell>> cells = test2RestClient.findByPage3(cond);

        log.debug("test1={}", cells);
        return cells.getContent();
    }
}
