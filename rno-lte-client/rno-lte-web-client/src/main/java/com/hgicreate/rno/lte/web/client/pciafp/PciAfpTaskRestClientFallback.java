package com.hgicreate.rno.lte.web.client.pciafp;

import com.hgicreate.rno.lte.web.model.PageCondBody;
import com.hgicreate.rno.lte.web.model.PageResultBody;
import com.hgicreate.rno.lte.web.model.SubmitResult;
import com.hgicreate.rno.lte.web.model.TaskQueryCond;
import com.hgicreate.rno.lte.web.model.pciafp.PciAfpTaskObj;
import com.hgicreate.rno.lte.web.model.pciafp.Threshold;
import com.hgicreate.rno.lte.web.tool.ClientTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class PciAfpTaskRestClientFallback implements PciAfpTaskRestClient {
    private static final String failMsg = "找不到公共服务。";

    @Override
    public PageResultBody queryTaskByPage(PageCondBody<TaskQueryCond> condBody) {
        log.info("分页查询任务失败。");
        return ClientTool.emptyResultBody(condBody.getPage(), failMsg);
    }

    @Override
    public SubmitResult submitTask(PciAfpTaskObj cond) {
        log.info("提交任务失败。");
        return ClientTool.submitTaskFail(failMsg);
    }

    @Override
    public List<Threshold> getThresholdsByModuleType(String moduleType) {
        return Collections.emptyList();
    }
}
