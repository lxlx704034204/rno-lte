$(document).ready(function () {
    // 绑定事件
    bindEvent();
});

/**
 * 绑定事件
 */
function bindEvent() {
    $("#fileId").click(function () {
        $("#pciPlanImport").attr("checked", "checked");
    });

    $("#submitTask").click(function () {
        submitTask();
    });

    $("#cancelTask").click(function () {
        returnTaskList();
    });
}

/**
 * 检查扫频文件
 */
function fileCheck() {
    var filenames = getFileName();
    if ($("#useSf").val() == 'YES') {
        if (typeof (filenames) == "undefined" || filenames.length == 0) {
            alert("您还没有选择扫频文件");
            return false;
        }
    }
    return true;
}

/**
 * 判断变PCI小区表是否符合要求
 */
function pciCellValCheck() {
    var optimizeCells = $("#optimizeCells").val().trim();
    var flag = true;
    if (optimizeCells == null || optimizeCells == "") {
        animateInAndOut("operInfo", 500, 500, 1000, "operTip", "变PCI小区表不能为空！");
        flag = false;
    } else if (ifHasSpecChar(optimizeCells)) {
        animateInAndOut("operInfo", 500, 500, 1000, "operTip", "包含有以下特殊字符:~'!@#$%^&*()-+_=:");
        flag = false;
    } else if (!isNumCutByComma(optimizeCells)) {
        animateInAndOut("operInfo", 500, 500, 1000, "operTip", "变PCI小区表应该是小区ID以逗号分隔的形式");
        flag = false;
    }
    return flag;
}

/**
 * 检查导入干扰矩阵文件
 */
function matrixFileCheck() {
    var fileId = $("#fileId");
    if (fileId.length > 0) {
        $("#err").remove();
        var filename = fileId.val();
        if (fileId.val() == "") {
            fileId.parent().append("<span id='err' style='color: red;'>请选择干扰矩阵文件</span>");
            return;
        }
        $("span#fileDiv").html("");

        if (!(filename.toUpperCase().endsWith(".CSV"))) {
            $("#fileDiv").html("不支持该类型文件！");
            return false;
        }
    }
    return true;
}

/**
 * 检查页面参数合法性
 */
function checkTaskParam() {
    return fileCheck() && pciCellValCheck() && matrixFileCheck();
}

/**
 * 提交任务
 */
function submitTask() {
    var submitTask = $('#submitTask');
    submitTask.attr("disabled", true);
    if (storageOverview('forward')) {
        returnTaskList();
    }
    submitTask.attr("disabled", false);
}

/**
 * 保存数据
 */
function storageOverview(direction) {
    var flag = false;
    if (checkTaskParam()) {
        $("#storageOverviewForm").ajaxSubmit({
            async: false,
            data: {
                'direction': direction
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

function getFileName() {
    var filenames = "";
    var files = $(".forFileCheck");
    for (var i = 0; i < files.length; i++) {
        if (files.eq(i).prop("checked")) {
            filenames += files.eq(i).parent().next().text() + ",";
        }
    }
    return filenames.substr(0, filenames.length - 1) + "";
}

/**
 * 测试是否包含有以下特殊字符 ~'!@#$%^&*()-+_=:
 */
function ifHasSpecChar(str) {
    var pattern = new RegExp("[~'!@#$%^&*()-+_=:]");
    return pattern.test(str);
}

/**
 * 使一个元素渐渐展现然后又渐渐隐去
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
 * 是否以逗号分割的数字，允许逗号结尾
 */
function isNumCutByComma(optimizeCells) {
    var flag = true;
    var reg = /^(\d{5,8}-\d{1,3})(,\d{5,9}-\d{1,3})*,?$/;
    if (!reg.test(optimizeCells)) {
        flag = false;
    }
    return flag;
}