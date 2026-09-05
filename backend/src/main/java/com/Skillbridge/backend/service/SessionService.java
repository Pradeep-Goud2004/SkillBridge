package com.Skillbridge.backend.service;

import com.Skillbridge.backend.dto.SessionResponse;
import com.Skillbridge.backend.entity.MentorshipRequest;
import com.Skillbridge.backend.entity.Session;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.mapper.SessionMapper;
import com.Skillbridge.backend.repository.MentorshipRequestRepository;
import com.Skillbridge.backend.repository.SessionRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final MentorshipRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final SessionMapper sessionMapper;
    private final NotificationService notificationService;

    public SessionService(
            SessionRepository sessionRepository,
            MentorshipRequestRepository requestRepository,
            UserRepository userRepository,
            SessionMapper sessionMapper,
            NotificationService notificationService) {

        this.sessionRepository = sessionRepository;
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.sessionMapper = sessionMapper;
        this.notificationService = notificationService;
    }

    public SessionResponse createSession(
            String mentorEmail,
            Long mentorshipRequestId,
            String title,
            String description,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String meetingLink) {

        User mentor = getUserByEmail(mentorEmail);

        MentorshipRequest request =
                requestRepository.findById(mentorshipRequestId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Mentorship request not found"));

        if (!request.getMentor().getId()
                .equals(mentor.getId())) {

            throw new RuntimeException(
                    "You are not authorized to create a session");
        }

        if (request.getStatus()
                != MentorshipRequest.RequestStatus.ACCEPTED) {

            throw new RuntimeException(
                    "Session can only be created for an accepted mentorship");
        }

        if (title == null || title.isBlank()) {

            throw new RuntimeException(
                    "Session title is required");
        }

        if (startTime == null || endTime == null) {

            throw new RuntimeException(
                    "Start time and end time are required");
        }

        if (!endTime.isAfter(startTime)) {

            throw new RuntimeException(
                    "End time must be after start time");
        }

        if (startTime.isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Session cannot be scheduled in the past");
        }

        Session session = Session.builder()
                .mentorshipRequest(request)
                .title(title)
                .description(description)
                .startTime(startTime)
                .endTime(endTime)
                .meetingLink(meetingLink)
                .status(Session.SessionStatus.SCHEDULED)
                .build();

        Session savedSession =
                sessionRepository.save(session);

        notificationService.createNotification(
                request.getLearner(),
                "Your session \"" + title
                        + "\" has been scheduled by "
                        + request.getMentor().getName()
        );

        return sessionMapper.toResponse(savedSession);
    }

    public List<SessionResponse> getLearnerSessions(
            String learnerEmail) {

        User learner = getUserByEmail(learnerEmail);

        return sessionRepository
                .findByMentorshipRequestLearnerId(
                        learner.getId())
                .stream()
                .map(sessionMapper::toResponse)
                .toList();
    }

    public List<SessionResponse> getMentorSessions(
            String mentorEmail) {

        User mentor = getUserByEmail(mentorEmail);

        return sessionRepository
                .findByMentorshipRequestMentorId(
                        mentor.getId())
                .stream()
                .map(sessionMapper::toResponse)
                .toList();
    }

    public SessionResponse cancelSession(
            String email,
            Long sessionId) {

        User user = getUserByEmail(email);

        Session session =
                sessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Session not found"));

        MentorshipRequest request =
                session.getMentorshipRequest();

        boolean isMentor =
                request.getMentor().getId()
                        .equals(user.getId());

        boolean isLearner =
                request.getLearner().getId()
                        .equals(user.getId());

        if (!isMentor && !isLearner) {

            throw new RuntimeException(
                    "You are not authorized to cancel this session");
        }

        if (session.getStatus()
                != Session.SessionStatus.SCHEDULED) {

            throw new RuntimeException(
                    "Only scheduled sessions can be cancelled");
        }

        session.setStatus(
                Session.SessionStatus.CANCELLED);

        Session savedSession =
                sessionRepository.save(session);

        notificationService.createNotification(
                request.getLearner(),
                "Your session \"" + session.getTitle()
                        + "\" has been cancelled."
        );

        return sessionMapper.toResponse(savedSession);
    }

    public SessionResponse completeSession(
            String mentorEmail,
            Long sessionId) {

        User mentor = getUserByEmail(mentorEmail);

        Session session =
                sessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Session not found"));

        MentorshipRequest request =
                session.getMentorshipRequest();

        if (!request.getMentor().getId()
                .equals(mentor.getId())) {

            throw new RuntimeException(
                    "You are not authorized to complete this session");
        }

        if (session.getStatus()
                != Session.SessionStatus.SCHEDULED) {

            throw new RuntimeException(
                    "Only scheduled sessions can be completed");
        }

        session.setStatus(
                Session.SessionStatus.COMPLETED);

        Session savedSession =
                sessionRepository.save(session);

        notificationService.createNotification(
                request.getLearner(),
                "Your session \"" + session.getTitle()
                        + "\" has been completed. "
                        + "You can now leave a review for your mentor."
        );

        return sessionMapper.toResponse(savedSession);
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }
}