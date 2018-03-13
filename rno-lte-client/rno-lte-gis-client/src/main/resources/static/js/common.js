$(document).ready(function() {
	// 右键复制
	$('#search_rightSelected').click(function() {
		var right = $('#search option:selected');
		var left = $('#search_to option');
		var one = 0;
		if (left.length == 0) {
			for (var i = 0; i < right.length; i++) {
				$('#search_to').append("<option value='"+right[i].value+"'>" + right[i].text + "</option>");
			}
		} else {
			for (var i = 0; i < right.length; i++) {
				for (var j = 0; j < left.length; j++) {
					if ((right[i].text) == (left[j].text)) {
						one++;
					}
				}
				if (one == 0) {
					$('#search_to').append("<option value='"+right[i].value+"'>" + right[i].text + "</option>");
				} else {
					one = 0;
				}
			}
		}
		if (($('#search_to option').length) > 0) {
			$('#myModalLabel2').text('');
			$('#myModalLabel2').append("已选" + ($('#search_to option').length) + "个，双击可删除");
		}
	});
	// 左键移除
	$('#search_leftSelected').click(function() {
		$('#search_to option:selected').remove();
		if (($('#search_to option').length) >= 0) {
			$('#myModalLabel2').text('');
			$('#myModalLabel2').append("已选" + ($('#search_to option').length) + "个，双击可删除");
		}
	});
	// 全部复制
	$('#search_rightAll').click(function() {
		$('#search_to option').remove();
		var right = $('#search option');
		for (var i = 0; i < right.length; i++) {
			if (($('#search option')[i].style.display) == '') {
				$('#search_to').append("<option value='"+right[i].value+"'>" + right[i].text + "</option>");
			}
		}
		$('#myModalLabel2').text('');
		$('#myModalLabel2').append("已选" + ($('#search_to option').length) + "个，双击可删除");
	});
	// 全部移除
	$('#search_leftAll').click(function() {
		$('#search_to option').remove();
		$('#myModalLabel2').text('');
		$('#myModalLabel2').append("已选0个，双击可删除");
	});
	// 双击添加到右边
	$('#search').dblclick(function() {
		var right = $("option:selected", this);
		var left = $('#search_to option');
		var one = 0;
		if (left.length == 0) {
			for (var i = 0; i < right.length; i++) {
				$('#search_to').append("<option value='"+right[i].value+"'>" + right[i].text + "</option>");
			}
		} else {
			for (var i = 0; i < right.length; i++) {
				for (var j = 0; j < left.length; j++) {
					if ((right[i].text) == (left[j].text)) {
						one++;
					}
				}
				if (one == 0) {
					$('#search_to').append("<option value='"+right[i].value+"'>" + right[i].text + "</option>");
				} else {
					one = 0;
				}
			}
		}
		if (($('#search_to option').length) > 0) {
			$('#myModalLabel2').text('');
			$('#myModalLabel2').append("已选" + ($('#search_to option').length) + "个，双击可删除");
		}
	});
	// 双击从左边移除
	$('#search_to').dblclick(function() {
		$("option:selected", this).remove();
		$('#myModalLabel2').text('');
		$('#myModalLabel2').append("已选" + ($('#search_to option').length) + "个，双击可删除");
	});

	// 匹配框设定
	$('#searching').multiselect({
		search : {
			left : '<input type="text" id="match" class="form-control" placeholder="输入您想要查找的内容" />',
		}
	});

	// 匹配框匹配
	$('#match').keyup(function() {
		// 过滤空
		var keyword = $(this).val().toLowerCase().replace(/(^\s*)|(\s*$)/g, "");
		// 匹配
		if (keyword.length == 0) {
			for (var i = 0; i < ($('#search option').length); i++) {
				$('#search option')[i].style.display = '';
			}
		} else if (keyword.length > 0) {
			$('#search option').each(function(key, val) {
				if (coverString(keyword, val.text) == false) {
					$('#search option')[key].style.display = 'none';
				} else {
					$('#search option')[key].style.display = '';
				}
			});
		}
	})

})

 
    // 匹配不区分大小写
