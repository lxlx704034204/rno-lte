package com.hgicreate.rno.lte.pciafp.service;

import com.hgicreate.rno.lte.pciafp.client.PciAfpTaskRestClient;
import com.hgicreate.rno.lte.pciafp.model.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.IntStream;

@Slf4j
@Service
public class PciAfpRestServiceImpl implements PciAfpRestService {

    private final PciAfpTaskRestClient pciAfpTaskRestClient;

    @Value("${rno.batch:10000}")
    private int batch;

    public PciAfpRestServiceImpl(PciAfpTaskRestClient pciAfpTaskRestClient) {
        this.pciAfpTaskRestClient = pciAfpTaskRestClient;
    }

    @Override
    public boolean updateOwnProgress(long jobId, String jobStatus) {
       return pciAfpTaskRestClient.updateTaskStatus(jobId, jobStatus);
    }

    @Override
    public PciAfpTask queryTaskRecordByJobId(long jobId) {
        return pciAfpTaskRestClient.queryTaskRecordByJobId(jobId);
    }

    @Override
    public List<Threshold> getThresholdsByModuleType(String moduleType) {
        return pciAfpTaskRestClient.getThresholdsByModuleType(moduleType);
    }

    @Override
    public List<PciAfpParam> queryParamInfo(long jobId) {
        return pciAfpTaskRestClient.queryParamInfo(jobId);
    }

    @Override
    public DataCollectRecord getMatrixInfo(long matrixDcId) {
        return pciAfpTaskRestClient.getMatrixInfo(matrixDcId);
    }

    @Override
    public Long batchInsertBestPlan(List<PlanItem> items) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<PlanItem>> group = new HashMap<>();
        IntStream.range(0, items.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(items.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(pciAfpTaskRestClient.saveBestPlan(e)));

        return cnt.get();
    }

    @Override
    public List<PlanItem> queryBestPlanByJobId(long jobId) {
        return pciAfpTaskRestClient.queryBestPlanByJobId(jobId);
    }

    @Override
    public Long batchInsertMidPlan(List<PlanItem> items) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<PlanItem>> group = new HashMap<>();
        IntStream.range(0, items.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(items.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(pciAfpTaskRestClient.saveMidPlan(e)));

        return cnt.get();
    }

    @Override
    public Long queryMidPlanCntByJobId(long jobId) {
        return pciAfpTaskRestClient.queryMidPlanCntByJobId(jobId);
    }

    @Override
    public List<PlanItem> queryMidPlanByJobId(long jobId, int planNum) {
        return pciAfpTaskRestClient.queryMidPlanByJobId(jobId, planNum);
    }

    @Override
    public Long batchInsertNcCheckPlan(List<PlanItem> items) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<PlanItem>> group = new HashMap<>();
        IntStream.range(0, items.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(items.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(pciAfpTaskRestClient.saveNcCheckPlan(e)));

        return cnt.get();
    }

    @Override
    public List<PlanItem> queryNcCheckPlanByJobId(long jobId) {
        return pciAfpTaskRestClient.queryNcCheckPlanByJobId(jobId);
    }

    @Override
    public Long batchInsertRelevancyTable(List<Cell2Rela> relas) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<Cell2Rela>> group = new HashMap<>();
        IntStream.range(0, relas.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(relas.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(pciAfpTaskRestClient.saveRelevancyTable(e)));

        return cnt.get();
    }

    @Override
    public List<Cell2Rela> queryRelevancyTableByJobId(long jobId) {
        return pciAfpTaskRestClient.queryRelevancyTableByJobId(jobId);
    }

    @Override
    public Long batchInsertTopCell(List<Cell2Inter> inters) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<Cell2Inter>> group = new HashMap<>();
        IntStream.range(0, inters.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(inters.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(pciAfpTaskRestClient.saveTopCell(e)));

        return cnt.get();
    }

    @Override
    public List<Cell2Inter> queryTopCellByJobId(long jobId, int planNum) {
        return pciAfpTaskRestClient.queryTopCellByJobId(jobId,planNum);
    }

    @Override
    public Long batchInsertD1Cell(List<Cell2Inter> inters) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<Cell2Inter>> group = new HashMap<>();
        IntStream.range(0, inters.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(inters.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(pciAfpTaskRestClient.saveD1Cell(e)));

        return cnt.get();
    }

    @Override
    public List<Cell2Inter> queryD1CellByJobId(long jobId) {
        return pciAfpTaskRestClient.queryD1CellByJobId(jobId);
    }

    @Override
    public Long batchInsertD2Cell(List<Cell2Inter> inters) {
        final AtomicLong cnt = new AtomicLong();

        final Map<Integer, List<Cell2Inter>> group = new HashMap<>();
        IntStream.range(0, inters.size()).forEach(e -> {
            int gid = e / batch;
            group.computeIfAbsent(gid, k -> new ArrayList<>()).add(inters.get(e));
        });

        // 由于是绑定参数的提交方式，第一次耗时比较多，之后可以重用，速度较快。
        group.values().forEach(e -> cnt.addAndGet(pciAfpTaskRestClient.saveD2Cell(e)));

        return cnt.get();
    }

    @Override
    public List<Cell2Inter> queryD2CellByJobId(long jobId) {
        return pciAfpTaskRestClient.queryD2CellByJobId(jobId);
    }
}
