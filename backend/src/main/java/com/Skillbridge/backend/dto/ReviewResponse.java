package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ReviewResponse {

    private Long id;

    private Long sessionId;

    private Long learnerId;
    private String learnerName;

    private Long mentorId;
    private String mentorName;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;
}
