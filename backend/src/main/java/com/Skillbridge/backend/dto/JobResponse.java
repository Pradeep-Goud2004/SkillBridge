package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class JobResponse {

    private Long id;

    private String title;

    private String company;

    private String description;

    private String location;

    private String jobType;

    private String experienceLevel;

    private String salaryRange;

    private String requiredSkills;

    private String applicationUrl;

    private String status;

    private Long postedById;

    private String postedByName;

    private LocalDateTime createdAt;
}