package com.hgicreate.rno.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

/**
 * Created by chao_xj on 2017/3/1.
 */
@FeignClient(name = "${rno.lte.service.gis:rno-lte-gis-service}",fallback =RnoGisServiceFallback.class)
public interface RnoGisService {

    /*   动态覆盖    */

    /**
     * 获取MR动态覆盖数据供前端贝兹曲线
     */
    @RequestMapping("/get4GDynaCoverageData2ForAction")
    Map<String, List<Map<String, Object>>> get4GDynaCoverageData2ForAction(
            @RequestParam("lteCellId") String lteCellId, @RequestParam("cityId") long cityId,
            @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate,
            @RequestParam("imgCoeff") double imgCoeff, @RequestParam("imgSizeCoeff") double imgSizeCoeff);

    /**
     * in干扰
     */
    @RequestMapping("/get4GDynaCoverageInInferDataForAction")
    List<Map<String, String>> get4GDynaCoverageInInferDataForAction(
            @RequestParam("lteCellId") String lteCellId, @RequestParam("cityId") long cityId,
            @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate);

    /**
     * out干扰
     */
    @RequestMapping("/get4GDynaCoverageOutInferDataForAction")
    List<Map<String, String>> get4GDynaCoverageOutInferDataForAction(
            @RequestParam("lteCellId") String lteCellId, @RequestParam("cityId") long cityId,
            @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate);

    /*     PCI评估     */

    /**
     * in干扰
     */
    @RequestMapping("/in")
    List<Map<String, Object>> in(@RequestParam("jobId") int jobId,@RequestParam("cellId") String cellId);

    /**
     * out干扰
     */
    @RequestMapping("/out")
    List<Map<String, Object>> out(@RequestParam("jobId") int jobId,@RequestParam("ncellId") String ncellId);

    /**
     * pci干扰
     */
    @RequestMapping("/pci")
    List<Map<String, Object>> pci(@RequestParam("jobId") int jobId,@RequestParam("cellId") String cellId);

    /**
     * 转换lte小区与某同站小区的pci
     */
    @RequestMapping("/changeLteCellPciForAjaxAction")
    Map<String, Boolean> changeLteCellPciForAjaxAction(
            @RequestParam("cell1") String cell1,@RequestParam("cell2") String cell2,
            @RequestParam("pci1") String pci1,@RequestParam("pci2") String pci2);

}
