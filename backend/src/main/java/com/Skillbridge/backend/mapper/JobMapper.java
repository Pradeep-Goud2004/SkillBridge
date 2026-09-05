package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.JobResponse;
import com.Skillbridge.backend.entity.Job;

import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    public JobResponse toResponse(Job job) {

        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .company(job.getCompany())
                .description(job.getDescription())
                .location(job.getLocation())
                .jobType(job.getJobType())
                .experienceLevel(job.getExperienceLevel())
                .salaryRange(job.getSalaryRange())
                .requiredSkills(job.getRequiredSkills())
                .applicationUrl(job.getApplicationUrl())
                .status(job.getStatus().name())
                .postedById(job.getPostedBy().getId())
                .postedByName(job.getPostedBy().getName())
                .createdAt(job.getCreatedAt())
                .build();
    }
}