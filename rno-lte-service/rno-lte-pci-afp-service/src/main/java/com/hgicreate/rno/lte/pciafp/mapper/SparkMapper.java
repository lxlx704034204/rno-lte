package com.hgicreate.rno.lte.pciafp.mapper;

import com.hgicreate.rno.lte.pciafp.model.Cell;
import com.hgicreate.rno.lte.pciafp.model.DataCond;
import com.hgicreate.rno.lte.pciafp.model.InterMatrixResult;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface SparkMapper {

    /**
     * 查询扫频文件总数
     */
    Long querySfFileCnt(DataCond cond);

    /**
     * 分页查询扫频文件
     */
    List<Map<String, String>> querySfFileByPage(DataCond cond);

    /**
     * 查询MR数据的测量时间
     */
    List<String> queryMrMeaDate(Map<String, Object> map);

    /**
     * 准备MR临时表数据
     */
    void createMrTempTable(Map<String, Object> map);

    /**
     * 查询HO数据的测量时间
     */
    List<String> queryHoMeaDate(Map<String, Object> map);

    /**
     * 准备HO临时表数据
     */
    void createHoTempTable(Map<String, Object> map);

    /**
     * 查询SF数据的测量时间
     */
    List<String> querySfMeaDate(Map<String, Object> map);

    /**
     * 准备SF临时表数据
     */
    void createSfTempTable(Map<String, Object> map);

    /**
     * 查询流量数据的测量时间
     */
    List<String> queryFlowMeaDate(Map<String, Object> map);

    /**
     * 准备流量临时表数据
     */
    void createFlowTempTable(Map<String, Object> map);

    /**
     * 计算干扰矩阵(mr,ho,sf)
     */
    Long createMatrix(Map<String, Object> map);

    /**
     * 计算干扰矩阵(mr,ho)
     */
    Long createMatrixWithoutSf(Map<String, Object> map);

    /**
     * 读取d1d2小区数据
     */
    List<Map<String, Object>> getSFd1d2Cell(long jobId);

    /**
     * 读取干扰矩阵数据
     */
    List<InterMatrixResult> getMatrix(long jobId);

    /**
     * 获取流量数据
     */
    List<Map<String, Object>> getFlow(Map<String, Object> map);

    /**
     * 通过城市ID获取lte小区
     */
    List<Cell> getLteCellsByAreaId(long areaId);
}
