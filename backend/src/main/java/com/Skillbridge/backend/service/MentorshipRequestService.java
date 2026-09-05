package com.Skillbridge.backend.service;

import com.Skillbridge.backend.entity.MentorshipRequest;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.repository.MentorshipRequestRepository;
import com.Skillbridge.backend.repository.UserRepository;
import com.Skillbridge.backend.service.NotificationService;
import com.Skillbridge.backend.dto.MentorshipRequestResponse;
import com.Skillbridge.backend.mapper.MentorshipRequestMapper;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentorshipRequestService {

    private final MentorshipRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final MentorshipRequestMapper requestMapper;

    public MentorshipRequestService(
            MentorshipRequestRepository requestRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            MentorshipRequestMapper requestMapper) {

        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.requestMapper = requestMapper;
    }

    // Learner sends a mentorship request
    public MentorshipRequest sendRequest(
            String learnerEmail,
            Long mentorId,
            String message) {

        User learner = getUserByEmail(learnerEmail);

        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() ->
                        new RuntimeException("Mentor not found"));

        // Make sure selected user is actually a mentor
        if (!"MENTOR".equalsIgnoreCase(
                mentor.getRole().getName())) {

            throw new RuntimeException(
                    "Selected user is not a mentor"
            );
        }

        // Learner cannot request themselves
        if (learner.getId().equals(mentor.getId())) {
            throw new RuntimeException(
                    "You cannot send a request to yourself"
            );
        }

        // Prevent duplicate pending requests
        if (requestRepository
                .existsByLearnerAndMentorAndStatus(
                        learner,
                        mentor,
                        MentorshipRequest.RequestStatus.PENDING)) {

            throw new RuntimeException(
                    "A pending request already exists"
            );
        }

        MentorshipRequest request =
                MentorshipRequest.builder()
                        .learner(learner)
                        .mentor(mentor)
                        .message(message)
                        .status(MentorshipRequest.RequestStatus.PENDING)
                        .build();

        MentorshipRequest savedRequest =
                requestRepository.save(request);

        notificationService.createNotification(
                mentor,
                learner.getName()
                        + " sent you a mentorship request."
        );

        return savedRequest;
    }

    // Learner views requests they have sent
    public List<MentorshipRequestResponse> getSentRequests(
            String learnerEmail) {

        User learner = getUserByEmail(learnerEmail);

        return requestRepository
                .findByLearner(learner)
                .stream()
                .map(requestMapper::toResponse)
                .toList();
    }

    // Mentor views requests they have received
    public List<MentorshipRequestResponse> getReceivedRequests(
            String mentorEmail) {

        User mentor = getUserByEmail(mentorEmail);

        return requestRepository
                .findByMentor(mentor)
                .stream()
                .map(requestMapper::toResponse)
                .toList();
    }

    // Mentor accepts a request
    public MentorshipRequestResponse acceptRequest(
            String mentorEmail,
            Long requestId) {

        MentorshipRequest request =
                getRequest(requestId);

        User mentor = getUserByEmail(mentorEmail);

        // Make sure this request belongs to this mentor
        if (!request.getMentor().getId()
                .equals(mentor.getId())) {

            throw new RuntimeException(
                    "You are not authorized to accept this request"
            );
        }

        if (request.getStatus()
                != MentorshipRequest.RequestStatus.PENDING) {

            throw new RuntimeException(
                    "Only pending requests can be accepted"
            );
        }

        request.setStatus(
                MentorshipRequest.RequestStatus.ACCEPTED);

        MentorshipRequest savedRequest =
                requestRepository.save(request);

        notificationService.createNotification(
                request.getLearner(),
                "Your mentorship request has been accepted by "
                        + request.getMentor().getName()
        );

        return requestMapper.toResponse(savedRequest);
    }

    // Mentor rejects a request
    public MentorshipRequestResponse rejectRequest(
            String mentorEmail,
            Long requestId) {

        MentorshipRequest request =
                getRequest(requestId);

        User mentor = getUserByEmail(mentorEmail);

        // Make sure this request belongs to this mentor
        if (!request.getMentor().getId()
                .equals(mentor.getId())) {

            throw new RuntimeException(
                    "You are not authorized to reject this request"
            );
        }

        if (request.getStatus()
                != MentorshipRequest.RequestStatus.PENDING) {

            throw new RuntimeException(
                    "Only pending requests can be rejected"
            );
        }

        request.setStatus(
                MentorshipRequest.RequestStatus.REJECTED
        );

        MentorshipRequest savedRequest =
                requestRepository.save(request);

        return requestMapper.toResponse(savedRequest);
    }

    private MentorshipRequest getRequest(
            Long requestId) {

        return requestRepository.findById(requestId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Mentorship request not found"
                        ));
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));
    }
}
