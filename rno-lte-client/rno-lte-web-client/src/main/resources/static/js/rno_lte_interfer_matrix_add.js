$(document).ready(function () {
    datepickerBind();
    // 切换区域
    initAreaCascade(areaObj);
    // 阈值联动
    initThresholdCascade();
    // 检查是否存在这周计算的干扰矩阵
    isCalculateInterMatrixThisWeek();

    // 加载MR数据
    $("#showMrData").click(function () {
        $("#isDateRightTip").text("");
        initFormPage('interferMatrixAddMrForm');
        loadData("MR");
    });
    // 加载HO数据
    $("#showHoData").click(function () {
        $("#isHoDateRightTip").text("");
        initFormPage('interferMatrixAddMrForm');
        loadData("HO");
    });
    // 扫频文件框选择
    $("#isUseSf").change(function () {
        if ($("#isUseSf").prop("checked")) {
            $("#sfFileBtn").show();
            $("#sfFileInfo").show();
            initFormPage('interferMatrixAddMrForm');
            loadData("SF");
            $(".forfilecheck").removeAttr("disabled");
            $("#isFreqAdj").removeAttr("disabled");
        } else {
            $("#sfFileBtn").hide();
            $("#sfFileInfo").hide();
            $(".forfilecheck").attr("disabled", "disabled");
            $("#isFreqAdj").attr("disabled", "disabled");
        }
    });
    // 新增计算mr干扰矩阵
    $("#calculateInterMatrix").click(function () {
        if (!providerTaskName()) {
            $('#calculateInterMatrix').removeAttr("disabled");
        } else {
            addMrInterMatrix();
        }
    });
});

/**
 * 绑定时间事件
 */
function datepickerBind() {
    $.datepicker.setDefaults({
        dateFormat: "yy-mm-dd",
        changeYear: true,
        changeMonth: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        maxDate: "Today"
    });

    var meaBegTime = $("#meaBegTime");
    var meaEndTime = $("#meaEndTime");

    meaBegTime.datepicker({
        // 缺省值，5天前
        defaultDate: "-5d",
        onClose: function (selectedDate) {
            // 调整结束时间最小值
            meaEndTime.datepicker("option", "minDate", selectedDate);
        }
    });
    // 缺省值填入input
    meaBegTime.datepicker("setDate", meaBegTime.datepicker("option", "defaultDate"));

    meaEndTime.datepicker({
        // 缺省值今天
        defaultDate: "Today",
        // 初始化最大最小值,5天前到今天
        minDate: "-5d",
        onClose: function (selectedDate) {
            // 调整开始时间最大值
            meaBegTime.datepicker("option", "maxDate", selectedDate);
        }
    });
    // 缺省值填入input
    meaEndTime.datepicker("setDate", meaEndTime.datepicker("option", "defaultDate"));
}

/**
 * 绑定联动事件，默认实现，需要可以替换
 */
function bindCascade(data, provinceId, cityId) {
    $("#" + provinceId).change(function () {
        // 触发父区域改变事件。
        areaChange(data, provinceId, cityId);
    });
    $("#" + cityId).change(function () {
        // 检查是否存在这周计算的干扰矩阵
        isCalculateInterMatrixThisWeek();
    });
}

/**
 * 新增计算MR干扰矩阵
 */
function addMrInterMatrix() {
    var isUseSf = $("#isUseSf").prop("checked");
    var filenames = $("#sfFiles").val();
    if (isUseSf && (typeof (filenames) == "undefined" || filenames.length == 0)) {
        alert("您还没有选择扫频文件");
        return;
    }

    if (!checkTaskInfoSubmit()) {
        $('#calculateInterMatrix').removeAttr("disabled");
        return;
    }

    $("#interferMatrixAddMrForm").ajaxSubmit({
        url: 'submitTask',
        type: 'post',
        dataType: 'json',
        async:false,
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在提交LTE干扰矩阵任务");
        },
        success: function (data) {
            var dateRight = data['dateRight'];
            var mrExist = data['mrExist'];
            var hoExist = data['hoExist'];
            var dataType = data['dataType'];
            var result = data['result'];
            if (dataType == "MR") {
                if (dateRight && mrExist && result) {
                    // 提示计算任务已经提交到系统
                    alert("计算任务已经提交到系统");
                    // 页面跳转到干扰矩阵显示页
                    returnTaskList();
                } else {
                    if (!dateRight) {
                        $("span#isDateRightTip").html("日期范围不符合要求（最迟不会超过本周一的0点，最早不会早于上周的周一0点）");
                        $('#calculateInterMatrix').removeAttr("disabled");
                    } else {
                        if (!mrExist) {
                            $("span#isDateRightTip").html("该日期范围不存在MR数据记录");
                            $('#calculateInterMatrix').removeAttr("disabled");
                        }
                    }
                }
            } else if (dataType == "HO") {
                if (hoExist && result) {
                    // 提示计算任务已经提交到系统
                    alert("计算任务已经提交到系统");
                    // 页面跳转到干扰矩阵显示页
                    returnTaskList();
                } else {
                    $("span#isDateRightTip").html("该日期范围不存在HO数据记录");
                    $('#calculateInterMatrix').removeAttr("disabled");
                }
            } else {
                if ((mrExist || hoExist) && result) {
                    // 提示计算任务已经提交到系统
                    alert("计算任务已经提交到系统");
                    // 页面跳转到干扰矩阵显示页
                    returnTaskList();
                } else {
                    $("span#isDateRightTip").html("该日期范围内MR和HO数据记录都不存在");
                    $('#calculateInterMatrix').removeAttr("disabled");
                }
            }
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
            returnTaskList();
        }
    });
}

