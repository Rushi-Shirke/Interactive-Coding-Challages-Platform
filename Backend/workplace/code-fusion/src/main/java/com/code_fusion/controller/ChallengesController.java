package com.code_fusion.controller;

import com.code_fusion.dto.ChallengeDTO;
import com.code_fusion.model.Challenge;
import com.code_fusion.model.QuestionCategories;
import com.code_fusion.model.QuestionType;
import com.code_fusion.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/api/challenges")
@CrossOrigin(origins = "*")
public class ChallengesController {

    @Autowired
    private ChallengeService challengeService;

    @PostMapping("/save")
    public ResponseEntity<Challenge> saveChallenge(@RequestBody Challenge challenge) {
        Challenge savedChallenge = challengeService.saveChallenge(challenge);
        return ResponseEntity.ok(savedChallenge);
    }
    
    // ✅ Delete challenge By Id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChallenge(@PathVariable Long id) {
        challengeService.deleteChallenge(id);
        return ResponseEntity.ok("Challenge deleted successfully.");
    }

    // ✅ Update challenge BY Id
    @PutMapping("/{id}")
    public ResponseEntity<Challenge> updateChallenge(
            @PathVariable Long id, 
            @RequestBody Challenge updatedChallenge) {
        Challenge updated = challengeService.updateChallenge(id, updatedChallenge);
        return ResponseEntity.ok(updated);
    }

    // ✅ Fetch all challenges
    @GetMapping("/allchallenges")
    public ResponseEntity<?> getAllChallenges() {
        try {
            List<ChallengeDTO> challenges = challengeService.getAllChallenges();
            return ResponseEntity.ok(challenges);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")  // ✅ Ensure the path variable name is "id"
    public ResponseEntity<?> getChallengesById(@PathVariable Long id) {  // ✅ Match the parameter name
        try {
            Optional<ChallengeDTO> challenge = challengeService.getChallengeById(id);
            return challenge.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ✅ Fetch challenges based on difficulty
    @GetMapping("/difficulty/{difficultyName}")
    public ResponseEntity<?> getChallengesByDifficulty(@PathVariable String difficultyName) {
        try {
            List<ChallengeDTO> challenges = challengeService.getChallengesByDifficulty(difficultyName);
            return ResponseEntity.ok(challenges);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ✅ Fetch challenges based on question type
    @GetMapping("/questionType/{questionTypeName}")
    public ResponseEntity<?> getChallengesByQuestionType(@PathVariable String questionTypeName) {
        try {
            List<ChallengeDTO> challenges = challengeService.getChallengesByQuestionType(questionTypeName);
            return ResponseEntity.ok(challenges);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
 // ✅ Fetch all categories
    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        try {
            List<QuestionCategories> categories = challengeService.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // ✅ Fetch all question types
    @GetMapping("/questionTypes")
    public ResponseEntity<?> getAllQuestionTypes() {
        try {
            List<QuestionType> questionTypes = challengeService.getAllQuestionTypes();
            return ResponseEntity.ok(questionTypes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    
    
}
