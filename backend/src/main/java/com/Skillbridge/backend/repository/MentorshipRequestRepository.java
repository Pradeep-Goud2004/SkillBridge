package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.MentorshipRequest;
import com.Skillbridge.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorshipRequestRepository
        extends JpaRepository<MentorshipRequest, Long> {

    List<MentorshipRequest> findByLearner(User learner);

    List<MentorshipRequest> findByMentor(User mentor);

    List<MentorshipRequest> findByMentorAndStatus(
            User mentor,
            MentorshipRequest.RequestStatus status
    );

    boolean existsByLearnerAndMentorAndStatus(
            User learner,
            User mentor,
            MentorshipRequest.RequestStatus status
    );
}
