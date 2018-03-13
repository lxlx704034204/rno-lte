package com.hgicreate.rno.lte.web.client.test;

import com.hgicreate.rno.lte.web.model.Area;
import com.hgicreate.rno.lte.web.model.Cell;
import com.hgicreate.rno.lte.web.model.CellMgrCond;
import com.hgicreate.rno.lte.web.model.Report;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}")
public interface Test2RestClient {
    /**
     * 根据用户名和指定城市ID获取允许访问的区域
     */
    @RequestMapping(value = "/getAreaByAccount3", method = GET)
    List<Area> getAreaByAccount3(@RequestParam("account") String account, @RequestParam("cityId") long cityId);

    @PostMapping("/cellMgr/findByPage")
    PagedResources<Cell> findByPage(@RequestBody CellMgrCond cond);

    @PostMapping("/cellMgr/findByPage2")
    PagedResources<Cell> findByPage2(@RequestBody CellMgrCond cond);

    @PostMapping("/cellMgr/findByPage")
    PagedResources<Resource<Cell>> findByPage3(@RequestBody CellMgrCond cond);

    @PostMapping("/cellMgr/findByPage4")
    PagedResources<Cell> findByPage4(@RequestBody CellMgrCond cond);

    @PostMapping("/cellMgr/findByPage5")
    PagedResources<Cell> findByPage5(@RequestBody CellMgrCond cond);

    /**
     * 根据任务ID获取报告
     */
    @RequestMapping(value = "/reports/search/findByJobId", method = GET)
//    Resource<Page<Area>> getReportsByJobId(@RequestParam("jobId") int jobId);
//    PagedResources<Report> getReportsByJobId(@RequestParam("jobId") int jobId);
    PagedResources<Report> getReportsByJobId(@RequestParam("jobId") long jobId, @RequestParam("page") int page, @RequestParam("size") int size);
//    Page<Report> getReportsByJobId(@RequestParam("jobId") int jobId);

    /**
     * 通过区域级别获取区域
     */
    @RequestMapping(value = "/getReportsByJobId", method = GET)
    PagedResources<Report> getReportsByJobId2(@RequestParam("jobId") long jobId, @RequestParam("page") int page, @RequestParam("size") int size);

    /**
     * 通过区域级别获取区域
     */
    @RequestMapping(value = "/getReportsByJobId2", method = GET)
    PagedResources<Report> getReportsByJobId3(@RequestParam("jobId") long jobId, @RequestParam("page") int page, @RequestParam("size") int size);

}
