package com.hgicreate.rno.service;

import com.hgicreate.rno.model.Area;
import com.hgicreate.rno.model.Cell;
import com.hgicreate.rno.model.CellMgrCond;
import com.hgicreate.rno.model.InterMatrixTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.PagedResources;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class CommonRestClientFallback implements CommonRestClient {

    @Override
    public Boolean verifyUserIdentity(String account) {
        log.info("验证用户失败。");
        return false;
    }

    @Override
    public List<Area> getAreaByAccount(String account, long cityId) {
        log.info("获取区域失败。");
        return Collections.emptyList();
    }

    @Override
    public List<Area> getSubAreaByParent(String account, long parentAreaId, String subAreaLevel) {
        log.info("获取子区域失败。");
        return Collections.emptyList();
    }

    @Override
    public PagedResources<Cell> findByPage(@RequestBody CellMgrCond cond){
        log.info("分页获取小区信息失败。");
        return null;
    }

    @Override
    public List<Cell> findAll(@RequestBody CellMgrCond cond){
        log.info("获取全部小区信息失败。");
        return Collections.emptyList();
    }

    @Override
    public List<InterMatrixTask> getLatelyLteMatrixByCityId(@PathVariable("cityId") long cityId){
        log.info("通过当前城市获取最近干扰矩阵信息失败。");
        return Collections.emptyList();
    }

    @Override
    public List<Date> findByAreaIdAndDataType(long areaId, String dataType){
        log.info("查询指定城市前5条数据记录。");
        return Collections.emptyList();
    }

    @Override
    public List<Cell> getSameStationCellsByCellId(String cellId) {
        log.info("获取同站小区数据记录失败。");
        return Collections.emptyList();
    }
}
