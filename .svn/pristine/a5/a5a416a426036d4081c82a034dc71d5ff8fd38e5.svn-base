package com.hgicreate.rno.lte.pciafp.client;

import com.hgicreate.rno.lte.pciafp.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class PciAfpTaskRestClientFallback implements PciAfpTaskRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public PciAfpTask queryTaskRecordByJobId(long jobId) {
        log.debug("获取任务记录失败。");
        return null;
    }

    @Override
    public Boolean updateTaskStatus(long jobId, String jobStatus) {
        log.debug("更新任务状态失败。");
        return false;
    }

    @Override
    public List<Threshold> getThresholdsByModuleType(String moduleType) {
        log.debug("获取阈值失败。");
        return Collections.emptyList();
    }

    @Override
    public List<PciAfpParam> queryParamInfo(long jobId) {
        log.debug("获取参数失败。");
        return Collections.emptyList();
    }

    @Override
    public DataCollectRecord getMatrixInfo(long matrixDcId) {
        log.debug("获取干扰矩阵导入信息失败。");
        return null;
    }

    @Override
    public Long saveBestPlan(List<PlanItem> items) {
        log.debug("保存最佳方案失败。");
        return 0L;
    }

    @Override
    public List<PlanItem> queryBestPlanByJobId(long jobId) {
        log.debug("获取最佳方案失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveMidPlan(List<PlanItem> items) {
        log.debug("保存中间方案失败。");
        return 0L;
    }

    @Override
    public Long queryMidPlanCntByJobId(long jobId) {
        log.debug("查询中间方案数量失败。");
        return 0L;
    }

    @Override
    public List<PlanItem> queryMidPlanByJobId(long jobId, int planNum) {
        log.debug("获取中间方案失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveNcCheckPlan(List<PlanItem> items) {
        log.debug("保存邻区核查方案失败。");
        return 0L;
    }

    @Override
    public List<PlanItem> queryNcCheckPlanByJobId(long jobId) {
        log.debug("获取邻区核查方案失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveRelevancyTable(List<Cell2Rela> relas) {
        log.debug("保存关联表失败。");
        return 0L;
    }

    @Override
    public List<Cell2Rela> queryRelevancyTableByJobId(long jobId) {
        log.debug("获取关联表失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveTopCell(List<Cell2Inter> inters) {
        log.debug("保存top小区失败。");
        return 0L;
    }

    @Override
    public List<Cell2Inter> queryTopCellByJobId(long jobId, int planNum) {
        log.debug("获取top小区失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveD1Cell(List<Cell2Inter> inters) {
        log.debug("保存d1小区失败。");
        return 0L;
    }

    @Override
    public List<Cell2Inter> queryD1CellByJobId(long jobId) {
        log.debug("获取d1小区失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveD2Cell(List<Cell2Inter> inters) {
        log.debug("保存d2小区失败。");
        return 0L;
    }

    @Override
    public List<Cell2Inter> queryD2CellByJobId(long jobId) {
        log.debug("获取d2小区失败。");
        return Collections.emptyList();
    }
}
