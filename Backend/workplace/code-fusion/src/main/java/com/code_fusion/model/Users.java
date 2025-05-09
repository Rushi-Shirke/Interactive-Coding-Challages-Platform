package com.code_fusion.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "UserInfo")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column()
    private Long userId;

    @Column(nullable = false, length = 100)
    private String userName;

    @Column(unique = true, nullable = false, length = 100)
    private String userEmail;

    @Column(nullable = false, length = 100)
    private String userPassword;

    @Column(nullable = false, length = 10)
    private String role = "USER";

    @Column(nullable = false)
    private LocalDateTime joinedAt = LocalDateTime.now();

    @Column(nullable = false, length = 255)
    private String userImage = "https://example.com/default-profile.png"; // Default user image

  /*  @OneToMany(mappedBy = "createdBy")
    private List<Challenge> createdChallenges; // Challenges created by the user*/

    @OneToMany(mappedBy = "solvedBy")
    private List<Challenge> solvedChallenges; // Challenges solved by the user
}
