package com.code_fusion.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "challenges")
public class Challenge {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private Boolean status;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String example;

	@Column(columnDefinition = "TEXT")
	private String solution;

	@Column(columnDefinition = "TEXT")
	private String requiredOutput;

	@ManyToOne
	@JoinColumn(name = "difficulty_id", nullable = false)
	private DifficultyLevel difficulty;

	@ManyToOne
	@JoinColumn(name = "question_type_id", nullable = false)
	private QuestionType questionType;

	@ManyToOne
	@JoinColumn(name = "categories_Id", nullable = false)
	private QuestionCategories categories;

/*	@ManyToOne
	@JoinColumn(name = "created_by", nullable = false)
	private Users createdBy;*/

	@ManyToOne
	@JoinColumn(name = "solved_by")
	private Users solvedBy;

	@CreationTimestamp
	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(nullable = false)
	private LocalDateTime updatedAt;
}
