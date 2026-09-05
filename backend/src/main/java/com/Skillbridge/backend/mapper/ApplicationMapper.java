package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.ApplicationResponse;
import com.Skillbridge.backend.entity.Application;

import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    public ApplicationResponse toResponse(
            Application application) {

        return ApplicationResponse.builder()
                .id(application.getId())

                .jobId(
                        application.getJob().getId()
                )

                .jobTitle(
                        application.getJob().getTitle()
                )

                .company(
                        application.getJob().getCompany()
                )

                .applicantId(
                        application.getApplicant().getId()
                )

                .applicantName(
                        application.getApplicant().getName()
                )

                .applicantEmail(
                        application.getApplicant().getEmail()
                )

                .coverLetter(
                        application.getCoverLetter()
                )

                .resumeUrl(
                        application.getResumeUrl()
                )

                .status(
                        application.getStatus().name()
                )

                .appliedAt(
                        application.getAppliedAt()
                )

                .build();
    }
}