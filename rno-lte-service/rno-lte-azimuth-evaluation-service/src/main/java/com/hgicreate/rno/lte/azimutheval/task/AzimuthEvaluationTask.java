package com.hgicreate.rno.lte.azimutheval.task;

import com.hgicreate.rno.lte.azimutheval.model.*;
import com.hgicreate.rno.lte.azimutheval.service.AzimuthEvalRestService;
import com.hgicreate.rno.lte.azimutheval.service.AzimuthEvalSparkService;
import com.hgicreate.rno.lte.azimutheval.service.CommonRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class AzimuthEvaluationTask implements JobExecutor {
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT3 = new SimpleDateFormat("yyyyMMdd");

    private final CommonRestService commonRestService;

    private final AzimuthEvalRestService azimuthEvalRestService;

    private final AzimuthEvalSparkService azimuthEvalSparkService;

    public AzimuthEvaluationTask(CommonRestService commonRestService, AzimuthEvalRestService azimuthEvalRestService, AzimuthEvalSparkService azimuthEvalSparkService) {
        this.commonRestService = commonRestService;
        this.azimuthEvalRestService = azimuthEvalRestService;
        this.azimuthEvalSparkService = azimuthEvalSparkService;
    }

    @Override
    public boolean runJobInternal(long jobId) {
        String msg = "天线方位角评估任务开始";
        Date startTime = new Date();
        // 通过 jobId 获取Lte方位角计算记录信息(RNO_LTE_AZIMUTH_EVAL_JOB表），包括变小区的 CLOB 信息
        AzimuthEvalTask record = azimuthEvalRestService.queryTaskRecordByJobId(jobId);

        log.debug("LTE天线方位角评估的任务信息：{}", record);

        if (record == null) {
            msg = "不存在此LTE方位角评估分析需要的数据！";
            log.debug(msg);
            commonRestService.addOneReport(jobId, startTime, msg, TaskStatus.Fail.toString(), "获取任务配置信息");
            azimuthEvalRestService.updateOwnProgress(jobId, "计算失败");
            commonRestService.endJob(jobId, JobStatus.Fail.toString());
            return false;
        }

        Job job = record.getJob();

        // 任务状态检查点
        if (commonRestService.isJobStopped(jobId)) {
            log.debug("LTE天线方位角评估任务被停止");
            return false;
        }

        // 开始任务，更新任务状态
        commonRestService.startJob(job);
        commonRestService.addOneReport(jobId, startTime, msg, TaskStatus.Succeeded.toString(), "任务启动");
        azimuthEvalRestService.updateOwnProgress(jobId, "开始分析");

        // 任务状态检查点
        if (commonRestService.isJobStopped(jobId)) {
            log.debug("LTE天线方位角评估任务被停止");
            return false;
        }

        boolean hasData = azimuthEvalSparkService.hasData(record.getEvalType(), record.getAreaId(), SIMPLE_DATE_FORMAT3.format(record.getBegMeaTime()), SIMPLE_DATE_FORMAT3.format(record.getEndMeaTime()));

        // 任务状态检查点
        if (commonRestService.isJobStopped(jobId)) {
            log.debug("LTE天线方位角评估任务被停止");
            return false;
        }

        if (hasData) {
            startTime = new Date();
            // 开始分析
            ResultInfo resultInfo = new ResultInfo();
            try {
                resultInfo = doLteAzimuthEvaluation(record);
            } catch (Exception e) {
                e.printStackTrace();
                resultInfo.setFlag(false);
            }

            // 任务状态检查点
            if (commonRestService.isJobStopped(jobId)) {
                log.debug("LTE天线方位角评估任务被停止");
                return false;
            }

            log.debug("LTE天线方位角评估分析任务完成，result=" + resultInfo);
            // 报告
            if (resultInfo.isFlag()) {
                msg = "LTE天线方位角评估分析完成！";
                commonRestService.addOneReport(jobId, startTime, msg, TaskStatus.Succeeded.toString(), "任务总结");
                azimuthEvalRestService.updateOwnProgress(jobId, "计算成功");
                commonRestService.endJob(jobId, JobStatus.Succeeded.toString());
                return true;
            } else {
                log.error(jobId + "的LTE天线方位角评估分析出错！" + resultInfo.getMsg());
                // 任务状态
                msg = "LTE天线方位角评估分析异常！" + resultInfo.getMsg();
                commonRestService.addOneReport(jobId, startTime, msg, TaskStatus.Fail.toString(), "任务总结");
                azimuthEvalRestService.updateOwnProgress(jobId, "计算失败");
                commonRestService.endJob(jobId, JobStatus.Fail.toString());
                return false;
            }
        } else {
            msg = "LTE天线方位角评估分析异常！没有数据！";
            log.error(jobId + "的LTE天线方位角评估分析出错！没有数据！");
            commonRestService.addOneReport(jobId, startTime, msg, TaskStatus.Fail.toString(), "任务总结");
            azimuthEvalRestService.updateOwnProgress(jobId, "计算失败");
            commonRestService.endJob(jobId, JobStatus.Fail.toString());
            return false;
        }
    }

    /**
     * LTE方位角评估分析入口
     */
    private ResultInfo doLteAzimuthEvaluation(AzimuthEvalTask record) {
        log.debug("汇总MRO>>>>>>>>>>>>>>>开始计算方位角评估... jobId={}",record.getJobId());

        long t1 = System.currentTimeMillis();

        // spark 计算
        List<AzimuthEvalResult> results = azimuthEvalSparkService.calcAzimuth(record.getJobId(), record.getAreaId(), SIMPLE_DATE_FORMAT3.format(record.getBegMeaTime()), SIMPLE_DATE_FORMAT3.format(record.getEndMeaTime()));

        log.debug("方位角评估计算完成，开始入库。size={}", results.size());
        log.debug("方位角评估计算完成，开始入库。result={}", results.get(0));

        // oracle 入库
        Long cnt = azimuthEvalRestService.batchInsertResult(results);

        ResultInfo result = new ResultInfo();
        result.setFlag(cnt > 0);

        log.debug("汇总MRO完成计算LTE方位角评估，结果:{},耗时:{}", true, (System.currentTimeMillis() - t1));
        return result;
    }
}
