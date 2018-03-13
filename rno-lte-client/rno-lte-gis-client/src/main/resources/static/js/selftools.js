// --------普通工具---------//

/**
 * 使一个元素渐渐展现然后又渐渐隐去
 * 
 * @param objId
 * @param timeIn
 * @param timeOut
 * @param stayTime
 * 
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
			$("#" + objId).fadeIn(timeIn, function() {
				window.setTimeout(function() {
					$("#" + objId).fadeOut(timeOut);
				}, stayTime);
			});
		}
	} catch (err) {

	}
}

function showOperTips(outerId, tipId, tips) {
	try {
		$("#" + outerId).css("display", "");
		$("#" + outerId).find("#" + tipId).html(tips);
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
function ifHasSpecChar(str){
	var pattern = new RegExp("[~'!@#$%^&*()-+_=:]");
	return pattern.test(str);
}

/**
 * 初始化区域
 * cellLayerFlag:true代表加载小区图层标记
 */
function initAreaCascade(data, provinceId, cityId,areaId,isLoadCellLayerFlag) {
    if (data === null || data === undefined || data === '') {
        return;
    }

    // 设置缺省值。
    provinceId = provinceId || 'provinceId';
    cityId = cityId || 'cityId';
	areaId = areaId || 'areaId';
	if(isLoadCellLayerFlag ==null){
        isLoadCellLayerFlag = true;
	}
    // 初始化区域显示
    initArea(data, provinceId, cityId,areaId);

    // 绑定联动事件
    bindCascade(data, provinceId, cityId,isLoadCellLayerFlag);
    if(""!=areaId){
        //增加绑定市区联动
        bindCascade(data, cityId, areaId,isLoadCellLayerFlag);
        $("#areaId").change(function() {
            var lnglat = $("#areaid_" + $("#areaId").val()).val();
            // console.log("lnglat===="+lnglat);
            if (lnglat) {
                // 地图中心点
                var lls = lnglat.split(",");
                if (lls[0] == 0 || lls[1] == 0) {
                    // console.warn("未设置该区域的中心点经纬度。");
                } else {
                    // 地图移动
                    // 应用内置的动画，实现平移动画
                    var pan = ol.animation.pan({
                        duration : 2000,
                        source : (map.getView().getCenter())
                    });
                    map.beforeRender(pan);
                    map.getView().setCenter([ parseFloat(lls[0]), parseFloat(lls[1]) ]);
                }
            }
            if(isLoadCellLayerFlag){
                clearAll(); //清除覆盖物
			}
            var cityName = $("#cityId").find("option:selected").text().trim();
        });
	}
}

/**
 * 绑定联动事件，默认实现，需要可以替换
 */
