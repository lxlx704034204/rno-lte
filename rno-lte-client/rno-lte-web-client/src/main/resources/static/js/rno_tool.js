/**
 * 时间格式解释器
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "H+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

function showOperTips(outerId, tipId, tips) {
    try {
        var oId = $("#" + outerId);
        oId.css("display", "");
        oId.find("#" + tipId).html(tips);
    } catch (err) {
    }
}

function hideOperTips(outerId) {
    try {
        $("#" + outerId).css("display", "none");
    } catch (err) {
    }
}

/**
 * 测试是否包含有以下特殊字符
 * ~'!@#$%^&*()-+_=:
 * @param str
 * @returns
 */
function ifHasSpecChar(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    return pattern.test(str);
}

/**
 * 根据父控件的值，获取指定类型的子数据，并绑定到childDomId上
 *
 * @param parentDomId
 * @param childDomId
 * @param childType
 * @param callback
 */
function getSubAreas(parentDomId, childDomId, childType, callback) {
    var parentId = $("#" + parentDomId).val();
    $("#" + childDomId).empty();
    $.ajax({
        url: 'getSubAreaByParent',
        data: {
            'parentAreaId': parentId,
            'subAreaLevel': childType
        },
        dataType: 'json',
        type: 'post',
        async: false,
        success: function (data) {
            if (!data) {
                console.error("返回数据有错误");
                return;
            }
            try {
                var one;
                var htmlStr = "";
                for (var i = 0; i < data.length; i++) {
                    one = data[i];
                    if (one['id']) {
                        htmlStr += "<option value='" + one['id'] + "'>" + $.trim(one['name']) + "</option>";
                    }
                }
                $("#" + childDomId).append(htmlStr);
            } catch (err) {
                console.log(err);
            }
            if (typeof callback === "function") {
                callback(data);
            }
        },
        complete: function () {
            $("#" + childDomId).trigger("change");
        }
    });
}

/**
 * 查看运行报告
 */
function checkTaskReport(jobId) {
    $("#viewReportForm").find("input#hiddenJobId").val(jobId);
    initFormPage("viewReportForm");
    $("#reportDiv").css("display", "block");
    $("#taskListDiv").css("display", "none");
    queryReportData();
}

/**
 * 查询指定job的报告
 */
function queryReportData() {
    $("#viewReportForm").ajaxSubmit({
        url: 'queryReportByPage',
        type: 'post',
        dataType: 'json',
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在停止任务");
        },
        success: function (data) {
            displayReportRec(data['data']);
            setFormPageInfo("viewReportForm", data['page']);
            setPageView(data['page'], "reportListPageBar");
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
        }
    });
}

/**
 * 显示报告
 */
function displayReportRec(data) {
    if (data === null || data === undefined) {
        return;
    }
    var table = $("#reportListTab");
    // 清空结构分析任务详情列表
    table.find("tr:gt(0)").remove();
    var html = "";
    var one;

    var date = new Date();
    var dateFormat = "yyyy-MM-dd HH:mm:ss";

    for (var i = 0; i < data.length; i++) {
        one = data[i];
        html += "<tr>";
        html += "<td>" + getValidValue(one['stage'], '') + "</td>";

        date.setTime(getValidValue(one['begTime'], ''));
        html += "<td>" + date.format(dateFormat) + "</td>";

        date.setTime(getValidValue(one['endTime'], ''));
        html += "<td>" + date.format(dateFormat) + "</td>";

        if (one['state'].indexOf("Fail") === -1) {
            html += "<td>" + getValidValue(one['state'], '') + "</td>";
        } else {
            html += "<td style='color: red;'>" + getValidValue(one['state'], '') + "</td>";
        }
        html += "<td>" + getValidValue(one['attMsg'], '') + "</td>";
        html += "</tr>";
    }
    table.append(html);
}

/**
 * 从报告的详情返回列表页面
 */
function returnToTaskList() {
    $("#reportDiv").css("display", "none");
    $("#taskListDiv").css("display", "block");
}


// 设置隐藏的page信息
function setFormPageInfo(formId, page) {
    if (formId === null || formId === undefined || page === null || page === undefined) {
        return;
    }

    var form = $("#" + formId);
    if (!form) {
        return;
    }

    form.find("input[name='pageSize']").val(page['pageSize']);
    form.find("input[name='currentPage']").val(Number(page['currentPage']));
    form.find("input[name='totalPageCnt']").val(page['totalPageCnt']);
    form.find("input[name='totalCnt']").val(page['totalCnt']);
}