/**
 * 检查任务信息
 */
function checkTaskInfoSubmit() {
    var flagDate = true;
    var flagTh = true;
    if ($("#SAMEFREQCELLCOEFWEIGHT").val() == '' || $("#SWITCHRATIOWEIGHT").val() == '') {
        alert("阈值必须为数字");
        return false;
    }
    $("#SAMEFREQCELLCOEFWEIGHT").val(Number($("#SAMEFREQCELLCOEFWEIGHT").val()).toFixed(2));
    $("#SWITCHRATIOWEIGHT").val(Number($("#SWITCHRATIOWEIGHT").val()).toFixed(2));
    var th1 = $("#SAMEFREQCELLCOEFWEIGHT").val();
    var th2 = $("#SWITCHRATIOWEIGHT").val();
    var startTime = $.trim($("#meaBegTime").val());
    var endTime = $.trim($("#meaEndTime").val());

    $("span#isDateRightTip").html("");

    // 检查时间
    if (startTime == "" || endTime == "") {
        hideOperTips("loadingDataDiv");
        $('#calculateInterMatrix').removeAttr("disabled");
        alert("时间不能为空！");
        flagDate = false;
    }
    // 检查阈值
    if (!(isNumeric(th1) && isNumeric(th2)) || (th1 < 0 || th1 > 1 || th2 < 0 || th2 > 1)) {
        alert("请输入0到1之间的数");
        flagTh = false;
    } else if ((Number(th1) + Number(th2)) != 1) {
        alert("两个阈值相加必须为1");
        flagTh = false;
    }
    /*
     * if (endTime == "" || startTime == "") { $("span#dateErrorText").html("请填写需要使用的测量数据的时间！");
     * $("span#dateError").html("※"); flagDate = false; } else if (exDateRange(endTime, startTime) > maxDateInterval) { //
     * 验证测试日期是否大于十天 $("span#dateErrorText").html("（时间跨度请不要超过"+maxDateInterval+"天！）"); $("span#dateError").html("※");
     * flagDate = false; }
     */

    return flagDate && flagTh;
}

/**
 * 检查是否存在这周计算的干扰矩阵
 */
function isCalculateInterMatrixThisWeek() {
    $("span#isCalculateTip").html("");

    $("#interferMatrixAddMrForm").ajaxSubmit({
        url: 'isExistedTaskThisWeek',
        type: 'post',
        dataType: 'json',
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在检查这周是否计算干扰矩阵");
        },
        success: function (data) {
            var flag = data['flag'];
            var desc = data['desc'];
            if (flag) {
                $("span#isCalculateTip").html(desc);
            } else {
            }
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
        }
    });
}

/**
 * 加载对应的MR数据
 */
function loadData(dataType) {

    if ($("#meaBegTime").val() == "" || $("#meaEndTime").val() == "") {
        hideOperTips("loadingDataDiv");
        alert("日期不能为空!");
        return;
    }

    $("#interferMatrixAddMrForm").ajaxSubmit({
        url: 'queryDataRecordByPage',
        data: {
            "type": dataType
        },
        type: 'post',
        dataType: 'json',
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在加载" + dataType + "数据");
        },
        success: function (data) {
            showDataList(data, dataType);
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
        }
    });
}

/**
 * 分页显示mr或ho数据
 */
