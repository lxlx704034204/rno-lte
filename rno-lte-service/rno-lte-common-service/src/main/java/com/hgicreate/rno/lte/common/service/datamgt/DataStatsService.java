package com.hgicreate.rno.lte.common.service.datamgt;

import com.hgicreate.rno.lte.common.model.Job;
import com.hgicreate.rno.lte.common.model.datamgt.*;
import com.hgicreate.rno.lte.common.repo.datamgt.DataStatsRepository;
import com.hgicreate.rno.lte.common.service.JobService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class DataStatsService {
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private final JobService jobService;
    private final DataJobService dataJobService;
    private final FileService fileService;

    private final DataStatsRepository dataStatsRepository;

    public DataStatsService(JobService jobService, DataJobService dataJobService, FileService fileService, DataStatsRepository dataStatsRepository) {
        this.jobService = jobService;
        this.dataJobService = dataJobService;
        this.fileService = fileService;
        this.dataStatsRepository = dataStatsRepository;
    }

    public Page<DataStats> findAll(DataRecordCond cond, Pageable pageable) {
        return dataStatsRepository.findAll(Specifications.where((r, q, cb) -> {
            Predicate predicate = cb.conjunction();

            if (StringUtils.isNotBlank(cond.getDataType()) && !StringUtils.equalsIgnoreCase("ALL", cond.getDataType())) {
                predicate.getExpressions().add(
                        cb.equal(r.get("dataType"), StringUtils.trim(cond.getDataType()))
                );
            }

            // 数据导入任务表
            Join<DataStats, DataJob> join = r.join("dataJob", JoinType.INNER);
            predicate.getExpressions().add(cb.equal(join.get("areaId"), cond.getCityId()));

            // 任务记录表
            Join<DataJob, Job> join2 = join.join("job", JoinType.INNER);
            if (StringUtils.isNotBlank(cond.getCreateTimeStart())) {
                try {
                    Date date = SIMPLE_DATE_FORMAT.parse(cond.getCreateTimeStart());
                    predicate.getExpressions().add(
                            cb.greaterThanOrEqualTo(join2.get("createTime"), date)
                    );
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            if (StringUtils.isNotBlank(cond.getCreateTimeEnd())) {
                try {
                    Date date = SIMPLE_DATE_FORMAT.parse(cond.getCreateTimeEnd());
                    predicate.getExpressions().add(
                            cb.lessThanOrEqualTo(join2.get("createTime"), date)
                    );
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            return predicate;
        }), pageable);
    }

    @Transactional
    public FileSaveResult importFile(FileCond<DataRecordCond> fileCond) {
        FileSaveResult fileSaveResult = new FileSaveResult();
        fileSaveResult.setResult(false);
        fileSaveResult.setMsg("文件导入出错。");
        if (null != fileCond) {
            DataRecordCond cond = fileCond.getCond();
            log.debug("fileSaveResult = {}", fileSaveResult);
            Job job = new Job();
            job.setCreator(cond.getCreator());
            job.setJobName(cond.getDataType() + "文件导入");
            job.setJobRunningStatus("排队中");
            job.setJobType(cond.getDataType());
            jobService.saveJob(job);
            log.debug("new job={}", job);
            fileSaveResult = fileService.save(job.getJobId(), fileCond);
            if (null != fileSaveResult && fileSaveResult.isResult()) {
                DataJob dataJob = new DataJob();
                dataJob.setJobId(job.getJobId());
                dataJob.setDataType(cond.getDataType());
                dataJob.setAreaId(cond.getCityId());
                dataJob.setFilename(fileSaveResult.getNewFilename());
                dataJob.setFileSize(fileSaveResult.getFileSize());
                dataJob.setOriFilename(fileSaveResult.getOriFilename());
                dataJob.setFullPath(fileSaveResult.getPath());
                dataJob.setFirstLineTitle(cond.isSkipTittle());
                dataJobService.saveDataJob(dataJob);
                log.debug("new dataJob={}", dataJob);
            } else {
                jobService.delete(job);
                if (null == fileSaveResult) {
                    fileSaveResult = new FileSaveResult();
                    fileSaveResult.setResult(false);
                    fileSaveResult.setMsg("无法将文件上传到FTP服务器。");
                }
            }
        } else {
            fileSaveResult.setMsg("条件为空，无法导入。");
        }
        return fileSaveResult;
    }

    public List<Date> findByAreaIdAndDataType(long areaId, String dataType) {
        return dataStatsRepository.findByAreaIdAndDataType(areaId, dataType);
    }
}
