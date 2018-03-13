package com.hgicreate.rno.lte.azimutheval.service;

import com.hgicreate.rno.lte.azimutheval.client.AzimuthEvalTaskRestClient;
import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalResult;
import com.hgicreate.rno.lte.azimutheval.model.AzimuthEvalTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.IntStream;

@Slf4j
@Service
public class AzimuthEvalRestServiceImpl implements AzimuthEvalRestService {

    private final AzimuthEvalTaskRestClient azimuthEvalTaskRestClient;

    @Value("${rno.batch:10000}")
    private int batch;

    public AzimuthEvalRestServiceImpl(AzimuthEvalTaskRestClient azimuthEvalTaskRestClient) {
        this.azimuthEvalTaskRestClient = azimuthEvalTaskRestClient;
    }

    @Override
    public void updateOwnProgress(long jobId, String jobStatus) {
        azimuthEvalTaskRestClient.updateTaskStatus(jobId, jobStatus);
    }

    @Override
    public AzimuthEvalTask queryTaskRecordByJobId(long jobId) {
        return azimuthEvalTaskRestClient.queryTaskRecordByJobId(jobId);
    }

    @Override
    public Long batchInsertResult(List<AzimuthEvalResult> results) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<AzimuthEvalResult>> group = new HashMap<>();
        IntStream.range(0, results.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(results.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(azimuthEvalTaskRestClient.saveResult(e)));

        return cnt.get();
    }

    @Override
    public List<AzimuthEvalResult> queryResultByJobId(long jobId) {
        return  azimuthEvalTaskRestClient.queryResultByJobId(jobId);
    }
}
