package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.LearnerProfileResponse;
import com.Skillbridge.backend.entity.LearnerProfile;
import com.Skillbridge.backend.mapper.LearnerProfileMapper;
import com.Skillbridge.backend.service.LearnerService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/learners")
@PreAuthorize("hasRole('LEARNER')")
public class LearnerController {

    private final LearnerService learnerService;
    private final LearnerProfileMapper learnerProfileMapper;

    public LearnerController(
            LearnerService learnerService,
            LearnerProfileMapper learnerProfileMapper) {

        this.learnerService = learnerService;
        this.learnerProfileMapper = learnerProfileMapper;
    }

    @GetMapping("/me")
    public ResponseEntity<LearnerProfileResponse> getMyProfile(
            Authentication authentication) {

        LearnerProfile profile =
                learnerService.getProfile(authentication.getName());

        return ResponseEntity.ok(
                learnerProfileMapper.toResponse(profile)
        );
    }

    @PutMapping("/me")
    public ResponseEntity<LearnerProfileResponse> updateMyProfile(
            Authentication authentication,
            @RequestBody LearnerProfile profile) {

        LearnerProfile updatedProfile =
                learnerService.updateProfile(
                        authentication.getName(),
                        profile
                );

        return ResponseEntity.ok(
                learnerProfileMapper.toResponse(updatedProfile)
        );
    }
}