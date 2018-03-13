package com.hgicreate.rno.lte.common.repo.azimutheval;

import com.hgicreate.rno.lte.common.model.azimutheval.AzimuthEvalTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AzimuthEvalTaskRepository extends JpaRepository<AzimuthEvalTask, Long> {
    Page<AzimuthEvalTask> findAll(Specification<AzimuthEvalTask> spec, Pageable pageable);
}
