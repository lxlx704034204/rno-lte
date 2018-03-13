package com.hgicreate.rno.service;

import com.hgicreate.rno.dao.RnoLteGisDao;
import com.hgicreate.rno.mapper.LteGisMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("rnoLteDynaOverGraphServiceImpl")
public class RnoLteGisServiceImpl implements RnoLteGisService {

	private static final Logger logger = LoggerFactory.getLogger(RnoLteGisServiceImpl.class);

	@Autowired
	private LteGisMapper lteGisMapper;

	@Autowired
	@Qualifier("rnoLteDynaOverGraphDaoImpl")
	private RnoLteGisDao rnoLteDynaOverGraphDao;

	private static double defaultImgSize = 0.005; // 曲线点距离服务小区的长度系数0.005
	private static double evalCoeff = 0.3; // 服务小区评估方向的长度系数，经调试0.3较好
	private static float scale = 0.6f; //控制点收缩系数 ，经调试0.6较好
	private static double step = 0.01; //曲线密度(0-1)0.01
	@SuppressWarnings("unused")
	private static double defaultImgSizeCoff = 10; // 矢量长度系数10

	/*
	 * 获取画LTE小区动态覆盖图(折线)所需的数据
	 */
	public Map<String, List<Map<String, Object>>> get4GDynaCoverageData2ByCityAndDate(
			String lteCellId, long cityId, String startDate, String endDate,
			double imgCoeff,double imgSizeCoeff) {
		logger.debug("getDynaCoverageData2ByCityAndDate, lteCellId=" + lteCellId + ", cityId=" + cityId
				+ ", startDate=" + startDate + ", endDate=" + endDate);
		
		long stime = System.currentTimeMillis();

		//动态覆盖数据
		List<Map<String,Object>> dynaCoverData = new ArrayList<Map<String,Object>>();

		//小区站间距
		Map<String,Object> cellStationSpaces;
		Map<String,List<Map<String,Object>>> res = rnoLteDynaOverGraphDao
				.queryDynaCoverDataFromSparkMrTable(cityId,lteCellId,startDate,endDate,"OUT");
		dynaCoverData = res.get("res");
		cellStationSpaces = res.get("cellStationSps").get(0);
		if(dynaCoverData == null || dynaCoverData.size() == 0) {
			return null;
		}
		long etime = System.currentTimeMillis();
		logger.debug("从数据库读取数据量："+dynaCoverData.size()+"; 共耗时："+(etime-stime));
		
		//获取画(RELSS>-12)图形所需折线点坐标集合 rsr0
		Map<String, List<Map<String, Object>>> res_12 = calc4GDynaCoveragePointsData2(
				dynaCoverData, imgCoeff,imgSizeCoeff,cellStationSpaces,"RSRP0");

		Map<String, List<Map<String,Object>>> result = new HashMap<String, List<Map<String,Object>>>();
		result.put("vectorPoint_12", res_12.get("vectorPoint"));
		result.put("curvePoints_12", res_12.get("curvePoints"));
		result.put("resInterDetail", dynaCoverData);
		return result;
	}
	/*
	 * 获取画LTE小区动态覆盖 in干扰所需的数据【小区位置】
	 */
	public List<Map<String,String>> get4GDynaCoverageInInferDataByCityAndDate(
			String lteCellId, long cityId, String startDate, String endDate) {
		logger.debug("get4GDynaCoverageInInferDataByCityAndDate, lteCellId=" + lteCellId + ", cityId=" + cityId
				+ ", startDate=" + startDate + ", endDate=" + endDate);
		
		long stime = System.currentTimeMillis();

		Map<String,List<Map<String,Object>>> datas = rnoLteDynaOverGraphDao.queryDynaCoverDataFromSparkMrTable(cityId, lteCellId, startDate, endDate,"IN");
		List<Map<String,Object>> dynaCoverData = datas.get("res");
		if((dynaCoverData == null || dynaCoverData.size() == 0)
				) {
			return null;
		}
		//获取小区对应的形状坐标  cellid->113.105,23.0255;113.10571,23.02539;113.10525,23.02488
		Map<String, Object> cellToShapes=rnoLteDynaOverGraphDao.queryLteCellShapeDataByCityId(cityId);

		long etime = System.currentTimeMillis();
		logger.debug("从数据库读取(mr)数据量："+dynaCoverData.size()
				+"; 共耗时："+(etime-stime));
		
		String cellId,ncellId;
		double cellLon,cellLat,ncellLon,ncellLat;
		List<Map<String,String>> cells=new ArrayList<Map<String,String>>();
		Map<String, String> cell=null;
		String cellshapelonlatArr[]=new String[2];
		String ncellshapelonlatArr[]=new String[2];
		//工参数据为GPS坐标，通过基准点数据进行纠集获取百度坐标
		for (int i = 0; i < dynaCoverData.size(); i++) {
			cell=new HashMap<String, String>();
			cellId=dynaCoverData.get(i).get("CELL_ID").toString();
			ncellId=dynaCoverData.get(i).get("NCELL_ID").toString();
			if("".equals(ncellId)){
				continue;
			}
			cellshapelonlatArr=cellToShapes.get(cellId).toString().split(";");
			//获取中心点坐标
			cellLon = Double.parseDouble(cellshapelonlatArr[0].substring(0,
					cellshapelonlatArr[0].indexOf(",")));
			cellLat = Double.parseDouble(cellshapelonlatArr[0].substring(
					cellshapelonlatArr[0].split(";")[0].indexOf(",") + 1,
					cellshapelonlatArr[0].length()));
			ncellshapelonlatArr=cellToShapes.get(ncellId).toString().split(",");

			ncellLon = Double.parseDouble(ncellshapelonlatArr[0]);
			ncellLat = Double.parseDouble(ncellshapelonlatArr[1]) ;
			cell.put("CELL_ID", cellId);
			cell.put("NCELL_ID", ncellId);
			cell.put("CELL_LON", Double.toString(cellLon));
			cell.put("CELL_LAT", Double.toString(cellLat));
			cell.put("NCELL_LON", Double.toString(ncellLon));
			cell.put("NCELL_LAT", Double.toString(ncellLat));
			cells.add(cell);
		}
		return cells;
	}
	/*
	 * 获取画LTE小区动态覆盖 out干扰所需的数据[邻区位置]
	 */
	public List<Map<String,String>> get4GDynaCoverageOutInferDataByCityAndDate(
			String lteCellId, long cityId, String startDate, String endDate) {
		logger.debug("get4GDynaCoverageOutInferDataByCityAndDate, lteCellId=" + lteCellId + ", cityId=" + cityId
				+ ", startDate=" + startDate + ", endDate=" + endDate);
		long stime = System.currentTimeMillis();

		Map<String,List<Map<String,Object>>> datas = rnoLteDynaOverGraphDao.queryDynaCoverDataFromSparkMrTable(cityId, lteCellId, startDate, endDate,"OUT");
		List<Map<String,Object>> dynaCoverData = datas.get("res");
		if((dynaCoverData == null || dynaCoverData.size() == 0)
				) {
			return null;
		}
		//获取小区对应的形状坐标  cellid->113.105,23.0255;113.10571,23.02539;113.10525,23.02488
		Map<String, Object> cellToShapes=rnoLteDynaOverGraphDao.queryLteCellShapeDataByCityId(cityId);
		long etime = System.currentTimeMillis();
		logger.debug("从数据库读取(eri)数据量："+dynaCoverData.size()
				+"; 共耗时："+(etime-stime));
		String cellId,ncellId;
		double cellLon,cellLat,ncellLon,ncellLat;
		List<Map<String,String>> cells=new ArrayList<Map<String,String>>();
		Map<String, String> cell=null;
		String cellshapelonlatArr[]=new String[2];
		String ncellshapelonlatArr[]=new String[2];
		//工参数据为GPS坐标，通过基准点数据进行纠集获取百度坐标
		for (int i = 0; i < dynaCoverData.size(); i++) {
			cell=new HashMap<String, String>();
			cellId=dynaCoverData.get(i).get("CELL_ID").toString();
			ncellId=dynaCoverData.get(i).get("NCELL_ID").toString();
			if("".equals(ncellId)){
				continue;
			}
			cellshapelonlatArr=cellToShapes.get(cellId).toString().split(",");
			//获取中心点坐标
			cellLon = Double.parseDouble(cellshapelonlatArr[0]);
			cellLat = Double.parseDouble(cellshapelonlatArr[1]);
			ncellshapelonlatArr=cellToShapes.get(ncellId).toString().split(",");
			ncellLon = Double.parseDouble(ncellshapelonlatArr[0]);
			ncellLat = Double.parseDouble(ncellshapelonlatArr[1]);
			cell.put("CELL_ID", ncellId);
			cell.put("NCELL_ID", cellId);
			cell.put("CELL_LON", Double.toString(ncellLon));
			cell.put("CELL_LAT", Double.toString(ncellLat));
			cell.put("NCELL_LON", Double.toString(cellLon));
			cell.put("NCELL_LAT", Double.toString(cellLat));
			cells.add(cell);
		}
		return cells;
	}


