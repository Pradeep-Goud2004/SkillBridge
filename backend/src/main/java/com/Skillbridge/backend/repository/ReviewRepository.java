package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.Review;
import com.Skillbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findBySessionId(Long sessionId);

    boolean existsBySessionId(Long sessionId);

    List<Review> findByMentor(User mentor);

    List<Review> findByLearner(User learner);

    List<Review> findByMentorId(Long mentorId);
}
