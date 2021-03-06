var defaultCityValCache=new Object();
//数据库字段名
// var defaultDbCellField=["CELL_ID","CELL_NAME","ENODEB_ID","ECI","AREA_ID","MANUFACTURER","TAC","BAND_TYPE","BAND_WIDTH","BAND_INDICATOR","BAND_AMOUNT","EARFCN","PCI","COVER_TYPE","COVER_SCENE","LONGITUDE","LATITUDE","AZIMUTH","E_DOWNTILT","M_DOWNTILT","TOTAL_DOWNTILT","ANTENNA_HEIGHT","REMOTE_CELL","RELATED_PARAM","RELATED_RESOUCE","STATION_SPACE"];
var defaultDbCellField=["cellId","cellName","enodebId","eci","areaId","manufacturer","tac","bandType","bandWidth","bandIndicator","bandAmount","earfcn","pci","coverType","coverScene","longitude","latitude","azimuth","edowntilt","mdowntilt","totalDowntilt","antennaHeight","remoteCell","relatedParam","relatedResouce","stationSpace"];
//查询字段名
var defaultQueryCellField=["Cell ID","小区名","eNodeB","EutranCell ID","地市","厂家","跟踪区码","工作频段","小区带宽","频段指示","载频数量","频点","PCI","覆盖类型","覆盖场景","经度","纬度","方位角","电子下倾角","机械下倾角","总下倾角","天线挂高","是否拉远小区","是否关联状态库工参","是否关联状态库资源","站间距"];
var contextPath;
$(document).ready(function() {
	// 切换区域
	initAreaCascade(areaObj,"provinceSelect","citySelect");
	$("#citySelect option").each(function () {
		var txt = $(this).text();
		var val = $(this).val();

		if(val!="-1"){
			defaultCityValCache[val] = txt;
		}
	});
	for(var i = 0 ;i<defaultDbCellField.length;i++){
		if(i==5){
			break;
		}
		$('#fieldSelect').append("<option value='"+defaultDbCellField[i]+"'>" + defaultQueryCellField[i] + "</option>");
	}
	contextPath  = $("#contextPath").val();
	$("#searchBtn").click(function(){
		getCells();
	});

	$("#exportBtn").click(function(){
		$("#loading").show();
		var fieldVal = $("#citySelect").find("option:selected").val();
		var fieldTxt = $("#citySelect").find("option:selected").text();
		var htmlVal = "";
		if("-1"==fieldVal){
			$("#citySelect option").each(function(index){
				var cityVal = $(this).val();
				if(index==0) {
					htmlVal += $(this).val();
				}else {
					htmlVal += "," + $(this).val();
				}
			});
			$("#citySelect").find("option:selected").val(htmlVal);
		}
		exportCell();
		if(""==fieldTxt){
			$("#citySelect").find("option:selected").val("-1");
		}
        $("#loading").hide();
	});
	popUp();
})

