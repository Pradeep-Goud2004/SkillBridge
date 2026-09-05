package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ApplicationResponse {

    private Long id;

    private Long jobId;

    private String jobTitle;

    private String company;

    private Long applicantId;

    private String applicantName;

    private String applicantEmail;

    private String coverLetter;

    private String resumeUrl;

    private String status;

    private LocalDateTime appliedAt;
}