function showDataList(data, dataType) {
    var table = $("#mrDataTable");
    var city = $("#cityId").find("option:selected").text();
    // 清空干扰矩阵详情列表
    table.find("tr").remove();

    if (data == null || data == undefined) {
        return;
    }

    var list = data['data'];
    if (list == null) {
        list = "";
    }
    var html = "";
    var tr = "";
    var one = "";
    if (dataType == "SF") {
        html = "<thead><tr><th style='width: 8%'>操作</th>" + "<th style='width: 8%'>文件名</th>"
            + "<th style='width: 8%'>类型</th>" + "<th style='width: 8%'>测量时间</th>"
            + "<th style='width: 8%'>测量数据量</th></tr></thead>";
        for (var i = 0; i < list.length; i++) {
            one = list[i];
            tr = "<tr>";
            tr += "<td><input class='forfilecheck' type='checkbox'/></td>";
            tr += "<td class='filename'>" + getValidValue(one['file_id'], '') + "</td>";
            tr += "<td>" + getValidValue(dataType, '') + "</td>";
            tr += "<td>" + getValidValue(one['mea_time'], '') + "</td>";
            tr += "<td>" + getValidValue(one['record_date'], '') + "</td>";
            tr += "</tr>";
            html += tr;
        }

    } else {
        html = "<thead><tr><th style='width: 8%'>地市</th>" + "<th style='width: 8%'>测量时间</th>"
            + "<th style='width: 8%'>类型</th>"
            + "<th style='width: 8%'>测量数据量</th></tr></thead>";
        for (var i = 0; i < list.length; i++) {
            one = list[i];
            tr = "<tr>";
            tr += "<td>" + getValidValue(city, '') + "</td>";
            tr += "<td>" + getValidValue(one['mea_time'], '') + "</td>";
            tr += "<td>" + getValidValue(dataType, '') + "</td>";
            tr += "<td>" + getValidValue(one['record_count'], '') + "</td>";
            tr += "</tr>";
            html += tr;
        }
    }

    table.append(html);

    // 设置隐藏的page信息
    setFormPageInfo("interferMatrixAddMrForm", data['page']);

    // 设置分页面板
    setPageView(data['page'], "mrDataPageDiv");
}

// 阈值联动
function initThresholdCascade() {
    $("#SAMEFREQCELLCOEFWEIGHT").blur(function () {
        if ($("#SAMEFREQCELLCOEFWEIGHT").val().length > 10) {
            $("#SAMEFREQCELLCOEFWEIGHT").val(Number($("#SAMEFREQCELLCOEFWEIGHT").val().substring(0, 10)).toFixed(2));
            $("#SWITCHRATIOWEIGHT").val((1 - Number($("#SAMEFREQCELLCOEFWEIGHT").val().substring(0, 10))).toFixed(2));
        }
        $("#SAMEFREQCELLCOEFWEIGHT").val(Number($("#SAMEFREQCELLCOEFWEIGHT").val()).toFixed(2));
        $("#SWITCHRATIOWEIGHT").val((1 - Number($("#SAMEFREQCELLCOEFWEIGHT").val())).toFixed(2));
        if ($("#SAMEFREQCELLCOEFWEIGHT").val() == "NaN" || $("#SWITCHRATIOWEIGHT").val() == "NaN") {
            $("#SWITCHRATIOWEIGHT").val("");
            $("#SAMEFREQCELLCOEFWEIGHT").val("");
        }
    });
    $("#SWITCHRATIOWEIGHT").blur(function () {
        if ($("#SWITCHRATIOWEIGHT").val().length > 10) {
            $("#SWITCHRATIOWEIGHT").val(Number($("#SWITCHRATIOWEIGHT").val().substring(0, 10)).toFixed(2));
            $("#SAMEFREQCELLCOEFWEIGHT").val((1 - Number($("#SWITCHRATIOWEIGHT").val().substring(0, 10))).toFixed(2));
        }
        $("#SWITCHRATIOWEIGHT").val(Number($("#SWITCHRATIOWEIGHT").val()).toFixed(2));
        $("#SAMEFREQCELLCOEFWEIGHT").val((1 - Number($("#SWITCHRATIOWEIGHT").val())).toFixed(2));
        if ($("#SAMEFREQCELLCOEFWEIGHT").val() == "NaN" || $("#SWITCHRATIOWEIGHT").val() == "NaN") {
            $("#SWITCHRATIOWEIGHT").val("");
            $("#SAMEFREQCELLCOEFWEIGHT").val("");
        }
    });
}

// 检测任务名
function providerTaskName() {
    var errorStr = "";
    var flagStr = "";
    $("#taskName_error").html(errorStr);
    $("#taskName_flag").html(flagStr);
    if (!checkTaskName()) {
        return false;
    }
    var taskName = $.trim($("#taskName").val());
    var cityId = $("#cityId").val();
    var flag = false;
    $.ajax({
        url: "checkTaskName",
        data: {
            "taskName": taskName,
            "cityId": cityId
        },
        async: false,
        type: 'POST',
        success: function (data) {
            if (data == "success") {
                flagStr = "该任务名可用";
                animateInAndOut("operInfo", 500, 500, 1000, "operTip", flagStr);
                flag = true;
            } else {
                errorStr = "该任务名不可用";
                animateInAndOut("operInfo", 500, 500, 1000, "operTip", errorStr);
                flag = false;
            }
        }
    });

    $("#taskName_error").html(errorStr);
    $("#taskName_flag").html(flagStr);
    return flag;
}

