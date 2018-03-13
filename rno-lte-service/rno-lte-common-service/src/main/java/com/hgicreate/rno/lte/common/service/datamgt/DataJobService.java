package com.hgicreate.rno.lte.common.service.datamgt;

import com.hgicreate.rno.lte.common.model.datamgt.DataJob;
import com.hgicreate.rno.lte.common.repo.datamgt.DataJobRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DataJobService {
    private final DataJobRepository dataJobRepository;

    public DataJobService(DataJobRepository dataJobRepository) {
        this.dataJobRepository = dataJobRepository;
    }

    public DataJob saveDataJob(DataJob dataJob) {
        return dataJobRepository.save(dataJob);
    }
}
