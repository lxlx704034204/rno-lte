package com.hgicreate.rno.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hgicreate.rno.service.RnoLteGisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@CrossOrigin
@RestController
public class RnoLteGisController {

	private static final Logger logger = LoggerFactory.getLogger(RnoLteGisController.class);

	@Autowired
	@Qualifier("rnoLteDynaOverGraphServiceImpl")
	private RnoLteGisService rnoLteGisService;

	/**
	 * 从MR数据表中获取动态覆盖数据
	 */
	@RequestMapping("/get4GDynaCoverageData2ForAction")
	Map<String, List<Map<String, Object>>> get4GDynaCoverageData2ForAction(
			 String lteCellId,  long cityId,
			 String startDate,  String endDate,
			 double imgCoeff,  double imgSizeCoeff) {
		logger.debug("获取画LTE小区动态覆盖图(折线)所需的数据, lteCellId=" + lteCellId
				+ ", cityId=" + cityId + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", imgCoeff=" + imgCoeff+",imgSizeCoeff="+imgSizeCoeff);

		Map<String, List<Map<String, Object>>> res = rnoLteGisService
				.get4GDynaCoverageData2ByCityAndDate(lteCellId, cityId, startDate, endDate,imgCoeff,imgSizeCoeff);
		return res;
	}

	/**
	 * 从MR数据表中获取IN干扰数据
	 */
	@RequestMapping("/get4GDynaCoverageInInferDataForAction")
	List<Map<String, String>> get4GDynaCoverageInInferDataForAction(
			 String lteCellId,  long cityId,
			 String startDate,  String endDate) {
		logger.debug("获取画LTE小区动态覆盖图(折线)所需的数据 in 干扰, lteCellId=" + lteCellId
				+ ", cityId=" + cityId + ", startDate=" + startDate
				+ ", endDate=" + endDate );
		List<Map<String, String>> res = rnoLteGisService
				.get4GDynaCoverageInInferDataByCityAndDate(lteCellId, cityId, startDate, endDate);
		return res;
	}

	/**
	 * 从MR数据表中获取OUT干扰数据
	 */
	@RequestMapping("/get4GDynaCoverageOutInferDataForAction")
	List<Map<String, String>> get4GDynaCoverageOutInferDataForAction(
			 String lteCellId,  long cityId,
			 String startDate,  String endDate) {
		logger.debug("获取画LTE小区动态覆盖图(折线)所需的数据out  干扰, lteCellId=" + lteCellId
				+ ", cityId=" + cityId + ", startDate=" + startDate
				+ ", endDate=" + endDate);
		
		List<Map<String, String>> res = rnoLteGisService
				.get4GDynaCoverageOutInferDataByCityAndDate(lteCellId, cityId, startDate, endDate);
		return res;
	}

	/* PCI评估 */

	/**
	 * in干扰数据
	 */
	@RequestMapping("/in")
	List<Map<String, Object>> in(int jobId,  String cellId) {
		logger.debug("jobId={},cellId={}", cellId, jobId);
		return rnoLteGisService.getInCellInfo(jobId, cellId);
	}

	/**
	 * out干扰数据
	 */
	@RequestMapping("/out")
	List<Map<String, Object>> out( int jobId,  String ncellId) {
		logger.debug("jobId={},ncellId={}", jobId, ncellId);
		return rnoLteGisService.getOutCellInfo(jobId, ncellId);
	}

	/**
	 * pci干扰数据
	 */
	@RequestMapping("/pci")
	List<Map<String, Object>> pci(int jobId,  String cellId) {
		logger.debug("jobId={},cellId={}",jobId , cellId);
		List<Map<String, Object>> pciInfo = rnoLteGisService.getPciCellInfo(jobId, cellId);
		logger.debug("pciInfo={}",pciInfo.size());
		return pciInfo;
	}

	/**
	 * 转换lte小区与某同站小区的pci
	 */
	@RequestMapping("/changeLteCellPciForAjaxAction")
	Map<String, Boolean> changeLteCellPciForAjaxAction(String cell1,String cell2,  String pci1,  String pci2) {
		logger.debug("changeLteCellPciForAjaxAction. cell1={}, pci1={}, cell2={}, pci2={}", cell1, pci1, cell2, pci2);
		return rnoLteGisService.changeLteCellPci(cell1, pci1, cell2, pci2);
	}
}
