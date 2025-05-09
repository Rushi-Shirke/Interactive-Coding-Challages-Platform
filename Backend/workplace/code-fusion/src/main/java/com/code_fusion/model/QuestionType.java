package com.code_fusion.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "question_types")
public class QuestionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)    
    private String name;
}
