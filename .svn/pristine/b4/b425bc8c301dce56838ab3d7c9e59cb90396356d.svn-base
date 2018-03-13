package com.hgicreate.rno.service;

import com.hgicreate.rno.model.Area;

import java.util.List;
import java.util.Map;

public interface RnoLteGisService {

	/* 动态覆盖 */

	/*
	 * 获取画LTE小区动态覆盖图(折线)所需的数据
	 */
	public Map<String, List<Map<String, Object>>> get4GDynaCoverageData2ByCityAndDate(
            String lteCellId, long cityId, String startDate, String endDate,
            double imgCoeff, double imgSizeCoeff);
	/*
	 * 获取画LTE小区动态覆盖 in干扰所需的数据【小区位置】
	 */
	public List<Map<String,String>> get4GDynaCoverageInInferDataByCityAndDate(
            String lteCellId, long cityId, String startDate, String endDate);
	/*
	 * 获取画LTE小区动态覆盖 out干扰所需的数据[邻区位置]
	 */
	public List<Map<String,String>> get4GDynaCoverageOutInferDataByCityAndDate(
            String lteCellId, long cityId, String startDate, String endDate);

	/* PCI评估 */

	/**
	 * 转换lte小区与某同站小区的pci
	 */
	public Map<String, Boolean> changeLteCellPci(String cell1, String pci1, String cell2, String pci2);

	/**
	 * 获取IN干扰小区信息
	 */
	public List<Map<String, Object>> getInCellInfo(int jobId, String cellId);

	/**
	 * 获取OUT干扰小区信息
	 */
	public List<Map<String, Object>> getOutCellInfo(int jobId, String ncellId);

	/**
	 * 获取PCI智能优化小区信息
	 */
	public List<Map<String, Object>> getPciCellInfo(int jobId, String cellId);
}
