package com.code_fusion.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.code_fusion.model.QuestionType;

@Repository
public interface QuestionTypeRepository extends JpaRepository<QuestionType, Long> {
    Optional<QuestionType> findByName(String name);
}
