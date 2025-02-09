package com.code_fusion.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.code_fusion.model.Users;
import com.code_fusion.repository.UserRepository;

@Service
public class UserService {
	
	final private UserRepository userRepo;
	final private PasswordEncoder passwordEncoder;

	private UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
	}

	public Users saveUser(Users userObj) {
		
	   userObj.setUserPassword(passwordEncoder.encode(userObj.getUserPassword())); 
       userObj.setRole("USER");
		return userRepo.save(userObj);

	}

	 public Optional<Users> findByUserEmail(String userEmail) {  // <-- Use correct method
	        return userRepo.findByUserEmail(userEmail);
	    }

}
