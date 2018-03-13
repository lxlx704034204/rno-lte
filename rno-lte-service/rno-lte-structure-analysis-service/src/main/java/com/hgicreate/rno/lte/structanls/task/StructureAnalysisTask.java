package com.hgicreate.rno.lte.structanls.task;

import com.hgicreate.rno.lte.structanls.model.*;
import com.hgicreate.rno.lte.structanls.service.CommonRestService;
import com.hgicreate.rno.lte.structanls.service.StructAnlsRestService;
import com.hgicreate.rno.lte.structanls.service.StructAnlsSparkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class StructureAnalysisTask implements JobExecutor {
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT3 = new SimpleDateFormat("yyyyMMdd");

    private final CommonRestService commonRestService;
    private final StructAnlsRestService structAnlsRestService;
    private final StructAnlsSparkService structAnlsSparkService;

    public StructureAnalysisTask(CommonRestService commonRestService, StructAnlsRestService structAnlsRestService, StructAnlsSparkService structAnlsSparkService) {
        this.commonRestService = commonRestService;
        this.structAnlsRestService = structAnlsRestService;
        this.structAnlsSparkService = structAnlsSparkService;
    }

    @Override
    public boolean runJobInternal(long jobId) {

        // 任务状态检查点
        if (commonRestService.isJobStopped(jobId)) {
            log.debug("LTE结构优化分析任务被停止");
            return false;
        }

        Job job = commonRestService.getJobByJobId(jobId);
        // 开始任务，更新任务状态
        commonRestService.startJob(job);

        String msg;
        Date startTime = new Date();
        structAnlsRestService.updateOwnProgress(jobId, TaskState.Starting.toString());

        StructAnlsTask record = structAnlsRestService.queryTaskRecordByJobId(jobId);

        log.debug("LTE结构优化分析的数据信息：" + record);

        if (record == null) {
            msg = "不存在此LTE结构优化分析需要的数据！";
            log.debug(msg);
            commonRestService.addOneReport(jobId, startTime, msg, ReportStatus.Fail.toString(), "获取任务配置信息");
            structAnlsRestService.updateOwnProgress(jobId, TaskState.Fail.toString());
            commonRestService.endJob(job, JobStatus.Fail.toString());
            return false;
        }

        // 任务状态检查点
        if (commonRestService.isJobStopped(jobId)) {
            log.debug("LTE结构优化分析任务被停止");
            return false;
        }

        boolean hasData = structAnlsSparkService.hasData(record.getAreaId(), SIMPLE_DATE_FORMAT3.format(record.getBegMeaTime()), SIMPLE_DATE_FORMAT3.format(record.getEndMeaTime()));

        // 任务状态检查点
        if (commonRestService.isJobStopped(jobId)) {
            log.debug("LTE结构优化分析任务被停止");
            return false;
        }

        if (hasData) {
            startTime = new Date();
            // 开始分析
            ResultInfo resultInfo = new ResultInfo(false);
            try {
                resultInfo = doLteStructAnalysis(record);
            } catch (Exception e) {
                e.printStackTrace();
                resultInfo.setFlag(false);
            }

            // 任务状态检查点
            if (commonRestService.isJobStopped(jobId)) {
                log.debug("LTE结构优化分析任务被停止");
                return false;
            }

            log.debug("LTE结构优化分析任务完成，result=" + resultInfo);
            // 报告
            if (resultInfo.isFlag()) {
                msg = "LTE结构优化分析完成！";
                commonRestService.addOneReport(jobId, startTime, msg, ReportStatus.Succeeded.toString(), "任务总结");
                structAnlsRestService.updateOwnProgress(jobId, TaskState.Succeeded.toString());
                commonRestService.endJob(job, JobStatus.Succeeded.toString());
                return true;
            } else {
                log.error(jobId + "的LTE结构优化分析出错！" + resultInfo.getMsg());
                msg = "LTE结构优化分析异常！" + resultInfo.getMsg();
                commonRestService.addOneReport(jobId, startTime, msg, ReportStatus.Fail.toString(), "任务总结");
                structAnlsRestService.updateOwnProgress(jobId, TaskState.Fail.toString());
                commonRestService.endJob(job, JobStatus.Fail.toString());
                return false;
            }
        } else {
            msg = "LTE结构优化分析异常！没有数据！";
            log.error(jobId + "的LTE结构优化分析出错！没有数据！");
            commonRestService.addOneReport(jobId, startTime, msg, ReportStatus.Fail.toString(), "任务总结");
            structAnlsRestService.updateOwnProgress(jobId, TaskState.Fail.toString());
            commonRestService.endJob(job, JobStatus.Fail.toString());
            return false;
        }
    }

    private ResultInfo doLteStructAnalysis(StructAnlsTask record) {
        log.debug("LTE结构优化分析开始");
        ResultInfo result = new ResultInfo(true);

        String stage = "";
        try {
            stage = "计算重叠覆盖数据";
            List<OverlapCover> overlapCovers = calcOverlapCover(record);

            stage = "保存重叠覆盖数据";
            saveOverlapCover(overlapCovers);

            stage = "处理过覆盖";
            handleOverCover(record);

            stage = "计算汇总指标";
            List<MetricsSummary> metricsSummaries = calcMetricsSummary(record);

            stage = "保存汇总指标";
            saveMetricsSummary(metricsSummaries);

        } catch (Exception e1) {
            e1.printStackTrace();
            log.debug("LTE结构优化分析失败。stage={}", stage);
            result.setFlag(false);
            result.setMsg(stage + "失败！");
        }
        log.debug("LTE结构优化分析结束");
        return result;
    }

    /**
     * 计算重叠覆盖
     */
    private List<OverlapCover> calcOverlapCover(StructAnlsTask record) throws Exception {
        log.debug("计算重叠覆盖开始");
        long t1 = System.currentTimeMillis();
        List<OverlapCover> overlapCovers = structAnlsSparkService.calcOverlapCover(record.getJobId(), record.getAreaId(), SIMPLE_DATE_FORMAT3.format(record.getBegMeaTime()), SIMPLE_DATE_FORMAT3.format(record.getEndMeaTime()));
        log.debug("计算重叠覆盖耗时：{}", System.currentTimeMillis() - t1);
        return overlapCovers;
    }

    /**
     * 保存重叠覆盖指标
     */
    private void saveOverlapCover(List<OverlapCover> overlapCovers) throws Exception {
        log.debug("进入方法：saveOverlapCover。overlapCovers.size={}", overlapCovers.size());
        boolean flag = structAnlsRestService.batchInsertOverlapCovers(overlapCovers) > 0;
        log.debug("退出方法：saveOverlapCover。result={}", flag);
    }

    /**
     * 处理过覆盖
     */
    private void handleOverCover(StructAnlsTask record) throws Exception {
        log.debug("处理过覆盖开始");
        long t1 = System.currentTimeMillis();
        structAnlsSparkService.handleOverCover(record.getJobId(), record.getAreaId(), SIMPLE_DATE_FORMAT3.format(record.getBegMeaTime()), SIMPLE_DATE_FORMAT3.format(record.getEndMeaTime()));
        log.debug("处理过覆盖耗时：{}", System.currentTimeMillis() - t1);
    }

    /**
     * 计算指标汇总
     */
    private List<MetricsSummary> calcMetricsSummary(StructAnlsTask record) throws Exception {
        log.debug("计算指标汇总开始");
        long t1 = System.currentTimeMillis();
        List<MetricsSummary> metricsSummaries = structAnlsSparkService.calcMetricsSummary(record.getJobId(), record.getAreaId(), SIMPLE_DATE_FORMAT3.format(record.getBegMeaTime()), SIMPLE_DATE_FORMAT3.format(record.getEndMeaTime()));
        log.debug("计算指标汇总耗时：{}", System.currentTimeMillis() - t1);
        return metricsSummaries;
    }

    /**
     * 保存指标汇总
     */
    private void saveMetricsSummary(List<MetricsSummary> metricsSummaries) throws Exception {
        log.debug("进入方法：saveMetricsSummary。metricsSummaries.size={}", metricsSummaries.size());
        boolean flag = structAnlsRestService.batchInsertMetricsSummaries(metricsSummaries) > 0;
        log.debug("退出方法：saveMetricsSummary。result={}", flag);
    }
}
