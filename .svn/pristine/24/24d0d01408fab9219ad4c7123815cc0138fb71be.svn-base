package com.hgicreate.rno.lte.common.controller.pciafp;

import com.hgicreate.rno.lte.common.model.*;
import com.hgicreate.rno.lte.common.model.pciafp.*;
import com.hgicreate.rno.lte.common.service.pciafp.PciAfpResultService;
import com.hgicreate.rno.lte.common.service.pciafp.PciAfpTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/pciAfp")
public class PciAfpTaskController {
    private final PciAfpTaskService pciAfpTaskService;
    private final PciAfpResultService pciAfpResultService;

    public PciAfpTaskController(PciAfpTaskService pciAfpTaskService, PciAfpResultService pciAfpResultService) {
        this.pciAfpTaskService = pciAfpTaskService;
        this.pciAfpResultService = pciAfpResultService;
    }

    /**
     * 查询数据记录
     */
    @PostMapping("/queryTaskByPage")
    public PageResultBody queryTaskByPage(@RequestBody PageCondBody<TaskQueryCond> condBody) {
        log.debug("进入方法:queryTaskByPage。condBody = {}", condBody);
        TaskQueryCond cond = condBody.getCond();
        Page page = condBody.getPage();

        Pageable pageable = new PageRequest(page.getCurrentPage() - 1, page.getPageSize(), Sort.Direction.DESC, "createTime");
        org.springframework.data.domain.Page result = pciAfpTaskService.findAll(cond, pageable);

        page.setTotalCnt(result.getTotalElements());
        page.setTotalPageCnt(result.getTotalPages());
        page.setForcedStartIndex(-1);

        PageResultBody resultBody = new PageResultBody();
        resultBody.setResult("success");
        resultBody.setData(result.getContent() == null ? Collections.emptyList() : result.getContent());
        resultBody.setPage(page);
        log.debug("退出方法：queryTaskByPage。resultBody={}", resultBody);
        return resultBody;
    }

    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    @GetMapping("/queryTaskRecord/{jobId}")
    public AbstractTask queryTaskRecordByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法：queryTaskRecordByJobId。jobId={}", jobId);
        return pciAfpTaskService.findOne(jobId);
    }

    /**
     * 提交LTE 方位角评估分析计算任务
     */
    @PostMapping("/submitTask")
    public SubmitResult submitTask(@RequestBody PciAfpTaskObj cond) {
        log.debug("进入方法:submitTask.cond={}", cond);
        SubmitResult submitResult = pciAfpTaskService.submitTask(cond);
        log.debug("离开方法：submitTask。submitResult={}", submitResult);
        return submitResult;
    }

    /**
     * 更新task状态
     */
    @PostMapping("/updateTaskStatus/{jobId}")
    public boolean updateTaskStatus(@PathVariable("jobId") long jobId, String jobStatus) {
        log.debug("进入方法：updateTaskStatus。jobId={},jobStatus={}", jobId, jobStatus);
        return pciAfpTaskService.updateTaskStatus(jobId, jobStatus);
    }

    /**
     * 通过模块类型获取阈值门限对象集合
     */
    @GetMapping("/getThresholds/{moduleType}")
    public List<Threshold> getThresholdsByModuleType(@PathVariable("moduleType") String moduleType) {
        log.debug("进入方法:getThresholdsByModuleType.moduleType={}", moduleType);
        return pciAfpTaskService.getThresholdsByModuleType(moduleType);
    }

    /**
     * 通过jobId获取页面自定义的阈值门限值
     */
    @GetMapping("/queryParamInfo/{jobId}")
    public List<PciAfpParam> queryParamInfo(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryParamInfo.jobId={}", jobId);
        return pciAfpTaskService.queryParamInfo(jobId);
    }

    /**
     * 获取干扰矩阵导入计算信息
     */
    @GetMapping("/getMatrixInfo/{matrixDcId}")
    public DataCollectRecord getMatrixInfo(@PathVariable("matrixDcId") long matrixDcId) {
        log.debug("进入方法:getMatrixInfo.matrixDcId={}", matrixDcId);
        return pciAfpTaskService.getMatrixInfo(matrixDcId);
    }

    /**
     * 保存最佳方案
     */
    @PostMapping("/saveBestPlan")
    public Integer saveBestPlan(@RequestBody List<BestPlanItem> items) {
        log.debug("进入方法:saveBestPlan.items.size={}", items.size());
        List<BestPlanItem> result = pciAfpResultService.saveBestPlan(items);
        log.debug("退出方法:saveBestPlan.result.size={}", result.size());
        return result.size();
    }

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryBestPlan/{jobId}")
    public List<BestPlanItem> queryBestPlanByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryBestPlanByJobId.jobId={}", jobId);
        return pciAfpResultService.queryBestPlanByJobId(jobId);
    }

    /**
     * 保存中间方案
     */
    @PostMapping("/saveMidPlan")
    public Integer saveMidPlan(@RequestBody List<MidPlanItem> items) {
        log.debug("进入方法:saveMidPlan.items.size={}", items.size());
        return pciAfpResultService.saveMidPlan(items).size();
    }

    /**
     * 获取中间方案个数
     */
    @GetMapping("/queryMidPlanCnt/{jobId}")
    public Long queryMidPlanCntByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryMidPlanCntByJobId.jobId={}", jobId);
        return pciAfpResultService.queryMidPlanCntByJobId(jobId);
    }

    /**
     * 获取中间方案
     */
    @GetMapping("/queryMidPlan/{jobId}/{planNum}")
    public List<MidPlanItem> queryMidPlanByJobId(@PathVariable("jobId") long jobId, @PathVariable("planNum") int planNum) {
        log.debug("进入方法:queryMidPlanByJobId.jobId={},planNum={}", jobId, planNum);
        return pciAfpResultService.queryMidPlanByJobId(jobId, planNum);
    }

    /**
     * 保存邻区核查方案
     */
    @PostMapping("/saveNcCheckPlan")
    public Integer saveNcCheckPlan(@RequestBody List<NcCheckPlanItem> items) {
        log.debug("进入方法:saveNcCheckPlan.items.size={}", items.size());
        return pciAfpResultService.saveNcCheckPlan(items).size();
    }

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryNcCheckPlan/{jobId}")
    public List<NcCheckPlanItem> queryNcCheckPlanByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryNcCheckPlanByJobId.jobId={}", jobId);
        return pciAfpResultService.queryNcCheckPlanByJobId(jobId);
    }

    /**
     * 保存关联表数据
     */
    @PostMapping("/saveRelevancyTable")
    public Integer saveRelevancyTable(@RequestBody List<Cell2Rela> relas) {
        log.debug("进入方法:saveRelevancyTable.items.size={}", relas.size());
        return pciAfpResultService.saveRelevancyTable(relas).size();
    }

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryRelevancyTable/{jobId}")
    public List<Cell2Rela> queryRelevancyTableByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryRelevancyTableByJobId.jobId={}", jobId);
        return pciAfpResultService.queryRelevancyTableByJobId(jobId);
    }

    /**
     * 保存中间方案
     */
    @PostMapping("/saveTopCell")
    public Integer saveTopCell(@RequestBody List<TopCell2Inter> inters) {
        log.debug("进入方法:saveTopCell.items.size={}", inters.size());
        return pciAfpResultService.saveTopCell(inters).size();
    }

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryTopCell/{jobId}/{planNum}")
    public List<TopCell2Inter> queryTopCellByJobId(@PathVariable("jobId") long jobId, @PathVariable("planNum") int planNum) {
        log.debug("进入方法:queryTopCellByJobId.jobId={},planNum={}", jobId, planNum);
        return pciAfpResultService.queryTopCellByJobId(jobId, planNum);
    }

    /**
     * 保存d1小区表
     */
    @PostMapping("/saveD1Cell")
    public Integer saveD1Cell(@RequestBody List<D1Cell2Inter> inters) {
        log.debug("进入方法:saveD1Cell.items.size={}", inters.size());
        return pciAfpResultService.saveD1Cell(inters).size();
    }

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryD1Cell/{jobId}")
    public List<D1Cell2Inter> queryD1CellByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryD1CellByJobId.jobId={}", jobId);
        return pciAfpResultService.queryD1CellByJobId(jobId);
    }

    /**
     * 保存d2小区表
     */
    @PostMapping("/saveD2Cell")
    public Integer saveD2Cell(@RequestBody List<D2Cell2Inter> inters) {
        log.debug("进入方法:saveD2Cell.items.size={}", inters.size());
        return pciAfpResultService.saveD2Cell(inters).size();
    }

    /**
     * 获取最佳方案
     */
    @GetMapping("/queryD2Cell/{jobId}")
    public List<D2Cell2Inter> queryD2CellByJobId(@PathVariable("jobId") long jobId) {
        log.debug("进入方法:queryD2CellByJobId.jobId={}", jobId);
        return pciAfpResultService.queryD2CellByJobId(jobId);
    }
}
