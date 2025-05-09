package com.code_fusion.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.code_fusion.model.UserCode;
import com.code_fusion.model.Users;
import com.code_fusion.dto.UserCodeDTO;
import com.code_fusion.repository.UserCodeRepository;
import com.code_fusion.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserCodeService {

    @Autowired
    private UserCodeRepository userCodeRepository;
    
   

    public void save(UserCode userCode) {
        userCodeRepository.save(userCode);
    }
    
   
    public Optional<UserCodeDTO> getSubmissionByUserAndQuestion(Long userId, Long questionId) {
        return userCodeRepository.findByUserUserIdAndChallengeId(userId, questionId)
                .map(this::convertToDTO);
    }



    private UserCodeDTO convertToDTO(UserCode userCode) {
        UserCodeDTO dto = new UserCodeDTO();
        dto.setChallengeId(userCode.getChallenge().getId());
        dto.setChallengeTitle(userCode.getChallenge().getTitle());
        dto.setSubmittedCode(userCode.getCode());
        dto.setSubmittedAt(userCode.getSubmittedAt().toString());
        return dto;
    }
    
    
}
