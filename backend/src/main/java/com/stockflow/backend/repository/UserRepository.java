package com.stockflow.backend.repository;

import com.stockflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByActiveTrue();
    Optional<User> findByEmail(String email);
}