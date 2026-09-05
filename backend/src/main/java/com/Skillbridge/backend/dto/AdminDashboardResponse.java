package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalUsers;
    private long totalLearners;
    private long totalMentors;
    private long totalAdmins;
    private long totalJobs;
    private long activeJobs;
    private long closedJobs;
}
