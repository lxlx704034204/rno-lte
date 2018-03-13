package com.hgicreate.rno.lte.pciafp.client;

import com.hgicreate.rno.lte.pciafp.model.*;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}", fallback = PciAfpTaskRestClientFallback.class, path = "/pciAfp")
public interface PciAfpTaskRestClient {
    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    @GetMapping("/queryTaskRecord/{jobId}")
    PciAfpTask queryTaskRecordByJobId(@PathVariable("jobId") long jobId);

    /**
     * 更新task状态
     */
    @PostMapping("/updateTaskStatus/{jobId}")
    Boolean updateTaskStatus(@PathVariable("jobId") long jobId, @RequestParam("jobStatus") String jobStatus);

    /**
     * 通过模块类型获取阈值门限对象集合
     */
    @GetMapping("/getThresholds/{moduleType}")
    List<Threshold> getThresholdsByModuleType(@PathVariable("moduleType") String moduleType);

    /**
     * 通过jobId获取页面自定义的阈值门限值
     */
    @GetMapping("/queryParamInfo/{jobId}")
    List<PciAfpParam> queryParamInfo(@PathVariable("jobId") long jobId);

    /**
     * 获取干扰矩阵导入计算信息
     */
    @GetMapping("/getMatrixInfo/{matrixDcId}")
    DataCollectRecord getMatrixInfo(@PathVariable("matrixDcId") long matrixDcId);

    /**
     * 保存最佳方案
     */
    @PostMapping("/saveBestPlan")
    Long saveBestPlan(@RequestBody List<PlanItem> items);

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryBestPlan/{jobId}")
    List<PlanItem> queryBestPlanByJobId(@PathVariable("jobId") long jobId);

    /**
     * 保存中间方案
     */
    @PostMapping("/saveBestPlan")
    Long saveMidPlan(@RequestBody List<PlanItem> items);

    /**
     * 获取中间方案个数
     */
    @GetMapping("/queryMidPlanCnt/{jobId}")
    Long queryMidPlanCntByJobId(@PathVariable("jobId") long jobId);

    /**
     * 获取中间方案
     */
    @GetMapping("/queryMidPlan/{jobId}/{planNum}")
    List<PlanItem> queryMidPlanByJobId(@PathVariable("jobId") long jobId, @PathVariable("planNum") int planNum);

    /**
     * 保存邻区核查方案
     */
    @PostMapping("/saveBestPlan")
    Long saveNcCheckPlan(@RequestBody List<PlanItem> items);

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryNcCheckPlan/{jobId}")
    List<PlanItem> queryNcCheckPlanByJobId(@PathVariable("jobId") long jobId);

    /**
     * 保存关联表数据
     */
    @PostMapping("/saveBestPlan")
    Long saveRelevancyTable(@RequestBody List<Cell2Rela> relas);

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryRelevancyTable/{jobId}")
    List<Cell2Rela> queryRelevancyTableByJobId(@PathVariable("jobId") long jobId);

    /**
     * 保存中间方案
     */
    @PostMapping("/saveBestPlan")
    Long saveTopCell(@RequestBody List<Cell2Inter> inters);

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryTopCell/{jobId}/{planNum}")
    List<Cell2Inter> queryTopCellByJobId(@PathVariable("jobId") long jobId, @PathVariable("planNum") int planNum);

    /**
     * 保存d1小区表
     */
    @PostMapping("/saveBestPlan")
    Long saveD1Cell(@RequestBody List<Cell2Inter> inters);

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryD1Cell/{jobId}")
    List<Cell2Inter> queryD1CellByJobId(@PathVariable("jobId") long jobId);

    /**
     * 保存d2小区表
     */
    @PostMapping("/saveBestPlan")
    Long saveD2Cell(@RequestBody List<Cell2Inter> inters);

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryD2Cell/{jobId}")
    List<Cell2Inter> queryD2CellByJobId(@PathVariable("jobId") long jobId);
}