/**
 * 设置分页面板
 *
 * @param page
 *            分页信息
 * @param divId
 *            分页面板id
 */
function setPageView(page, divId) {
    if (page === null || page === undefined) {
        return;
    }

    var div = $("#" + divId);
    if (!div) {
        return;
    }

    var pageSize = page['pageSize'] ? page['pageSize'] : 0;
    var currentPage = page['currentPage'] ? page['currentPage'] : 1;
    var totalPageCnt = page['totalPageCnt'] ? page['totalPageCnt'] : 0;
    var totalCnt = page['totalCnt'] ? page['totalCnt'] : 0;

    // 设置到面板上
    $(div).find("#emTotalCnt").html(totalCnt);
    $(div).find("#showCurrentPage").val(currentPage);
    $(div).find("#emTotalPageCnt").html(totalPageCnt);
}

/**
 * 分页跳转的响应
 *
 * @param dir
 * @param action（方法名）
 * @param formId
 * @param divId
 */
function showListViewByPage(dir, action, formId, divId) {

    var form = $("#" + formId);
    var div = $("#" + divId);
    var hiddenCurrentPage = form.find("input[name='currentPage']");
    var currentPage = Number(hiddenCurrentPage.val());
    var totalPageCnt = Number(form.find("input[name='totalPageCnt']").val());

    if (dir === "first") {
        if (currentPage <= 1) {
            return;
        } else {
            hiddenCurrentPage.val("1");
        }
    } else if (dir === "last") {
        if (currentPage >= totalPageCnt) {
            return;
        } else {
            hiddenCurrentPage.val(totalPageCnt);
        }
    } else if (dir === "back") {
        if (currentPage <= 1) {
            return;
        } else {
            hiddenCurrentPage.val(currentPage - 1);
        }
    } else if (dir === "next") {
        if (currentPage >= totalPageCnt) {
            return;
        } else {
            hiddenCurrentPage.val(currentPage + 1);
        }
    } else if (dir === "num") {
        var userInput = $(div).find("#showCurrentPage").val();
        if (isNaN(userInput)) {
            alert("请输入数字！");
            return;
        }
        if (userInput > totalPageCnt || userInput < 1) {
            alert("输入页面范围不在范围内！");
            return;
        }
        hiddenCurrentPage.val(userInput);
    } else {
        return;
    }
    // 获取资源
    if (typeof action === "function") {
        action();
    }
}

// 初始化form下的page信息
function initFormPage(formId) {
    var form = $("#" + formId);
    if (!form) {
        return;
    }

    form.find("input[name='pageSize']").val(25);
    form.find("input[name='currentPage']").val(1);
    form.find("input[name='totalPageCnt']").val(0);
    form.find("input[name='totalCnt']").val(0);
}

/**
 * 获取数值
 */
function getValidValue(v, defaultValue, precision) {
    if (v === null || v === undefined || v === "null" || v === "NULL"
        || v === "undefined" || v === "UNDEFINED") {
        if (defaultValue !== null && defaultValue !== undefined)
            return defaultValue;
        else
            return "";
    }

    if (typeof v === "number") {
        try {
            v = Number(v).toFixed(precision);
        } catch (err) {
        }
    }
    return v;
}

/**
 * 返回任务详情页面
 */
function returnTaskList() {
    var cityId = $("#cityId").val();
    $("#hiddenCityId").val(cityId);
    $("#returnTaskListForm").submit();
}

/**
 * 页面跳转
 * @param formId 承载action的formId
 * @param direction 方向
 * @param func 预处理
 */
function directionAction(formId, direction, func) {
    var form = $("#" + formId);
    // 检查
    if (typeof func === "function") {
        if (!func()) {
            return;
        }
    }

    form.find("input[name='direction']").val(direction);
    form.submit();
}

/**
 * 下载结果文件，统一将隐藏form命名为downloadResultFileForm，action可以自定义，不增加多余代码。
 * @param jobId 任务Id
 */
function downloadResultFile(jobId) {
    var form = $("#downloadResultFileForm");
    form.find("input#jobId").val(jobId);
    form.submit();
}

/**
 * 停止任务
 * @param jobId 任务ID
 */
