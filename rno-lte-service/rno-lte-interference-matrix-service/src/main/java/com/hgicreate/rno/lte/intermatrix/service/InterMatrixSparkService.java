package com.hgicreate.rno.lte.intermatrix.service;

import com.hgicreate.rno.lte.intermatrix.model.DataCond;

import java.util.List;
import java.util.Map;

public interface InterMatrixSparkService {

    /**
     * 查询数据记录的数量
     */
    Long queryDataRecordCnt(DataCond cond);

    /**
     * 分页查询数据记录
     */
    List<Map<String, Object>> queryDataRecordByPage(DataCond cond);

    /**
     * 获取数据的数量
     */
    Long queryDataCnt(DataCond cond);

    /**
     * 处理临时表
     */
    void handleTempTable(DataCond cond);

    /**
     * 计算干扰矩阵(mr,ho,sf)
     */
    Long createMatrix(Map<String, Object> map);

    /**
     * 计算干扰矩阵(mr,ho)
     */
    Long createMatrixWithoutSf(Map<String, Object> map);

    /**
     * 根据任务id获取LTE干扰矩阵任务计算结果
     */
    List<Map<String, Object>> queryResultByJobId(long jobId);
}
