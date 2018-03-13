package com.hgicreate.rno.lte.common.repo.structanls;

import com.hgicreate.rno.lte.common.model.structanls.MetricsSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

public interface MetricsSummaryRepository extends JpaRepository<MetricsSummary, Long> {
    List<MetricsSummary> findByJobId(@Param("jobId") long jobId);
}