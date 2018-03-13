package com.hgicreate.rno.model;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class Area implements Serializable {

	private long id;
	private String name;
	private long parentId;
	private String areaLevel;
	private double lon;
	private double lat;
	private List<Area> children;
}
