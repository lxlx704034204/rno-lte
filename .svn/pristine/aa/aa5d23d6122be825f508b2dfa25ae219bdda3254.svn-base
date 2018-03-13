package com.hgicreate.rno.lte.web.client;

import com.hgicreate.rno.lte.web.model.Area;
import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class CommonRestClientFallback implements CommonRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public boolean verifyUserIdentity(String account) {
        log.info("验证用户失败。");
        return false;
    }

    @Override
    public Boolean validateUser(String username) {
        log.info("验证用户失败。");
        return false;
    }

    @Override
    public List<Area> getAreaByAccount(String account, long cityId) {
        log.info("获取区域失败。");
        return Collections.emptyList();
    }

    @Override
    public Map<String, Object> stopJobByJobId(Long jobId) {
        log.info("停止任务失败。");
        Map<String, Object> map = new HashMap<>();
        map.put("flag", false);
        map.put("result", failMsg);
        return map;
    }

    @Override
    public PageResultBody queryReportByPage(PageCondBody<Long> condBody) {
        log.info("分页查询报告失败。");
        return ClientTool.emptyResultBody(condBody.getPage(), failMsg);
    }
}
