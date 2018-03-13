package com.hgicreate.rno.lte.intermatrix.client;

import com.hgicreate.rno.lte.intermatrix.model.InterMatrixTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class InterMatrixTaskRestClientFallback implements InterMatrixTaskRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public InterMatrixTask queryTaskRecordByJobId(long jobId) {
        log.debug("获取任务记录失败。");
        return null;
    }

    @Override
    public boolean updateTaskStatus(long jobId, String jobStatus) {
        log.debug("更新任务状态失败。");
        return false;
    }
}
