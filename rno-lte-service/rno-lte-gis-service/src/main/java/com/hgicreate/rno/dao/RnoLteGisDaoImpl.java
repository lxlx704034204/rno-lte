package com.hgicreate.rno.dao;

import com.hgicreate.rno.mapper.LteGisMapper;
import com.hgicreate.rno.model.Cell;
import com.hgicreate.rno.service.CommonRestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("rnoLteDynaOverGraphDaoImpl")
public class RnoLteGisDaoImpl implements RnoLteGisDao {

	private static final Logger logger = LoggerFactory.getLogger(RnoLteGisDaoImpl.class);
	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private LteGisMapper lteGisMapper;

	@SuppressWarnings("SpringJavaAutowiringInspection")
	@Autowired
	private CommonRestClient commonRestClient;

	/*  动态覆盖 */

	/**
	 * 从spark数据查询动态覆盖数据
	 * out 出干扰：即被别人所检测  in 入干扰：即检测到别人
	 * @return 站间距集合及MR数据
	 */
	public Map<String,List<Map<String,Object>>> queryDynaCoverDataFromSparkMrTable(
			long cityId, String lteCellId,
			String startDate, String endDate, String inOrOut) {
		 Statement stmt = null;
		List<Map<String, String>> mrData = null;
		String sql = "",outSql = "",inSql ="";
		String dateArr[] = startDate.split(",");
		StringBuilder sb = new StringBuilder("(");
		for (String date:dateArr) {
			date = date.replaceAll("-","");
			sb.append("'"+date+"',");
		}
		sb.deleteCharAt(sb.length()-1);
		sb.append(")");

		List<Cell> lteCells = commonRestClient.findByAreaId(cityId);
		logger.debug("commonRestClient={},lteCells.size={}",commonRestClient,lteCells.size());
		Map<String,Object> cellIdToStationSpace = new HashMap<String, Object>();
		for (int i = 0;i<lteCells.size();i++){
			cellIdToStationSpace.put(lteCells.get(i).getCellId().toString(),lteCells.get(i).getStationSpace());
		}

		//MR数据
		List<Map<String,Object>> mrDatas = new ArrayList<Map<String,Object>>();

		if(inOrOut.toUpperCase().equals("IN")){
			mrDatas = lteGisMapper.queryDynaCoverDataFromSparkMrTableInData(cityId,lteCellId,sb.toString());
		}else if (inOrOut.toUpperCase().equals("OUT")){
			mrDatas = lteGisMapper.queryDynaCoverDataFromSparkMrTableOutData(cityId,lteCellId,sb.toString());
		}

	    //小区站间距详情
		List<Map<String,Object>> cellStationSps = new ArrayList<Map<String,Object>>();
		cellStationSps.add(cellIdToStationSpace);

		Map<String,List<Map<String,Object>>> result
				= new HashMap<String, List<Map<String,Object>>>();
		result.put("cellStationSps",cellStationSps);
		result.put("res",mrDatas);
		return result;
	}
	
	/**
	 * 获取某个地市 的小区频段类型信息
	 */
	public Map<String, Object> queryLteCellShapeDataByCityId(long cityId){
		
		Map<String, Object> shapes = new HashMap<String, Object>();

		List<Cell> lteCells = commonRestClient.findByAreaId(cityId);
		if(lteCells!=null){
			for (int i = 0; i < lteCells.size(); i++) {
				shapes.put(lteCells.get(i).getCellId().toString(), lteCells.get(i).getLongitude()+","+lteCells.get(i).getLatitude());
			}
		}
		return shapes;
	}

	/* PCI 评估 */

	/**
	 * 转换lte小区与某同站小区的pci
	 */
	public boolean changeLteCellPci(final String cell1, final String pci1, final String cell2, final String pci2){

		boolean res1 = commonRestClient.changeCellPci(cell1,Integer.parseInt(pci1));
		boolean res2 = commonRestClient.changeCellPci(cell2,Integer.parseInt(pci2));
		if (res1  && res2) {
			return true;
		} else {
			return false;
		}
	}
}
