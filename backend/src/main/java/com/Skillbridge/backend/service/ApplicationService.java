package com.Skillbridge.backend.service;

import com.Skillbridge.backend.dto.ApplicationResponse;
import com.Skillbridge.backend.entity.Application;
import com.Skillbridge.backend.entity.Job;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.mapper.ApplicationMapper;
import com.Skillbridge.backend.repository.ApplicationRepository;
import com.Skillbridge.backend.repository.JobRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ApplicationMapper applicationMapper;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository,
            ApplicationMapper applicationMapper) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.applicationMapper = applicationMapper;
    }

    public ApplicationResponse applyForJob(
            String learnerEmail,
            Long jobId,
            String coverLetter,
            String resumeUrl) {

        User learner = getUserByEmail(learnerEmail);

        if (!"LEARNER".equalsIgnoreCase(
                learner.getRole().getName())) {

            throw new RuntimeException(
                    "Only learners can apply for jobs");
        }

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found"));

        if (job.getStatus()
                != Job.JobStatus.ACTIVE) {

            throw new RuntimeException(
                    "Cannot apply for a closed job");
        }

        if (applicationRepository
                .existsByJobIdAndApplicantId(
                        jobId,
                        learner.getId())) {

            throw new RuntimeException(
                    "You have already applied for this job");
        }

        Application application =
                Application.builder()
                        .job(job)
                        .applicant(learner)
                        .coverLetter(coverLetter)
                        .resumeUrl(resumeUrl)
                        .status(
                                Application.ApplicationStatus.PENDING
                        )
                        .build();

        Application savedApplication =
                applicationRepository.save(application);

        return applicationMapper.toResponse(
                savedApplication
        );
    }

    public List<ApplicationResponse> getMyApplications(
            String learnerEmail) {

        User learner = getUserByEmail(learnerEmail);

        return applicationRepository
                .findByApplicantOrderByAppliedAtDesc(learner)
                .stream()
                .map(applicationMapper::toResponse)
                .toList();
    }

    public List<ApplicationResponse> getJobApplications(
            String email,
            Long jobId) {

        User user = getUserByEmail(email);

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found"));

        boolean isOwner =
                job.getPostedBy().getId()
                        .equals(user.getId());

        boolean isAdmin =
                "ADMIN".equalsIgnoreCase(
                        user.getRole().getName());

        if (!isOwner && !isAdmin) {

            throw new RuntimeException(
                    "You are not authorized to view these applications");
        }

        return applicationRepository
                .findByJobIdOrderByAppliedAtDesc(jobId)
                .stream()
                .map(applicationMapper::toResponse)
                .toList();
    }

    public ApplicationResponse updateApplicationStatus(
            String email,
            Long applicationId,
            Application.ApplicationStatus status) {

        User user = getUserByEmail(email);

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"));

        Job job = application.getJob();

        boolean isOwner =
                job.getPostedBy().getId()
                        .equals(user.getId());

        boolean isAdmin =
                "ADMIN".equalsIgnoreCase(
                        user.getRole().getName());

        if (!isOwner && !isAdmin) {

            throw new RuntimeException(
                    "You are not authorized to update this application");
        }

        if (status == null) {

            throw new RuntimeException(
                    "Application status is required");
        }

        application.setStatus(status);

        Application savedApplication =
                applicationRepository.save(application);

        return applicationMapper.toResponse(
                savedApplication
        );
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }
}
