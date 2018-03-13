package com.hgicreate.rno.pci.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "RNO_SYS_AREA")
public class Area {
    @Id
    private Long id;
    private String name;
    private int areaLevel;
}
