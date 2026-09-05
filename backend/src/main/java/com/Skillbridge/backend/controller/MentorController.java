package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.MentorProfileResponse;
import com.Skillbridge.backend.dto.MentorResponse;
import com.Skillbridge.backend.dto.MentorSkillResponse;
import com.Skillbridge.backend.entity.MentorProfile;
import com.Skillbridge.backend.entity.MentorSkill;
import com.Skillbridge.backend.mapper.MentorProfileMapper;
import com.Skillbridge.backend.mapper.MentorSkillMapper;
import com.Skillbridge.backend.service.MentorService;
import com.Skillbridge.backend.service.MentorSkillService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    private final MentorService mentorService;
    private final MentorSkillService mentorSkillService;
    private final MentorProfileMapper mentorProfileMapper;
    private final MentorSkillMapper mentorSkillMapper;

    public MentorController(
            MentorService mentorService,
            MentorSkillService mentorSkillService,
            MentorProfileMapper mentorProfileMapper,
            MentorSkillMapper mentorSkillMapper) {

        this.mentorService = mentorService;
        this.mentorSkillService = mentorSkillService;
        this.mentorProfileMapper = mentorProfileMapper;
        this.mentorSkillMapper = mentorSkillMapper;
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR')")
    public ResponseEntity<List<MentorResponse>> searchMentors(
            @RequestParam String skill) {

        return ResponseEntity.ok(
                mentorSkillService.searchMentorsBySkill(skill)
        );
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<MentorProfileResponse> getMyProfile(
            Authentication authentication) {

        MentorProfile profile =
                mentorService.getProfile(authentication.getName());

        return ResponseEntity.ok(
                mentorProfileMapper.toResponse(profile)
        );
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<MentorProfileResponse> updateMyProfile(
            Authentication authentication,
            @RequestBody MentorProfile profile) {

        MentorProfile updatedProfile =
                mentorService.updateProfile(
                        authentication.getName(),
                        profile
                );

        return ResponseEntity.ok(
                mentorProfileMapper.toResponse(updatedProfile)
        );
    }

    @GetMapping("/my-skills")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<List<MentorSkillResponse>> getMySkills(
            Authentication authentication) {

        List<MentorSkill> skills =
                mentorSkillService.getMySkills(authentication.getName());

        return ResponseEntity.ok(
                skills.stream()
                        .map(mentorSkillMapper::toResponse)
                        .toList()
        );
    }

    @PostMapping("/my-skills")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<MentorSkillResponse> addSkill(
            Authentication authentication,
            @RequestParam Long skillId,
            @RequestParam Integer yearsOfExperience,
            @RequestParam(required = false) String description) {

        MentorSkill mentorSkill =
                mentorSkillService.addSkill(
                        authentication.getName(),
                        skillId,
                        yearsOfExperience,
                        description
                );

        return ResponseEntity.ok(
                mentorSkillMapper.toResponse(mentorSkill)
        );
    }

    @DeleteMapping("/my-skills/{skillId}")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<Void> removeSkill(
            Authentication authentication,
            @PathVariable Long skillId) {

        mentorSkillService.removeSkill(
                authentication.getName(),
                skillId
        );

        return ResponseEntity.noContent().build();
    }
}