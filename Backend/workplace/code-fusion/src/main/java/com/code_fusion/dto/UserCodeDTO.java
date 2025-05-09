package com.code_fusion.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCodeDTO {
   
	private Long challengeId;
    private String challengeTitle;
    private String submittedCode;
    private String submittedAt;
}
