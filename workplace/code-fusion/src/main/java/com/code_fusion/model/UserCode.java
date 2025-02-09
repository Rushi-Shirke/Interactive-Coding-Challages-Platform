package com.code_fusion.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_code")
@Data
public class UserCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String code;  // The code that the user submits for the challenge

    @Column(nullable = false)
    private LocalDateTime submittedAt = LocalDateTime.now();  // When the code was submitted
}
