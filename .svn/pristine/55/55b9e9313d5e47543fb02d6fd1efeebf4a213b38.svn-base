package com.hgicreate.rno.lte.web.model;

import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class TaskQueryCond {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private boolean mine;
    private String account;
    private String jobType;
    private long cityId;
    private String taskName;
    private String taskStatus;
    private String meaTime;
    private String submitTime;
    private String startSubmitTime;
    private String endSubmitTime;
    private int start;
    private int end;

    public void recognizeSubmitTime() {
        LocalDate today = LocalDate.now();
        if (null == submitTime || "THREE_DAYS".equalsIgnoreCase(submitTime)) {
            startSubmitTime = today.minusDays(3).atTime(0, 0, 0).format(DATE_TIME_FORMATTER);
            endSubmitTime = today.atTime(23, 59, 59).format(DATE_TIME_FORMATTER);
        } else if ("MONTH".equalsIgnoreCase(submitTime)) {
            startSubmitTime = today.minusMonths(1).atTime(0, 0, 0).format(DATE_TIME_FORMATTER);
            endSubmitTime = today.atTime(23, 59, 59).format(DATE_TIME_FORMATTER);
        } else if ("QUARTER".equalsIgnoreCase(submitTime)) {
            startSubmitTime = today.minusMonths(3).atTime(0, 0, 0).format(DATE_TIME_FORMATTER);
            endSubmitTime = today.atTime(23, 59, 59).format(DATE_TIME_FORMATTER);
        }
    }
}
