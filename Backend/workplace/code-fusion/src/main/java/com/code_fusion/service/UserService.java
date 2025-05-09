package com.code_fusion.service;

import java.util.List;
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

	public Optional<Users> findByUserEmail(String userEmail) { // <-- Use correct method
		return userRepo.findByUserEmail(userEmail);
	}

	public void updatePassword(String email, String newPassword) {
		if (newPassword == null || newPassword.trim().isEmpty()) {
			throw new IllegalArgumentException("New password cannot be empty");
		}

		Users user = userRepo.findByUserEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		user.setUserPassword(passwordEncoder.encode(newPassword));
		userRepo.save(user);
	}

	public Optional<Users> updateUser(Long userId, Users updatedUser) {
		return userRepo.findById(userId).map(existingUser -> {
			if (updatedUser.getUserName() != null) {
				existingUser.setUserName(updatedUser.getUserName());
			}
			if (updatedUser.getUserImage() != null) {
				existingUser.setUserImage(updatedUser.getUserImage());
			}
			return userRepo.save(existingUser);
		});
	}

	public Users findById(Long challengeId) {
		return userRepo.findById(challengeId)
				.orElseThrow(() -> new IllegalArgumentException("Challenge not found with ID: " + challengeId));
	}

	public List<Users> getAllUsers() {
		return userRepo.findAll();
		
	}

}
