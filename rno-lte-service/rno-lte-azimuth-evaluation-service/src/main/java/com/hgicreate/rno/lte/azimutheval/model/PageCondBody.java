package com.hgicreate.rno.lte.azimutheval.model;

import lombok.Data;

@Data
public class PageCondBody<T> {
    private T cond;
    private Page page;
}
