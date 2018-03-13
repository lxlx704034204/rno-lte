package com.hgicreate.rno.lte.intermatrix.task;

import com.hgicreate.rno.lte.intermatrix.model.*;
import com.hgicreate.rno.lte.intermatrix.service.CommonRestService;
import com.hgicreate.rno.lte.intermatrix.service.InterMatrixSparkService;
import com.hgicreate.rno.lte.intermatrix.service.InterMatrixTaskRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Component
public class InterferenceMatrixTask implements JobExecutor {
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT3 = new SimpleDateFormat("yyyyMMdd");

    private final CommonRestService commonRestService;

    private final InterMatrixTaskRestService interMatrixTaskRestService;

    private final InterMatrixSparkService interMatrixSparkService;

    private boolean isUseSf = false;

    @Value("${samefreqcellcoefweight}")
    private double samefreqcellcoefweight;

    @Value("${switchratioweight}")
    private double switchratioweight;

    @Value("${dis-limit}")
    private double disLimit;

    @Value("${rsrp0minus1weight}")
    private double rsrp0minus1weight;

    @Value("${rsrp1weight}")
    private double rsrp1weight;

    @Value("${minmeasuresum}")
    private long minmeasuresum;

    @Value("${mincorrelation}")
    private double mincorrelation;

    public InterferenceMatrixTask(CommonRestService commonRestService, InterMatrixTaskRestService interMatrixTaskRestService, InterMatrixSparkService interMatrixSparkService) {
        this.commonRestService = commonRestService;
        this.interMatrixTaskRestService = interMatrixTaskRestService;
        this.interMatrixSparkService = interMatrixSparkService;
    }

    public boolean runJobInternal(long jobId) {
        String msg = "干扰矩阵任务开始";
        Date startTime = new Date();
        // 通过 jobId 获取Lte方位角计算记录信息(RNO_LTE_AZIMUTH_EVAL_JOB表），包括变小区的 CLOB 信息
        InterMatrixTask record = interMatrixTaskRestService.queryTaskRecordByJobId(jobId);

        log.debug("LTE天线方位角评估的任务信息：{}", record);

        if (record == null) {
            msg = "不存在此LTE方位角评估分析需要的数据！";
            log.debug(msg);
            commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Fail.toString(), "获取任务配置信息");
            interMatrixTaskRestService.updateOwnProgress(jobId, "计算失败");
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
        commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Suc.toString(), "任务启动");
        interMatrixTaskRestService.updateOwnProgress(jobId, "开始分析");

        // 任务状态检查点
        if (commonRestService.isJobStopped(jobId)) {
            log.debug("LTE天线方位角评估任务被停止");
            return false;
        }

        msg = "配置干扰矩阵计算任务参数";
        log.info(msg);
        commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Suc.toString(), "准备参数");
        interMatrixTaskRestService.updateOwnProgress(jobId, "准备参数");

        String meaBegTime = SIMPLE_DATE_FORMAT3.format(record.getBegMeaTime());
        String meaEndTime = SIMPLE_DATE_FORMAT3.format(record.getEndMeaTime());
        long areaId = record.getAreaId();
        samefreqcellcoefweight = record.getSameFreqCellCoefWeight();
        switchratioweight = record.getSwitchRatioWeight();

        List<String> fileNameList = Arrays.asList(null == record.getSfFiles() ? new String[0] : record.getSfFiles().trim().split(","));

        if (!fileNameList.isEmpty() && !fileNameList.get(0).isEmpty()) {
            isUseSf = true;
        }

        msg = "准备干扰矩阵的计算任务";
        log.info(msg);
        commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Suc.toString(), "正在计算");
        interMatrixTaskRestService.updateOwnProgress(jobId, "正在计算");

        try {
//            DataCond dataCond = new DataCond();
//            dataCond.setMeaBegTime(meaBegTime);
//            dataCond.setMeaEndTime(meaEndTime);
//            dataCond.setCityId(areaId);
//            dataCond.setJobId(jobId);
//
//            //准备MR临时表数据
//            dataCond.setType("MR");
//            interMatrixSparkService.handleTempTable(dataCond);
//            //准备HO临时表数据
//            dataCond.setType("HO");
//            interMatrixSparkService.handleTempTable(dataCond);
//            //准备SF临时表数据
//            if (isUseSf) {
//                dataCond.setType("SF");
//                interMatrixSparkService.handleTempTable(dataCond);
//            }

            //计算干扰矩阵并入到仓库
            Map<String, Object> map = new HashMap<>();
            map.put("jobId", jobId);
            map.put("samefreqcellcoefweight", samefreqcellcoefweight);
            map.put("switchratioweight", switchratioweight);
            map.put("disLimit", disLimit);
            map.put("rsrp0minus1weight", rsrp0minus1weight);
            map.put("rsrp1weight", rsrp1weight);
            map.put("minmeasuresum", minmeasuresum);
            map.put("mincorrelation", mincorrelation);
            map.put("startMeaDay", meaBegTime);
            map.put("endMeaDay", meaEndTime);
            map.put("areaId", areaId);
            log.debug("param map = {}",map);
            if (isUseSf) {
                interMatrixSparkService.createMatrix(map);
            } else {
                interMatrixSparkService.createMatrixWithoutSf(map);
            }

            msg = job.getJobName() + ",结果：任务成功！";
            log.info(msg);
            commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Suc.toString(), "计算总结");
            commonRestService.endJob(job, JobStatus.Succeeded.toString());
            interMatrixTaskRestService.updateOwnProgress(jobId, "计算完成");
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            msg = job.getJobName() + ",结果：任务失败！";
            log.info(msg);
            commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Fail.toString(), "计算总结");
            commonRestService.endJob(job, JobStatus.Fail.toString());
            interMatrixTaskRestService.updateOwnProgress(jobId, "计算失败");
            return false;
        }
    }
}
