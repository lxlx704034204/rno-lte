package com.hgicreate.rno.lte.intermatrix.model;

import lombok.Data;

@Data
public class FileResult {
    private boolean result;
    private String msg;
    private int statusCode;
    private String filename;
    private byte[] fileBody;
    private long fileLength;
}