	/**
	 *计算4G动态覆盖坐标点数据
	 */
	private Map<String, List<Map<String, Object>>> calc4GDynaCoveragePointsData2(
			List<Map<String, Object>> dynaCoverData,
			double imgCoeff,double imgSizeCoeff,Map<String,Object> cellStationSpaces,String rsrp) {
		String rsrpVal = "VAL1";
		if(rsrp.toUpperCase().equals("RSRP2")){
			rsrpVal = "VAL2";
		}
		long stime = System.currentTimeMillis();
		Map<String, List<Map<String, Object>>> result = new HashMap<String, List<Map<String,Object>>>();
		//主小区经纬度信息
		double cellLng = Double.parseDouble(dynaCoverData.get(0).get("CELL_LNG").toString());
		double cellLat = Double.parseDouble(dynaCoverData.get(0).get("CELL_LAT").toString());
		//如果图形大小系数未设置，取默认值
		double imgSize = 0.0;
		if(imgSize == 0) {
			imgSize = defaultImgSize;
		}
		double cellbaiduLng = cellLng;
		double cellbaiduLat = cellLat;
		List<ReferencePointCellId> points = new ArrayList<ReferencePointCellId>();
		ReferencePointCellId point = null;
		//通过经纬度存储对应的矢量长度
		Map<String, Double> lnglatToVector=new HashMap<String,Double>();
		/*                          A小区方向评估【CalAngle-A】 开始                 */
		/* 小区评估方向矢量X，Y坐标 */
		double cellEvalX = 0;
		double cellEvalY = 0;
		for (Map<String, Object> one : dynaCoverData) {
			double val = Double.parseDouble(one.get(rsrpVal).toString());
			//MR小区数据即为邻区数据，这里的经纬度信息即为邻区经纬度【不同】
			double lng = Double.parseDouble(one.get("LNG").toString());
			double lat = Double.parseDouble(one.get("LAT").toString());
			String ncell_id = one.get("NCELL_ID").toString();
			//增加这里获取的小区经纬度信息即为主小区经纬度信息【相同】
			double ncellLng = Double.parseDouble(one.get("CELL_LNG").toString());
			double ncellLat = Double.parseDouble(one.get("CELL_LAT").toString());
			if(lng==0 || lat==0) continue;
			//邻区的经纬度信息【不同】
			double oneBaiduLng = lng;
			double oneBaiduLat = lat;
			double lngDiff = Math.abs(oneBaiduLng - cellbaiduLng);
			double latDiff = Math.abs(oneBaiduLat - cellbaiduLat);
			double cosV = lngDiff/(Math.sqrt(lngDiff*lngDiff+latDiff*latDiff)); //正弦值->余弦值
			double sinV = latDiff/(Math.sqrt(lngDiff*lngDiff+latDiff*latDiff)); //余弦值->正弦值
			cellEvalX += val*cosV;
			cellEvalY += val*sinV;
			//缓存没有任何变化的小区经纬度信息为后续覆盖图使用
			point = new ReferencePointCellId(oneBaiduLng, oneBaiduLat,ncell_id);
			points.add(point);
			//缓存矢量长度：此时矢量长度是关联度*站间距，后面还要引入图形大小系数
			//存储邻区到服务小区的角度大小
			lnglatToVector.put(ncell_id+"",val);
		}
		/* 小区评估方向矢量经纬坐标 */
		double cellEvalLng = cellbaiduLng+cellEvalX;
		double cellEvalLat = cellbaiduLat+cellEvalY;
		List<Map<String,Object>> vectorPoints = new ArrayList<Map<String,Object>>();
		Map<String,Object> vectorPoint = new HashMap<String, Object>();
		vectorPoint.put("lng", cellEvalLng);
		vectorPoint.put("lat", cellEvalLat);
		vectorPoints.add(vectorPoint);
		result.put("vectorPoint", vectorPoints);
		/*                               A小区方向评估【CalAngle-A】 结束                                     */
		long etime = System.currentTimeMillis();
		logger.debug("数据通过基准点转为百度坐标，耗时："+(etime-stime));
		//以服务小区为中心，从第一象限到第四象限，按照角度大小排序
		//归纳16个点
		List<ReferencePoint> originPoints = ascAndInduce16PointsStage2(points,cellbaiduLng,cellbaiduLat,lnglatToVector,cellStationSpaces,imgCoeff);
		/* 直接将16个象限坐标点返回  绘制曲线，由前端贝塞尔类库实现*/
		List<Map<String,Object>> oriPointsList = new ArrayList<Map<String,Object>>();
		Map<String,Object> ori = new HashMap<String,Object>();
		for (int i = 0; i < originPoints.size(); i++) {
			ori.put(i+"",originPoints.get(i));
		}
		oriPointsList.add(ori);
		result.put("curvePoints", oriPointsList);
		etime = System.currentTimeMillis();
		logger.debug("通过数据计算折线点集合，耗时："+(etime-stime));
		return result;
	}
	/*
	 * 以服务小区为中心，从第一象限到第四象限，按照角度大小排序并归纳叠加成16个点 阶段2
	 */
	private List<ReferencePoint> ascAndInduce16PointsStage2(List<ReferencePointCellId> points,
			double cellbaiduLng, double cellbaiduLat,Map<String, Double> lnglatToVector,Map<String,Object> cellStationSpaces,double imgCoeff) {
		
		List<ReferencePointCellId> one = new ArrayList<ReferencePointCellId>();
		List<ReferencePointCellId> two = new ArrayList<ReferencePointCellId>();
		List<ReferencePointCellId> three = new ArrayList<ReferencePointCellId>();
		List<ReferencePointCellId> four = new ArrayList<ReferencePointCellId>();
		List<ReferencePoint> sumPoints = new ArrayList<ReferencePoint>();
		int oneCnt=0,twoCnt=0,threeCnt=0,fourCnt=0;
		//0.0006相对好些
		//划分落在每个象限的点
		//逆时针划分象限
		for (ReferencePointCellId p : points) {
			//第一象限
			if(p.getBaiduLng()>=cellbaiduLng && p.getBaiduLat()>cellbaiduLat) 
				{one.add(p);oneCnt++;}
			//第二象限
			if(p.getBaiduLng()<cellbaiduLng && p.getBaiduLat()>=cellbaiduLat) 
				{two.add(p);twoCnt++;}
			//第三象限
			if(p.getBaiduLng()<=cellbaiduLng && p.getBaiduLat()<cellbaiduLat) 
				{three.add(p);threeCnt++;}
			//第四象限
			if(p.getBaiduLng()>cellbaiduLng && p.getBaiduLat()<=cellbaiduLat)
				{four.add(p);fourCnt++;}
		}
		System.out.println("one===>"+oneCnt+"  tow====>"+twoCnt+" three====>"+threeCnt+"  four====>"+fourCnt);
		ReferencePoint temp = null;
		double xxi,yyi,xxj,yyj,sini,sinj,tanV,angleV,ideaDis,corDegree,cosV,sinV,angleV1;
		double ncellLng,ncellLat;
		String ncellId;
		double vectorLenth1 = 0 ;
		double vectorLenth2 = 0 ;
		double vectorLenth3 = 0 ;
		double vectorLenth4 = 0 ;
		double xxi1 = 0,xxi2 = 0,xxi3 = 0,xxi4 = 0,yyi1 = 0,yyi2 = 0,yyi3 = 0,yyi4 = 0;
		//将各自象限内的点按照角度划分顺序
		//第一象限
		for (int i = 0; i < one.size(); i++) {
			ncellLng = one.get(i).getBaiduLng();
			ncellLat = one.get(i).getBaiduLat();
			ncellId = one.get(i).getCellId();
			xxi = ncellLng - cellbaiduLng;
			yyi = ncellLat - cellbaiduLat;
			angleV = calcAngle(xxi,yyi);
			//矢量长度=关联度* 图形大小系数（固定，暂无默认值，需后期调整）*理想覆盖
			//还需要重构小区站间距，经度_纬度的方式
			ideaDis = Double.parseDouble(cellStationSpaces.get(ncellId+"").toString());
			corDegree = Double.parseDouble(lnglatToVector.get(ncellId+"").toString());
			if (angleV>=0 && angleV<22.5){
				//决定矢量长度
				vectorLenth1 += ideaDis*defaultImgSize*corDegree;
				//经纬度矢量相加决定方向角
				xxi1+=xxi;
				yyi1+=yyi;
			}else if(angleV>=22.5 && angleV<45){
				vectorLenth2 += ideaDis*defaultImgSize*corDegree;
				xxi2+=xxi;
				yyi2+=yyi;
			}else if(angleV>=45 && angleV<67.5){
				vectorLenth3 += ideaDis*defaultImgSize*corDegree;
				xxi3+=xxi;
				yyi3+=yyi;
			}else if(angleV>=67.5 && angleV<90){
				vectorLenth4 += ideaDis*defaultImgSize*corDegree;
				xxi4+=xxi;
				yyi4+=yyi;
			}
		}
		/* 第一象限第一区域坐标矢量 */
		if (vectorLenth1!= 0 && (xxi1!=0 || yyi1!=0)){
			cosV = xxi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			sinV = yyi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			xxi1 = vectorLenth1*cosV;
			yyi1 = vectorLenth1*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi1,cellbaiduLat + yyi1));
		}
		/* 第一象限第二区域坐标矢量 */
		if (vectorLenth2!= 0 && (xxi2!=0 || yyi2!=0)){
			cosV = xxi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			sinV = yyi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			xxi2 = vectorLenth2*cosV;
			yyi2 = vectorLenth2*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi2,cellbaiduLat + yyi2));
		}
		/* 第一象限第三区域坐标矢量 */
		if (vectorLenth3!= 0 && (xxi3!=0 || yyi3!=0)){
			cosV = xxi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			sinV = yyi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			xxi3 = vectorLenth3*cosV;
			yyi3 = vectorLenth3*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi3,cellbaiduLat + yyi3));
		}
        /* 第一象限第四区域坐标矢量 */
		if (vectorLenth4!= 0 && (xxi4!=0 || yyi4!=0)){
			cosV = xxi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			sinV = yyi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			xxi4 = vectorLenth4*cosV;
			yyi4 = vectorLenth4*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi4,cellbaiduLat + yyi4));
		}
		/* 初始化 */
		vectorLenth1 = 0;
		vectorLenth2 = 0;
		vectorLenth3 = 0;
		vectorLenth4 = 0;
		xxi1 = 0;
		yyi1 = 0;
		xxi2 = 0;
		yyi2 = 0;
		xxi3 = 0;
		yyi3 = 0;
		xxi4 = 0;
		yyi4 = 0;
		//第二象限
		for (int i = 0; i < two.size(); i++) {
			ncellLng = two.get(i).getBaiduLng();
			ncellLat = two.get(i).getBaiduLat();
			ncellId = two.get(i).getCellId();
			xxi = ncellLng - cellbaiduLng;
			yyi = ncellLat - cellbaiduLat;
			angleV = calcAngle(xxi,yyi);
			//矢量长度=关联度* 图形大小系数（固定，暂无默认值，需后期调整）*理想覆盖
			//还需要重构小区站间距，经度_纬度的方式
			ideaDis = Double.parseDouble(cellStationSpaces.get(ncellId+"").toString());
			corDegree = Double.parseDouble(lnglatToVector.get(ncellId+"").toString());
			if (angleV>=90 && angleV<112.5){
				//决定矢量长度
				vectorLenth1 += ideaDis*defaultImgSize*corDegree;
				//经纬度矢量相加决定方向角
				xxi1+=xxi;
				yyi1+=yyi;
			}else if(angleV>=112.5 && angleV<135){
				vectorLenth2 += ideaDis*defaultImgSize*corDegree;
				xxi2+=xxi;
				yyi2+=yyi;
			}else if(angleV>=135 && angleV<157.5){
				vectorLenth3 += ideaDis*defaultImgSize*corDegree;
				xxi3+=xxi;
				yyi3+=yyi;
			}else if(angleV>=157.5 && angleV<180){
				vectorLenth4 += ideaDis*defaultImgSize*corDegree;
				xxi4+=xxi;
				yyi4+=yyi;
			}
		}
		/* 第二象限第一区域坐标矢量 */
		if (vectorLenth1!= 0 && (xxi1!=0 || yyi1!=0)){
			cosV = xxi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			sinV = yyi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			xxi1 = vectorLenth1*cosV;
			yyi1 = vectorLenth1*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi1,cellbaiduLat + yyi1));
		}
		/* 第二象限第二区域坐标矢量 */
		if (vectorLenth2!= 0 && (xxi2!=0 || yyi2!=0)){
			cosV = xxi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			sinV = yyi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			xxi2 = vectorLenth2*cosV;
			yyi2 = vectorLenth2*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi2,cellbaiduLat + yyi2));
		}
		/* 第二象限第三区域坐标矢量 */
		if (vectorLenth3!= 0 && (xxi3!=0 || yyi3!=0)){
			cosV = xxi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			sinV = yyi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			xxi3 = vectorLenth3*cosV;
			yyi3 = vectorLenth3*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi3,cellbaiduLat + yyi3));
		}
        /* 第二象限第四区域坐标矢量 */
		if (vectorLenth4!= 0 && (xxi4!=0 || yyi4!=0)){
			cosV = xxi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			sinV = yyi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			xxi4 = vectorLenth4*cosV;
			yyi4 = vectorLenth4*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi4,cellbaiduLat + yyi4));
		}
		/* 初始化 */
		vectorLenth1 = 0;
		vectorLenth2 = 0;
		vectorLenth3 = 0;
		vectorLenth4 = 0;
		xxi1 = 0;
		yyi1 = 0;
		xxi2 = 0;
		yyi2 = 0;
		xxi3 = 0;
		yyi3 = 0;
		xxi4 = 0;
		yyi4 = 0;
		//第三象限
		for (int i = 0; i < three.size(); i++) {
			ncellLng = three.get(i).getBaiduLng();
			ncellLat = three.get(i).getBaiduLat();
			ncellId = three.get(i).getCellId();
			xxi = ncellLng - cellbaiduLng;
			yyi = ncellLat - cellbaiduLat;
			angleV = calcAngle(xxi,yyi);
			//矢量长度=关联度* 图形大小系数（固定，暂无默认值，需后期调整）*理想覆盖
			//还需要重构小区站间距，经度_纬度的方式
			ideaDis = Double.parseDouble(cellStationSpaces.get(ncellId+"").toString());
			corDegree = Double.parseDouble(lnglatToVector.get(ncellId+"").toString());
			if (angleV>=180 && angleV<202.5){
				//决定矢量长度
				vectorLenth1 += ideaDis*defaultImgSize*corDegree;
				//经纬度矢量相加决定方向角
				xxi1+=xxi;
				yyi1+=yyi;
			}else if(angleV>=202.5 && angleV<225){
				vectorLenth2 += ideaDis*defaultImgSize*corDegree;
				xxi2+=xxi;
				yyi2+=yyi;
			}else if(angleV>=225 && angleV<247.5){
				vectorLenth3 += ideaDis*defaultImgSize*corDegree;
				xxi3+=xxi;
				yyi3+=yyi;
			}else if(angleV>=247.5 && angleV<270){
				vectorLenth4 += ideaDis*defaultImgSize*corDegree;
				xxi4+=xxi;
				yyi4+=yyi;
			}
		}
		/* 第三象限第一区域坐标矢量 */
		if (vectorLenth1!= 0 && (xxi1!=0 || yyi1!=0)){
			cosV = xxi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			sinV = yyi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			xxi1 = vectorLenth1*cosV;
			yyi1 = vectorLenth1*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi1,cellbaiduLat + yyi1));
		}
		/* 第三象限第二区域坐标矢量 */
		if (vectorLenth2!= 0 && (xxi2!=0 || yyi2!=0)){
			cosV = xxi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			sinV = yyi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			xxi2 = vectorLenth2*cosV;
			yyi2 = vectorLenth2*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi2,cellbaiduLat + yyi2));
		}
		/* 第三象限第三区域坐标矢量 */
		if (vectorLenth3!= 0 && (xxi3!=0 || yyi3!=0)){
			cosV = xxi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			sinV = yyi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			xxi3 = vectorLenth3*cosV;
			yyi3 = vectorLenth3*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi3,cellbaiduLat + yyi3));
		}
        /* 第三象限第四区域坐标矢量 */
		if (vectorLenth4!= 0 && (xxi4!=0 || yyi4!=0)){
			cosV = xxi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			sinV = yyi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			xxi4 = vectorLenth4*cosV;
			yyi4 = vectorLenth4*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi4,cellbaiduLat + yyi4));
		}
		/* 初始化 */
		vectorLenth1 = 0;
		vectorLenth2 = 0;
		vectorLenth3 = 0;
		vectorLenth4 = 0;
		xxi1 = 0;
		yyi1 = 0;
		xxi2 = 0;
		yyi2 = 0;
		xxi3 = 0;
		yyi3 = 0;
		xxi4 = 0;
		yyi4 = 0;
		//第四象限
		for (int i = 0; i < four.size(); i++) {

			ncellLng = four.get(i).getBaiduLng();
			ncellLat = four.get(i).getBaiduLat();
			ncellId = four.get(i).getCellId();
			xxi = ncellLng - cellbaiduLng;
			yyi = ncellLat - cellbaiduLat;
			angleV = calcAngle(xxi,yyi);
			//矢量长度=关联度* 图形大小系数（固定，暂无默认值，需后期调整）*理想覆盖
			//还需要重构小区站间距，经度_纬度的方式
			ideaDis = Double.parseDouble(cellStationSpaces.get(ncellId+"").toString());
			corDegree = Double.parseDouble(lnglatToVector.get(ncellId+"").toString());
			if (angleV>=270 && angleV<292.5){
				//决定矢量长度
				vectorLenth1 += ideaDis*defaultImgSize*corDegree;
				//经纬度矢量相加决定方向角
				xxi1+=xxi;
				yyi1+=yyi;
			}else if(angleV>=292.5 && angleV<315){
				vectorLenth2 += ideaDis*defaultImgSize*corDegree;
				xxi2+=xxi;
				yyi2+=yyi;
			}else if(angleV>=315 && angleV<337.5){
				vectorLenth3 += ideaDis*defaultImgSize*corDegree;
				xxi3+=xxi;
				yyi3+=yyi;
			}else if(angleV>=337.5 && angleV<360){
				vectorLenth4 += ideaDis*defaultImgSize*corDegree;
				xxi4+=xxi;
				yyi4+=yyi;
			}
		}
		/* 第四象限第一区域坐标矢量 */
		if (vectorLenth1!= 0 && (xxi1!=0 || yyi1!=0)){
			cosV = xxi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			sinV = yyi1/Math.sqrt(xxi1*xxi1+yyi1*yyi1);
			xxi1 = vectorLenth1*cosV;
			yyi1 = vectorLenth1*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi1,cellbaiduLat + yyi1));
		}
		/* 第四象限第二区域坐标矢量 */
		if (vectorLenth2!= 0 && (xxi2!=0 || yyi2!=0)){
			cosV = xxi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			sinV = yyi2/Math.sqrt(xxi2*xxi2+yyi2*yyi2);
			xxi2 = vectorLenth2*cosV;
			yyi2 = vectorLenth2*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi2,cellbaiduLat + yyi2));
		}
		/* 第四象限第三区域坐标矢量 */
		if (vectorLenth3!= 0 && (xxi3!=0 || yyi3!=0)){
			cosV = xxi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			sinV = yyi3/Math.sqrt(xxi3*xxi3+yyi3*yyi3);
			xxi3 = vectorLenth3*cosV;
			yyi3 = vectorLenth3*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi3,cellbaiduLat + yyi3));
		}
        /* 第四象限第四区域坐标矢量 */
		if (vectorLenth4!= 0 && (xxi4!=0 || yyi4!=0)){
			cosV = xxi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			sinV = yyi4/Math.sqrt(xxi4*xxi4+yyi4*yyi4);
			xxi4 = vectorLenth4*cosV;
			yyi4 = vectorLenth4*sinV;
			sumPoints.add(new ReferencePoint(cellbaiduLng + xxi4,cellbaiduLat + yyi4));
		}
		/*  十六分区域两两相邻矢量再次相加 绿色矢量（回落折线图）=相邻两个矢量相加 * 折线图形状系数（默认为0.3）  */
		double shapeFactor = 0.3;
		List<ReferencePoint> tempPoints = new ArrayList<ReferencePoint>();
		for (int i = 0; i < sumPoints.size(); i++) {
			for (int j = i+1; j < sumPoints.size(); j++) {
				xxi = sumPoints.get(i).getBaiduLng() - cellbaiduLng;
				yyi = sumPoints.get(i).getBaiduLat() - cellbaiduLat;
				xxj = sumPoints.get(j).getBaiduLng() - cellbaiduLng;
				yyj = sumPoints.get(j).getBaiduLat() - cellbaiduLat;
				//夹角大于180度放弃两坐标点矢量累加
				if (Math.abs(calcAngle(xxi,yyi)-calcAngle(xxj,yyj))>180){
					continue;
				}
				//矢量X
				xxi = xxi+xxj;
				//矢量Y
				yyi = yyi+yyj;
				vectorLenth1 = Math.sqrt(xxi*xxi+yyi*yyi)*shapeFactor;
				cosV = xxi/Math.sqrt(xxi*xxi+yyi*yyi);
				sinV = yyi/Math.sqrt(xxi*xxi+yyi*yyi);
				xxi = vectorLenth1*cosV;
				yyi = vectorLenth1*sinV;
				tempPoints.add(new ReferencePoint(cellbaiduLng + xxi,cellbaiduLat + yyi));
				if (j==sumPoints.size()-1){
					xxi = sumPoints.get(0).getBaiduLng() - cellbaiduLng;
					yyi = sumPoints.get(0).getBaiduLat() - cellbaiduLat;
					//矢量X
					xxi = xxi+xxj;
					//矢量Y
					yyi = yyi+yyj;
					vectorLenth1 = Math.sqrt(xxi*xxi+yyi*yyi)*shapeFactor;
					cosV = xxi/Math.sqrt(xxi*xxi+yyi*yyi);
					sinV = yyi/Math.sqrt(xxi*xxi+yyi*yyi);
					xxi = vectorLenth1*cosV;
					yyi = vectorLenth1*sinV;
					tempPoints.add(new ReferencePoint(cellbaiduLng + xxi,cellbaiduLat + yyi));
				}else{
					break;
				}
			}
		}
		if (tempPoints.size()!=0){
			//合并
			sumPoints.addAll(tempPoints);
		}
		// 再次角度大小排序 依次从小到大排列
		//保存矢量长度
		double verLens[] = new double[sumPoints.size()];
		for (int i = 0; i < sumPoints.size(); i++) {

			xxi = sumPoints.get(i).getBaiduLng()-cellbaiduLng;
			yyi = sumPoints.get(i).getBaiduLat()-cellbaiduLat;
			vectorLenth1 = Math.sqrt(xxi*xxi+yyi*yyi);
//			verLens.put(i+"",vectorLenth1);
			verLens[i] = vectorLenth1;
			for (int j = i+1; j < sumPoints.size(); j++) {
				xxi = sumPoints.get(i).getBaiduLng() - cellbaiduLng;
				yyi = sumPoints.get(i).getBaiduLat() - cellbaiduLat;
				xxj = sumPoints.get(j).getBaiduLng() - cellbaiduLng;
				yyj = sumPoints.get(j).getBaiduLat() - cellbaiduLat;
				angleV = calcAngle(xxi,yyi);
				angleV1 = calcAngle(xxj,yyj);
				if(angleV > angleV1) {
					temp = sumPoints.get(i);
					sumPoints.set(i, sumPoints.get(j));
					sumPoints.set(j, temp);
				}
			}
		}
		// 再次矢量长度大小排序 依次从小到大排列
		for (int i = 0; i < sumPoints.size(); i++) {
			for (int j = i+1; j < sumPoints.size(); j++) {
				xxi = sumPoints.get(i).getBaiduLng() - cellbaiduLng;
				yyi = sumPoints.get(i).getBaiduLat() - cellbaiduLat;
				xxj = sumPoints.get(j).getBaiduLng() - cellbaiduLng;
				yyj = sumPoints.get(j).getBaiduLat() - cellbaiduLat;
				angleV = calcAngle(xxi,yyi);
				angleV1 = calcAngle(xxj,yyj);
				if(angleV > angleV1) {
					temp = sumPoints.get(i);
					sumPoints.set(i, sumPoints.get(j));
					sumPoints.set(j, temp);
				}
			}
		}
		//根据集合中最大最小值的比值确定各矢量坐标到原点坐标收缩的倍数
		Arrays.sort(verLens);
		double maxVal = verLens[sumPoints.size()-1];
		double minVal = verLens[0];
		logger.debug("最大矢量长度==="+maxVal);
		logger.debug("最小矢量长度==="+minVal);
		double ratio = maxVal/minVal;
		logger.debug("比值大小   ratio================"+ratio);
		for (int i = 0; i < sumPoints.size(); i++) {
			//策略调整
			if (maxVal>0.04){
				if (ratio>10000){
					ratio = 100;
				}else if(10000>=ratio && ratio>100){
					ratio = 100;
				}else if (ratio<100){
					ratio =5;
				}
			}else if (0.04>=maxVal && maxVal>0.00099){
				ratio = 1;
			}else if(maxVal<= 0.00099){
				ratio = 0.1;
			}
			xxi = sumPoints.get(i).getBaiduLng() - cellbaiduLng;
			yyi = sumPoints.get(i).getBaiduLat() - cellbaiduLat;
			cosV = xxi/Math.sqrt(xxi*xxi+yyi*yyi);
			sinV = yyi/Math.sqrt(xxi*xxi+yyi*yyi);
			xxi = cosV*Math.sqrt(xxi*xxi+yyi*yyi)/ratio*imgCoeff;
			yyi = sinV*Math.sqrt(xxi*xxi+yyi*yyi)/ratio*imgCoeff;
			sumPoints.get(i).setBaiduLng(cellbaiduLng+xxi);
			sumPoints.get(i).setBaiduLat(cellbaiduLat+yyi);
		}
		logger.debug("方法结束   sumPoints================"+sumPoints.size());
		return sumPoints;
	}

	class ReferencePoint {
		double baiduLng;
		double baiduLat;

		public ReferencePoint(){
		}
		public ReferencePoint(double baiduLng, double baiduLat) {
			this.baiduLng = baiduLng;
			this.baiduLat = baiduLat;
		}
		public double getBaiduLng() {
			return baiduLng;
		}
		public void setBaiduLng(double baiduLng) {
			this.baiduLng = baiduLng;
		}
		public double getBaiduLat() {
			return baiduLat;
		}
		public void setBaiduLat(double baiduLat) {
			this.baiduLat = baiduLat;
		}
		@Override
		public String toString() {
			return "ReferencePoint [baiduLng=" + baiduLng + ", baiduLat="
					+ baiduLat + "]";
		}
	}
	class ReferencePointCellId {
		double baiduLng;
		double baiduLat;
		String cellId;

		public ReferencePointCellId(){
		}
		public ReferencePointCellId(double baiduLng, double baiduLat, String cellId) {
			this.baiduLng = baiduLng;
			this.baiduLat = baiduLat;
			this.cellId = cellId;
		}
		public String getCellId() {
			return cellId;
		}
		public void setCellId(String cellId) {
			this.cellId = cellId;
		}
		public double getBaiduLng() {
			return baiduLng;
		}
		public void setBaiduLng(double baiduLng) {
			this.baiduLng = baiduLng;
		}
		public double getBaiduLat() {
			return baiduLat;
		}
		public void setBaiduLat(double baiduLat) {
			this.baiduLat = baiduLat;
		}
		@Override
		public String toString() {
			return "ReferencePointCellId{" +
					"baiduLng=" + baiduLng +
					", baiduLat=" + baiduLat +
					", cellId=" + cellId +
					'}';
		}
	}
	private double calcAngle(double x, double y) {
		double d = 0.0;
		double tan = y / x;
		if (x == 0.0 && y == 0.0) {
			d = 0.0;
		} else if (x >= 0.0 && y == 0.0) {
			d = 90.0;
		} else if (x < 0 && y == 0) {
			d = 180.0;
		} else if (x == 0.0 && y < 0.0) {
			d = 270.0;
		} else {
			d = Math.atan(tan);
		}
		if (x > 0.0 && y > 0.0) {
			d = d * 180 / Math.PI;
		} else if (x < 0.0 && y != 0.0) {
			d = 180 + d * 180 / Math.PI;
		} else if (x > 0.0 && y < 0.0) {
			d = 360 + d * 180 / Math.PI;
		}
		return d;
	}
	/* PCI评估 */
	/**
	 * 转换lte小区与某同站小区的pci
	 */
	public Map<String, Boolean> changeLteCellPci(String cell1, String pci1, String cell2, String pci2) {
		boolean result =  rnoLteDynaOverGraphDao.changeLteCellPci(cell1,pci1,cell2,pci2);
		Map<String, Boolean> map = new HashMap<>();
		if(result){
			map.put("flag", true);
		}else{
			map.put("flag", false);
		}
		return map;
	}

	@Override
	public List<Map<String, Object>> getInCellInfo(int jobId, String cellId) {
		Map<String, Object> map = new HashMap<>();
		map.put("jobId", jobId);
		map.put("cellId", cellId);
		return lteGisMapper.getInCellInfo(map);
	}

	@Override
	public List<Map<String, Object>> getOutCellInfo(int jobId, String ncellId) {
		Map<String, Object> map = new HashMap<>();
		map.put("jobId", jobId);
		map.put("ncellId", ncellId);
		return lteGisMapper.getOutCellInfo(map);
	}

	@Override
	public List<Map<String, Object>> getPciCellInfo(int jobId, String cellId) {
		Map<String, Object> map = new HashMap<>();
		map.put("jobId", jobId);
		map.put("cellId", cellId);
		return lteGisMapper.getPciCellInfo(map);
	}
}
