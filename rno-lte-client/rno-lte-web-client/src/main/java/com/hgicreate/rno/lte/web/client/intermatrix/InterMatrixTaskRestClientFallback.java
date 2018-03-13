package com.hgicreate.rno.lte.web.client.intermatrix;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.TaskQueryCond;
import com.hgicreate.rno.lte.web.model.intermatrix.InterMatrixTask;
import com.hgicreate.rno.lte.web.model.intermatrix.InterferenceMatrixTaskRecord;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class InterMatrixTaskRestClientFallback implements InterMatrixTaskRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public PageResultBody queryTaskByPage(PageCondBody<TaskQueryCond> condBody) {
        log.info("分页查询任务失败。");
        return ClientTool.emptyResultBody(condBody.getPage(), failMsg);
    }

    @Override
    public SubmitResult submitTask(InterferenceMatrixTaskRecord cond) {
        log.debug("提交任务失败。");
        return ClientTool.submitTaskFail(failMsg);
    }

    @Override
    public Map<String, Object> isExistedTaskThisWeek(long cityId) {
        return null;
    }

    @Override
    public boolean checkTaskName(long cityId, String taskName) {
        return false;
    }


    @Override
    public List<InterMatrixTask> getLatelyLteMatrixByCityId(long cityId) {
        log.info("获取最近十次干扰矩阵失败。");
        return Collections.emptyList();
    }
}
