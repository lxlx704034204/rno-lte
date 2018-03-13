package com.hgicreate.rno.dao;

import com.hgicreate.rno.service.CommonRestClient;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

public interface RnoLteGisDao {

	/*  动态覆盖 */

	/**
	 * 获取某个地市 的小区频段类型信息
	 */
	public Map<String, Object> queryLteCellShapeDataByCityId(long cityId);

	/**
	 * 从spark数据查询动态覆盖数据
	 */
	public Map<String,List<Map<String,Object>>> queryDynaCoverDataFromSparkMrTable(
			long cityId, String lteCellId, String startDate, String endDate, String inOrOut);

	/* PCI 评估 */

	/**
	 * 转换lte小区与某同站小区的pci
	 */
	public boolean changeLteCellPci(final String cell1, final String pci1, final String cell2, final String pci2);
}
