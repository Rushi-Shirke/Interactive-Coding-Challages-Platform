package com.code_fusion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.code_fusion.dto.LeaderboardDTO;
import com.code_fusion.dto.UserCodeDTO;
import com.code_fusion.model.Leaderboard;
import com.code_fusion.model.UserCode;
import com.code_fusion.model.Users;
import com.code_fusion.model.Challenge;
import com.code_fusion.service.LeaderboardService;
import com.code_fusion.service.UserCodeService;
import com.code_fusion.service.UserService;
import com.code_fusion.service.ChallengeService;

import java.util.List;

@RestController
@RequestMapping("/api/usercode")
public class UserCodeController {

    @Autowired
    private UserCodeService userCodeService;

    @Autowired
    private LeaderboardService leaderboardService;

    @Autowired
    private UserService userService;

    @Autowired
    private ChallengeService challengeService;

    // ✅ API to Submit Code
    @PostMapping("/submit")
    public ResponseEntity<String> submitCode(@RequestBody UserCode usercode) {
        Users user = userService.findById(usercode.getUser().getUserId());
        Challenge challenge = challengeService.findById(usercode.getChallenge().getId());

        if (user == null || challenge == null) {
            return ResponseEntity.badRequest().body("User or Challenge not found.");
        }

        // Save user code submission
        UserCode userCode = new UserCode();
        userCode.setUser(user);
        userCode.setChallenge(challenge);
        userCode.setCode(usercode.getCode());
        userCodeService.save(userCode);

        // ✅ Update Leaderboard
        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setUser(user);
        leaderboard.setChallenge(challenge);
        leaderboard.setStatus(true); // ✅ Assume user solved the challenge
        leaderboardService.save(leaderboard);

        return ResponseEntity.ok("Code submitted successfully!");
    }

    // ✅ API to Get Submission by userId & questionId
    @GetMapping("/usercode/{userId}/{questionId}")
    public ResponseEntity<UserCodeDTO> getSubmission(@PathVariable Long userId, @PathVariable Long questionId) {
        return userCodeService.getSubmissionByUserAndQuestion(userId, questionId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ API to Get User's Leaderboard Data
    @GetMapping("/leaderboard/{userId}")
    public ResponseEntity<List<LeaderboardDTO>> getUserLeaderboard(@PathVariable Long userId) {
        return ResponseEntity.ok(leaderboardService.getLeaderboardByUserId(userId));
    }
}
