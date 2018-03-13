package com.hgicreate.rno.mrorigin;

import com.hgicreate.rno.mrorigin.parser.Parser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.Duration;
import java.time.LocalDateTime;

@SpringBootApplication
public class MrParseToolApplication implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(MrParseToolApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(MrParseToolApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        LocalDateTime start = LocalDateTime.now();
        logger.info("开始时间：{}", start);
        String src;
        String dest;
        if (args.length == 0) {
            src = "D:\\tmp\\mrdata\\TD-LTE_MRO_ZTE_OMC1_20160804000000";
//            src = "D:\\tmp\\mrdata\\test";
            dest = "D:\\tmp\\mrdataDest";
        } else {
            src = args[0];
            dest = args[1];
        }

        logger.info("src={}", src);
        logger.info("dest={}", dest);
        Parser.newParser().doParser(src, dest);
        LocalDateTime end = LocalDateTime.now();
        Duration use = Duration.between(start, end);
        logger.info("开始时间：{}", start);
        logger.info("结束时间：{}", end);
        logger.info("总用时：{}", use);
    }
}
