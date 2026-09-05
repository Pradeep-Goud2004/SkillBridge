package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.ApplicationResponse;
import com.Skillbridge.backend.entity.Application;
import com.Skillbridge.backend.service.ApplicationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    @PostMapping
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<ApplicationResponse> applyForJob(
            Authentication authentication,
            @RequestParam Long jobId,
            @RequestParam(required = false) String coverLetter,
            @RequestParam(required = false) String resumeUrl) {

        String learnerEmail = authentication.getName();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        applicationService.applyForJob(
                                learnerEmail,
                                jobId,
                                coverLetter,
                                resumeUrl
                        )
                );
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(
            Authentication authentication) {

        String learnerEmail = authentication.getName();

        return ResponseEntity.ok(
                applicationService.getMyApplications(
                        learnerEmail
                )
        );
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasAnyRole('MENTOR', 'ADMIN')")
    public ResponseEntity<List<ApplicationResponse>> getJobApplications(
            Authentication authentication,
            @PathVariable Long jobId) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService.getJobApplications(
                        email,
                        jobId
                )
        );
    }

    @PutMapping("/{applicationId}/status")
    @PreAuthorize("hasAnyRole('MENTOR', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(
            Authentication authentication,
            @PathVariable Long applicationId,
            @RequestParam Application.ApplicationStatus status) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                applicationService.updateApplicationStatus(
                        email,
                        applicationId,
                        status
                )
        );
    }
}
