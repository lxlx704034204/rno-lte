package com.hgicreate.rno.lte.shape.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rno")
@Data
public class GisProperties {
    private boolean increment = false;
    private double outdoorRadius = 0.0007;
    private double indoorRadius = 0.00005;
    private int batch = 1000;
    private double similarDis = 50;
}
