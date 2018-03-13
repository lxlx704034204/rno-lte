package com.hgicreate.rno.lte.common.repo;

import com.hgicreate.rno.lte.common.model.Job;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

@CacheConfig(cacheNames = "jobs")
public interface JobRepository extends JpaRepository<Job, Long> {

    @CachePut
    @Override
    <S extends Job> S save(S entity);

    @Cacheable
    @Override
    Job findOne(Long id);

    @Cacheable
    Job findByJobRunningStatusAndJobTypeOrderByCreateTimeDesc(String jobRunningStatus, String jobType);

    @CacheEvict
    @Override
    void delete(Job entity);
}
