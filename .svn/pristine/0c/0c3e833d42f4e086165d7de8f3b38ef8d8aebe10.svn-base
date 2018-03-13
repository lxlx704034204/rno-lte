package com.hgicreate.rno.pci.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "RNO_SYS_USERS")
public class User {
    @Id
    @GeneratedValue(generator = "UserSeq")
    @SequenceGenerator(name = "UserSeq", sequenceName = "SEQ_RNO_SYS_USERS", allocationSize = 5)
    private Long id;

    private String username, password, fullName, email;

    private int enabled, defaultCity;

    private Date createTime, updateTime;

    private int type;

    @OneToOne
    @JoinColumn(name = "defaultCity", insertable = false, updatable = false)
    private Area area;

    @OneToOne
    @JoinColumn(name = "username", insertable = false, updatable = false)
    private Auth auth;
}
