package com.hgicreate.rno.proxy.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RNO_SYS_USERS")
public class User {
    @Id
    @GeneratedValue(generator="UserSeq")
    @SequenceGenerator(name="UserSeq",sequenceName="SEQ_RNO_SYS_USERS", allocationSize=5)
    private Long id;

    private String username, password, fullName;

    private int enabled, defaultCity;

    private Date createTime, updateTime;

    private int type;
}
