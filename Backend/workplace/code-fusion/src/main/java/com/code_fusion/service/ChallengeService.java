package com.code_fusion.service;

import com.code_fusion.dto.ChallengeDTO;
import com.code_fusion.model.Challenge;
import com.code_fusion.model.DifficultyLevel;
import com.code_fusion.model.QuestionCategories;
import com.code_fusion.model.QuestionType;
import com.code_fusion.repository.ChallengeRepository;
import com.code_fusion.repository.DifficultyLevelRepository;
import com.code_fusion.repository.QuestionCategoriesRepository;
import com.code_fusion.repository.QuestionTypeRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ChallengeService {

	private final ChallengeRepository challengeRepository;
	private final DifficultyLevelRepository difficultyLevelRepository;
	private final QuestionTypeRepository questionTypeRepository;
	private final QuestionCategoriesRepository questionCategoriesRepository;

	public ChallengeService(ChallengeRepository challengeRepository,
			DifficultyLevelRepository difficultyLevelRepository, QuestionTypeRepository questionTypeRepository,
			QuestionCategoriesRepository questionCategoriesRepository) {
		this.challengeRepository = challengeRepository;
		this.difficultyLevelRepository = difficultyLevelRepository;
		this.questionTypeRepository = questionTypeRepository;
		this.questionCategoriesRepository = questionCategoriesRepository;
	}

	// ✅ Save Challenge
	@Transactional
	public Challenge saveChallenge(Challenge challenge) {
		// Find or Save DifficultyLevel
		DifficultyLevel difficulty = difficultyLevelRepository.findByLevel(challenge.getDifficulty().getLevel())
				.orElseGet(() -> difficultyLevelRepository.save(challenge.getDifficulty()));

		// Find or Save QuestionType
		QuestionType questionType = questionTypeRepository.findByName(challenge.getQuestionType().getName())
				.orElseGet(() -> questionTypeRepository.save(challenge.getQuestionType()));

		// Find or Save Categories
		QuestionCategories categories = questionCategoriesRepository
				.findByCategoryName(challenge.getCategories().getCategoryName())
				.orElseGet(() -> questionCategoriesRepository.save(challenge.getCategories()));

		// Set References in Challenge
		challenge.setDifficulty(difficulty);
		challenge.setQuestionType(questionType);
		challenge.setCategories(categories);

		// Save Challenge
		return challengeRepository.save(challenge);
	}

	// ✅ Fetch all challenges
	public List<ChallengeDTO> getAllChallenges() {
		return challengeRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	// ✅ Fetch challenge by ID
	public Optional<ChallengeDTO> getChallengeById(Long id) {
		return challengeRepository.findById(id).map(this::convertToDTO);
	}

	// ✅ Fetch challenges based on difficulty
	public List<ChallengeDTO> getChallengesByDifficulty(String difficultyName) {
		return challengeRepository.findChallengesByDifficulty(difficultyName).stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	// ✅ Fetch challenges based on question type
	public List<ChallengeDTO> getChallengesByQuestionType(String questionTypeName) {
		return challengeRepository.findChallengesByQuestionType(questionTypeName).stream()
				.map(this::convertToDTO)
				.collect(Collectors.toList());
	}

	// ✅ Delete challenge by ID
	@Transactional
	public void deleteChallenge(Long id) {
		if (!challengeRepository.existsById(id)) {
			log.warn("Attempted to delete non-existing challenge with ID: {}", id);
			throw new IllegalArgumentException("Challenge not found with ID: " + id);
		}
		challengeRepository.deleteById(id);
		log.info("Deleted challenge with ID: {}", id);
	}

	// ✅ Fetch all Categories
	public List<QuestionCategories> getAllCategories() {
		return questionCategoriesRepository.findAll();
	}

	// ✅ Fetch all Question Types
	public List<QuestionType> getAllQuestionTypes() {
		return questionTypeRepository.findAll();
	}

	// ✅ Update an existing challenge
	@Transactional
	public Challenge updateChallenge(Long id, Challenge updatedChallenge) {
		return challengeRepository.findById(id).map(existingChallenge -> {
			existingChallenge.setTitle(updatedChallenge.getTitle());
			existingChallenge.setDescription(updatedChallenge.getDescription());
			existingChallenge.setExample(updatedChallenge.getExample());
			existingChallenge.setRequiredOutput(updatedChallenge.getRequiredOutput());
			existingChallenge.setSolution(updatedChallenge.getSolution());

			// Update DifficultyLevel
			DifficultyLevel difficulty = difficultyLevelRepository
					.findByLevel(updatedChallenge.getDifficulty().getLevel())
					.orElseGet(updatedChallenge::getDifficulty);
			existingChallenge.setDifficulty(difficulty);

			// Update QuestionType
			QuestionType questionType = questionTypeRepository
					.findByName(updatedChallenge.getQuestionType().getName())
					.orElseGet(updatedChallenge::getQuestionType);
			existingChallenge.setQuestionType(questionType);

			// Update QuestionCategories
			QuestionCategories categories = questionCategoriesRepository
					.findByCategoryName(updatedChallenge.getCategories().getCategoryName())
					.orElseGet(updatedChallenge::getCategories);
			existingChallenge.setCategories(categories);

			log.info("Updating challenge with ID: {}", id);
			return challengeRepository.save(existingChallenge);
		}).orElseThrow(() -> new IllegalArgumentException("Challenge not found with ID: " + id));
	}

	// ✅ Helper method to convert Challenge to ChallengeDTO
	private ChallengeDTO convertToDTO(Challenge challenge) {
		return new ChallengeDTO(challenge.getId(), challenge.getStatus(), challenge.getTitle(),
				challenge.getDescription(), challenge.getExample(), challenge.getDifficulty().getLevel(),
				challenge.getQuestionType().getName(), challenge.getRequiredOutput(), challenge.getSolution(),
				challenge.getCategories().getCategoryName());
	}

	public Challenge findById(Long challengeId) {
	    return challengeRepository.findById(challengeId)
	            .orElseThrow(() -> new IllegalArgumentException("Challenge not found with ID: " + challengeId));
	}

}
