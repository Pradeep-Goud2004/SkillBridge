package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.entity.MentorshipRequest;
import com.Skillbridge.backend.service.MentorshipRequestService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.Skillbridge.backend.dto.MentorshipRequestResponse;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentorship-requests")
public class MentorshipRequestController {

    private final MentorshipRequestService requestService;

    public MentorshipRequestController(
            MentorshipRequestService requestService) {

        this.requestService = requestService;
    }

    // Learner sends a request to a mentor
    @PostMapping
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<MentorshipRequest> sendRequest(
            Authentication authentication,
            @RequestParam Long mentorId,
            @RequestParam(required = false) String message) {

        String learnerEmail = authentication.getName();

        MentorshipRequest request =
                requestService.sendRequest(
                        learnerEmail,
                        mentorId,
                        message
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(request);
    }

    // Learner views requests they sent
    @GetMapping("/sent")
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<List<MentorshipRequestResponse>> getSentRequests(
            Authentication authentication) {

        String learnerEmail = authentication.getName();

        return ResponseEntity.ok(
                requestService.getSentRequests(learnerEmail)
        );
    }

    // Mentor views requests they received
    @GetMapping("/received")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<List<MentorshipRequestResponse>> getReceivedRequests(
            Authentication authentication) {

        String mentorEmail = authentication.getName();

        return ResponseEntity.ok(
                requestService.getReceivedRequests(mentorEmail)
        );
    }

    // Mentor accepts request
    @PutMapping("/{requestId}/accept")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<MentorshipRequestResponse> acceptRequest(
            Authentication authentication,
            @PathVariable Long requestId) {

        String mentorEmail = authentication.getName();

        return ResponseEntity.ok(
                requestService.acceptRequest(
                        mentorEmail,
                        requestId
                )
        );
    }

    // Mentor rejects request
    @PutMapping("/{requestId}/reject")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<MentorshipRequestResponse> rejectRequest(
            Authentication authentication,
            @PathVariable Long requestId) {

        String mentorEmail = authentication.getName();

        return ResponseEntity.ok(
                requestService.rejectRequest(
                        mentorEmail,
                        requestId
                )
        );
    }
}
