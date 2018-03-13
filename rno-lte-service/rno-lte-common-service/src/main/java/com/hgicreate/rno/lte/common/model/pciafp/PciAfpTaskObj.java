package com.hgicreate.rno.lte.common.model.pciafp;

import lombok.Data;

import java.util.List;

@Data
public class PciAfpTaskObj {
    private PciAfpTaskInfo taskInfo;
    private List<Threshold> thresholds;
    private DataCollectRecord dataRecord;
}
