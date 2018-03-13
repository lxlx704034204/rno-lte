package com.hgicreate.rno.pci.repo;

import com.hgicreate.rno.pci.model.Area;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AreaRepository extends CrudRepository<Area, Long> {
    List<Area> findByAreaLevel(int areaLevel);
}
