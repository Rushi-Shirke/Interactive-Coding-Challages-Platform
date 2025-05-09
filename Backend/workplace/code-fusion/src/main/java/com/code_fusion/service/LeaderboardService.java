package com.code_fusion.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.code_fusion.model.Leaderboard;
import com.code_fusion.model.Users;
import com.code_fusion.dto.LeaderboardDTO;
import com.code_fusion.repository.LeaderboardRepository;
import com.code_fusion.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    @Autowired
    private LeaderboardRepository leaderboardRepository;
    
    @Autowired
    private UserRepository userRepository;

    public void save(Leaderboard leaderboard) {
        leaderboardRepository.save(leaderboard);
    }

    // ✅ Returns a list of DTOs instead of entities
    public List<LeaderboardDTO> getLeaderboardByUserId(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Leaderboard> leaderboardEntries = leaderboardRepository.findByUser(user);

        // Convert List<Leaderboard> to List<LeaderboardDTO>
        return leaderboardEntries.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Convert Leaderboard entity to DTO
    private LeaderboardDTO convertToDTO(Leaderboard leaderboard) {
        LeaderboardDTO dto = new LeaderboardDTO();

        if (leaderboard.getUser() != null) {
            dto.setUserId(leaderboard.getUser().getUserId());
            dto.setUserName(leaderboard.getUser().getUserName());
            dto.setUserImage(leaderboard.getUser().getUserImage());
        }

        if (leaderboard.getChallenge() != null) {
            dto.setChallengeId(leaderboard.getChallenge().getId());
            dto.setChallengeTitle(leaderboard.getChallenge().getTitle());
            dto.setDifficultyLevel(leaderboard.getChallenge().getDifficulty());
            dto.setSolution(leaderboard.getChallenge().getSolution());
        }

        dto.setStatus(leaderboard.getStatus());
        dto.setSolvedAt(leaderboard.getSolvedAt().toString());

        return dto;
    }
}
