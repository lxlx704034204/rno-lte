package com.hgicreate.rno.lte.common.repo;

import com.hgicreate.rno.lte.common.model.Area;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@CacheConfig(cacheNames = "areas")
public interface AreaRepository extends JpaRepository<Area, Long> {

    @Cacheable
    List<Area> findByAreaLevel(@Param("areaLevel") int areaLevel);
}