function popUp(){

	var thisDom;
	//字段多选
	$("#fieldBtn").click(function(){
		$('#myModalLabel1').empty();
		$('#search').empty();
		$("#search_to").empty();
		$('#match').val('');

		$("#myModalLabel").text("选择字段");
		thisDom = "fieldSelect";

		if (Object.size(defaultDbCellField)!=0){
			for(var i = 0 ;i<defaultDbCellField.length;i++){
				$('#search').append("<option value='"+defaultDbCellField[i]+"'>" + defaultQueryCellField[i] + "</option>");
			}
		}

		$('#myModalLabel1').append("可选"+(defaultDbCellField.length)+"个,双击可添加");

		var selectedObj = $("#fieldSelect").find("option:selected");
		var cellVal = selectedObj.val().split(",");
		var cellTxt = selectedObj.text().split(",");
		for ( var i = 0; i < cellVal.length; i++) {
			if(cellVal[i]!=-1) {
				$('#search_to').append("<option value='"+cellVal[i]+"'>" + cellTxt[i] + "</option>");
			}
		}
		$('#myModalLabel2').html("已选"+($('#search_to option').length)+"个，双击可删除");

	});
	//城市多选
	$("#cityBtn").click(function(){
		$('#myModalLabel1').empty();
		$('#search').empty();
		$("#search_to").empty();
		$('#match').val('');

	    $("#myModalLabel").text("选择城市");
	    thisDom = "citySelect";

	    if (Object.size(defaultCityValCache)!=0){
			for (var key in defaultCityValCache){
				$('#search').append("<option value='"+key+"'>" + defaultCityValCache[key] + "</option>");
			}
		}

		$('#myModalLabel1').append("可选"+(Object.size(defaultCityValCache))+"个,双击可添加");

		var selectedObj = $("#citySelect").find("option:selected");
	    var cellVal = selectedObj.val().split(",");
		var cellTxt = selectedObj.text().split(",");
		for ( var i = 0; i < cellVal.length; i++) {
			if(cellVal[i]!=-1) {
			    $('#search_to').append("<option value='"+cellVal[i]+"'>" + cellTxt[i] + "</option>");
			}
		}
		$('#myModalLabel2').html("已选"+($('#search_to option').length)+"个，双击可删除");
	    
	});

    //确定按钮
    $('#ensure').click(function () {
    	//$("#" + thisDom).children().remove();
        var htmlVal = "";
		var htmlTxt = "";
        $("#search_to option").each(function(index){
	    	if(index==0) {
				htmlVal += $(this).val();
				htmlTxt += $(this).text();
        	}else {
				htmlVal += "," + $(this).val();
				htmlTxt += "," + $(this).text();
        	}
	    })
        //alert("html="+html+","+html.length+","+"".length);
        if(htmlVal.length==0){
        	$("#" + thisDom).val(0);
        }else{
        	var valArr = htmlVal.split(",");
			var txtArr = htmlTxt.split(",");
        	//alert(arr.length);
            if(valArr.length==1 && thisDom!='citySelect'){
            	$("#search option").each(function(){
            		if(htmlVal==$(this).val()){
            		   $("#" + thisDom + " option[value='" + $(this).val() + "']").attr("selected", "selected");
            		}
        	    })
            }else{
            	$("#" + thisDom).prepend("<option selected='selected' style='display:none' value='"+htmlVal+"'>"+ htmlTxt + "</option>");
            }
        }
        
        $('#myModal').modal('hide');
    })

}
//对象大小
Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

//导出按钮
function exportCell() {
	$("#cellsForm").submit();
}

/**
 * 列表显示
 */
