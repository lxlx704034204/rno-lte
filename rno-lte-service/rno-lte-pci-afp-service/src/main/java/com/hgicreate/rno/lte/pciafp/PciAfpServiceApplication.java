package com.hgicreate.rno.lte.pciafp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableFeignClients
@EnableDiscoveryClient
@EnableCircuitBreaker
public class PciAfpServiceApplication implements EnvironmentAware {
    public static void main(String[] args) {
        SpringApplication.run(PciAfpServiceApplication.class, args);
    }

    @Override
    public void setEnvironment(Environment environment) {
        String hadoopUserName = environment.getProperty("spring.hadoop.config.hadoop.user.name");
        if (hadoopUserName == null) {
            hadoopUserName = "dev";
        }
        System.setProperty("HADOOP_USER_NAME", hadoopUserName);
    }
}
