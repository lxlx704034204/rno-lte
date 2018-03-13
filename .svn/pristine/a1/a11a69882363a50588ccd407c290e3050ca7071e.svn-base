package com.hgicreate.rno.lte.common.repo.structanls;

import com.hgicreate.rno.lte.common.model.structanls.StructAnlsTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StructAnlsTaskRepository extends JpaRepository<StructAnlsTask, Long> {
    Page<StructAnlsTask> findAll(Specification<StructAnlsTask> spec, Pageable pageable);
}
