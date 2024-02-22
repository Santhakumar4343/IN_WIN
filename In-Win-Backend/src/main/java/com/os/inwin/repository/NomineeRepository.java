package com.os.inwin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.os.inwin.entity.Nominee;

public interface NomineeRepository extends JpaRepository<Nominee, Long>{
	Nominee findByUserNameAndPassword(String userName, String password);
Nominee findByUserName(String userName);
}
