package com.hgicreate.rno.lte.azimutheval.client;

import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalResult;
import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class AzimuthEvalTaskRestClientFallback implements AzimuthEvalTaskRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public AzimuthEvalTask queryTaskRecordByJobId(long jobId) {
        log.debug("获取任务记录失败。");
        return null;
    }

    @Override
    public boolean updateTaskStatus(long jobId, String jobStatus) {
        log.debug("更新任务状态失败。");
        return false;
    }

    @Override
    public List<AzimuthEvalResult> queryResultByJobId(long jobId) {
        log.debug("获取任务结果失败。");
        return Collections.emptyList();
    }

    @Override
    public Long saveResult(List<AzimuthEvalResult> azimuthEvalResults) {
        log.debug("保存任务结果失败。");
        return 0L;
    }
}