function bindCascade(data, provinceId, cityId,isLoadCellLayerFlag) {
    if ("cityId"!=provinceId){
        $("#" + provinceId).change(function () {

           var parentCode =  $("#" + provinceId).find("option:selected").val();

            var one;
            for (var i = 0; i < data.length; i++) {
                one = data[i];
                if (one['id'] && one['id'] === Number(parentCode)) {
                    // 填充市。
                    paddingAreaSelect(one['children'], "cityId");
                    var cityCode =  $("#cityId").find("option:selected").val();
                    for (var j = 0; j < one['children'].length; j++) {

                        if (one['children'][j]['id'] && one['children'][j]['id'] === Number(cityCode)) {
                            //填充区
                            paddingAreaSelect(one['children'][j]['children'], "areaId");
                            //以上联动子区域
                            //在市级层面联动前将先前的区域小区图层清理掉
                            map.removeLayer(tiled);
                            overlaysGroup.getLayers().clear();
                            //重新加载新区域小区瓦片图层
                            if (isLoadCellLayerFlag) {
                                var cityId = $("#cityId").val();
                                var area_id = "AREA_ID=" + cityId;
                                tiled = new ol.layer.Tile({
                                    title: 'LTE小区',
                                    source: new ol.source.TileWMS({
                                        url: cellLayersUrl,
                                        params: {
                                            'FORMAT': 'image/png',
                                            'VERSION': '1.1.1',
                                            tiled: true,
                                            STYLES: '',
                                            LAYERS: cellLayers,
                                            CQL_FILTER: area_id
                                        }
                                    }),
                                    opacity: 0.5
                                });
                                map.addLayer(tiled);
                                map.addLayer(highlightOverlay);
                                map.addLayer(lineOverlay);
                                map.addLayer(queryCellOverlay);
                                map.addLayer(bezierOverlay);
                            }
                            $("#areaId").trigger("change");
                            if (!isLoadCellLayerFlag) {
                                //针对PCI动态评估而言
                                //重新加载最新区域的干扰矩阵数据
                                getLatelyLteMatrix();
                            } else {
                                //针对动态覆盖地图而言获取
                                //获取选择地市的MR测量日期
                                findByAreaIdAndDataType();
                            }
                            break;
                        }
                    }
                }
            }

        });
	}else {
        $("#" + provinceId).change(function () {
            // 触发父区域改变事件。
            var proCode =  $("#provinceId").find("option:selected").val();
            var cityCode =  $("#cityId").find("option:selected").val();
            var one;
            for (var i = 0; i < data.length; i++) {
                one = data[i];
                if (one['id'] && one['id'] === Number(proCode)) {

                	for (var j = 0; j < one['children'].length; j++) {

                        if (one['children'][j]['id'] && one['children'][j]['id'] === Number(cityCode)) {
                            //填充区
                            paddingAreaSelect(one['children'][j]['children'], "areaId");
                            //以上联动子区域
                            //在市级层面联动前将先前的区域小区图层清理掉
                            map.removeLayer(tiled);
                            overlaysGroup.getLayers().clear();
                            //重新加载新区域小区瓦片图层
                            if (isLoadCellLayerFlag) {
                                var cityId = $("#cityId").val();
                                var area_id = "AREA_ID=" + cityId;
                                tiled = new ol.layer.Tile({
                                    title: 'LTE小区',
                                    source: new ol.source.TileWMS({
                                        url: cellLayersUrl,
                                        params: {
                                            'FORMAT': 'image/png',
                                            'VERSION': '1.1.1',
                                            tiled: true,
                                            STYLES: '',
                                            LAYERS: cellLayers,
                                            CQL_FILTER: area_id
                                        }
                                    }),
                                    opacity: 0.5
                                });
                                map.addLayer(tiled);
                                map.addLayer(highlightOverlay);
                                map.addLayer(lineOverlay);
                                map.addLayer(queryCellOverlay);
                                map.addLayer(bezierOverlay);
                            }
                            $("#areaId").trigger("change");
                            if (!isLoadCellLayerFlag) {
                                //针对PCI动态评估而言
                                //重新加载最新区域的干扰矩阵数据
                                getLatelyLteMatrix();
                            } else {
                                //针对动态覆盖地图而言获取
                                //获取选择地市的MR测量日期
                                findByAreaIdAndDataType();
                            }
                            break;
                        }
                    }
                }
            }
        });
}
}

/**
 * 初始化省市。默认实现，可以替换。
 */
function initArea(data, provinceId, cityId,areaId) {
    // 填充父标签
    paddingAreaSelect(data, provinceId);
    // 触发父区域改变事件。
    areaChange(data, provinceId, cityId);
    if(""!=areaId){
        //区域（增加区域联运）
        areaChange(data[0]['children'], cityId, areaId);
	}

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
    var select = $("#" + selectId);
    var one;
    var htmlStr = "";
    select.empty();
    for (var i = 0; i < data.length; i++) {
        one = data[i];
        if (one['id']) {
            htmlStr += "<option value='" + one['id'] + "'>" + $.trim(one['name']) + "</option>";
        }
        if("areaId"==selectId){
            $("#hiddenAreaLngLatDiv").html("");
            $("#hiddenLng").val("");
            $("#hiddenLat").val("");
            // console.log("data===" + data.toSource());
            if (data) {
                var html = "";
                var len = data.length;
                for ( var j = 0; j < len; j++) {
                    var obj = data[j];
                    html += "<input type=\"hidden\" id=\"areaid_"
                        + obj['id'] + "\" value=\""
                        + obj["lon"] + "," + obj["lat"]
                        + "\" />";
                    if (j == 0) {
                        $("#hiddenLng").val(obj["lon"]);
                        $("#hiddenLat").val(obj["lat"]);
                    }
                }
                $("#hiddenAreaLngLatDiv").append(html);
            }
        }
    }
    select.append(htmlStr);
}