/**
 * 检查任务名
 *
 * @returns {Boolean}
 */
function checkTaskName() {
    var errorStr = "";
    var flagStr = "";
    $("#taskName_error").html(errorStr);
    $("#taskName_flag").html(flagStr);
    var result = true;
    var n = 0;
    var taskName = $.trim($("#taskName").val());
    for (var i = 0; i < taskName.length; i++) { // 应用for循环语句,获取表单提交用户名字符串的长度
        var leg = taskName.charCodeAt(i); // 获取字符的ASCII码值
        if (leg > 255) { // 判断如果长度大于255
            n += 2; // 则表示是汉字为2个字节
        } else {
            n += 1; // 否则表示是英文字符,为1个字节
        }
    }
    if (n == 0) {
        errorStr = "请输入任务名....";
        animateInAndOut("operInfo", 500, 500, 1000, "operTip", errorStr);
        $("#taskName_error").html(errorStr);
        $("#taskName_flag").html(flagStr);
        result = false;
    } else if (ifHasSpecChar2(taskName)) {
        errorStr = "包含有以下特殊字符:~'!@#$%^&*+=";
        animateInAndOut("operInfo", 500, 500, 1000, "operTip", errorStr);
        $("#taskName_error").html(errorStr);
        $("#taskName_flag").html(flagStr);
        result = false;
    } else if (n > 25) {
        errorStr = "不超过25个字符....";
        animateInAndOut("operInfo", 500, 500, 1000, "operTip", errorStr);
        $("#taskName_error").html(errorStr);
        $("#taskName_flag").html(flagStr);
        result = false;
    }
    return result;
}

/**
 * 过滤检查返回布尔值
 */
function checkProviderTaskName() {
    providerTaskName();
}

/**
 * 获取选中的扫频文件
 *
 * @returns {String}
 */
function getFileName(id) {
    var filenames = "";
    var fileCounts = 0;
    if ($("#isUseSf").prop("checked")) {
        var files = $(".forfilecheck");
        for (var i = 0; i < files.length; i++) {
            if (files.eq(i).prop("checked")) {
                filenames += files.eq(i).parent().next().text() + ",";
                fileCounts += Number(files.eq(i).parent().next().next().next().next().text());
            }
        }
        filenames = filenames.substr(0, filenames.length - 1) + "";
    }
    // alert("filenames="+filenames+",filecounts="+fileCounts);
    $("#sfFiles").val(filenames);
    $("#sffilecounts").val(fileCounts);
}

/**
 * 使一个元素渐渐展现然后又渐渐隐去
 *
 * @param objId
 * @param timeIn
 * @param timeOut
 * @param stayTime
 *
 */
function animateInAndOut(objId, timeIn, timeOut, stayTime, tipId, tips) {
    if (objId == null || objId == undefined) {
        return;
    }
    if (tipId && tips) {
        try {
            $("#" + tipId).html(tips);
        } catch (err) {

        }
    }
    try {
        if (typeof timeIn == "number" && typeof timeOut == "number") {
            $("#" + objId).fadeIn(timeIn, function () {
                window.setTimeout(function () {
                    $("#" + objId).fadeOut(timeOut);
                }, stayTime);
            });
        }
    } catch (err) {

    }
}

/**
 * 测试是否包含以下特殊字符 ~'!@#$%^&*+=
 *
 * @param str
 * @returns
 */
function ifHasSpecChar2(str) {
    var pattern = new RegExp("[~'!@#$%^&*+=]");
    return pattern.test(str);
}

/**
 * 判断是不是数字
 *
 * @param num
 *            要判断的内容
 * @param reg
 *            用于判断的正则表达式
 * @param errMsg
 *            错误提示
 * @returns {Boolean}
 */
function isNumeric(num, reg, errMsg) {
    var flag = true;
    if (num == null || num == undefined) {
        flag = false;
    }
    if (flag) {
        // 2016.4.7 cc 修改 reg.trim() 不能对正则表达式使用
        // if (reg == null || reg == undefined || reg.trim() == "") {
        if (reg == null || reg == undefined) {
            if (isNaN(num)) {
                flag = false;
            }
        } else if (typeof (reg) == 'object') { // 正则表达式的类型为object 但不安全
            if (!reg.test(num)) {
                flag = false;
            }
        } else {
            flag = false;
        }
    }
    if (!(errMsg == null || errMsg == undefined || errMsg.trim() == "")) {
        if (!flag)
            alert(errMsg);
    }
    return flag;
}

function getValidValue(v, defaultValue) {
    if (v == null || v == undefined || v == "null" || v == "NULL" || v == "undefined" || v == "UNDEFINED") {
        if (defaultValue != null && defaultValue != undefined)
            return defaultValue;
        else
            return "";
    }
    return v;
}