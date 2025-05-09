package com.code_fusion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.code_fusion.model.Users;
import com.code_fusion.service.OTPService;
import com.code_fusion.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private OTPService otpService;

	// ✅ Update User
	@PutMapping("/{userId}")
	public ResponseEntity<Users> updateUser(@PathVariable Long userId, @RequestBody Users updatedUser) {
		Optional<Users> user = userService.updateUser(userId, updatedUser);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	// ✅ Forgot Password (Send OTP)
	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestParam String user_email) {
		otpService.generateOTP(user_email);
		return ResponseEntity.ok("OTP sent to email: " + user_email);
	}

	// ✅ Verify OTP
	@PostMapping("/verify-otp")
	public ResponseEntity<String> verifyOTP(@RequestParam String user_email, @RequestParam String otp) {
		if (otpService.validateOTP(user_email, otp)) {
			return ResponseEntity.ok("OTP Verified. Proceed to reset password.");
		} else {
			return ResponseEntity.badRequest().body("Invalid OTP.");
		}
	}

	// ✅ Reset Password (After OTP Verification)
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestParam String user_email, @RequestParam String otp, @RequestParam String newPassword) {
		if (otpService.validateOTP(user_email, otp)) {
			userService.updatePassword(user_email, newPassword);
			return ResponseEntity.ok("Password successfully reset.");
		} else {
			return ResponseEntity.badRequest().body("Invalid OTP.");
		}
	}

	// ✅ Get All Users
	@GetMapping("/all")
	public ResponseEntity<List<Users>> getAllUsers() {
		List<Users> users = userService.getAllUsers();
		if (users.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(users);
	}
}
