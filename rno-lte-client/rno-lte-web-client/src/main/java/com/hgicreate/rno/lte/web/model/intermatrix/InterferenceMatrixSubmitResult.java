package com.hgicreate.rno.lte.web.model.intermatrix;

import lombok.Data;

@Data
public class InterferenceMatrixSubmitResult {
    private boolean mrExist;
    private boolean hoExist;
    private boolean dateRight;
    private String dataType;
    private boolean result;
    private String msg;
}
