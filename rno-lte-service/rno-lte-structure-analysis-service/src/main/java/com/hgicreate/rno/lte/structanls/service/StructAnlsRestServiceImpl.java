package com.hgicreate.rno.lte.structanls.service;

import com.hgicreate.rno.lte.structanls.client.StructAnlsTaskRestClient;
import com.hgicreate.rno.lte.structanls.model.MetricsSummary;
import com.hgicreate.rno.lte.structanls.model.OverlapCover;
import com.hgicreate.rno.lte.structanls.model.StructAnlsTask;
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
public class StructAnlsRestServiceImpl implements StructAnlsRestService {

    private final StructAnlsTaskRestClient structAnlsTaskRestClient;

    @Value("${rno.batch:10000}")
    private int batch;

    public StructAnlsRestServiceImpl(StructAnlsTaskRestClient structAnlsTaskRestClient) {
        this.structAnlsTaskRestClient = structAnlsTaskRestClient;
    }

    @Override
    public void updateOwnProgress(long jobId, String jobStatus) {
        structAnlsTaskRestClient.updateTaskStatus(jobId, jobStatus);
    }

    @Override
    public StructAnlsTask queryTaskRecordByJobId(long jobId) {
        return structAnlsTaskRestClient.queryTaskRecordByJobId(jobId);
    }

    @Override
    public Long batchInsertMetricsSummaries(List<MetricsSummary> results) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<MetricsSummary>> group = new HashMap<>();
        IntStream.range(0, results.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(results.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(structAnlsTaskRestClient.saveMetricsSummaries(e)));

        return cnt.get();
    }

    @Override
    public List<MetricsSummary> queryMetricsSummariesByJobId(long jobId) {
        return  structAnlsTaskRestClient.queryMetricsSummariesByJobId(jobId);
    }

    @Override
    public Long batchInsertOverlapCovers(List<OverlapCover> results) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<OverlapCover>> group = new HashMap<>();
        IntStream.range(0, results.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(results.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(structAnlsTaskRestClient.saveOverlapCovers(e)));

        return cnt.get();
    }

    @Override
    public List<OverlapCover> queryOverlapCoversByJobId(long jobId) {
        return  structAnlsTaskRestClient.queryOverlapCoversByJobId(jobId);
    }
}
