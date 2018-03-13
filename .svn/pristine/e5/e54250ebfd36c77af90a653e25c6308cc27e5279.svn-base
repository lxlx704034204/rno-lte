package com.hgicreate.rno.lte.common.service.azimutheval;

import com.hgicreate.rno.lte.common.model.azimutheval.AzimuthEvalResult;
import com.hgicreate.rno.lte.common.repo.JobRepository;
import com.hgicreate.rno.lte.common.repo.azimutheval.AzimuthEvalResultRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class AzimuthEvalResultService {
    private final AzimuthEvalResultRepository azimuthEvalResultRepository;

    public AzimuthEvalResultService(JobRepository jobRepository, AzimuthEvalResultRepository azimuthEvalResultRepository) {
        this.azimuthEvalResultRepository = azimuthEvalResultRepository;
    }

    public List<AzimuthEvalResult> findAzimuthEvalResultsByJobId(long jobId) {
        return azimuthEvalResultRepository.findByJobId(jobId);
    }

    public List<AzimuthEvalResult> saveAzimuthEvalResults(List<AzimuthEvalResult> azimuthEvalResults) {
        return azimuthEvalResultRepository.save(azimuthEvalResults);
    }
}
