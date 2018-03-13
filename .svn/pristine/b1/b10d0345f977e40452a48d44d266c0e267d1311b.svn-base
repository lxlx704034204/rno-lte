package com.hgicreate.rno.lte.common.repo.intermatrix;

import com.hgicreate.rno.lte.common.model.intermatrix.InterMatrixTask;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
public class InterMatrixTaskRepositoryTest {
    @Autowired
    private InterMatrixTaskRepository interMatrixTaskRepository;

    @Test
    public void findAll() throws Exception {
        List<InterMatrixTask> tasks = interMatrixTaskRepository.findAll();
        assertNotNull(tasks);
    }

    @Test
    public void countByTaskNameAndAreaId() throws Exception{
        Long cnt = interMatrixTaskRepository.countByTaskNameAndAreaId("test",440100);
        System.out.println(cnt);
        assertNotNull(cnt);
    }
}