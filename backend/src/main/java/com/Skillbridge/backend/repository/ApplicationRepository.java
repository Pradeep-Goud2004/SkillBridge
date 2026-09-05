package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.Application;
import com.Skillbridge.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    List<Application> findByApplicantOrderByAppliedAtDesc(
            User applicant
    );

    List<Application> findByJobIdOrderByAppliedAtDesc(
            Long jobId
    );

    List<Application> findByJobPostedByOrderByAppliedAtDesc(
            User postedBy
    );

    boolean existsByJobIdAndApplicantId(
            Long jobId,
            Long applicantId
    );
}
