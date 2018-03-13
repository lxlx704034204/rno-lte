package com.hgicreate.rno.lte.web.client.datamgt;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.datamgt.DataRecordCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileSaveResult;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DataMgtRestClientFallback implements DataMgtRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public PageResultBody queryDataRecord(PageCondBody<DataRecordCond> condBody) {
        log.debug("查询数据记录失败。");
        return ClientTool.emptyResultBody(condBody.getPage(), failMsg);
    }

    @Override
    public FileSaveResult importFile(FileCond<DataRecordCond> fileCond) {
        log.debug("导入失败");
        return ClientTool.saveFileFail(failMsg);
    }
}
