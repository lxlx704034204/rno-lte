$(document).ready(function () {
    // 绑定事件
    bindEvent();
});

/**
 * 绑定事件
 */
function bindEvent() {
    var SAMEFREQCELLCOEFWEIGHT = $("#SAMEFREQCELLCOEFWEIGHT");
    var SWITCHRATIOWEIGHT = $("#SWITCHRATIOWEIGHT");

    SAMEFREQCELLCOEFWEIGHT.text(Number(SAMEFREQCELLCOEFWEIGHT.text()).toFixed(2));
    SWITCHRATIOWEIGHT.text(Number(SWITCHRATIOWEIGHT.text()).toFixed(2));

    // 绑定td点击事件
    $(".editBox").each(function () { // 取得所有class为editBox的对像
        $(this).bind("click", function () { // 给其绑定单击事件
            var objId = $(this).attr("id");
            $("span#" + objId).html("");
            var editText = $(this).html().trim(); // 取得表格单元格的文本
            $(this).data("oldTxt", editText) // 将单元格原文本保存在其缓存中，便修改失败或取消时用
                .html(setEditHTML(editText)) // 改变单元格内容为编辑状态
                .unbind("click"); // 删除单元格单击事件，避免多次单击
            $("#editTd").focus();
        });
    });
}

// 参数配置页面的点击事件
function storageParam(direction) {
    // 验证数据
    if (!checkThreshold()) {
        return;
    }

    var SAMEFREQCELLCOEFWEIGHT = $("#SAMEFREQCELLCOEFWEIGHT").length > 0 ? $("#SAMEFREQCELLCOEFWEIGHT").html().trim() : "";
    var SWITCHRATIOWEIGHT = $("#SWITCHRATIOWEIGHT").length > 0 ? $("#SWITCHRATIOWEIGHT").html().trim() : "";
    var CELLM3RINTERFERCOEF = $("#CELLM3RINTERFERCOEF").html().trim();
    var CELLM6RINTERFERCOEF = $("#CELLM6RINTERFERCOEF").html().trim();
    var CELLM30RINTERFERCOEF = $("#CELLM30RINTERFERCOEF").html().trim();
    var BEFORENSTRONGCELLTAB = $("#BEFORENSTRONGCELLTAB").html().trim();
    var TOPNCELLLIST = $("#TOPNCELLLIST").html().trim();
    var INCREASETOPNCELLLIST = $("#INCREASETOPNCELLLIST").html().trim();
    var CONVERMETHOD1TARGETVAL = $("#CONVERMETHOD1TARGETVAL").html().trim();
    var CONVERMETHOD2TARGETVAL = $("#CONVERMETHOD2TARGETVAL").html().trim();
    var CONVERMETHOD2SCOREN = $("#CONVERMETHOD2SCOREN").html().trim();
    var MINCORRELATION = $("#MINCORRELATION").length > 0 ? $("#MINCORRELATION").html().trim() : "";
    var MINMEASURESUM = $("#MINMEASURESUM").length > 0 ? $("#MINMEASURESUM").html().trim() : "";
    var DISLIMIT = $("#DISLIMIT") ? $("#DISLIMIT").html().trim() : "";

    $.ajax({
        url: 'storageParam',
        type: 'post',
        data: {
            'SAMEFREQCELLCOEFWEIGHT': SAMEFREQCELLCOEFWEIGHT,
            'SWITCHRATIOWEIGHT': SWITCHRATIOWEIGHT,
            'CELLM3RINTERFERCOEF': CELLM3RINTERFERCOEF,
            'CELLM6RINTERFERCOEF': CELLM6RINTERFERCOEF,
            'CELLM30RINTERFERCOEF': CELLM30RINTERFERCOEF,
            'BEFORENSTRONGCELLTAB': BEFORENSTRONGCELLTAB,
            'TOPNCELLLIST': TOPNCELLLIST,
            'INCREASETOPNCELLLIST': INCREASETOPNCELLLIST,
            'CONVERMETHOD1TARGETVAL': CONVERMETHOD1TARGETVAL,
            'CONVERMETHOD2TARGETVAL': CONVERMETHOD2TARGETVAL,
            'CONVERMETHOD2SCOREN': CONVERMETHOD2SCOREN,
            'MINCORRELATION': MINCORRELATION,
            'MINMEASURESUM': MINMEASURESUM,
            'DISLIMIT': DISLIMIT
        },
        dataType: 'json',
        beforeSend: function () {
            showOperTips("loadingDataDiv", "loadContentId", "正在跳转页面");
        },
        success: function (data) {
            try {
                var result = data['result'];
                console.log(result);
            } catch (err) {
            }
        },
        complete: function () {
            hideOperTips("loadingDataDiv");
            paramPageJump(direction);
        }
    });
}

function paramPageJump(direction) {
    var form = $("#paramForm");
    form.find("input[name='direction']").val(direction);
    form.submit();
}

