package com.hgicreate.rno.lte.shape;

import com.hgicreate.rno.lte.shape.properties.GisProperties;
import com.hgicreate.rno.lte.shape.task.MakeSectorTask;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(GisProperties.class)
public class CellGisToolApplication implements CommandLineRunner {

    private final MakeSectorTask task;

    public CellGisToolApplication(MakeSectorTask task) {
        this.task = task;
    }

    public static void main(String[] args) {
        SpringApplication.run(CellGisToolApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        task.runOneCity(args);
    }
}
