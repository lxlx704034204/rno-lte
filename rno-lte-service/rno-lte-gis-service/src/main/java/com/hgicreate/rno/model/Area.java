package com.hgicreate.rno.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.Map;
@Data
public class Area implements Serializable {
	private static final long serialVersionUID = 1L;

	private long areaId;
	private String name;
	private long parentId;
	private String areaLevel;
	private String entityType;
	private long entityId;
	private double lon;
	private double lat;
	private String path;
	private Date createTime;
	private Date updateTime;

}
