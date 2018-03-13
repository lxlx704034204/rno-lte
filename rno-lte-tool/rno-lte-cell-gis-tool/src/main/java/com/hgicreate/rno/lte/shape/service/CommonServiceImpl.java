package com.hgicreate.rno.lte.shape.service;

import com.hgicreate.rno.lte.shape.dao.CommonDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class CommonServiceImpl implements CommonService {

    private final CommonDao commonDao;

    @Value("${rno.spatial-db-type:postgres}")
    private String dbType;

    public CommonServiceImpl(CommonDao commonDao) {
        this.commonDao = commonDao;
    }

    @Override
    public List<Long> findCity() {
        return commonDao.findCity();
    }
}
