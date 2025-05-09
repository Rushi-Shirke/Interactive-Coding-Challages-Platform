package com.code_fusion.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "question_categories")
public class QuestionCategories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String categoryName;  // Changed from 'categories' to 'categoryName'
}
