package com.code_fusion.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "difficulty_levels")
public class DifficultyLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)  
    private String level;
}
