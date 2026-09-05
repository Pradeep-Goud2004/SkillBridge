package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.Session;
import com.Skillbridge.backend.entity.MentorshipRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository
        extends JpaRepository<Session, Long> {

    List<Session> findByMentorshipRequest(
            MentorshipRequest mentorshipRequest
    );

    List<Session> findByMentorshipRequestMentorId(
            Long mentorId
    );

    List<Session> findByMentorshipRequestLearnerId(
            Long learnerId
    );
}
