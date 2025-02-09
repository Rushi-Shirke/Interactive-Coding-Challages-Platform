package com.code_fusion.repository;

import com.code_fusion.model.Challenge;
import com.code_fusion.model.DifficultyLevel;
import com.code_fusion.model.QuestionType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    

	   
    @Query("SELECT c FROM Challenge c WHERE c.difficulty.level = :level")
    List<Challenge> findChallengesByDifficulty(@Param("level") String level);

    @Query("SELECT c FROM Challenge c WHERE c.questionType.name = :name")
    List<Challenge> findChallengesByQuestionType(@Param("name") String name);
    
    @Query("SELECT d FROM DifficultyLevel d WHERE d.level = :level")
    Optional<DifficultyLevel> findDifficultyLevelByLevel(@Param("level") String level);

    @Query("SELECT q FROM QuestionType q WHERE q.name = :name")
    Optional<QuestionType> findQuestionTypeByName(@Param("name") String name);
    
    
}
