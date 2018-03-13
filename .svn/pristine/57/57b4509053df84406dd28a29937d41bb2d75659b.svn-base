package com.hgicreate.rno.pci.repo;

import com.hgicreate.rno.pci.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByTypeOrderByIdDesc(@Param("type") int type);
    User findByUsername(@Param("username") String username);
}