function coverString(subStr, str) {
	var reg = eval("/" + subStr + "/ig");
	return reg.test(str);
}

// 设置隐藏的page信息
function setFormPageInfo(formId, page) {
	if (formId == null || formId == undefined || page == null || page == undefined) {
		return;
	}

	var form = $("#" + formId);
	if (!form) {
		return;
	}

	// form.find("#hiddenPageSize").val(page.pageSize);
	// form.find("#hiddenPageSize").val($("#linage").val());
	form.find("#hiddenCurrentPage").val(new Number(page.currentPage));
	form.find("#hiddenTotalPageCnt").val(page.totalPageCnt);
	form.find("#hiddenTotalCnt").val(page.totalCnt);
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
	if (page == null || page == undefined) {
		return;
	}

	var div = $("#" + divId);
	if (!div) {
		return;
	}

	//var pageSize = page['pageSize'] ? page['pageSize'] : 0;
	var currentPage = page['currentPage'] ? page['currentPage'] : 1;
	var totalPageCnt = page['totalPageCnt'] ? page['totalPageCnt'] : 0;
	var totalCnt = page['totalCnt'] ? page['totalCnt'] : 0;
	// 设置到面板上
	$("#emTotalCnt").html(totalCnt);
	$("#showCurrentPage").val(currentPage);
	$("#emTotalPageCnt").html(totalPageCnt);
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
	// alert(form.find("#hiddenPageSize").val());
	//var pageSize = new Number(form.find("#hiddenPageSize").val());
	var currentPage = new Number(form.find("#hiddenCurrentPage").val());
	var totalPageCnt = new Number(form.find("#hiddenTotalPageCnt").val());
	var totalCnt = new Number(form.find("#hiddenTotalCnt").val());

	// console.log("pagesize="+pageSize+",currentPage="+currentPage+",totalPageCnt="+totalPageCnt+",totalCnt="+totalCnt);
	if (dir === "first") {
		if (currentPage <= -1) {
			return;
		} else {
			$(form).find("#hiddenCurrentPage").val("0");
		}
	} else if (dir === "last") {
		if (currentPage >= totalPageCnt) {
			return;
		} else {
			$(form).find("#hiddenCurrentPage").val(totalPageCnt-1);
		}
	} else if (dir === "back") {
		if (currentPage <= 1) {
			return;
		} else {
			$(form).find("#hiddenCurrentPage").val(currentPage - 1);
		}
	} else if (dir === "next") {
		if (currentPage >= totalPageCnt) {
			return;
		} else {
			$(form).find("#hiddenCurrentPage").val(currentPage + 1);
		}
	} else if (dir === "num") {
		var userinput = $(div).find("#showCurrentPage").val();
		if (isNaN(userinput)) {
			showInfoInAndOut("info", "请输入数字！")
			//return;
		}
		if (userinput > totalPageCnt || userinput < 1) {
			showInfoInAndOut("info", "输入页面范围不在范围内！");
			return;
		}
		var reg = /^[1-9][0-9]*$/;
		if (!reg.test(userinput)) {
			showInfoInAndOut("info", "请输入正确的页码！");
			return;
		}
		$(form).find("#hiddenCurrentPage").val(userinput);
	} else {
		return;
	}
	// 获取资源
	if (typeof action == "function") {
		action();
	}
}

// 初始化form下的page信息
function initFormPage(formId) {
	var form = $("#" + formId);
	if (!form) {
		return;
	}
	//form.find("#hiddenPageSize").val(25);
	//form.find("#hiddenPageSize").val($("#linage").val());
	form.find("#hiddenCurrentPage").val(0);
	form.find("#hiddenTotalPageCnt").val(-1);
	form.find("#hiddenTotalCnt").val(-1);
}

function showInfoInAndOut(div, info) {
	$("#" + div).html(info);
	$("#" + div).fadeIn(2000);
	setTimeout("$('#" + div + "').fadeOut(2000)", 1000);
}