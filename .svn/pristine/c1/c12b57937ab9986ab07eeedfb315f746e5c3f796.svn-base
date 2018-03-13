package com.hgicreate.rno.lte.web.model.datamgt;

import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class DataRecordCond {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private String creator;
    private String dataType;
    private long cityId;
    private String createTime;
    private String createTimeStart;
    private String createTimeEnd;
    private boolean skipTittle;

    public void recognizeCreateTime() {
        LocalDate today = LocalDate.now();
        if ("THREE_DAYS".equalsIgnoreCase(createTime)) {
            createTimeStart = today.minusDays(3).atTime(0, 0, 0).format(DATE_TIME_FORMATTER);
            createTimeEnd = today.atTime(23, 59, 59).format(DATE_TIME_FORMATTER);
        } else if ("MONTH".equalsIgnoreCase(createTime)) {
            createTimeStart = today.minusMonths(1).atTime(0, 0, 0).format(DATE_TIME_FORMATTER);
            createTimeEnd = today.atTime(23, 59, 59).format(DATE_TIME_FORMATTER);
        } else if ("QUARTER".equalsIgnoreCase(createTime)) {
            createTimeStart = today.minusMonths(3).atTime(0, 0, 0).format(DATE_TIME_FORMATTER);
            createTimeEnd = today.atTime(23, 59, 59).format(DATE_TIME_FORMATTER);
        }
    }
}
