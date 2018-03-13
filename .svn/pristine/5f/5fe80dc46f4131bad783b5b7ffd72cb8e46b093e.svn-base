package com.hgicreate.rno.lte.pciafp.service;

import com.hgicreate.rno.lte.pciafp.model.*;

import java.util.List;

public interface PciAfpRestService {

    /**
     * 更新任务自身状态
     */
    boolean updateOwnProgress(long jobId, String jobStatus);

    /**
     * 通过 jobId 获取Lte方位角计算记录信息
     */
    PciAfpTask queryTaskRecordByJobId(long jobId);

    /**
     * 通过模块类型获取阈值门限对象集合
     */
    List<Threshold> getThresholdsByModuleType(String moduleType);

    /**
     * 通过jobId获取页面自定义的阈值门限值
     */
    List<PciAfpParam> queryParamInfo(long jobId);

    /**
     * 获取干扰矩阵导入计算信息
     */
    DataCollectRecord getMatrixInfo(long matrixDcId);

    /**
     * 保存最佳方案
     */
    Long batchInsertBestPlan(List<PlanItem> items);

    /**
     * 获取最佳方案
     */
    List<PlanItem> queryBestPlanByJobId(long jobId);

    /**
     * 保存中间方案
     */
    Long batchInsertMidPlan(List<PlanItem> items);

    /**
     * 获取中间方案个数
     */
    Long queryMidPlanCntByJobId(long jobId);

    /**
     * 获取中间方案
     */
    List<PlanItem> queryMidPlanByJobId(long jobId, int planNum);

    /**
     * 保存邻区核查方案
     */
    Long batchInsertNcCheckPlan(List<PlanItem> items);

    /**
     * 获取最佳方案
     */
    List<PlanItem> queryNcCheckPlanByJobId(long jobId);

    /**
     * 保存关联表数据
     */
    Long batchInsertRelevancyTable(List<Cell2Rela> relas);

    /**
     * 获取最佳方案
     */
    List<Cell2Rela> queryRelevancyTableByJobId(long jobId);

    /**
     * 保存中间方案
     */
    Long batchInsertTopCell(List<Cell2Inter> inters);

    /**
     * 获取最佳方案
     */
    List<Cell2Inter> queryTopCellByJobId(long jobId,int planNum);

    /**
     * 保存d1小区表
     */
    Long batchInsertD1Cell(List<Cell2Inter> inters);

    /**
     * 获取最佳方案
     */
    List<Cell2Inter> queryD1CellByJobId(long jobId);

    /**
     * 保存d2小区表
     */
    Long batchInsertD2Cell(List<Cell2Inter> inters);

    /**
     * 获取最佳方案
     */
    List<Cell2Inter> queryD2CellByJobId(long jobId);
}
