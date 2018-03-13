package com.hgicreate.rno.lte.intermatrix.mapper;

import com.hgicreate.rno.lte.intermatrix.model.DataCond;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SparkMapper {
    /**
     * 查询MR数据记录的数量
     */
    Long queryMrDataRecordCnt(DataCond cond);

    /**
     * 分页查询MR数据记录
     */
    List<Map<String, Object>> queryMrDataRecordByPage(DataCond cond);

    /**
     * 获取MR数据数据量
     */
    Long queryMrDataCnt(DataCond cond);

    /**
     * 准备MR临时表数据
     */
    Long createMrTempTable(DataCond cond);

    /**
     * 查询HO数据记录的数量
     */
    Long queryHoDataRecordCnt(DataCond cond);

    /**
     * 分页查询HO数据记录
     */
    List<Map<String, Object>> queryHoDataRecordByPage(DataCond cond);

    /**
     * 获取HO数据数据量
     */
    Long queryHoDataCnt(DataCond cond);

    /**
     * 准备HO临时表数据
     */
    Long createHoTempTable(DataCond cond);

    /**
     * 查询SF数据记录的数量
     */
    Long querySfDataRecordCnt(DataCond cond);

    /**
     * 分页查询SF数据记录
     */
    List<Map<String, Object>> querySfDataRecordByPage(DataCond cond);

    /**
     * 获取SF数据数据量
     */
    Long querySfDataCnt(DataCond cond);

    /**
     * 准备SF临时表数据
     */
    Long createSfTempTable(DataCond cond);

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
