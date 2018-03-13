package com.hgicreate.rno.lte.web.client.test;

import com.hgicreate.rno.lte.web.model.Area;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class TestRestClientFallback implements TestClient {
    @Override
    public List<Area> getAreaByAccount2(String account, long cityId) {
        log.debug("getAreaByAccount2失败。");
        return Collections.emptyList();
    }
}
