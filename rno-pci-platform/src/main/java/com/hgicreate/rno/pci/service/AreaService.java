package com.hgicreate.rno.pci.service;

import com.hgicreate.rno.pci.model.Area;
import com.hgicreate.rno.pci.repo.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaService {

    @Autowired
    private AreaRepository areaRepository;

    public List<Area> getAllCities() {
        return areaRepository.findByAreaLevel(2);
    }
}
