package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.ReviewResponse;
import com.Skillbridge.backend.service.ReviewService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<ReviewResponse> createReview(
            Authentication authentication,
            @RequestParam Long sessionId,
            @RequestParam
            @Min(value = 1, message = "Rating must be at least 1")
            @Max(value = 5, message = "Rating cannot exceed 5") Integer rating,
            @RequestParam(required = false) String comment) {

        String learnerEmail = authentication.getName();

        ReviewResponse response =
                reviewService.createReview(
                        learnerEmail,
                        sessionId,
                        rating,
                        comment
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/mentor/{mentorId}")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR')")
    public ResponseEntity<List<ReviewResponse>> getMentorReviews(
            @PathVariable Long mentorId) {

        return ResponseEntity.ok(
                reviewService.getMentorReviews(mentorId)
        );
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<List<ReviewResponse>> getMyReviews(
            Authentication authentication) {

        String learnerEmail = authentication.getName();

        return ResponseEntity.ok(
                reviewService.getMyReviews(learnerEmail)
        );
    }
}