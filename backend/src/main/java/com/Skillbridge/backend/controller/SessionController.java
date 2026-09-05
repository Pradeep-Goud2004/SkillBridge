package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.SessionResponse;
import com.Skillbridge.backend.service.SessionService;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<SessionResponse> createSession(
            Authentication authentication,

            @RequestParam Long mentorshipRequestId,

            @RequestParam
            String title,

            @RequestParam(required = false)
            String description,

            @RequestParam
            String startTime,

            @RequestParam
            String endTime,

            @RequestParam(required = false)
            String meetingLink) {

        String mentorEmail =
                authentication.getName();

        LocalDateTime start =
                LocalDateTime.parse(startTime);

        LocalDateTime end =
                LocalDateTime.parse(endTime);

        SessionResponse response =
                sessionService.createSession(
                        mentorEmail,
                        mentorshipRequestId,
                        title,
                        description,
                        start,
                        end,
                        meetingLink
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/learner")
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<List<SessionResponse>> getLearnerSessions(
            Authentication authentication) {

        String learnerEmail =
                authentication.getName();

        return ResponseEntity.ok(
                sessionService.getLearnerSessions(
                        learnerEmail
                )
        );
    }

    @GetMapping("/mentor")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<List<SessionResponse>> getMentorSessions(
            Authentication authentication) {

        String mentorEmail =
                authentication.getName();

        return ResponseEntity.ok(
                sessionService.getMentorSessions(
                        mentorEmail
                )
        );
    }

    @PutMapping("/{sessionId}/cancel")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR')")
    public ResponseEntity<SessionResponse> cancelSession(
            Authentication authentication,
            @PathVariable Long sessionId) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                sessionService.cancelSession(
                        email,
                        sessionId
                )
        );
    }

    @PutMapping("/{sessionId}/complete")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<SessionResponse> completeSession(
            Authentication authentication,
            @PathVariable Long sessionId) {

        String mentorEmail =
                authentication.getName();

        return ResponseEntity.ok(
                sessionService.completeSession(
                        mentorEmail,
                        sessionId
                )
        );
    }
}