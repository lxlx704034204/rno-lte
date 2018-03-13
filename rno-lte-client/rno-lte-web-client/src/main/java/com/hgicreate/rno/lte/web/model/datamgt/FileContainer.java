package com.hgicreate.rno.lte.web.model.datamgt;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "fileBody")
public class FileContainer {
    private String filename;
    private byte[] fileBody;
    private long fileLength;
}
