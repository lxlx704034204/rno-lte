package com.hgicreate.rno.lte.web.client.azimutheval;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.TaskQueryCond;
import com.hgicreate.rno.lte.web.model.azimutheval.AzimuthJobRecord;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AzimuthEvalTaskRestClientFallback implements AzimuthEvalTaskRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public PageResultBody queryTaskByPage(PageCondBody<TaskQueryCond> condBody) {
        log.info("分页查询任务失败。");
        return ClientTool.emptyResultBody(condBody.getPage(), failMsg);
    }

    @Override
    public SubmitResult submitTask(AzimuthJobRecord cond) {
        log.debug("提交任务失败。");
        return ClientTool.submitTaskFail(failMsg);
    }
}
