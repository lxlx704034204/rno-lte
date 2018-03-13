package com.hgicreate.rno.mrorigin.constant;

/**
 * Created by chen.c10 on 2016/12/01.
 * 常量类
 */
public class Constant {

    public static final String FILE_NAME_SEPARATOR = "_";
    public static final String SC_NC_TITLE = "CellId,MR_LteScPci,MR_LteScEarfcn,MR_LteNcPci,MR_LteNcEarfcn,timestotal,RSRPtimes0,RSRPtimes1,RSRPtimes2,RSRPtimes3,Filteredtimestotal,FilteredRSRPtimes1,MIXINGSUM,FilteredMIXINGSUM\n";
    public static final String SC_TITLE = "CellId,TotalCnt,ScGt105Gt0Cnt,ScGt110Gt0Cnt,ScGt110Eq1Cnt,ScGt110Eq2Cnt,ScGt110Eq3Cnt,ScGt110Eq4Cnt,ScGt110Eq5Cnt,ScGt110Eq6Cnt,ScGt110Eq7Cnt,ScGt110Eq8Cnt,ScGt110Eq9Cnt,ScLe110Gt0Cnt,ScGt110NcScGt6Gt3Cnt,ScGt110NcScGt6Gt4Cnt,ScGt110NcScGt6Gt5Cnt,ScGt110NcScGt6Gt6Cnt,ScGt110NcScGt10Gt3Cnt,ScGt110NcScGt10Gt4Cnt,ScGt110NcScGt10Gt5Cnt,ScGt110NcScGt10Gt6Cnt,ScAoa\n";
    public static final String SC_NC_FILENAME = "sc_nc_result.csv";
    public static final String SC_FILENAME = "sc_result.csv";

    public static final int BUF_SIZE = 8192;

    public static final String V_SEPARATOR = " ";
    public static final String CELL_SEPARATOR = "-";
    public static final String OBJ_SEPARATOR_1 = "_";
    public static final String OBJ_SEPARATOR_2 = ":";
    public static final String RES_SEPARATOR = ",";
    public static final String NEW_LINE = "\n";
    public static final String NULL_STR = "NIL";
//    public static final String DATE_TIME_SPLITER = "T";

    //    public static final String FILE_HEADER_FLAG = "<fileHeader";
//    public static final String START_TIME_FLAG = "startTime=\"";
    public static final String MEA_END_FLAG = "</measurement>";
    public static final String OBJ_START_FLAG = "<object";
    public static final String OBJ_END_FLAG = "</object>";
    public static final String OBJ_ID_FLAG = "id=\"";
    public static final String OBJ_TIMESTAMP_FLAG = "id=\"";
    public static final String OBJ_MMECODE_FLAG = "MmeCode=\"";
    public static final String OBJ_MMEUES1APID_FLAG = "MmeUeS1apId=\"";
    public static final String INDEX_END_FLAG = "\"";
    public static final String V_FLAG = "<v>";
    public static final String SMR_FLAG = "<smr>";
    public static final String CONTENT_START_FLAG = ">";
    public static final String CONTENT_END_FLAG = "<";

    public static final String SC_PCI_FLAG = "MR.LteScPci";
    public static final String SC_EARFCN_FLAG = "MR.LteScEarfcn";
    public static final String SC_RSRP_FLAG = "MR.LteScRSRP";
    public static final String SC_AOA_FLAG = "MR.LteScAOA";
    public static final String NC_PCI_FLAG = "MR.LteNcPci";
    public static final String NC_EARFCN_FLAG = "MR.LteNcEarfcn";
    public static final String NC_RSRP_FLAG = "MR.LteNcRSRP";

    public static final String SC_NC_TMP_DIR = "sc_nc_results_";
    public static final String SC_TMP_DIR = "sc_results_";
}
