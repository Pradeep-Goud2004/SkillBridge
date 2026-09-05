package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.LearnerProfile;
import com.Skillbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LearnerProfileRepository extends JpaRepository<LearnerProfile,Long> {
    Optional<LearnerProfile> findByUser(User user);
    Optional<LearnerProfile> findByUserId(Long userId);
}
