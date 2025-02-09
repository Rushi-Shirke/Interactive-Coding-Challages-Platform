package com.code_fusion.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.code_fusion.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users,Long>
{
  Optional<Users> findByUserEmail(String userEmail);
	
}
