package com.hgicreate.rno.lte.common.service;

import com.hgicreate.rno.lte.common.model.Job;
import com.hgicreate.rno.lte.common.repo.JobRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    public Job findOne(Long jobId) {
        return jobRepository.findOne(jobId);
    }

    public Job getOneJob(Job job) {
        return jobRepository.findByJobRunningStatusAndJobTypeOrderByCreateTimeDesc(job.getJobRunningStatus(), job.getJobType());
    }

    public void delete(Job job) {
        jobRepository.delete(job);
    }
}
