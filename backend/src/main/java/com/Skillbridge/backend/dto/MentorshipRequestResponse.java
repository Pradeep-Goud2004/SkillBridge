package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class MentorshipRequestResponse {

    private Long id;

    private Long learnerId;
    private String learnerName;

    private Long mentorId;
    private String mentorName;

    private String message;

    private String status;

    private LocalDateTime createdAt;
}