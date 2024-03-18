package com.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.profile.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
