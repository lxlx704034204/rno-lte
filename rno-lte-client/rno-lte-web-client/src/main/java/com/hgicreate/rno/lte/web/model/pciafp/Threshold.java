package com.hgicreate.rno.lte.web.model.pciafp;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class Threshold implements Serializable {
    private static final long serialVersionUID = 1L;
    private BigDecimal id;
    private long orderNum;
    private String moduleType;
    private String code;
    private String descInfo;
    private String defaultVal;
    private String scopeDesc;
    private String conditionGroup;
    private boolean flag = true;

    public Threshold(long orderNum, String moduleType, String code, String descInfo, String defaultVal,
                     String scopeDesc, boolean flag) {
        this.orderNum = orderNum;
        this.moduleType = moduleType;
        this.code = code;
        this.descInfo = descInfo;
        this.defaultVal = defaultVal;
        this.scopeDesc = scopeDesc;
        this.flag = flag;
    }
}