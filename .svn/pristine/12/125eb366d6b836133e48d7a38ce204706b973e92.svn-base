package com.hgicreate.rno.lte.common.service.pciafp;

import com.hgicreate.rno.lte.common.model.pciafp.*;
import com.hgicreate.rno.lte.common.repo.pciafp.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class PciAfpResultService {
    private final BestPlanItemRepository bestPlanItemRepository;
    private final MidPlanItemRepository midPlanItemRepository;
    private final NcCheckPlanItemRepository ncCheckPlanItemRepository;
    private final Cell2RelaRepository cell2RelaRepository;
    private final TopCell2InterRepository topCell2InterRepository;
    private final D1Cell2InterRepository d1Cell2InterRepository;
    private final D2Cell2InterRepository d2Cell2InterRepository;

    public PciAfpResultService(BestPlanItemRepository bestPlanItemRepository, MidPlanItemRepository midPlanItemRepository, NcCheckPlanItemRepository ncCheckPlanItemRepository, Cell2RelaRepository cell2RelaRepository, TopCell2InterRepository topCell2InterRepository, D1Cell2InterRepository d1Cell2InterRepository, D2Cell2InterRepository d2Cell2InterRepository) {
        this.bestPlanItemRepository = bestPlanItemRepository;
        this.midPlanItemRepository = midPlanItemRepository;
        this.ncCheckPlanItemRepository = ncCheckPlanItemRepository;
        this.cell2RelaRepository = cell2RelaRepository;
        this.topCell2InterRepository = topCell2InterRepository;
        this.d1Cell2InterRepository = d1Cell2InterRepository;
        this.d2Cell2InterRepository = d2Cell2InterRepository;
    }

    public List<BestPlanItem> saveBestPlan(List<BestPlanItem> items) {
        return bestPlanItemRepository.save(items);
    }

    public List<BestPlanItem> queryBestPlanByJobId(long jobId) {
        return bestPlanItemRepository.findByJobId(jobId);
    }

    public List<MidPlanItem> saveMidPlan(List<MidPlanItem> items) {
        return midPlanItemRepository.save(items);
    }

    public Long queryMidPlanCntByJobId(long jobId) {
        return midPlanItemRepository.countDistinctPlanNumByJobId(jobId);
    }

    public List<MidPlanItem> queryMidPlanByJobId(long jobId, int planNum) {
        return midPlanItemRepository.findByJobIdAndPlanNum(jobId, planNum);
    }

    public List<NcCheckPlanItem> saveNcCheckPlan(List<NcCheckPlanItem> items) {
        return ncCheckPlanItemRepository.save(items);
    }

    public List<NcCheckPlanItem> queryNcCheckPlanByJobId(long jobId) {
        return ncCheckPlanItemRepository.findByJobId(jobId);
    }

    public List<Cell2Rela> saveRelevancyTable(List<Cell2Rela> relas) {
        return cell2RelaRepository.save(relas);
    }

    public List<Cell2Rela> queryRelevancyTableByJobId(long jobId) {
        return cell2RelaRepository.findByJobId(jobId);
    }

    public List<TopCell2Inter> saveTopCell(List<TopCell2Inter> inters) {
        return topCell2InterRepository.save(inters);
    }

    public List<TopCell2Inter> queryTopCellByJobId(long jobId, int planNum) {
        return topCell2InterRepository.findByJobIdAndPlanNum(jobId, planNum);
    }

    public List<D1Cell2Inter> saveD1Cell(List<D1Cell2Inter> inters) {
        return d1Cell2InterRepository.save(inters);
    }

    public List<D1Cell2Inter> queryD1CellByJobId(long jobId) {
        return d1Cell2InterRepository.findByJobId(jobId);
    }

    public List<D2Cell2Inter> saveD2Cell(List<D2Cell2Inter> inters) {
        return d2Cell2InterRepository.save(inters);
    }

    public List<D2Cell2Inter> queryD2CellByJobId(long jobId) {
        return d2Cell2InterRepository.findByJobId(jobId);
    }
}
