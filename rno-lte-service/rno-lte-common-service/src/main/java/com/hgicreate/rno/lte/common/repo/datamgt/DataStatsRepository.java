package com.hgicreate.rno.lte.common.repo.datamgt;

import com.hgicreate.rno.lte.common.model.datamgt.DataStats;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface DataStatsRepository extends JpaRepository<DataStats, Long> {
    Page<DataStats> findAll(Specification<DataStats> spec, Pageable pageable);

    @Query("select distinct e.recordDate from DataStats e WHERE e.areaId=:areaId and e.dataType=:dataType ORDER BY e.recordDate desc")
    List<Date> findByAreaIdAndDataType(@Param("areaId") long areaId, @Param("dataType") String dataType);
}
