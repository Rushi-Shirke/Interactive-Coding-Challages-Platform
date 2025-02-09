package com.code_fusion.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.code_fusion.model.DifficultyLevel;

@Repository
public interface DifficultyLevelRepository extends JpaRepository<DifficultyLevel, Long> {
    Optional<DifficultyLevel> findByLevel(String level);
}
