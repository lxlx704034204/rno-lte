package com.hgicreate.rno.proxy.repo;

import com.hgicreate.rno.proxy.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    public List<User> getUsersByUsername(String username);
}
