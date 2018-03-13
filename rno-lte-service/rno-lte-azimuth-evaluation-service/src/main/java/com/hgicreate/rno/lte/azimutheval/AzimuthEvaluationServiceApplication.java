package com.hgicreate.rno.lte.azimutheval;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableFeignClients
@EnableDiscoveryClient
@EnableCircuitBreaker
public class AzimuthEvaluationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AzimuthEvaluationServiceApplication.class, args);
    }

}
