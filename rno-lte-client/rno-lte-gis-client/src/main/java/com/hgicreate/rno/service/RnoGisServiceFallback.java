package com.hgicreate.rno.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Created by chao_xj on 2017/3/3.
 */
@Slf4j
@Component
public class RnoGisServiceFallback implements RnoGisService{

    /*动态覆盖*/

    @Override
    public Map<String, List<Map<String, Object>>> get4GDynaCoverageData2ForAction( String lteCellId,  long cityId,String startDate,String endDate,double imgCoeff,double imgSizeCoeff) {
        log.info("动态覆盖 获取动态覆盖业务数据失败。");
        return Collections.emptyMap();
    }

    @Override
    public List<Map<String, String>> get4GDynaCoverageInInferDataForAction( String lteCellId, long cityId, String startDate,  String endDate) {
        log.info("动态覆盖 获取IN干扰数据失败。");
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, String>> get4GDynaCoverageOutInferDataForAction( String lteCellId,  long cityId,  String startDate,  String endDate) {
        log.info("动态覆盖 获取OUT干扰数据失败。");
        return Collections.emptyList();
    }

    /* PCI评估 */

    @Override
    public List<Map<String, Object>> in(@PathVariable("jobId") int jobId, @PathVariable("cellId") String cellId) {
        log.info("PCI评估 IN失败。");
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> out(@PathVariable("jobId") int jobId, @PathVariable("ncellId") String ncellId) {
        log.info("PCI评估 OUT 失败。");
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> pci(@PathVariable("jobId") int jobId, @PathVariable("cellId") String cellId) {
        log.info("PCI评估 PCI 失败。");
        return Collections.emptyList();
    }

    @Override
    public Map<String, Boolean> changeLteCellPciForAjaxAction(@PathVariable("cell1") String cell1, @PathVariable("cell2") String cell2, @PathVariable("pci1") String pci1, @PathVariable("pci2") String pci2) {
        log.info("PCI评估 更新小区PCI失败。");
        return Collections.emptyMap();
    }
}
