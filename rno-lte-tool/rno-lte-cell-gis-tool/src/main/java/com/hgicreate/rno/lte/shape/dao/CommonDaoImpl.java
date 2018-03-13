package com.hgicreate.rno.lte.shape.dao;

import com.hgicreate.rno.lte.shape.mapper.CommonMapper;
import com.hgicreate.rno.lte.shape.model.GisCell;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class CommonDaoImpl implements CommonDao {

    private final CommonMapper commonMapper;

    private final SqlSessionFactory sqlSessionFactory;

    @Value("${rno.batch:2000}")
    private int batch;

    public CommonDaoImpl(CommonMapper commonMapper, SqlSessionFactory sqlSessionFactory) {
        this.commonMapper = commonMapper;
        this.sqlSessionFactory = sqlSessionFactory;
    }

    @Override
    public List<GisCell> listOutdoorGisCellByCityId(long cityId) {
        return commonMapper.listOutdoorGisCellByCityId(cityId);
    }

    @Override
    public List<GisCell> listIndoorGisCellByCityId(long cityId) {
        return commonMapper.listIndoorGisCellByCityId(cityId);
    }

    @Override
    public List<Long> findCity() {
        return commonMapper.findCity();
    }

    @Override
    public void batchUpdateGisCell(List<GisCell> cells) {
        try (SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false)) {
            CommonMapper mapper = session.getMapper(CommonMapper.class);
            int cnt = 0;
            for (GisCell cell : cells) {
                try {
                    mapper.writeBackStationSpace(cell);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                if (++cnt % batch == 0) {
                    session.commit();
                    // 清理缓存，防止溢出
                    session.clearCache();
                }
            }
            session.commit();
            // 清理缓存，防止溢出
            session.clearCache();
        }
    }
}
