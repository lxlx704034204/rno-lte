package com.hgicreate.rno.lte.shape.dao;

import com.hgicreate.rno.lte.shape.mapper.oracle.OracleMapper;
import com.hgicreate.rno.lte.shape.model.GisCell;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@ConditionalOnProperty(name = "rno.spatial-db-type", havingValue = "oracle")
public class SpatialDbDaoOracleImpl implements SpatialDbDao {

    private final OracleMapper oracleMapper;

    private final SqlSessionFactory sqlSessionFactory;

    @Value("${rno.batch:2000}")
    private int batch;

    public SpatialDbDaoOracleImpl(OracleMapper oracleMapper, SqlSessionFactory sqlSessionFactory) {
        this.oracleMapper = oracleMapper;
        this.sqlSessionFactory = sqlSessionFactory;
    }

    @Override
    public void batchInsertOutdoorGisCell(List<GisCell> cells) {
        try (SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false)) {
            OracleMapper mapper = session.getMapper(OracleMapper.class);
            int cnt = 0;
            for (GisCell cell : cells) {
                try {
                    mapper.batchInsertOutdoorGisCell(cell);
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

    @Override
    public void batchInsertIndoorGisCell(List<GisCell> cells) {
        try (SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false)) {
            OracleMapper mapper = session.getMapper(OracleMapper.class);
            int cnt = 0;
            for (GisCell cell : cells) {
                try {
                    mapper.batchInsertIndoorGisCell(cell);
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

    @Override
    public Long deleteGisCellByCityId(long cityId) {
        return oracleMapper.deleteGisCellByCityId(cityId);
    }
}
