package com.hgicreate.rno.lte.common.model.datamgt;

import lombok.Data;

@Data
public class FileCond<T> {
    private T cond;
    private FileContainer fileContainer;
}
