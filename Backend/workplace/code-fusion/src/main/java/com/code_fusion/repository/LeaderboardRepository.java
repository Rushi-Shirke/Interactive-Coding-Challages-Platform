package com.code_fusion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.code_fusion.model.Leaderboard;
import com.code_fusion.model.Users;

import java.util.List;

public interface LeaderboardRepository extends JpaRepository<Leaderboard, Long> {

	List<Leaderboard> findByUser(Users user);
}
