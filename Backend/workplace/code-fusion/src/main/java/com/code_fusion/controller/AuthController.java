package com.code_fusion.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.code_fusion.dto.UserDTO;
import com.code_fusion.exception.ResourceNotFoundException;
import com.code_fusion.model.Users;
import com.code_fusion.service.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@Validated @RequestBody Users userObj) { 
        try {
             Users user = userService.saveUser(userObj);
            if (user != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body("Sign-up successful!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sign-up failed!");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginDealer(@Valid @RequestBody Users userObj, HttpSession session)
            throws ResourceNotFoundException{

        String email = userObj.getUserEmail();
        String password = userObj.getUserPassword();

        // Fetch user from DB or throw exception if not found
        Users user = userService.findByUserEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User doesn't exist with this email: " + email));

        // Check if the password matches
        if (passwordEncoder.matches(password, user.getUserPassword())) {
            session.setAttribute("user", user); // Store user in session
            return ResponseEntity.status(HttpStatus.OK).body("Login successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!"); 
        }
    }

    @GetMapping("/logoutuser")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.status(HttpStatus.OK).body("Logout successful!");
    }

    @GetMapping("/session-user")
    public ResponseEntity<Object> getSessionUser(HttpSession session) {
        Users user = (Users) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        // Convert user entity to DTO
        UserDTO userDTO = new UserDTO(user.getUserId(), user.getRole());
        return ResponseEntity.ok(userDTO);
    }

}
