package com.hgicreate.rno.proxy.service;

import com.hgicreate.rno.proxy.model.User;
import com.hgicreate.rno.proxy.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * 判断用户是否在数据库中
     */
    public boolean existsUser(String username) {
        return userRepository.getUsersByUsername(username).size() > 0;
    }

    /**
     * 保存用户到数据库中
     */
    public void save(User user) {
        userRepository.save(user);
    }
}
