package com.hgicreate.rno.lte.common.controller.test;

import com.hgicreate.rno.lte.common.service.test.TestService;

public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    public void test() {
        testService.test();
    }
}