function stopOneTask(jobId) {
    var flag = confirm("是否停止该任务计算？");
    if (flag === false) {
        return;
    }

    $.ajax({
        url: 'stopJobByJobId',
        data: {
            'jobId': jobId
        },
        dataType: 'json',
        type: 'post',
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在停止任务");
        },
        success: function (data) {
            try {
                if (data['flag']) {
                    alert("停止操作已提交，请稍后查看停止结果");
                    // 刷新列表
                    submitTaskListForm();
                } else {
                    alert("任务停止失败！");
                }
            } catch (err) {
            }
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
        }
    });
}

/**
 * 按条件查询干扰矩阵
 */
function getTaskList() {
    // 重置分页条件
    initFormPage('taskListForm');
    // 提交表单
    submitTaskListForm();
}

/**
 * 提交表单
 */
function submitTaskListForm() {
    $("#taskListForm").ajaxSubmit({
        type: 'post',
        dataType: 'json',
        beforeSubmit: function () {
            var nameErrorText = $("span#nameErrorText");
            nameErrorText.html("");
            var taskName = $.trim($("#taskName").val());
            if (ifHasSpecChar(taskName)) {
                nameErrorText.html("含有特殊字符");
                return false;
            } else if (taskName.length > 40) {
                nameErrorText.html("信息过长");
                return false;
            }
            return true;
        },
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在加载");
        },
        success: function (data) {
            showTaskList(data);
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
        }
    });
}

function formatDateTime(v, pattern) {
    if (v === null || v === undefined || v === "null" || v === "NULL" || v === "undefined" || v === "UNDEFINED") {
        return "";
    }
    var date = new Date();
    date.setTime(v);
    return date.format(pattern);
}

/**
 * 列表显示结构分析任务，一般任务通用，个别对显示信息进行自定义的应用可以重写该方法。
 */
function showTaskList(data) {
    if (data === null || data === undefined) {
        return;
    }

    var table = $("#taskListTab");
    // 清空结构分析任务详情列表
    table.find("tr:gt(0)").remove();

    var list = data['data'];
    var tr = "";
    var one = "";
    var job;
    var area;
    var status;

    var dateFormat = "yyyy-MM-dd HH:mm:ss";

    var dateFormat2 = "yyyy-MM-dd";

    for (var i = 0; i < list.length; i++) {
        one = list[i];
        job = one["job"];
        area = one["area"];

        tr += "<tr>";
        tr += "<td>" + getValidValue(job['jobName'], '') + "</td>";

        status = getValidValue(job['jobRunningStatus'], '');
        if (status === "Waiting") {
            tr += "<td>排队中</td>";
        } else if (status === "Launched" || status === "Running") {
            tr += "<td>运行中</td>";
        } else if (status === "Stopping") {
            tr += "<td>停止中</td>";
        } else if (status === "Stopped") {
            tr += "<td>已停止</td>";
        } else if (status === "Fail") {
            tr += "<td style='color:red;'>异常终止</td>";
        } else if (status === "Succeeded") {
            tr += "<td>正常完成</td>";
        } else {
            tr += "<td>" + status + "</td>";
        }
        tr += "<td>" + getValidValue(area['name'], '') + "</td>";
        tr += "<td>--</td>";

        tr += "<td>" + formatDateTime(one['begMeaTime'],dateFormat2) + "<br/>至<br/>";
        tr += formatDateTime(one['endMeaTime'],dateFormat2) + "</td>";

        tr += "<td>" + formatDateTime(job['createTime'],dateFormat) + "</td>";
        tr += "<td>" + formatDateTime(job['completeTime'],dateFormat) + "</td>";

        // 排队中
        if (status === "Waiting") {
            tr += "<td><input type='button' value='停止' onclick='stopOneTask(\"" + one['jobId'] + "\")'/></td>";
        }
        // 运行中
        else if (status === "Launched" || status === "Running") {
            tr += "<td><input type='button' value='停止' onclick='stopOneTask(\"" + one['jobId'] + "\")'/> "
                + "<input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + one['jobId'] + "\")'/></td>";
        }
        // 异常终止
        else if (status === "Fail") {
            tr += "<td><input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + one['jobId'] + "\")'/></td>";
        }
        // 正常完成
        else if (status === "Succeeded") {
            tr += "<td><input type='button' value='下载结果文件' onclick='downloadResultFile(\"" + one['jobId'] + "\")'/> "
                + "<input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + one['jobId'] + "\")'/> ";
        }
        // 其他（停止中，已停止）
        else {
            tr += "<td><input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + one['jobId'] + "\")'/></td>";
        }
        tr += "</tr>";
    }
    table.append(tr);

    // 设置隐藏的page信息
    setFormPageInfo("taskListForm", data['page']);

    // 设置分页面板
    setPageView(data['page'], "taskListPageBar");
}

