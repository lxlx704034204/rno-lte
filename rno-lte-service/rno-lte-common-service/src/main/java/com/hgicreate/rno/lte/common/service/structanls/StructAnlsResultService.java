package com.hgicreate.rno.lte.common.service.structanls;

import com.hgicreate.rno.lte.common.model.structanls.MetricsSummary;
import com.hgicreate.rno.lte.common.model.structanls.OverlapCover;
import com.hgicreate.rno.lte.common.repo.structanls.MetricsSummaryRepository;
import com.hgicreate.rno.lte.common.repo.structanls.OverlapCoverRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class StructAnlsResultService {
    private final MetricsSummaryRepository metricsSummaryRepository;
    private final OverlapCoverRepository overlapCoverRepository;

    public StructAnlsResultService(MetricsSummaryRepository metricsSummaryRepository, OverlapCoverRepository overlapCoverRepository) {
        this.metricsSummaryRepository = metricsSummaryRepository;
        this.overlapCoverRepository = overlapCoverRepository;
    }

    public List<MetricsSummary> findMetricsSummariesByJobId(long jobId) {
        return metricsSummaryRepository.findByJobId(jobId);
    }

    public List<MetricsSummary> saveMetricsSummaries(List<MetricsSummary> metricsSummaries) {
        return metricsSummaryRepository.save(metricsSummaries);
    }

    public List<OverlapCover> findOverlapCoversByJobId(long jobId) {
        return overlapCoverRepository.findByJobId(jobId);
    }

    public List<OverlapCover> saveOverlapCovers(List<OverlapCover> overlapCovers) {
        return overlapCoverRepository.save(overlapCovers);
    }
}
