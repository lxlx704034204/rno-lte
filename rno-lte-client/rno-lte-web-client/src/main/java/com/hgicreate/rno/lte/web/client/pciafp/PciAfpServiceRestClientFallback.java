package com.hgicreate.rno.lte.web.client.pciafp;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.DataCond;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Component
public class PciAfpServiceRestClientFallback implements PciAfpServiceRestClient {
    private static final String failMsg = "找不到PCI区域翻频服务。";

    @Override
    public SubmitResult startTask(long jobId) {
        log.info("开始任务失败。");
        return ClientTool.submitTaskFail(failMsg);
    }

    @Override
    public FileResult downloadResultFile(@PathVariable("jobId") long jobId) {
        log.info("下载文件失败。");
        return ClientTool.downloadFileFail(failMsg);
    }

    @Override
    public PageResultBody querySfFileByPage(@RequestBody PageCondBody<DataCond> condBody) {
        log.info("分页查询扫频文件失败。");
        return ClientTool.emptyResultBody(condBody.getPage(), failMsg);
    }
}
