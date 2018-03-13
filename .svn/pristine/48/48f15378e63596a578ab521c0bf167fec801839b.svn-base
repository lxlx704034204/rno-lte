$(document).ready(function () {
    // 绑定事件
    bindEvent();

    // 切换区域
    initAreaCascade(areaObj);

    // 绑定时间控件
    datepickerBindForMain();

    // 默认加载结构分析
    getTaskList();
});

/**
 * 绑定事件
 */
function bindEvent() {
    // 绑定任务查询按钮
    $("#queryTasks").click(function () {
        getTaskList();
    });

    // 重定向至新增结构分析任务
    $("#addOneTask").click(function () {
        var form = $("#createTaskForm");
        form.find("input[name='cityId']").val($("#cityId").val());
        form.submit();
    });
}
