package com.code_fusion.dto;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeDTO {
    private Long id;
    private Boolean status;
    private String title;
    private String description;
    private String example;
    private String difficultyLevel;
    private String questionType;
    private String requiredOutput;
    private String solution;
    private String categories;
   

    public ChallengeDTO(Long id,Boolean status, String title, String description, String example, String difficultyLevel, String questionType,String requiredOutput,String solution,String categories) {
        this.id = id;
        this.status=status;
        this.title = title;
        this.description = description;
        this.example = example;
        this.difficultyLevel = difficultyLevel;
        this.questionType = questionType;
        this.requiredOutput = requiredOutput;  
        this.solution=solution;
        this.categories=categories;
    }
}