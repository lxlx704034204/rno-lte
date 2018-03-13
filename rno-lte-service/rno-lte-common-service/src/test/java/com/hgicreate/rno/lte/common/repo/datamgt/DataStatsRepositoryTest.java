package com.hgicreate.rno.lte.common.repo.datamgt;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DataStatsRepositoryTest {
    @Autowired
    private DataStatsRepository dataStatsRepository;

    @Test
    public void findAll() throws Exception {
    }

    @Test
    public void findDistinctTop5ByAreaIdAndDataTypeOrderByRecordDateDesc() throws Exception {
    }

    @Test
    public void findByAreaIdAndDataType() throws Exception {
        List<Date> strings = dataStatsRepository.findByAreaIdAndDataType(440100, "HO");
        System.out.println(strings);
        strings = dataStatsRepository.findByAreaIdAndDataType(440100, "MR");
        System.out.println(strings);
    }
}