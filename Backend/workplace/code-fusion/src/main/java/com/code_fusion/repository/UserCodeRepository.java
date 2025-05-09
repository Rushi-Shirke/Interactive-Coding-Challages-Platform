package com.code_fusion.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.code_fusion.model.UserCode;

@Repository
public interface UserCodeRepository extends JpaRepository<UserCode, Long> {
  
    
    Optional<UserCode> findByUserUserIdAndChallengeId(Long userId, Long challengeId);
}

