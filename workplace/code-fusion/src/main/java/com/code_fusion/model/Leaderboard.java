package com.code_fusion.model;

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

   /* @Column(nullable = false)
    private Long totalSolved;  // Number of challenges solved by the user*/

    @ManyToOne
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;  // Specific challenge solved

  /*  @Column(nullable = false)
    private LocalDateTime solvedAt = LocalDateTime.now();  // When the user solved the challenge*/
}
