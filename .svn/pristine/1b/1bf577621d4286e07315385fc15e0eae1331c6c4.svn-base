package com.hgicreate.rno.proxy.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "RNO_SYS_AUDIT")
public class Audit {
    @Id
    @GeneratedValue(generator="AuditSeq")
    @SequenceGenerator(name="AuditSeq",sequenceName="SEQ_RNO_SYS_AUDIT", allocationSize=5)
    private Long id;

    private String username, ip;

    private Date loginTime;

    private String userAgent, httpReferer;
}
