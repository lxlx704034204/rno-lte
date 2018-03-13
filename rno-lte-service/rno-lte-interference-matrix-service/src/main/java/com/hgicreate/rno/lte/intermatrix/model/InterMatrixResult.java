package com.hgicreate.rno.lte.intermatrix.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class InterMatrixResult implements Serializable {
    private String cellId;
    private String ncellId;
    private Double relaVal;
    private Integer cellPci;
    private Integer ncellPci;
    private Integer cellEarfcn;
    private Integer ncellEarfcn;
    private Double mrRela;
    private Double hoRela;
    private Double sfRela;
}
