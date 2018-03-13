package com.hgicreate.rno.lte.common.service;

import com.hgicreate.rno.lte.common.model.Report;
import com.hgicreate.rno.lte.common.repo.ReportRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Page<Report> getReportsByJobId(long jobId, Pageable pageable) {
        return reportRepository.findByJobId(jobId, pageable);
    }

    public Report saveReport(Report report) {
        return reportRepository.save(report);
    }
}