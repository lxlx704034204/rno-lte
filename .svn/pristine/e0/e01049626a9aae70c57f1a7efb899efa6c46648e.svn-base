package com.hgicreate.rno.lte.common.repo.intermatrix;

import com.hgicreate.rno.lte.common.model.intermatrix.InterMatrixTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterMatrixTaskRepository extends JpaRepository<InterMatrixTask, Long> {
    Page<InterMatrixTask> findAll(Specification<InterMatrixTask> spec, Pageable pageable);

    Long countByTaskNameAndAreaId(String taskName, long areaId);

    boolean existsByTaskNameAndAreaId(String taskName, long cityId);

    List<InterMatrixTask> findTop10ByAreaIdAndFinishStateOrderByCreateTimeDesc(long areaId, String finishState);
}
