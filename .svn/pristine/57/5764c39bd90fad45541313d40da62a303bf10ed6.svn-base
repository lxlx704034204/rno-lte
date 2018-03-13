$(document).ready(function () {
    // 切换区域
    initAreaCascade(areaObj);

    // 绑定时间控件
    datepickerBind();

    // 绑定提交事件
    $("#submitTask").click(function () {
        submitTask();
    });
});

/**
 * 提交结构分析任务
 */
function submitTask() {
    if (!checkTaskInfoSubmit()) {
        return;
    }

    var provinceName = $("#provinceId").find("option:selected").text().trim();
    var cityName = $("#cityId").find("option:selected").text().trim();

    $("#submitTaskForm").ajaxSubmit({
        url: 'submitTask',
        data: {
            'provinceName': provinceName,
            'cityName': cityName
        },
        dataType: 'json',
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在提交LTE结构优化分析任务");
        },
        success: function (data) {
            try {
                if (data['flag'] == false) {
                    alert(data['result']);
                } else {
                    alert("任务提交成功，请等待分析完成！");
                }
            } catch (err) {
            }
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
            returnTaskList();
        }
    });
}

/**
 * 对提交分析任务的信息作验证
 */
function checkTaskInfoSubmit() {
    var n = 0;
    var m = 0;
    var flagName = true;
    var flagDesc = true;
    var flagDate = true;

    var nameErrorText = $("span#nameErrorText");
    var nameError = $("span#nameError");

    var descErrorText = $("span#descErrorText");
    var descError = $("span#descError");

    var dateErrorText = $("span#dateErrorText");
    var dateError = $("span#dateError");

    nameErrorText.html("");
    nameError.html("");

    descErrorText.html("");
    descError.html("");

    dateErrorText.html("");
    dateError.html("");

    var taskName = $.trim($("#taskName").val());
    var taskDescription = $.trim($("#taskDescription").val());
    var begMeaTime = $.trim($("#begMeaTime").val());
    var endMeaTime = $.trim($("#endMeaTime").val());

    if (ifHasSpecChar(taskName)) {
        nameErrorText.html("（名称包含特殊字符）");
        nameError.html("※");
        flagName = false;
    }

    for (var i = 0; i < taskName.length; i++) {     // 应用for循环语句,获取表单提交用户名字符串的长度
        // 获取字符的ASCII码值
        if (taskName.charCodeAt(i) > 255) {        // 判断如果长度大于255
            n += 2;           // 则表示是汉字为2个字节
        } else {
            n += 1;           // 否则表示是英文字符,为1个字节
        }
    }
    // 验证任务名称
    if (n > 25) {
        nameErrorText.html("（不超过25个汉字）");
        nameError.html("※");
        flagName = false;
    } else if (n == 0) {
        nameErrorText.html("（请输入任务名称）");
        nameError.html("※");
        flagName = false;
    }

    if (ifHasSpecChar(taskDescription)) {
        descErrorText.html("（描述包含特殊字符）");
        descError.html("※");
        flagDesc = false;
    }

    for (var j = 0; j < taskDescription.length; j++) {
        if (taskDescription.charCodeAt(j) > 255) {
            m += 2;
        } else {
            m += 1;
        }
    }

    // 验证任务描述
    if (m > 255) {
        descErrorText.html("（不超过255个汉字）");
        descError.html("※");
        flagDesc = false;
    }

    if (endMeaTime == "" || begMeaTime == "") {
        dateErrorText.html("请填写需要使用的测量数据的时间！");
        dateError.html("※");
        flagDate = false;
    } else if (exDateRange(endMeaTime, begMeaTime) > 10) {
        // 验证测试日期是否大于十天
        dateErrorText.html("（时间跨度请不要超过10天！）");
        dateError.html("※");
        flagDate = false;
    }

    return flagName && flagDesc && flagDate;
}

// 计算两个日期差值
function exDateRange(sDate1, sDate2) {
    var iDateRange;
    if (sDate1 != "" && sDate2 != "") {
        var startDate = sDate1.replace(/-/g, "/");
        var endDate = sDate2.replace(/-/g, "/");
        var S_Date = new Date(Date.parse(startDate));
        var E_Date = new Date(Date.parse(endDate));
        iDateRange = (S_Date - E_Date) / 86400000;
    }
    return iDateRange;
}

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

    var begMeaTime = $("#begMeaTime");
    var endMeaTime = $("#endMeaTime");

    begMeaTime.datepicker({
        // 缺省值，5天前
        defaultDate: "-5d",
        onClose: function (selectedDate) {
            // 调整结束时间最小值
            endMeaTime.datepicker("option", "minDate", selectedDate);
        }
    });
    // 缺省值填入input
    begMeaTime.datepicker("setDate", begMeaTime.datepicker("option", "defaultDate"));

    endMeaTime.datepicker({
        // 缺省值今天
        defaultDate: "Today",
        // 初始化最大最小值,5天前到今天
        minDate: "-5d",
        onClose: function (selectedDate) {
            // 调整开始时间最大值
            begMeaTime.datepicker("option", "maxDate", selectedDate);
        }
    });
    // 缺省值填入input
    endMeaTime.datepicker("setDate", endMeaTime.datepicker("option", "defaultDate"));
}
