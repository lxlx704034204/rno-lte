package com.hgicreate.rno.lte.web.client.test;

import com.hgicreate.rno.lte.web.model.Area;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@FeignClient(name = "${rno.lte.service.common:rno-lte-common-service}")
@RequestMapping("/test")
public interface TestRestClient extends TestClient {
    @Override
    @RequestMapping(value = "/getAreaByAccount2", method = GET)
    List<Area> getAreaByAccount2(@RequestParam("account") String account, @RequestParam("cityId") long cityId);
}
