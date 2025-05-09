package com.code_fusion.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "leaderboard")
public class Leaderboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Column(nullable = false)
    private Boolean status; // ✅ Whether the user solved the challenge

    @Column(nullable = false)
    private LocalDateTime solvedAt;

    @PrePersist
    protected void onCreate() {
        solvedAt = LocalDateTime.now();
    }
}
