package com.hgicreate.rno.lte.intermatrix.model;

import lombok.Data;

@Data
public class PageResultBody {
    private String result;
    private String msg;
    private Object data;
    private Page page;
}
