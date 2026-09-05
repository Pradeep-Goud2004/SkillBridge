package com.Skillbridge.backend.service;

import com.Skillbridge.backend.dto.JobResponse;
import com.Skillbridge.backend.entity.Job;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.mapper.JobMapper;
import com.Skillbridge.backend.repository.JobRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobMapper jobMapper;

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository,
            JobMapper jobMapper) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.jobMapper = jobMapper;
    }

    public JobResponse createJob(
            String email,
            Job jobData) {

        User user = getUserByEmail(email);

        String role = user.getRole().getName();

        if (!"MENTOR".equalsIgnoreCase(role)
                && !"ADMIN".equalsIgnoreCase(role)) {

            throw new RuntimeException(
                    "Only mentors and admins can post jobs");
        }

        Job job = Job.builder()
                .postedBy(user)
                .title(jobData.getTitle())
                .company(jobData.getCompany())
                .description(jobData.getDescription())
                .location(jobData.getLocation())
                .jobType(jobData.getJobType())
                .experienceLevel(jobData.getExperienceLevel())
                .salaryRange(jobData.getSalaryRange())
                .requiredSkills(jobData.getRequiredSkills())
                .applicationUrl(jobData.getApplicationUrl())
                .status(Job.JobStatus.ACTIVE)
                .build();

        Job savedJob = jobRepository.save(job);

        return jobMapper.toResponse(savedJob);
    }

    public List<JobResponse> getActiveJobs() {

        return jobRepository
                .findByStatusOrderByCreatedAtDesc(
                        Job.JobStatus.ACTIVE)
                .stream()
                .map(jobMapper::toResponse)
                .toList();
    }

    public JobResponse getJobById(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        return jobMapper.toResponse(job);
    }

    public List<JobResponse> getMyJobs(
            String email) {

        User user = getUserByEmail(email);

        return jobRepository
                .findByPostedByOrderByCreatedAtDesc(user)
                .stream()
                .map(jobMapper::toResponse)
                .toList();
    }

    public JobResponse closeJob(
            String email,
            Long jobId) {

        User user = getUserByEmail(email);

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (!job.getPostedBy().getId()
                .equals(user.getId())) {

            if (!"ADMIN".equalsIgnoreCase(
                    user.getRole().getName())) {

                throw new RuntimeException(
                        "You are not authorized to close this job");
            }
        }

        if (job.getStatus()
                == Job.JobStatus.CLOSED) {

            throw new RuntimeException(
                    "Job is already closed");
        }

        job.setStatus(Job.JobStatus.CLOSED);

        Job savedJob = jobRepository.save(job);

        return jobMapper.toResponse(savedJob);
    }

    public List<JobResponse> searchJobs(
            String keyword) {

        return jobRepository
                .findByTitleContainingIgnoreCase(keyword)
                .stream()
                .filter(job ->
                        job.getStatus()
                                == Job.JobStatus.ACTIVE)
                .map(jobMapper::toResponse)
                .toList();
    }

    private User getUserByEmail(
            String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }
}
