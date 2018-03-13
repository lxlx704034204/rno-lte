package com.hgicreate.rno.lte.common.service.intermatrix;

import com.hgicreate.rno.lte.common.model.AbstractTask;
import com.hgicreate.rno.lte.common.model.Job;
import com.hgicreate.rno.lte.common.model.SubmitResult;
import com.hgicreate.rno.lte.common.model.TaskQueryCond;
import com.hgicreate.rno.lte.common.model.intermatrix.InterMatrixTask;
import com.hgicreate.rno.lte.common.model.intermatrix.InterferenceMatrixTaskRecord;
import com.hgicreate.rno.lte.common.repo.JobRepository;
import com.hgicreate.rno.lte.common.repo.intermatrix.InterMatrixTaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

@Slf4j
@Service
public class InterMatrixTaskService {
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT2 = new SimpleDateFormat("yyyy-MM-dd");

    private final JobRepository jobRepository;
    private final InterMatrixTaskRepository interMatrixTaskRepository;

    @Value("${rno.job-type-code.inter-matrix:RNO_LTE_INTERFER_MATRIX}")
    private String jobTypeCodeInterMatrix;

    public InterMatrixTaskService(JobRepository jobRepository, InterMatrixTaskRepository interMatrixTaskRepository) {
        this.jobRepository = jobRepository;
        this.interMatrixTaskRepository = interMatrixTaskRepository;
    }

    public Page<InterMatrixTask> findAll(TaskQueryCond cond, Pageable pageable) {
        return interMatrixTaskRepository.findAll(Specifications.where(getWhereClause(cond)), pageable);
    }

    private Specification<InterMatrixTask> getWhereClause(TaskQueryCond cond) {
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
            Join<InterMatrixTask, Job> join = root.join("job", JoinType.INNER);
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
        return interMatrixTaskRepository.findOne(jobId);
    }

    @Transactional
    public SubmitResult submitTask(InterferenceMatrixTaskRecord cond) {
        String msg;
        SubmitResult submitResult = new SubmitResult();
        submitResult.setFlag(false);

        try {
            // 创建job
            Job job = new Job();
            job.setCreator(cond.getAccount());
            job.setJobName(cond.getTaskName());
            job.setJobType(jobTypeCodeInterMatrix);
            job.setDescription(cond.getTaskDesc());

            job = jobRepository.save(job);
            if (job == null || job.getJobId() <= 0) {
                msg = "创建jobId失败！";
                log.error(msg);
            } else {
                long jobId = job.getJobId();
                InterMatrixTask interMatrixTask = new InterMatrixTask();
                interMatrixTask.setJobId(jobId);
                interMatrixTask.setTaskName(cond.getTaskName());
                interMatrixTask.setBegMeaTime(SIMPLE_DATE_FORMAT2.parse(cond.getMeaBegTime()));
                interMatrixTask.setEndMeaTime(SIMPLE_DATE_FORMAT2.parse(cond.getMeaEndTime()));
                interMatrixTask.setAreaId(cond.getCityId());
                interMatrixTask.setDlFilename(cond.getCityName() + "_" + jobId + "_LTE干扰矩阵结果.csv");
                interMatrixTask.setSameFreqCellCoefWeight(cond.getSameFreqCellCoefWeight());
                interMatrixTask.setSwitchRatioWeight(cond.getSwitchRatioWeight());
                interMatrixTask.setSfFiles(cond.getSfFiles());
                interMatrixTask.setDataDescription(cond.getDataDescription());
                interMatrixTask.setRecordNum(cond.getRecordNum());
                interMatrixTask = interMatrixTaskRepository.save(interMatrixTask);
                if (null != interMatrixTask) {
                    msg = "任务提交成功，请等待分析完成！";
                    log.info(msg);
                    submitResult.setFlag(true);
                    submitResult.setJobId(jobId);
                } else {
                    msg = "创建任务失败！";
                    log.error(msg);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            msg = "创建天线方位角评估任务失败！";
            log.error(msg);
        }
        submitResult.setResult(msg);
        return submitResult;
    }

    public boolean updateTaskStatus(long jobId, String jobStatus) {
        InterMatrixTask task = interMatrixTaskRepository.getOne(jobId);
        task.setFinishState(jobStatus);
        return null != interMatrixTaskRepository.save(task);
    }

    public Map<String, Object> isExistedTaskThisWeek(long cityId) {
        Map<String, Object> result = new HashMap<>();

        Pageable pageable = new PageRequest(0, 1, Sort.Direction.DESC, "createTime");

        Page<InterMatrixTask> interMatrixTasks = interMatrixTaskRepository.findAll(Specifications.where(
                (root, query, builder) -> {
                    Predicate predicate = builder.conjunction();
                    if (cityId > 0) {
                        predicate.getExpressions().add(
                                builder.equal(root.get("areaId"), cityId)
                        );
                    }
                    predicate.getExpressions().add(
                            builder.equal(root.get("finishState"), "计算完成")
                    );
                    predicate.getExpressions().add(
                            builder.equal(root.get("status"), "Y")
                    );

                    // 任务记录表
                    Join<InterMatrixTask, Job> join = root.join("job", JoinType.INNER);

                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime thisMonday = now.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));

                    predicate.getExpressions().add(builder.greaterThanOrEqualTo(join.get("createTime"), Date.from(thisMonday.atZone(ZoneId.systemDefault()).toInstant())));
                    predicate.getExpressions().add(builder.lessThanOrEqualTo(join.get("createTime"), Date.from(now.atZone(ZoneId.systemDefault()).toInstant())));
                    return predicate;
                }), pageable);

        // 转为星期命名
        String desc = "";
        boolean flag = false;
        if (interMatrixTasks != null && null != interMatrixTasks.getContent() && !interMatrixTasks.getContent().isEmpty()) {
            LocalDateTime dateTime = LocalDateTime.ofInstant(interMatrixTasks.getContent().get(0).getCreateTime().toInstant(), ZoneId.systemDefault());
            desc = "本周周" + dateTime.getDayOfWeek().getDisplayName(TextStyle.NARROW, Locale.getDefault()) + " " + dateTime.toLocalTime() + " 曾经计算过干扰矩阵";
            flag = true;
        }

        result.put("flag", flag);
        result.put("desc", desc);
        return result;
    }

    public boolean existsByTaskNameAndAreaId(String taskName, long cityId) {
        return interMatrixTaskRepository.existsByTaskNameAndAreaId(taskName, cityId);
    }

    public List<InterMatrixTask> getLatelyLteMatrixByCityId(long cityId) {
        return interMatrixTaskRepository.findTop10ByAreaIdAndFinishStateOrderByCreateTimeDesc(cityId, "计算完成");
    }
}
