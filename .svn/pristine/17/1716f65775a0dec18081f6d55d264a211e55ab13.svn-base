package com.hgicreate.rno.lte.common.controller.datamgt;

import com.hgicreate.rno.lte.common.model.Page;
import com.hgicreate.rno.lte.common.model.PageCondBody;
import com.hgicreate.rno.lte.common.model.PageResultBody;
import com.hgicreate.rno.lte.common.model.datamgt.DataRecordCond;
import com.hgicreate.rno.lte.common.model.datamgt.DataStats;
import com.hgicreate.rno.lte.common.model.datamgt.FileCond;
import com.hgicreate.rno.lte.common.model.datamgt.FileSaveResult;
import com.hgicreate.rno.lte.common.service.datamgt.DataStatsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/dataMgt")
public class DataMgtController {
    private final DataStatsService dataStatsService;

    public DataMgtController(DataStatsService dataStatsService) {
        this.dataStatsService = dataStatsService;
    }

    /**
     * 查询数据记录
     */
    @PostMapping("/queryDataRecord")
    public PageResultBody queryDataRecord(@RequestBody PageCondBody<DataRecordCond> condBody) {
        log.debug("进入方法:queryDataRecord。condBody = {}", condBody);
        DataRecordCond cond = condBody.getCond();
        Page page = condBody.getPage();

        Pageable pageable = new PageRequest(page.getCurrentPage() - 1, page.getPageSize());
        org.springframework.data.domain.Page<DataStats> result = dataStatsService.findAll(cond, pageable);

        page.setTotalCnt(result.getTotalElements());
        page.setTotalPageCnt(result.getTotalPages());
        page.setForcedStartIndex(-1);

        PageResultBody resultBody = new PageResultBody();
        resultBody.setResult("success");
        resultBody.setData(result.getContent() == null ? Collections.emptyList() : result.getContent());
        resultBody.setPage(page);
        log.debug("退出方法:queryDataRecord。resultBody = {}", resultBody);
        return resultBody;
    }

    /**
     * 查询指定城市前5条数据记录
     */
    @GetMapping("/findByAreaIdAndDataType")
    public List<Date> findByAreaIdAndDataType(long areaId, String dataType) {
        log.debug("进入方法:findByAreaIdAndDataType。areaId = {},dataType = {}", areaId, dataType);
        List<Date> result = dataStatsService.findByAreaIdAndDataType(areaId, dataType);
        log.debug("退出方法:findByAreaIdAndDataType。result = {}", result);
        return result;
    }

    /**
     * 导入文件
     */
    @RequestMapping("/importFile")
    public FileSaveResult importFile(@RequestBody FileCond<DataRecordCond> fileCond) {
        log.debug("进入方法：importFile。fileCond = {}", fileCond);
        FileSaveResult fileSaveResult = dataStatsService.importFile(fileCond);
        log.debug("退出方法：importFile。fileSaveResult = {}", fileSaveResult);
        return fileSaveResult;
    }
}
