package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.JobResponse;
import com.Skillbridge.backend.entity.Job;
import com.Skillbridge.backend.service.JobService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('MENTOR', 'ADMIN')")
    public ResponseEntity<JobResponse> createJob(
            Authentication authentication,
             @Valid @RequestBody Job jobData) {

        String email = authentication.getName();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(jobService.createJob(
                        email,
                        jobData
                ));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR', 'ADMIN')")
    public ResponseEntity<List<JobResponse>> getActiveJobs() {

        return ResponseEntity.ok(
                jobService.getActiveJobs()
        );
    }

    @GetMapping("/{jobId}")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR', 'ADMIN')")
    public ResponseEntity<JobResponse> getJobById(
            @PathVariable Long jobId) {

        return ResponseEntity.ok(
                jobService.getJobById(jobId)
        );
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('MENTOR', 'ADMIN')")
    public ResponseEntity<List<JobResponse>> getMyJobs(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                jobService.getMyJobs(email)
        );
    }

    @PutMapping("/{jobId}/close")
    @PreAuthorize("hasAnyRole('MENTOR', 'ADMIN')")
    public ResponseEntity<JobResponse> closeJob(
            Authentication authentication,
            @PathVariable Long jobId) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                jobService.closeJob(
                        email,
                        jobId
                )
        );
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR', 'ADMIN')")
    public ResponseEntity<List<JobResponse>> searchJobs(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                jobService.searchJobs(keyword)
        );
    }
}
