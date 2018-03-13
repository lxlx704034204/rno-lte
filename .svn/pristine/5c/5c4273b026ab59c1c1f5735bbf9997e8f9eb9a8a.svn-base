$(document).ready(function () {
    // 绑定事件
    bindEvent();
    // 时间绑定
    datepickerBind();
    // 切换区域
    initAreaCascade(areaObj);
    // 获取最近十次干扰矩阵
    getLatelyLteMatrix();
    // 绑定额外的联动事件
    bindCascadeAdditional();
});

/**
 * 绑定联动事件，默认实现，需要可以替换
 */
function bindCascadeAdditional() {
    $("#cityId").change(function () {
        // 获取最近十次干扰矩阵
        getLatelyLteMatrix();
    });
}

/**
 * 绑定事件
 */
function bindEvent() {
    $("#isCheckNCell").click(function () {
        $("#ExportNcCheckPlan").toggle(); //toggle()方法进行显示隐藏交互事件，如果显示的就进行隐藏，如果是隐藏的就显示
    });

    //获取干扰矩阵方式
    $("#matrixType").change(function () {
        $("#matrix").css("display", "none");
        $("#useFlowRow").css("display", "none");
        $("#useSfRow").css("display", "none");
        $("#meaTime").css('display', 'none');
        $("#ksRow").css('display', 'none');
        $("#freqAdjust").css('display', 'none');
        $("#d1d2plan").css('display', 'none');
        $("#d1d2range").css('display', 'none');
        $("#useFlow").prop("checked", false);
        $("#useSf").prop("checked", false);
        $("#isFreqAdj").prop("checked", false);
        if ($("#matrixType").val() == 0) {
            getLatelyLteMatrix();
            $("#matrix").css("display", "");
        } else if ($("#matrixType").val() == 1) {
            $("#meaTime").css('display', '');
            $("#useFlowRow").css("display", "");
            $("#useSfRow").css("display", "");
        }
    });

    //流量文件选择
    $("#useFlow").change(function () {
        if ($("#useFlow").prop("checked")) {
            $("#ksRow").css('display', '');
        } else {
            $("#ksRow").css('display', 'none');
        }
    });
    // 扫频文件框选择
    $("#useSf").change(function () {
        if ($("#useSf").prop("checked")) {
            $("#freqAdjust").css('display', '');
            $("#meaTime").css('display', '');
        } else {
            $("#freqAdjust").css('display', 'none');
            $("#meaTime").css('display', 'none');
        }
    });
    // 频率调整框选择事件
    $("#isFreqAdj").change(function () {
        if ($("#isFreqAdj").prop("checked")) {
            $("#d1d2plan").css('display', '');
            $("#d1d2range").css('display', '');
        } else {
            $("#d1d2plan").css('display', 'none');
            $("#d1d2range").css('display', 'none');
        }
    });
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

/**
 * 对提交分析任务的信息作验证:不涉及ncs及mrr
 */
function checkTaskInfoSubmit() {
    var n = 0;
    var m = 0;
    var flagName = true;
    var flagDesc = true;

    var taskName = $.trim($("#taskName").val());
    var taskDescription = $.trim($("#taskDescription").val());

    var nameErrorText = $("span#nameErrorText");
    var descErrorText = $("span#descErrorText");
    var nameError = $("span#nameError");
    var descError = $("span#descError");

    nameErrorText.html("");
    descErrorText.html("");
    nameError.html("");
    descError.html("");

    for (var i = 0; i < taskName.length; i++) { // 应用for循环语句,获取表单提交用户名字符串的长度
        if (taskName.charCodeAt(i) > 255) { // 判断如果长度大于255
            n += 2; // 则表示是汉字为2个字节
        } else {
            n += 1; // 否则表示是英文字符,为1个字节
        }
    }

    for (var j = 0; j < taskDescription.length; j++) {
        if (taskDescription.charCodeAt(j) > 255) {
            m += 2;
        } else {
            m += 1;
        }
    }
    // 验证任务名称
    if (ifHasSpecChar2(taskName)) {
        nameErrorText.html("（包含有以下特殊字符:<br>~'!@#$%^&*+=）");
        nameError.html("※");
        flagName = false;
    }
    if (n > 25) {
        nameErrorText.html("（不超过25个字符）");
        nameError.html("※");
        flagName = false;
    } else if (n == 0) {
        nameErrorText.html("（请输入任务名称）");
        nameError.html("※");
        flagName = false;
    }

    if (m > 255) {
        descErrorText.html("（不超过255个字符）");
        descError.html("※");
        flagDesc = false;
    }

    return flagName && flagDesc;
}

/**
 * 保存数据
 */
function storageTaskInfo(direction) {
    var flag = false;
    if (checkTaskInfoSubmit()) {
        var provinceName = $("#provinceId").find("option:selected").text();
        var cityName = $("#cityId").find("option:selected").text();
        $("#storageTaskForm").ajaxSubmit({
            async: false,
            data: {
                'direction': direction,
                'provinceName': provinceName,
                'cityName': cityName
            },
            dataType: 'json',
            beforeSend: function () {
                showOperTips("loadingDataDiv", "loadContentId", "正在提交结构分析计算任务");
            },
            success: function (data) {
                if (data["result"] == "success") {
                    flag = true;
                } else {
                    alert(data["msg"]);
                }
            },
            error: function (XmlHttpRequest, textStatus) {
                alert(textStatus);
            },
            complete: function () {
                hideOperTips("loadingDataDiv");
            }
        });
    }
    return flag;
}

/**
 * 测试是否包含以下特殊字符 ~'!@#$%^&*+=
 */
function ifHasSpecChar2(str) {
    var pattern = new RegExp("[~'!@#$%^&*+=]");
    return pattern.test(str);
}

/**
 * 测试是否包含有以下特殊字符 ~'!@#$%^&*()-+_=:
 */
function ifHasSpecChar(str) {
    var pattern = new RegExp("[~'!@#$%^&*()-+_=:]");
    return pattern.test(str);
}

/**
 * 获取最近十次干扰矩阵，显示在页面列表
 */
function getLatelyLteMatrix() {
    $("#matrix").html("");
    var cityId = $("#cityId").val();

    $.ajax({
        url: 'getLatelyLteMatrix',
        data: {
            cityId: cityId
        },
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.length !== 0) {
                var optHtml = "";
                for (var i = 0; i < data.length; i++) {
                    var one = data[i];
                    optHtml += "<option value='" + one['jobId'] + "'>" + one['taskName'] + "</option>";
                }
                $("#matrix").append(optHtml);
            }
        }
    });
}