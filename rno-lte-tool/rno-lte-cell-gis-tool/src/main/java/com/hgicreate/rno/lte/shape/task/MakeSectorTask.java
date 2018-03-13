package com.hgicreate.rno.lte.shape.task;

import com.hgicreate.rno.lte.shape.model.CellCondition;
import com.hgicreate.rno.lte.shape.properties.GisProperties;
import com.hgicreate.rno.lte.shape.service.CommonService;
import com.hgicreate.rno.lte.shape.service.GisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class MakeSectorTask {

    private final CommonService commonService;

    private final GisService gisService;

    private final GisProperties gisProperties;

    public MakeSectorTask(CommonService commonService, GisService gisService, GisProperties gisProperties) {
        this.commonService = commonService;
        this.gisService = gisService;
        this.gisProperties = gisProperties;
    }

    public void runOneCity(String... args) throws Exception {
//        long cityId = 440100;
//        long cityId = 440400;

        long cityId = 445300;
        if (args.length > 0) {
            if ("ALL".equalsIgnoreCase(args[0])) {
                runAll();
            } else {
                for (String city : args) {
                    cityId = Long.valueOf(city);
                    runOneCity(cityId);
                }
            }
        } else {
            runOneCity(cityId);
        }

//        runAll();
    }

    private void runOneCity(long cityId) {
        log.debug("开始,cityId={}", cityId);
        CellCondition condition = new CellCondition(cityId, gisProperties.getOutdoorRadius(), gisProperties.getIndoorRadius(), gisProperties.isIncrement(), gisProperties.getBatch(), gisProperties.getSimilarDis());
        gisService.transform2Gis(condition);
        log.debug("完成");
    }

    private void runAll() {
        List<Long> cityList = commonService.findCity();
        if (null != cityList) {
            cityList.forEach(this::runOneCity);
        }
    }
}
