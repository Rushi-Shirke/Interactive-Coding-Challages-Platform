package com.code_fusion.repository;

import com.code_fusion.model.QuestionCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QuestionCategoriesRepository extends JpaRepository<QuestionCategories, Integer> {
    Optional<QuestionCategories> findByCategoryName(String categoryName);  // Updated method
}
