package com.code_fusion.dto;



import com.code_fusion.model.DifficultyLevel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaderboardDTO {
    private Long userId;
    private String userName;
    private String userImage;
    private Long challengeId;
    private String challengeTitle;
    private Boolean status;
    private String solvedAt;
    private DifficultyLevel difficultyLevel;
    private String solution;
}
