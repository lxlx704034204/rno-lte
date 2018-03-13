package com.hgicreate.rno.lte.web;

import com.hgicreate.rno.lte.web.client.azimutheval.AzimuthEvalTaskRestClientFallback;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.hateoas.config.EnableHypermediaSupport;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
@EnableCircuitBreaker
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL)
@EnableHystrix
public class WebClientApplication implements EnvironmentAware {
    public static void main(String[] args) {
        SpringApplication.run(WebClientApplication.class, args);
    }

    @Override
    public void setEnvironment(Environment environment) {
        String hadoopUserName = environment.getProperty("spring.hadoop.config.hadoop.user.name");
        if (hadoopUserName == null) {
            hadoopUserName = "dev";
        }
        System.setProperty("HADOOP_USER_NAME", hadoopUserName);
    }

    @Bean
    public AzimuthEvalTaskRestClientFallback fb() {
        return new AzimuthEvalTaskRestClientFallback();
    }
}
