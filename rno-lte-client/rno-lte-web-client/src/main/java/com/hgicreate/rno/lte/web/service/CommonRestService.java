package com.hgicreate.rno.lte.web.service;

import com.hgicreate.rno.lte.web.client.CommonRestClient;
import com.hgicreate.rno.lte.web.model.Area;
import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CommonRestService {
    private final CommonRestClient commonRestClient;

    public CommonRestService(CommonRestClient commonRestClient) {
        this.commonRestClient = commonRestClient;
    }

    /**
     * 验证用户身份
     */
    @Deprecated
    public boolean verifyUserIdentity(String account) {
        return commonRestClient.verifyUserIdentity(account);
    }

    /**
     * 验证用户身份
     */
    public Boolean validateUser(String username) {
        return null == username ? false : commonRestClient.validateUser(username);
    }

    /**
     * 根据用户名和指定城市ID获取允许访问的区域
     */
    public List<Area> getAreaByAccount(String account, long cityId) {
        return commonRestClient.getAreaByAccount(account, cityId);
    }

    /**
     * 终止任务
     */
    public Map<String, Object> stopJobByJobId(Long jobId) {
        return commonRestClient.stopJobByJobId(jobId);
    }

    /**
     * 分页查询某job的报告
     */
    public PageResultBody queryReportByPage(PageCondBody<Long> condBody) {
        return commonRestClient.queryReportByPage(condBody);
    }
}
