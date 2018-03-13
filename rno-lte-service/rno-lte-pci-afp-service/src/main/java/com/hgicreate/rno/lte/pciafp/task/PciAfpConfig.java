package com.hgicreate.rno.lte.pciafp.task;

import com.hgicreate.rno.lte.pciafp.model.*;
import com.hgicreate.rno.lte.pciafp.service.CommonRestService;
import com.hgicreate.rno.lte.pciafp.service.PciAfpRestService;
import com.hgicreate.rno.lte.pciafp.service.PciAfpSparkService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.data.hadoop.fs.FsShell;
import org.springframework.util.CollectionUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Data
strictfp class PciAfpConfig {
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT3 = new SimpleDateFormat("yyyyMMdd");

    private long jobId = -1;

    private final CommonRestService commonRestService;

    private final PciAfpSparkService pciAfpSparkService;

    private final PciAfpRestService pciAfpRestService;

    private final FsShell fsShell;

    private double m3r = 1;
    private double m6r = 0.8;
    private double m30r = 0.1;
    private double topRate = 0.1; // top n%
    private double defInterRate = 0.05; // 给定的干扰差值比例m
    private double defVariance = 0.05; // 给定的方差值
    private int divideNumber = 10;
    private double dtKs = -1.0;

    private String planType = "ONE"; // 评估方案，默认1

    private String convergenceType = "ONE"; // 收敛方案，默认1
    private boolean isCheckNCell; // 邻区核查，默认进行
    private boolean isExportAssoTable;// 关联表输出，默认不输出
    private boolean isExportMidPlan;// 中间方案输出，默认不输出
    private boolean isExportNcCheckPlan;// 邻区核查方案输出，默认不输出

    private boolean isUseSf = false;

    private String d1D2Type = "";

    private String d1Freq = "";

    private String d2Freq = "";

    private long matrixDcId;
    // 保存返回信息
    private String returnInfo = "";

    /**
     * 距离限制，单位米
     **/
    private double disLimit = 5000.0;

    /**
     * 变小区表
     **/
    private List<String> need2AssignCells;

    private double rsrp0minus1weight;

    private double rsrp1weight;

    /**
     * 小区与同站其他小区列的映射，同站其他小区已按关联度从大到小排列 <br>
     * 比如key为1 <br>
     * 干扰矩阵为 <br>
     * 1->2 <br>
     * 1->3 <br>
     * 同站
     **/
    private Map<String, List<String>> cellToSameStationCells = new HashMap<>();

    /**
     * 小区与非同站小区列表的映射，非同站小区已按关联度从大到小排列 <br>
     * 比如key为1 、 <br>
     * 干扰矩阵为 <br>
     * 1->12 <br>
     * 1->23 <br>
     * 非同站
     **/
    private Map<String, List<String>> cellToNotSameStationCells = new HashMap<>();

    /**
     * 邻区与非同站小区列表的映射，非同站小区已按关联度从大到小排列 <br>
     * 比如key为1 <br>
     * 干扰矩阵为 <br>
     * 12->1 <br>
     * 23->1 <br>
     * 非同站
     **/
    private Map<String, List<String>> ncellToNotSameStationCells = new HashMap<>();

    /**
     * 小区与邻区关联度的映射（包含了同站其他小区） 以主小区为key
     **/
    private Map<String, Map<String, Double>> cellToNcellRelevancy = new HashMap<>();

    /**
     * 小区与邻区关联度的映射 以邻小区为key
     **/
    private Map<String, Map<String, Double>> ncellToCellRelevancy = new HashMap<>();

    /**
     * 小区与小区总关联度的映射
     **/
    private Map<String, Double> cellToTotalRelevancy = new HashMap<>();

    /**
     * 小区列表
     **/
    private List<String> cellList;

    /**
     * 小区与原PCI的映射
     **/
    private Map<String, Integer> cellToOriPci;

    /**
     * 小区到经纬度的映射，不重复
     **/
    private Map<String, double[]> cellToLonLat;

    /**
     * 小区与频率的映射
     **/
    private Map<String, Integer> cellToEarfcn;

    /**
     * 基站到小区列表的映射
     **/
    private Map<String, List<String>> enodebToCells;

    /**
     * 小区到基站的映射
     **/
    private Map<String, String> cell2Enodeb;

    /**
     * d1小区列表
     **/
    private List<String> abCellList = new ArrayList<>();

    // 干扰矩阵上传文件路径
    private String matrixDfPath;

    // 小区与KS值的映射
    private Map<String, Double> cellToKs = new HashMap<>();

    PciAfpConfig(long jobId, CommonRestService commonRestService, PciAfpRestService pciAfpRestService, PciAfpSparkService pciAfpSparkService, FsShell fsShell) {
        this.jobId = jobId;
        this.commonRestService = commonRestService;
        this.pciAfpRestService = pciAfpRestService;
        this.pciAfpSparkService = pciAfpSparkService;
        this.fsShell = fsShell;
    }

    boolean buildPciTaskConf() {
        log.debug("生成计算配置，jobId={}", jobId);
        Date startTime = new Date();
        String msg;

        // 通过 jobId 获取干扰矩阵计算记录信息(rno_lte_pci_job表），包括变小区的 CLOB 信息
        PciAfpTask pciAfpTask = pciAfpRestService.queryTaskRecordByJobId(jobId);

        if (pciAfpTask == null) {
            msg = "任务配置信息不存在";
            log.error(msg);
            commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Fail.toString(), "获取任务配置信息");
            commonRestService.endJob(jobId, JobParseStatus.Fail.toString());
            return false;
        }
        log.debug("taskInfo={}", pciAfpTask);
        Job job = pciAfpTask.getJob();

        String optimizeCells = pciAfpTask.getOptimizeCells();

        String cellArr[];
        if (optimizeCells != null && !"".equals(optimizeCells.trim())) {
            cellArr = optimizeCells.split(",");
            if (cellArr.length == 0) {
                // 保存报告信息
                msg = "变PCI小区字符串逗号分割后的长度为０,不满足基本需求！";
                log.debug(msg);
                commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Fail.toString(), "变PCI小区字符串逗号分割后的长度为０,不满足基本需求！");
                commonRestService.endJob(job, JobParseStatus.Fail.toString());
                return false;
            }
        } else {
            // 保存报告信息
            msg = "变PCI小区字符串为NULL！";
            log.debug(msg);
            commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Fail.toString(), "变PCI小区字符串为NULL！");
            commonRestService.endJob(job, JobParseStatus.Fail.toString());
            return false;
        }
        // 去重
        this.need2AssignCells = new ArrayList<>(new HashSet<>(Arrays.asList(cellArr)));
        log.debug("需要分配的小区总数={}", need2AssignCells.size());

        long cityId = pciAfpTask.getAreaId();

        if (!handleCellToParameter(cityId)) {
            msg = "该区域下的lte小区数据不存在";
            log.debug(msg);
            commonRestService.addOneReport(jobId, startTime, msg, DataParseStatus.Fail.toString(), "通过城市ID获取小区工参");
            commonRestService.endJob(job, JobParseStatus.Fail.toString());
            return false;
        }

        // 干扰矩阵和流量文件上传ID
        matrixDcId = pciAfpTask.getMatrixDataCollectId();

        long flowDcId = pciAfpTask.getFlowDataCollectId();

        int matrixType = pciAfpTask.getMatrixType();

        this.planType = pciAfpTask.getPlanType();
        this.convergenceType = pciAfpTask.getConvergenceType();
        this.isCheckNCell = pciAfpTask.isCheckNCell();
        this.isExportAssoTable = pciAfpTask.isExportAssoTable();
        this.isExportMidPlan = pciAfpTask.isExportMidPlan();
        this.isExportNcCheckPlan = pciAfpTask.isExportNcCheckPlan();

        // 处理扫频文件
        List<String> fileNameList = pciAfpTask.getsfFilenames();

        if (!fileNameList.isEmpty() && !fileNameList.get(0).isEmpty()) {
            isUseSf = true;
            this.d1D2Type = null == pciAfpTask.getFreqAdjType() ? "" : pciAfpTask.getFreqAdjType();
            if (!d1D2Type.isEmpty()) {
                this.d1Freq = null == pciAfpTask.getD1Freq() ? "" : pciAfpTask.getD1Freq();
                this.d2Freq = null == pciAfpTask.getD2Freq() ? "" : pciAfpTask.getD2Freq();
            }
        }

        // 获取修正值
        this.dtKs = pciAfpTask.getKs();
        if (!(dtKs > 0)) {
            dtKs = -1;
        }

        MatrixParam matrixParam = handleThresholds(jobId);

        // 获取干扰矩阵导入计算信息
        if (matrixType == 2) {//采用矩阵文件
            // 获取job相关的信息
            DataCollectRecord record = pciAfpRestService.getMatrixInfo(matrixDcId);
            if (record == null) {
                // 失败了
                msg = "未找到干扰矩阵文件！";
                log.debug(msg);
                commonRestService.addOneReport(jobId, new Date(), msg, DataParseStatus.Fail.toString(), "获取干扰矩阵文件");
                commonRestService.endJob(job, JobParseStatus.Fail.toString());
                return false;
            }
            this.matrixDfPath = record.getFullPath();
        } else if (matrixType == 1) {//采用新计算的矩阵
            DataCond dataCond = new DataCond();
            dataCond.setJobId(jobId);
            dataCond.setMeaBegTime(SIMPLE_DATE_FORMAT3.format(pciAfpTask.getBegMeaTime()).replace("-", ""));
            dataCond.setMeaEndTime(SIMPLE_DATE_FORMAT3.format(pciAfpTask.getEndMeaTime()).replace("-", ""));
            dataCond.setCityId(cityId);
            return handleNewMatrix(dataCond, matrixParam, flowDcId);
        }
        return true;
    }

    private boolean handleCellToParameter(long cityId) {
        log.debug("获取小区工参。cityId={}", cityId);
        CellToParameter cellToParameter = pciAfpSparkService.getParamForCellsMapByAreaId(cityId);

        if (cellToParameter == null || cellToParameter.isEmpty()) {
            return false;
        }

        cellList = cellToParameter.getCellList();
        log.debug("小区总数={}", cellList.size());
        cellToLonLat = cellToParameter.getCellToLonLat();
        cellToOriPci = cellToParameter.getCellToOriPci();
        cellToEarfcn = cellToParameter.getCellToEarfcn();
        enodebToCells = cellToParameter.getEnodebToCells();
        cell2Enodeb = cellToParameter.getCell2Enodeb();

        // 处理同站小区
        List<String> sameStationCells;
        for (String cellId : cellList) {
            sameStationCells = new ArrayList<>();
            for (String cellTmp : enodebToCells.get(cell2Enodeb.get(cellId))) {
                if (!cellTmp.equals(cellId) && Objects.equals(cellToEarfcn.get(cellId),cellToEarfcn.get(cellTmp))) {
                    sameStationCells.add(cellTmp.intern());
                }
            }
            cellToSameStationCells.put(cellId.intern(), sameStationCells);
        }
        return true;
    }

    private boolean handleNewMatrix(DataCond dataCond, MatrixParam matrixParam, long flowDcId) {
        log.debug("计算新干扰矩阵。dataCond={},matrixParam={},flowDcId={}", dataCond, matrixParam, flowDcId);
        List<String> list;
        Map<String, Object> timeMap = new HashMap<>();
        Map<String, Object> dataMap = new HashMap<>();

        try {
            timeMap.put("startMeaDay", dataCond.getMeaBegTime());
            timeMap.put("endMeaDay", dataCond.getMeaEndTime());
            timeMap.put("areaId", dataCond.getCityId());
            dataMap.put("jobId", dataCond.getJobId());
            dataMap.put("areaId", dataCond.getCityId());

//            //准备MR临时表数据
//            list = pciAfpSparkService.queryMrMeaDate(timeMap);
//            dataMap.put("meaTime", list);
//            if (!list.isEmpty()) {
//                pciAfpSparkService.createMrTempTable(dataMap);
//            }
//
//            //准备HO临时表数据
//            list = pciAfpSparkService.queryHoMeaDate(timeMap);
//            dataMap.put("meaTime", list);
//            if (!list.isEmpty()) {
//                pciAfpSparkService.createHoTempTable(dataMap);
//            }
//
//            //准备SF临时表数据
//            if (isUseSf) {
//                list = pciAfpSparkService.querySfMeaDate(timeMap);
//                dataMap.put("meaTime", list);
//                if (!list.isEmpty()) {
//                    pciAfpSparkService.createSfTempTable(dataMap);
//                }
//            }

            // 如果流量文件ID大于0 获取流量文件信息；
            if (flowDcId > 0) {

                list = pciAfpSparkService.queryFlowMeaDate(timeMap);
                dataMap.put("meaTime", list);
                if (!list.isEmpty()) {
                    pciAfpSparkService.createFlowTempTable(dataMap);
                }
                List<Map<String, Object>> cellToFlow = pciAfpSparkService.getFlow(dataMap);
                // 计算全网平均业务量
                double perFlow = 0;
                for (Map<String, Object> map : cellToFlow) {
                    double one;
                    if (map.get("flow") == null) {
                        one = 0;
                    } else {
                        one = Double.parseDouble(map.get("flow").toString());
                    }
                    perFlow += one < 100 ? 100 : one;
                }
                perFlow = perFlow / cellToFlow.size();

                for (Map<String, Object> map : cellToFlow) {
                    double ks;
                    double one;
                    if (map.get("flow") == null) {
                        one = 0;
                    } else {
                        one = Double.parseDouble(map.get("flow").toString());
                    }
                    double flow = one < 100 ? 100 : one;
                    ks = flow / perFlow;
                    cellToKs.put(map.get("cellId").toString().intern(), ks);
                }
            }

            //计算干扰矩阵并入到仓库
            Map<String, Object> map = new HashMap<>();
            map.put("jobId", jobId);
            map.put("samefreqcellcoefweight", matrixParam.getSamefreqcellcoefweight());
            map.put("switchratioweight", matrixParam.getSwitchratioweight());
            map.put("disLimit", disLimit);
            map.put("rsrp0minus1weight", rsrp0minus1weight);
            map.put("rsrp1weight", rsrp1weight);
            map.put("minmeasuresum", matrixParam.getMinmeasuresum());
            map.put("mincorrelation", matrixParam.getMincorrelation());
            map.put("startMeaDay", dataCond.getMeaBegTime());
            map.put("endMeaDay", dataCond.getMeaEndTime());
            map.put("areaId", dataCond.getCityId());
            log.debug("干扰矩阵计算条件：map={}", map);
            if (isUseSf) {
                Long cnt = pciAfpSparkService.createMatrix(map);
                log.debug("创建新干扰矩阵完成。cnt={}", cnt);
            } else {
                Long cnt = pciAfpSparkService.createMatrixWithoutSf(map);
                log.debug("创建新干扰矩阵完成。cnt={}", cnt);
            }
            matrixDcId = jobId;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        log.debug("新干扰矩阵计算完成。");
        return true;
    }

    private MatrixParam handleThresholds(long jobId) {
        log.debug("处理门限值。");
        // 获取页面自定义的阈值门限值
        List<Threshold> thresholds = new ArrayList<>();
        List<PciAfpParam> rawData = pciAfpRestService.queryParamInfo(jobId);

        if (CollectionUtils.isEmpty(rawData)) {
            // 取默认门限值
            thresholds = pciAfpRestService.getThresholdsByModuleType("LTEINTERFERCALC");
        } else {
            for (PciAfpParam map : rawData) {
                Threshold threshold = new Threshold();
                threshold.setCode(map.getParamCode());
                threshold.setDefaultVal(map.getParamVal());
                thresholds.add(threshold);
            }
        }

        MatrixParam matrixParam = new MatrixParam();

        for (Threshold threshold : thresholds) {
            String code = threshold.getCode();
            String val = threshold.getDefaultVal();
            if (code.equalsIgnoreCase("SAMEFREQCELLCOEFWEIGHT")) {
                matrixParam.setSamefreqcellcoefweight(Double.parseDouble(val));
            }
            if (code.equalsIgnoreCase("SWITCHRATIOWEIGHT".toUpperCase())) {
                matrixParam.setSwitchratioweight(Double.parseDouble(val));
            }
            if (code.equalsIgnoreCase("CELLM3RINTERFERCOEF".toUpperCase())) {
                this.m3r = Double.parseDouble(val);
            }
            if (code.equalsIgnoreCase("CELLM6RINTERFERCOEF".toUpperCase())) {
                this.m6r = Double.parseDouble(val);
            }
            if (code.equalsIgnoreCase("CELLM30RINTERFERCOEF".toUpperCase())) {
                this.m30r = Double.parseDouble(val);
            }
            if (code.equalsIgnoreCase("TOPNCELLLIST".toUpperCase())) {
                this.topRate = Double.parseDouble(val) * 0.01;
            }
            if (code.equalsIgnoreCase("CONVERMETHOD1TARGETVAL".toUpperCase())) {
                this.defInterRate = Double.parseDouble(val) * 0.01;
            }
            if (code.equalsIgnoreCase("CONVERMETHOD2TARGETVAL".toUpperCase())) {
                this.defVariance = Double.parseDouble(val) * 0.01;
            }
            if (code.equalsIgnoreCase("CONVERMETHOD2SCOREN".toUpperCase())) {
                this.divideNumber = Integer.parseInt(val);
            }
            if (code.equalsIgnoreCase("MINCORRELATION".toUpperCase())) {
                matrixParam.setMincorrelation(Double.parseDouble(val));
            }
            if (code.equalsIgnoreCase("MINMEASURESUM".toUpperCase())) {
                matrixParam.setMinmeasuresum(Long.parseLong(val));
            }
            if (code.equalsIgnoreCase("DISLIMIT".toUpperCase())) {
                this.disLimit = Double.parseDouble(val);
            }
        }

        log.debug("门限值：" + "samefreqcellcoefweight=" + matrixParam.getSamefreqcellcoefweight() + ",switchratioweight="
                + matrixParam.getSwitchratioweight() + ",cellm3rinterfercoef=" + m3r + ",cellm6rinterfercoef=" + m6r
                + ",cellm30rinterfercoef=" + m30r + ",topncelllist=" + topRate + ",convermethod1targetval="
                + defInterRate + ",convermethod2targetval=" + defVariance + ",convermethod2scoren=" + divideNumber
                + ",mincorrelation=" + matrixParam.getMincorrelation() + ",minmeasuresum=" + matrixParam.getMinmeasuresum() + ",disLimit=" + disLimit);
        return matrixParam;

    }

    /**
     * 从本地文件或者hive仓库中读取数据
     */
    boolean readData() {
        log.debug("读取干扰矩阵数据。");
        if (matrixDfPath != null) {
            log.debug("采用导入文件干扰矩阵。matrixDfPath={}", matrixDfPath);
            try {
                Path transferPath = Files.createDirectories(Paths.get(System.getProperty("java.io.tmpdir"), "transfer"));
                Path path = Files.createTempFile(transferPath, "matrix", ".csv");
                Files.deleteIfExists(path);
                // 下载文件到本地
                fsShell.get(matrixDfPath, path.toString());
                log.debug("transfer path={}", path);
                // 解析文件
                if (Files.exists(path)) {
                    log.debug("开始解析干扰矩阵文件。file size={}", path.toFile().length());
                    try (CSVParser parser = CSVParser.parse(path.toFile(), Charset.forName("GBK"), CSVFormat.DEFAULT.withHeader())) {
                        log.debug("header={}", parser.getHeaderMap());
                        log.debug("record number={}", parser.getRecordNumber());
                        String cellId;
                        String ncellId;
                        double assocDegree;
                        for (CSVRecord record : parser) {
                            try {
                                cellId = record.get("小区标识");
                                ncellId = record.get("邻区标识");
                                assocDegree = Double.parseDouble(record.get("关联度"));

                                cellToNcellRelevancy.computeIfAbsent(cellId, k -> new HashMap<>()).put(ncellId, assocDegree);

                                ncellToCellRelevancy.computeIfAbsent(ncellId, k -> new HashMap<>()).put(cellId, assocDegree);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        log.debug("current line number={}", parser.getCurrentLineNumber());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    log.debug("处理干扰矩阵文件完成。");
                    // 删除hdfs文件
                    fsShell.rmr(matrixDfPath);
                }
                // 删除本地缓存
                Files.deleteIfExists(path);
            } catch (Exception e) {
                e.printStackTrace();
                log.error("读取干扰矩阵失败。");
            }
        } else {
            log.debug("采用干扰矩阵结果表数据计算。matrixDcId={}", matrixDcId);
            List<InterMatrixResult> matrixList = pciAfpSparkService.getMatrix(matrixDcId);
            String cellId;
            String ncellId;
            double assocDegree;
            for (InterMatrixResult interMatrixResult : matrixList) {
                cellId = interMatrixResult.getCellId();
                ncellId = interMatrixResult.getNcellId();
                assocDegree = interMatrixResult.getRelaVal();
                if (!cellToNcellRelevancy.containsKey(cellId)) {
                    cellToNcellRelevancy.put(cellId.intern(), new HashMap<>());
                }
                cellToNcellRelevancy.get(cellId).put(ncellId.intern(), assocDegree);
                if (!ncellToCellRelevancy.containsKey(ncellId)) {
                    ncellToCellRelevancy.put(ncellId.intern(), new HashMap<>());
                }
                ncellToCellRelevancy.get(ncellId).put(cellId.intern(), assocDegree);
            }
            log.debug("读取干扰矩阵结果表完成。");
        }

        if (!cellToNcellRelevancy.isEmpty()) {
            cellToNcellRelevancy.forEach((key, value) -> cellToTotalRelevancy.put(key, value.values().stream().reduce(0d, Double::sum)));
            cellToTotalRelevancy = sortMapByValue(cellToTotalRelevancy);

            // 邻区关联度从大到小排序
            reverseMapping(cellToNcellRelevancy, cellToNotSameStationCells);
            // 求以邻区为key的反向映射
            reverseMapping(ncellToCellRelevancy, ncellToNotSameStationCells);

            log.debug("cellToNcellRelevancy.size()=" + cellToNcellRelevancy.size());
            log.debug("ncellToCellRelevancy.size()=" + ncellToCellRelevancy.size());
            log.debug("cellToTotalRelevancy.size()=" + cellToTotalRelevancy.size());
            log.debug("cellToSameStationCells.size()=" + cellToSameStationCells.size());
            log.debug("cellToNotSameStationCells.size()=" + cellToNotSameStationCells.size());
            log.debug("ncellToNotSameStationCells.size()=" + ncellToNotSameStationCells.size());
            log.debug("cellToOriPci.size()=" + cellToOriPci.size());
            log.debug("cellToLonLat.size()=" + cellToLonLat.size());
            log.debug("cellToEarfcn.size()=" + cellToEarfcn.size());

        }
        // 读取d1d2小区数据
        if (!d1D2Type.isEmpty()) {
            List<Map<String, Object>> d1d2List = pciAfpSparkService.getSFd1d2Cell(Integer.parseInt(jobId + ""));
            Set<String> set = new HashSet<>();
            for (Map<String, Object> map : d1d2List) {
                if (set.add(map.get("cellId").toString())) {
                    abCellList.add(map.get("cellId").toString());
                }
                if (set.add(map.get("ncell_id").toString())) {
                    abCellList.add(map.get("ncell_id").toString());
                }
            }
            log.debug("abCellList.size()=" + abCellList.size());
        }
        log.debug("读取干扰矩阵数据完成。");
        return true;
    }

    private void reverseMapping(Map<String, Map<String, Double>> cellToNcellRelevancy, Map<String, List<String>> cellToNotSameStationCells) {
        List<String> sstCells;
        List<String> nsstCells;
        // 邻区关联度从大到小排序
        for (String cell : cellToNcellRelevancy.keySet()) {
            cellToNcellRelevancy.put(cell.intern(), sortMapByValue(cellToNcellRelevancy.get(cell)));

            sstCells = cellToSameStationCells.get(cell);
            if (sstCells == null) {
                sstCells = new ArrayList<>();
            }

            if (!cellToNotSameStationCells.containsKey(cell)) {
                nsstCells = new ArrayList<>();
                for (String ncell : cellToNcellRelevancy.get(cell).keySet()) {
                    if (!sstCells.contains(ncell) && Objects.equals(cellToEarfcn.get(cell),cellToEarfcn.get(ncell))) {
                        nsstCells.add(ncell.intern());
                    }
                }
                cellToNotSameStationCells.put(cell.intern(), nsstCells);
            }
        }
    }

    private Map<String, Double> sortMapByValue(Map<String, Double> unSortMap) {
        return unSortMap.entrySet().parallelStream().sorted((o1, o2) -> Double.compare(o2.getValue(), o1.getValue()))
                .collect(LinkedHashMap::new, (m, p) -> m.put(p.getKey(), p.getValue()), Map::putAll);
    }

    @Data
    class MatrixParam {
        double samefreqcellcoefweight = 0.8; // 权值
        double switchratioweight = 0.2; // 切换比例权值
        double mincorrelation = 2;
        long minmeasuresum = 500;
    }
}
