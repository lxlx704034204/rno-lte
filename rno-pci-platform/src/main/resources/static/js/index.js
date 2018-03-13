$(document).ready(function(){
    //初始化门户主体高度
    windowsResize();
});

//浏览器大小变化时修改门户主体高度
$(window).resize(function() {
    if (window.timerLayout)
        clearTimeout(window.timerLayout);
        window.timerLayout = setTimeout(windowsResize, 100);
});

//获取门户主体高度
function windowsResize() {
    var docH = document.documentElement.clientHeight;
    $("#maindiv").css("height", docH - 100 - 42);
}