function showCells(raw) {
    // alert("raw="+raw);
	var data = eval("(" + raw + ")");
	// data.data._embedded is undefined
	if("undefined"==typeof (data.data._embedded)){
		$("#loading").css("display", "none");
		showInfoInAndOut("info", "没有找到对应的数据！");
        $("#cellsTable").children().remove();
        // 设置分页面板
        var newpage = new Object();
        newpage['currentPage'] = 0;
        newpage['totalPageCnt'] = 0;
        newpage['totalCnt'] = 0;
        newpage['pageSize'] = 25;
        setPageView(newpage, "cellsDiv");
		return;
	}
    var cellList = data['data']['_embedded']['cellList'];
    var page = data['data']['page'];

	$("#cellsTable").children().remove();
	var fieldTxt = $("#fieldSelect").find("option:selected").text();
    var fieldVal = $("#fieldSelect").find("option:selected").val();
    var optHtml = "";
	if(""==fieldTxt && cellList.length != 0){
        optHtml = "<thead><tr>";
        for ( var i = 0; i < defaultQueryCellField.length; i++) {
            optHtml +="<th>"+defaultQueryCellField[i]+"</th>";
        }
        optHtml+="</tr></thead><tbody>";

        for ( var i = 0; i < cellList.length; i++) {
            var one = cellList[i];
            optHtml += "<tr>";
            for ( var j = 0; j < defaultDbCellField.length; j++) {
				if("areaId"==defaultDbCellField[j]){
					optHtml += "<td>"+(one['areaName']==null?"":one['areaName'])+"</td>";
				}else{
					optHtml += "<td>"+(one[defaultDbCellField[j]]==null?"":one[defaultDbCellField[j]])+"</td>";
				}
            }
            optHtml += "</tr>";
        }
        optHtml += "</tbody>";

		$("#loading").css("display", "none");
		$("#cellsTable").append(optHtml);
		var newpage = new Object();
		newpage['currentPage'] = page['number'];
		newpage['totalPageCnt'] = page['totalPages'];
		newpage['totalCnt'] = page['totalElements'];
		newpage['pageSize'] = page['size'];
		// 设置隐藏的page信息
		setFormPageInfo("cellsForm", newpage);
		// 设置分页面板
		setPageView(newpage, "cellsDiv");
	}else if(""!=fieldTxt && cellList.length != 0){
		var fieldTxtArr = fieldTxt.split(",");
		var fieldValArr = fieldVal.split(",");
		optHtml = "<thead><tr>";
		for ( var i = 0; i < fieldTxtArr.length; i++) {
			optHtml +="<th>"+fieldTxtArr[i]+"</th>";
		}
		optHtml+="</tr></thead><tbody>";

		for ( var i = 0; i < cellList.length; i++) {
			var one = cellList[i];
			optHtml += "<tr>";
			for ( var j = 0; j < fieldValArr.length; j++) {
                if("areaId"==fieldValArr[j]){
                    optHtml += "<td>"+(one['areaName']==null?"":one['areaName'])+"</td>";
                }else{
                    optHtml += "<td>"+(one[fieldValArr[j]]==null?"":one[fieldValArr[j]])+"</td>";
                }
			}
			optHtml += "</tr>";
		}
		optHtml += "</tbody>";

		$("#loading").css("display", "none");
		$("#cellsTable").append(optHtml);
		var newpage = new Object();
		newpage['currentPage'] = page['number'];
		newpage['totalPageCnt'] = page['totalPages'];
		newpage['totalCnt'] = page['totalElements'];
		newpage['pageSize'] = page['size'];
		// 设置隐藏的page信息
		setFormPageInfo("cellsForm", newpage);
		// 设置分页面板
		setPageView(newpage, "cellsDiv");
    }else{
		$("#loading").css("display", "none");
		// 设置分页面板
		setPageView(newpage, "cellsDiv");
		showInfoInAndOut("info", "没有找到对应的数据！");
	}
}

/**
 * 按条件查询小区信息
 */
function getCells() {
	// 重置分页条件
	initFormPage('cellsForm');
	// 提交表单
	sumbitCondition();
}

/**
 * 提交表单
 */
function sumbitCondition() {
	$("#loading").show();
    var fieldVal = $("#citySelect").find("option:selected").val();
	var fieldTxt = $("#citySelect").find("option:selected").text();
    var htmlVal = "";
    if("-1"==fieldVal){
        $("#citySelect option").each(function(index){
            var cityVal = $(this).val();

                if(index==0) {
                    htmlVal += $(this).val();
                }else {
                    htmlVal += "," + $(this).val();
                }
        });
        $("#citySelect").find("option:selected").val(htmlVal);
    }
	$("#cellsForm").ajaxSubmit({
		url : contextPath+'/lteCellQueryPage/queryCellsByPage',
		dataType : 'text',
		type : 'post',
		success : function(raw) {
			  showCells(raw);
			if(""==fieldTxt){
				$("#citySelect").find("option:selected").val("-1");
			}
	    },
	    error : function() {
	    	$("#loading").css("display", "none");
	    	showInfoInAndOut("info", "不存在当前页！");
			if(""==fieldTxt){
				$("#citySelect").find("option:selected").val("-1");
			}
	    }
	})
}

/**
 * 初始化区域
 */
function initAreaCascade(data, provinceId, cityId) {
	// alert("data==="+data);

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
	console.log(1);
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
	console.log(2);
	var select = $("#" + selectId);
	var one;
	var htmlStr = "";
	select.empty();
	if("citySelect"==selectId){
		htmlStr += "<option value='-1'></option>";
	}
	for (var i = 0; i < data.length; i++) {
		one = data[i];
		if (one['id']) {
			htmlStr += "<option value='" + one['id'] + "'>" + $.trim(one['name']) + "</option>";
		}
	}
	select.append(htmlStr);
}
