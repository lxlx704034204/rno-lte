package com.hgicreate.rno.lte.web.client.intermatrix;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.DataCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@Component
public class InterMatrixServiceRestClientFallback implements InterMatrixServiceRestClient {
    private static final String failMsg = "找不到LTE干扰矩阵服务。";

    @Override
    public PageResultBody queryDataRecordByPage(PageCondBody<DataCond> condBody) {
        log.info("分页查询数据记录失败。");
        return ClientTool.emptyResultBody(condBody.getPage(), failMsg);
    }

    @Override
    public FileResult downloadResultFile(@PathVariable("jobId") long jobId) {
        log.info("下载结果文件失败。");
        return ClientTool.downloadFileFail(failMsg);
    }

    @Override
    public long queryDataCnt(DataCond dataCond) {
        return 0;
    }

    @Override
    public SubmitResult startTask(long jobId) {
        return null;
    }
}