/**
 * 点击td转换可编辑
 */
function setEditHTML(value) {
    // editHTML = '<input id="editTd" type="text" maxlength="7" onBlur="ok(this)" value="' + value + '" />';
    return '<input id="editTd" type="text" maxlength="7" onBlur="ok(this)" value="' + value + '" />';
}

// 修改
function ok(okBtn) {
    var $obj = $(okBtn).parent();
    var objId = $obj.attr("id");
    var value = $obj.find("input:text")[0].value; // 取得文本框的值，即新数据
    if (value === "") {
        value = "   ";
    }
    // alert("success");
    $obj.data("oldTxt", value); // 设置此单元格缓存为新数据
    $obj.html($obj.data("oldTxt"));
    $obj.bind("click", function () { // 重新绑定单元格单击事件
        var editText = $(this).html().trim();
        $(this).data("oldTxt", editText).html(setEditHTML(editText)).unbind("click");
        $("#editTd").focus();
    });
    var r;
    if (objId == "SAMEFREQCELLCOEFWEIGHT") {
        var samefreq = $obj.text();
        r = new RegExp("^\\d+(\\.\\d+)?$");
        if (r.test(samefreq)) {
            $("#SAMEFREQCELLCOEFWEIGHT").text(Number(samefreq).toFixed(2));
            $("#SWITCHRATIOWEIGHT").text((1 - Number(samefreq)).toFixed(2));
        } else {
            $("#SAMEFREQCELLCOEFWEIGHT").text("");
            $("#SWITCHRATIOWEIGHT").text("");
        }
    }
    if (objId == "SWITCHRATIOWEIGHT") {
        var switchrat = $obj.text();
        r = new RegExp("^\\d+(\\.\\d+)?$");
        if (r.test(switchrat)) {
            $("#SWITCHRATIOWEIGHT").text(Number(switchrat).toFixed(2));
            $("#SAMEFREQCELLCOEFWEIGHT").text((1 - Number(switchrat)).toFixed(2));
        } else {
            $("#SWITCHRATIOWEIGHT").text("");
            $("#SAMEFREQCELLCOEFWEIGHT").text("");
        }
    }
}

