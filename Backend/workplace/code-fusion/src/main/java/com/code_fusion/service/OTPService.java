package com.code_fusion.service;

import java.security.SecureRandom;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class OTPService {
    
    private final SecureRandom random = new SecureRandom();
    private final Map<String, OTPEntry> otpStorage = new ConcurrentHashMap<>();

    @Autowired
    private JavaMailSender mailSender;

    private static final long OTP_EXPIRY_MILLIS = TimeUnit.MINUTES.toMillis(10); // OTP valid for 10 minutes

    // ✅ Generate OTP and send email
    public String generateOTP(String userEmail) {
        String otp = String.valueOf(100000 + random.nextInt(900000)); // Generate 6-digit OTP
        otpStorage.put(userEmail, new OTPEntry(otp, System.currentTimeMillis() + OTP_EXPIRY_MILLIS));
        sendEmail(userEmail, otp);
        return otp;
    }

    // ✅ Validate OTP (Checks expiry too)
    public boolean validateOTP(String userEmail, String otp) {
        if (!otpStorage.containsKey(userEmail)) {
            return false; // No OTP generated for this email
        }
        
        OTPEntry otpEntry = otpStorage.get(userEmail);
        
        if (System.currentTimeMillis() > otpEntry.expiryTime) {
            otpStorage.remove(userEmail); // OTP expired, remove it
            return false;
        }
        
        return otpEntry.otp.equals(otp.trim());
    }

    // ✅ Send OTP via Email
    public void sendEmail(String userEmail, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(userEmail);
            helper.setSubject("🔐 Password Reset OTP - CodeFusion");

            // Email content with improved formatting
            String emailContent = String.format(
                """
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>Your One-Time Password (OTP) for resetting your password is:</p>
                    <h3 style="color: #d9534f;">%s</h3>
                    <p>This OTP is valid for the next <strong>10 minutes</strong>. Do not share it with anyone.</p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                    <hr>
                    <p>Best Regards,</p>
                    <p><strong>CodeFusion Team</strong></p>
                </div>
                """, otp);

            helper.setText(emailContent, true); // Enable HTML content
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("❌ Failed to send OTP email. Please try again.", e);
        }
    }

    // ✅ Helper class for OTP storage with expiry
    private static class OTPEntry {
        private final String otp;
        private final long expiryTime;

        public OTPEntry(String otp, long expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }
    }
}
