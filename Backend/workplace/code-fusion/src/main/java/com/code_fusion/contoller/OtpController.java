package com.code_fusion.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.code_fusion.model.Users;
import com.code_fusion.service.OTPService;
import com.code_fusion.service.UserService;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class OtpController {

    private static final Logger logger = LoggerFactory.getLogger(OtpController.class);

    @Autowired
    private OTPService otpService;

    @Autowired
    private UserService userService;

    // ✅ Forgot Password (Sends OTP)
    @PatchMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Users user) {
        try {
            String email = user.getUserEmail();
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email is required."));
            }
            String otp = otpService.generateOTP(email.trim());
            logger.info("OTP sent to {}", email);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP sent successfully.");
            response.put("email", email);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error in sending OTP: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to send OTP. Please try again."));
        }
    }

    // ✅ Verify OTP (OTP from RequestParam)
    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOTP(@RequestBody Users user, @RequestParam String otp) {
        String email = user.getUserEmail();

        if (email == null || otp == null || email.trim().isEmpty() || otp.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and OTP are required."));
        }

        if (otpService.validateOTP(email.trim(), otp.trim())) {
            logger.info("OTP verified for {}", email);
            return ResponseEntity.ok(Map.of("message", "OTP verified. Proceed to reset password."));
        } else {
            logger.warn("Invalid OTP attempt for {}", email);
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP."));
        }
    }

    // ✅ Reset Password (OTP from RequestParam)
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Users user, @RequestParam String otp) {
        String email = user.getUserEmail();
        String newPassword = user.getUserPassword();

        if (email == null || otp == null || newPassword == null || 
            email.trim().isEmpty() || otp.trim().isEmpty() || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email, OTP, and new password are required."));
        }

        if (otpService.validateOTP(email.trim(), otp.trim())) {
            userService.updatePassword(email.trim(), newPassword.trim());
            logger.info("Password reset successfully for {}", email);
            return ResponseEntity.ok(Map.of("message", "Password reset successful."));
        } else {
            logger.warn("Password reset failed due to invalid OTP for {}", email);
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP."));
        }
    }
}
