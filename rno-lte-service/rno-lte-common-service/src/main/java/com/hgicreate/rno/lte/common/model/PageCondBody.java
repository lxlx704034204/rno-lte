package com.hgicreate.rno.lte.common.model;

import lombok.Data;

@Data
public class PageCondBody<T> {
    private T cond;
    private Page page;
}
