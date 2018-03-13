package com.hgicreate.rno.lte.common.repo;

import com.hgicreate.rno.lte.common.model.Report;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

@CacheConfig(cacheNames = "reports")
public interface ReportRepository extends PagingAndSortingRepository<Report, Long> {

    @CachePut
    @Override
    <S extends Report> S save(S entity);

    @Cacheable
    Page<Report> findByJobId(@Param("jobId") long jobId, Pageable pageable);
}
