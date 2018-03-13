package com.hgicreate.rno.lte.common.service.pciafp;

import com.hgicreate.rno.lte.common.model.AbstractTask;
import com.hgicreate.rno.lte.common.model.Job;
import com.hgicreate.rno.lte.common.model.SubmitResult;
import com.hgicreate.rno.lte.common.model.TaskQueryCond;
import com.hgicreate.rno.lte.common.model.pciafp.*;
import com.hgicreate.rno.lte.common.repo.JobRepository;
import com.hgicreate.rno.lte.common.repo.pciafp.DataCollectRecordRepository;
import com.hgicreate.rno.lte.common.repo.pciafp.PciAfpParamRepository;
import com.hgicreate.rno.lte.common.repo.pciafp.PciAfpTaskRepository;
import com.hgicreate.rno.lte.common.repo.pciafp.ThresholdRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class PciAfpTaskService {
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT2 = new SimpleDateFormat("yyyy-MM-dd");

    private final JobRepository jobRepository;
    private final PciAfpTaskRepository pciAfpTaskRepository;
    private final ThresholdRepository thresholdRepository;
    private final PciAfpParamRepository pciAfpParamRepository;
    private final DataCollectRecordRepository dataCollectRecordRepository;

    @Value("${rno.job-type-code.pci-afp:RNO_PCI_AFP_PLAN}")
    private String jobTypeCodePciAfp;

    public PciAfpTaskService(JobRepository jobRepository, PciAfpTaskRepository pciAfpTaskRepository, ThresholdRepository thresholdRepository, PciAfpParamRepository pciAfpParamRepository, DataCollectRecordRepository dataCollectRecordRepository) {
        this.jobRepository = jobRepository;
        this.pciAfpTaskRepository = pciAfpTaskRepository;
        this.thresholdRepository = thresholdRepository;
        this.pciAfpParamRepository = pciAfpParamRepository;
        this.dataCollectRecordRepository = dataCollectRecordRepository;
    }

    public Page findAll(TaskQueryCond cond, Pageable pageable) {
        return pciAfpTaskRepository.findAll(Specifications.where(getWhereClause(cond)), pageable);
    }

    private Specification<PciAfpTask> getWhereClause(TaskQueryCond cond) {
        return (root, query, builder) -> {
            Predicate predicate = builder.conjunction();
            if (cond.getCityId() > 0) {
                predicate.getExpressions().add(
                        builder.equal(root.get("areaId"), cond.getCityId())
                );
            }
            if (StringUtils.isNotBlank(cond.getMeaTime())) {
                try {
                    Date date = SIMPLE_DATE_FORMAT2.parse(cond.getMeaTime());
                    predicate.getExpressions().add(
                            builder.lessThanOrEqualTo(root.get("begMeaTime"), date)
                    );
                    predicate.getExpressions().add(
                            builder.greaterThanOrEqualTo(root.get("endMeaTime"), date)
                    );
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }

            // 任务记录表
            Join<PciAfpTask, Job> join = root.join("job", JoinType.INNER);
            if (StringUtils.isNotBlank(cond.getStartSubmitTime())) {
                try {
                    Date date = SIMPLE_DATE_FORMAT.parse(cond.getStartSubmitTime());
                    predicate.getExpressions().add(
                            builder.greaterThanOrEqualTo(join.get("createTime"), date)
                    );
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            if (StringUtils.isNotBlank(cond.getEndSubmitTime())) {
                try {
                    Date date = SIMPLE_DATE_FORMAT.parse(cond.getEndSubmitTime());
                    predicate.getExpressions().add(
                            builder.lessThanOrEqualTo(join.get("createTime"), date)
                    );
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            if (cond.isMine()) {
                predicate.getExpressions().add(
                        builder.equal(join.get("creator"), cond.getAccount())
                );
            }
            if (StringUtils.isNotBlank(cond.getTaskName())) {
                predicate.getExpressions().add(
                        builder.like(join.get("jobName"), "%" + cond.getTaskName() + "%")
                );
            }
            if (StringUtils.isNotBlank(cond.getTaskStatus()) && !StringUtils.equalsIgnoreCase(cond.getTaskStatus(), "ALL")) {
                if (StringUtils.equalsIgnoreCase(cond.getTaskStatus(), "LaunchedOrRunning")) {
                    predicate.getExpressions().add(
                            builder.or(builder.equal(join.get("jobRunningStatus"), "Launched"), builder.equal(join.get("jobRunningStatus"), "Running"))
                    );
                } else {
                    predicate.getExpressions().add(
                            builder.equal(join.get("jobRunningStatus"), cond.getTaskStatus())
                    );
                }
            }
            return predicate;
        };
    }

    public AbstractTask findOne(long jobId) {
        return pciAfpTaskRepository.findOne(jobId);
    }

    @Transactional
    public SubmitResult submitTask(PciAfpTaskObj taskObj) {
        String msg = null;
        SubmitResult submitResult = new SubmitResult();
        submitResult.setFlag(false);

        PciAfpTaskInfo taskInfo = taskObj.getTaskInfo();
        DataCollectRecord dataRecord = taskObj.getDataRecord();
        String account = taskInfo.getAccount();
        try {
            boolean canSubmit = true;

            Job job = new Job();
            job.setCreator(account);
            job.setJobName(taskInfo.getTaskName());
            job.setJobType(jobTypeCodePciAfp);
            job.setDescription(taskInfo.getTaskDesc());

            job = jobRepository.save(job);
            if (job == null || job.getJobId() <= 0) {
                msg = "创建jobId失败！";
                log.error(msg);
            } else {
                long jobId = job.getJobId();
                log.debug("pci翻频任务jobId={}", jobId);
                taskInfo.setJobId(jobId);
                if (taskInfo.getMatrixType() == 2) {
                    log.debug("保存干扰矩阵");
                    if (null == dataRecord) {
                        canSubmit = false;
                        msg = "保存干扰矩阵文件失败！";
                        log.error(msg);
                    } else {
                        dataRecord.setJobId(jobId);
                        dataRecord = dataCollectRecordRepository.save(dataRecord);

                        Long dataCollectId = dataRecord.getDataCollectId();

                        if (null == dataCollectId || dataCollectId < 1) {
                            canSubmit = false;
                            msg = "保存干扰矩阵文件失败！";
                            log.error(msg);
                        } else {
                            taskInfo.setMatrixDataCollectId(dataRecord.getDataCollectId());
                        }
                    }
                }

                if (canSubmit) {

                    List<Threshold> thresholds = taskObj.getThresholds();
                    List<PciAfpParam> params = new ArrayList<>();
                    // 保存对应的门限值
                    for (Threshold threshold : thresholds) {
                        if (!StringUtils.isBlank(threshold.getCode()) && !StringUtils.isBlank(threshold.getDefaultVal())) {
                            PciAfpParam param = new PciAfpParam();
                            param.setJobId(jobId);
                            param.setParamType("PCI_THRESHOLD");
                            param.setParamCode(threshold.getCode());
                            param.setParamVal(threshold.getDefaultVal());
                            params.add(param);
                        }
                    }
                    params = pciAfpParamRepository.save(params);
                    if (null == params) {
                        log.error("jobId={}，保存PCI规划参数失败！", jobId);
                        submitResult.setFlag(false);
                        submitResult.setResult("提交任务失败！");
                    } else {
                        PciAfpTask pciAfpTask = new PciAfpTask();
                        pciAfpTask.setJobId(jobId);
                        pciAfpTask.setBegMeaTime(SIMPLE_DATE_FORMAT2.parse(taskInfo.getBegMeaTime()));
                        pciAfpTask.setEndMeaTime(SIMPLE_DATE_FORMAT2.parse(taskInfo.getEndMeaTime()));
                        pciAfpTask.setAreaId(taskInfo.getCityId());
                        pciAfpTask.setDlFileName(taskInfo.getCityName() + "_" + jobId + (taskInfo.isZipResultFile() ? "_PCI优化.zip" : "_PCI优化方案.xlsx"));
                        pciAfpTask.setOptimizeCells(taskInfo.getOptimizeCells());
                        pciAfpTask.setPlanType(taskInfo.getPlanType());
                        pciAfpTask.setConvergenceType(taskInfo.getConvergenceType());
                        pciAfpTask.setCheckNCell(taskInfo.isCheckNCell());
                        pciAfpTask.setExportAssoTable(taskInfo.isExportAssoTable());
                        pciAfpTask.setExportMidPlan(taskInfo.isExportMidPlan());
                        pciAfpTask.setExportNcCheckPlan(taskInfo.isExportNcCheckPlan());
                        pciAfpTask.setSfFiles(taskInfo.getSfFiles());
                        pciAfpTask.setFreqAdjType(taskInfo.getFreqAdjType());
                        pciAfpTask.setD1Freq(taskInfo.getD1Freq());
                        pciAfpTask.setD2Freq(taskInfo.getD2Freq());
                        pciAfpTask.setMatrixDataCollectId(taskInfo.getMatrixDataCollectId());
                        pciAfpTask.setFlowDataCollectId(taskInfo.getFlowDataCollectId());
                        pciAfpTask.setKs(taskInfo.getKs());
                        pciAfpTask.setMatrixType(taskInfo.getMatrixType());

                        pciAfpTask = pciAfpTaskRepository.save(pciAfpTask);
                        if (null != pciAfpTask) {
                            msg = "任务提交成功，请等待分析完成！";
                            log.info(msg);
                            submitResult.setFlag(true);
                            submitResult.setJobId(jobId);
                        } else {
                            msg = "创建任务失败！";
                            log.error(msg);
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            msg = "创建任务失败！";
            log.error(msg);
        }
        submitResult.setResult(msg);
        return submitResult;
    }

    public boolean updateTaskStatus(long jobId, String jobStatus) {
        PciAfpTask task = pciAfpTaskRepository.getOne(jobId);
        task.setFinishState(jobStatus);
        return null != pciAfpTaskRepository.save(task);
    }

    public List<Threshold> getThresholdsByModuleType(String moduleType) {
        return thresholdRepository.findByModuleTypeOrderByOrderNum(moduleType);
    }

    public List<PciAfpParam> queryParamInfo(long jobId) {
        return pciAfpParamRepository.findByJobId(jobId);
    }

    public DataCollectRecord getMatrixInfo(long matrixDcId) {
        return dataCollectRecordRepository.findOneByJobId(matrixDcId);
    }
}