// 验证门限值是否符合要求
function checkThreshold() {

    clearTip();

    var SAMEFREQCELLCOEFWEIGHT = $("#SAMEFREQCELLCOEFWEIGHT").html().trim();
    var SWITCHRATIOWEIGHT = $("#SWITCHRATIOWEIGHT").html().trim();
    var CELLM3RINTERFERCOEF = $("#CELLM3RINTERFERCOEF").html().trim();
    var CELLM6RINTERFERCOEF = $("#CELLM6RINTERFERCOEF").html().trim();
    var CELLM30RINTERFERCOEF = $("#CELLM30RINTERFERCOEF").html().trim();
    var BEFORENSTRONGCELLTAB = $("#BEFORENSTRONGCELLTAB").html().trim();
    var TOPNCELLLIST = $("#TOPNCELLLIST").html().trim();
    var INCREASETOPNCELLLIST = $("#INCREASETOPNCELLLIST").html().trim();
    var CONVERMETHOD1TARGETVAL = $("#CONVERMETHOD1TARGETVAL").html().trim();
    var CONVERMETHOD2TARGETVAL = $("#CONVERMETHOD2TARGETVAL").html().trim();
    var CONVERMETHOD2SCOREN = $("#CONVERMETHOD2SCOREN").html().trim();
    var MINCORRELATION = $("#MINCORRELATION").html().trim();
    var MINMEASURESUM = $("#MINMEASURESUM").html().trim();
    var DISLIMIT = $("#DISLIMIT").html().trim();

    var reg = /^[-+]?[0-9]+(\.[0-9]+)?$/; // 验证数字
    var reg1 = /^[0-9]*[1-9][0-9]*$/; // 正整数
    var reg2 = /^(?:[1-9]?\d|100)$/; // 0-100的整数，适用于验证百分数
    var reg3 = /^([1-9]\d*|0)$/; // 非负整数
    var flag = true;

    if (!reg.test(SAMEFREQCELLCOEFWEIGHT)) {
        $("span#SAMEFREQCELLCOEFWEIGHT").html("※请输入数字※");
        flag = false;
    } else if (SAMEFREQCELLCOEFWEIGHT > 1 || SAMEFREQCELLCOEFWEIGHT < 0) {
        $("span#SAMEFREQCELLCOEFWEIGHT").html("※值需要大于等于0小于等于1※");
        flag = false;
    } else {
        $("span#SAMEFREQCELLCOEFWEIGHT").html("");
    }
    if (!reg.test(SWITCHRATIOWEIGHT)) {
        $("span#SWITCHRATIOWEIGHT").html("※请输入数字※");
        flag = false;
    } else if (SWITCHRATIOWEIGHT > 1 || SWITCHRATIOWEIGHT < 0) {
        $("span#SWITCHRATIOWEIGHT").html("※值需要大于等于0小于等于1※");
        flag = false;
    } else {
        $("span#SWITCHRATIOWEIGHT").html("");
    }
    if (!reg.test(CELLM3RINTERFERCOEF)) {
        $("span#CELLM3RINTERFERCOEF").html("※请输入数字※");
        flag = false;
    } else {
        $("span#CELLM3RINTERFERCOEF").html("");
    }

    if (!reg.test(CELLM6RINTERFERCOEF)) {
        $("span#CELLM6RINTERFERCOEF").html("※请输入数字※");
        flag = false;
    } else {
        $("span#CELLM6RINTERFERCOEF").html("");
    }

    if (!reg.test(CELLM30RINTERFERCOEF)) {
        $("span#CELLM30RINTERFERCOEF").html("※请输入数字※");
        flag = false;
    } else {
        $("span#CELLM30RINTERFERCOEF").html("");
    }

    if (!reg1.test(BEFORENSTRONGCELLTAB)) {
        $("span#BEFORENSTRONGCELLTAB").html("※请输入正整数※");
        flag = false;
    } else {
        $("span#BEFORENSTRONGCELLTAB").html("");
    }

    if (!reg2.test(TOPNCELLLIST)) {
        $("span#TOPNCELLLIST").html("※请输入0-100间的整数※");
        flag = false;
    } else {
        $("span#TOPNCELLLIST").html("");
    }

    if (!reg.test(INCREASETOPNCELLLIST)) {
        $("span#INCREASETOPNCELLLIST").html("※请输入数字※");
        flag = false;
    } else {
        $("span#INCREASETOPNCELLLIST").html("");
    }

    if (!reg2.test(CONVERMETHOD1TARGETVAL)) {
        $("span#CONVERMETHOD1TARGETVAL").html("※请输入0-100间的整数※");
        flag = false;
    } else {
        $("span#CONVERMETHOD1TARGETVAL").html("");
    }

    if (!reg2.test(CONVERMETHOD2TARGETVAL)) {
        $("span#CONVERMETHOD2TARGETVAL").html("※请输入0-100间的整数※");
        flag = false;
    } else {
        $("span#CONVERMETHOD2TARGETVAL").html("");
    }

    if (!reg.test(CONVERMETHOD2SCOREN)) {
        $("span#CONVERMETHOD2SCOREN").html("※请输入数字※");
        flag = false;
    } else {
        $("span#CONVERMETHOD2SCOREN").html("");
    }

    if (!reg2.test(MINCORRELATION)) {
        $("span#MINCORRELATION").html("※请输入0-100间的整数※");
        flag = false;
    } else {
        $("span#MINCORRELATION").html("");
    }
    if (!reg3.test(MINMEASURESUM)) {
        $("span#MINMEASURESUM").html("※请输入非负整数※");
        flag = false;
    } else {
        $("span#MINMEASURESUM").html("");
    }
    if (!reg3.test(DISLIMIT)) {
        $("span#DISLIMIT").html("※请输入非负整数※");
        flag = false;
    } else {
        $("span#DISLIMIT").html("");
    }
    return flag;
}

function clearTip() {

    $("span#SAMEFREQINTERTHRESHOLD").html("");
    $("span#OVERSHOOTINGIDEALDISMULTIPLE").html("");
    $("span#BETWEENCELLIDEALDISMULTIPLE").html("");
    $("span#CELLCHECKTIMESIDEALDISMULTIPLE").html("");
    $("span#CELLDETECTCITHRESHOLD").html("");
    $("span#CELLIDEALDISREFERENCECELLNUM").html("");
    $("span#GSM900CELLFREQNUM").html("");
    $("span#GSM1800CELLFREQNUM").html("");
    $("span#GSM900CELLIDEALCAPACITY").html("");
    $("span#GSM1800CELLIDEALCAPACITY").html("");
    $("span#DLCOVERMINIMUMSIGNALSTRENGTHTHRESHOLD").html("");
    $("span#ULCOVERMINIMUMSIGNALSTRENGTHTHRESHOLD").html("");
    $("span#INTERFACTORMOSTDISTANT").html("");
    $("span#INTERFACTORSAMEANDADJFREQMINIMUMTHRESHOLD").html("");
    $("span#RELATIONNCELLCITHRESHOLD").html("");

    $("span#TOTALSAMPLECNTSMALL").html("");
    // $("span#TOTALSAMPLECNTBIG").html("");
    $("span#TOTALSAMPLECNTTOOSMALL").html("");
    $("span#SAMEFREQINTERCOEFBIG").html("");
    $("span#SAMEFREQINTERCOEFSMALL").html("");
    $("span#OVERSHOOTINGCOEFRFFERDISTANT").html("");
    $("span#NONNCELLSAMEFREQINTERCOEF").html("");
}

// function checkThreshold() {
//     alert("test");
//     return true;
// }