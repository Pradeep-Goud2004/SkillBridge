package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.MentorProfile;
import com.Skillbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentorProfileRepository
        extends JpaRepository<MentorProfile, Long> {

    Optional<MentorProfile> findByUser(User user);

    Optional<MentorProfile> findByUserId(Long userId);
}