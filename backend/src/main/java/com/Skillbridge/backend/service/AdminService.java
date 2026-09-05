package com.Skillbridge.backend.service;

import com.Skillbridge.backend.dto.AdminDashboardResponse;
import com.Skillbridge.backend.dto.AdminUserResponse;
import com.Skillbridge.backend.entity.Job;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.repository.JobRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public AdminService(
            UserRepository userRepository,
            JobRepository jobRepository) {

        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public AdminDashboardResponse getDashboard() {

        long totalUsers = userRepository.count();

        long totalLearners =
                userRepository.findByRoleName("LEARNER").size();

        long totalMentors =
                userRepository.findByRoleName("MENTOR").size();

        long totalAdmins =
                userRepository.findByRoleName("ADMIN").size();

        long totalJobs = jobRepository.count();

        long activeJobs =
                jobRepository
                        .findByStatusOrderByCreatedAtDesc(
                                Job.JobStatus.ACTIVE
                        )
                        .size();

        long closedJobs =
                jobRepository
                        .findByStatusOrderByCreatedAtDesc(
                                Job.JobStatus.CLOSED
                        )
                        .size();

        return new AdminDashboardResponse(
                totalUsers,
                totalLearners,
                totalMentors,
                totalAdmins,
                totalJobs,
                activeJobs,
                closedJobs
        );
    }

    public List<AdminUserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new AdminUserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getRole().getName(),
                        user.getCreatedAt()
                ))
                .toList();
    }

    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        userRepository.delete(user);
    }

    public void closeJob(Long jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        job.setStatus(Job.JobStatus.CLOSED);

        jobRepository.save(job);
    }
}
