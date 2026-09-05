package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class SessionResponse {

    private Long id;

    private Long mentorshipRequestId;

    private String title;

    private String description;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String meetingLink;

    private String status;

    private Long mentorId;

    private String mentorName;

    private Long learnerId;

    private String learnerName;

    private LocalDateTime createdAt;
}