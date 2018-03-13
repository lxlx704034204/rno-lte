$(document).ready(function () {
    // 切换区域
    initAreaCascade(areaObj);

    // 绑定时间控件
    datepickerBindForMain();

    // 绑定任务查询按钮
    $("#queryTasks").click(function () {
        getTaskList();
    });

    // 重定向至新增结构分析任务
    $("#addOneTask").click(function () {
        var cityId = $("#cityId").val();
        $("#hiddenCityId").val(cityId);
        $("#createTaskForm").submit();
    });

    // 默认加载结构分析
    getTaskList();
});

/**
 * 列表显示干扰矩阵
 */
function showTaskList(data) {
    if (data === null || data === undefined) {
        return;
    }

    var table = $("#interferMatrixTable");
    // 清空干扰矩阵详情列表
    table.find("tr:gt(0)").remove();


    var list = data['data'];
    var html = "";
    var tr = "";
    var one = "";
    var job;
    var area;
    var status;

    var date = new Date();

    var dateFormat = "yyyy-MM-dd HH:mm:ss";

    var sy, sm, sd;// 年月日
    var ey, em, ed;
    var jobId;
    var workStatus;
    var paramStr;
    var dataDescStr;
    var tmpStr;
    var optionStr;
    for (var i = 0; i < list.length; i++) {
        one = list[i];
        job = one["job"];
        area = one["area"];

        tr = "<tr>";
        tr += "<td>" + getValidValue(area['name'], '') + "</td>";
        tr += "<td>" + getValidValue(one['taskName'], '') + "</td>";

        tr += "<td>创建：" + formatDateTime(job['createTime'],dateFormat) + "<br/>";
        tr += "开始：" + formatDateTime(job['launchTime'],dateFormat) + "<br/>";
        tr += "结束：" + formatDateTime(job['completeTime'],dateFormat) + "</td>";

        // 获取开始结束日期转为页面描述信息
        date.setTime(getValidValue(one['begMeaTime'], ''));
        sy = date.getYear() + 1900;
        sm = date.getMonth() + 1;
        sd = date.getDate();
        date.setTime(getValidValue(one['endMeaTime'], ''));
        ey = date.getYear() + 1900;
        em = date.getMonth() + 1;
        ed = date.getDate();
        jobId = getValidValue(one['jobId'], '');

        status=getValidValue(job['jobRunningStatus'],'');

        if (status === "Waiting") {
            workStatus = "<td>排队中</td>";
        } else if (status === "Launched" || status === "Running") {
            workStatus = "<td>运行中</td>";
        } else if (status === "Stopping") {
            workStatus = "<td>停止中</td>";
        } else if (status === "Stopped") {
            workStatus = "<td>已停止</td>";
        } else if (status === "Fail") {
            workStatus = "<td style='color:red;'>异常终止</td>";
        } else if (status === "Succeeded") {
            workStatus = "<td>正常完成</td>";
        } else {
            workStatus = "<td></td>";
        }

        dataDescStr = getValidValue(one['dataDescription'], '');
        tmpStr = dataDescStr.split(";");
        dataDescStr = getValidValue(tmpStr[0], '') + "<br/>" + getValidValue(tmpStr[1], '') + "<br/>" + getValidValue(tmpStr[2], '');

        paramStr = "同频小区相关系数权值Kss ：" + getValidValue(one['sameFreqCellCoefWeight'], '', 2)
            + "<br/>切换比例权值Kho ：" + getValidValue(one['switchRatioWeight'], '', 2);

        jobId = job['jobId'];

        // 排队中
        if (status === "Waiting") {
            optionStr = "<td></td>";
        }
        // 运行中
        else if (status === "Launched" || status === "Running") {
            optionStr = "<td>" + "<input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + jobId + "\")'/></td>";
        }
        // 异常终止
        else if (status === "Fail") {
            optionStr = "<td><input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + jobId + "\")'/></td>";
        }
        // 正常完成
        else if (status === "Succeeded") {
            optionStr = "<td><input type='button' value='下载结果文件' onclick='downloadResultFile(\"" + jobId + "\")'/> <br/>"
                + "<input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + jobId + "\")'/></td>";
        }
        // 停止中
        else if (status === "Stopping") {
            optionStr = "<td><input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + jobId + "\")'/></td>";
        }
        // 其他（，已停止）
        else {
            optionStr = "<td><input type='button' value='下载结果文件' onclick='downloadResultFile(\"" + jobId + "\")'/> <br/>"
                + "<input type='button' value='查看运行报告' onclick='checkTaskReport(\"" + jobId + "\")'/></td>";
        }

        tr += "<td>" + sy + "年" + sm + "月" + getMonthWeek(sy, sm, sd) + "周<br/>" + sy + "-" + sm + "-" + sd + " ~ "
            + ey + "-" + em + "-" + ed + "</td>";
        tr += "<td>全部</td>";
        tr += "<td>" + getValidValue(one['recordNum'], '') + "</td>";
        tr += "<td>" + getValidValue(dataDescStr, '') + "</td>";
        tr += "<td>" + getValidValue(paramStr, '') + "</td>";
        // tr += "<td>"+(workStatus!='计算完成'?workStatus:workStatus+downStr)+"</td>";
        tr += workStatus;
        tr += optionStr;
        tr += "</tr>";
        html += tr;
    }
    table.append(html);

    // 设置隐藏的page信息
    setFormPageInfo("taskListForm", data['page']);

    // 设置分页面板
    setPageView(data['page'], "taskListPageBar");
}

var getMonthWeek = function (a, b, c) {
    /*
     * a = d = 当前日期 b = 6 - w = 当前周的还有几天过完（不算今天） a + b 的和在除以7 就是当天是当前月份的第几周
     */
    var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
    return Math.ceil((d + 6 - w) / 7);
};

function getValidValue(v, defaultValue) {
    if (v === null || v === undefined || v === "null" || v === "NULL" || v === "undefined" || v === "UNDEFINED") {
        if (defaultValue !== null && defaultValue !== undefined)
            return defaultValue;
        else
            return "";
    }
    return v;
}