/**
 * 绑定时间事件
 */
function datepickerBindForMain() {
    $.datepicker.setDefaults({
        dateFormat: "yy-mm-dd",
        changeYear: true,
        changeMonth: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        maxDate: "Today"
    });

    var meaTime = $("#meaTime");
    var startSubmitTime = $("#startSubmitTime");
    var endSubmitTime = $("#endSubmitTime");

    meaTime.datepicker({
        defaultDate: "-2"
    });

    // 允许使用backspace和delete键清楚数据，不影响readonly特性
    meaTime.keyup(function (e) {
        if (e.keyCode === 8 || e.keyCode === 46) {
            $.datepicker._clearDate(this);
        }
    });

    startSubmitTime.datetimepicker({
        timeFormat: "HH:mm:ss",
        // 缺省值，5天前
        defaultDate: "-5d",
        onClose: function (selectedDate) {
            // 调整结束时间最小值
            endSubmitTime.datetimepicker("option", "minDate", selectedDate);
        }
    });

    startSubmitTime.keyup(function (e) {
        if (e.keyCode === 8 || e.keyCode === 46) {
            // 设为空
            startSubmitTime.datepicker("setDate", null);
        }
    });

    endSubmitTime.datetimepicker({
        timeFormat: "HH:mm:ss",
        // 缺省值今天
        defaultDate: "Today",
        // 初始化最大最小值,5天前到今天
        minDate: "-5d",
        onClose: function (selectedDate) {
            // 调整开始时间最大值
            startSubmitTime.datetimepicker("option", "maxDate", selectedDate);
        }
    });

    endSubmitTime.keyup(function (e) {
        if (e.keyCode === 8 || e.keyCode === 46) {
            // 设为空
            endSubmitTime.datepicker("setDate", null);
        }
    });
}

/**
 * 初始化区域
 */
function initAreaCascade(data, provinceId, cityId) {
    if (data === null || data === undefined || data === '') {
        return;
    }

    // 设置缺省值。
    provinceId = provinceId || 'provinceId';
    cityId = cityId || 'cityId';

    // 初始化区域显示
    initArea(data, provinceId, cityId);

    // 绑定联动事件
    bindCascade(data, provinceId, cityId);
}

/**
 * 绑定联动事件，默认实现，需要可以替换
 */
function bindCascade(data, provinceId, cityId) {
    $("#" + provinceId).change(function () {
        // 触发父区域改变事件。
        areaChange(data, provinceId, cityId);
    });
}

/**
 * 初始化省市。默认实现，可以替换。
 */
function initArea(data, provinceId, cityId) {
    // 填充父标签
    paddingAreaSelect(data, provinceId);
    // 触发父区域改变事件。
    areaChange(data, provinceId, cityId);
}

/**
 * 父区域改变
 */
function areaChange(data, parentId, childId) {
    if (data === null || data === undefined || data === '') {
        return;
    }
    var parentCode = $("#" + parentId).val();
    if (parentCode === null || parentCode === undefined || parentCode === '') {
        return;
    }

    var one;
    for (var i = 0; i < data.length; i++) {
        one = data[i];
        if (one['id'] && one['id'] === Number(parentCode)) {
            // 填充子区域
            paddingAreaSelect(one['children'], childId);
            $("#" + childId).change();
        }
    }
}

/**
 * 填充下拉列表
 */
function paddingAreaSelect(data, selectId) {
    if (data === null || data === undefined || data === '') {
        return;
    }
    var select = $("#" + selectId);
    var one;
    var htmlStr = "";
    select.empty();
    for (var i = 0; i < data.length; i++) {
        one = data[i];
        if (one['id']) {
            htmlStr += "<option value='" + one['id'] + "'>" + $.trim(one['name']) + "</option>";
        }
    }
    select.append(htmlStr);
}

function showInfoInAndOut(div, info) {
    setTimeout(test(div, info));
}

function test(div, info) {
    var d = $("#" + div);
    d.html(info);
    d.fadeIn(2000);
    d.fadeOut(2000);
}