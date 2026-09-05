package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.Job;
import com.Skillbridge.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository
        extends JpaRepository<Job, Long> {

    List<Job> findByStatusOrderByCreatedAtDesc(
            Job.JobStatus status
    );

    List<Job> findByPostedByOrderByCreatedAtDesc(
            User postedBy
    );

    List<Job> findByCompanyIgnoreCase(
            String company
    );

    List<Job> findByLocationIgnoreCase(
            String location
    );

    List<Job> findByTitleContainingIgnoreCase(
            String title
    );
}
