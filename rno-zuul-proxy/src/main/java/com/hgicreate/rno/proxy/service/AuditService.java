package com.hgicreate.rno.proxy.service;

import com.hgicreate.rno.proxy.model.Audit;
import com.hgicreate.rno.proxy.model.User;
import com.hgicreate.rno.proxy.repo.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditService {

    @Autowired
    private AuditRepository auditRepository;

    /**
     * 保存用户登录审计到数据库中
     */
    public void save(Audit audit) {
        auditRepository.save(audit);
    }
}
