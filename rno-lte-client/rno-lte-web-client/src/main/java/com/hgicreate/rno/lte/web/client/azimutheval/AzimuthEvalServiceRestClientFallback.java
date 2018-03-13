package com.hgicreate.rno.lte.web.client.azimutheval;

import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.datamgt.FileResult;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AzimuthEvalServiceRestClientFallback implements AzimuthEvalServiceRestClient {
    private static final String failMsg = "找不到LTE天线方位角评估服务。";

    @Override
    public SubmitResult startTask(long jobId) {
        log.info("开始任务失败。");
        return ClientTool.submitTaskFail(failMsg);
    }

    @Override
    public FileResult downloadResultFile(long jobId) {
        log.info("下载文件失败。");
        return ClientTool.downloadFileFail(failMsg);
    }
}
