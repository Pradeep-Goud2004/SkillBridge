package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.UserSkillResponse;
import com.Skillbridge.backend.entity.Skill;
import com.Skillbridge.backend.entity.UserSkill;
import com.Skillbridge.backend.mapper.UserSkillMapper;
import com.Skillbridge.backend.service.SkillService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;
    private final UserSkillMapper userSkillMapper;

    public SkillController(
            SkillService skillService,
            UserSkillMapper userSkillMapper) {

        this.skillService = skillService;
        this.userSkillMapper = userSkillMapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR', 'ADMIN')")
    public ResponseEntity<List<Skill>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Skill> createSkill(
            @RequestBody Skill skill) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(skillService.createSkill(skill));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<List<UserSkillResponse>> getMySkills(
            Authentication authentication) {

        List<UserSkill> skills =
                skillService.getMySkills(authentication.getName());

        return ResponseEntity.ok(
                skills.stream()
                        .map(userSkillMapper::toResponse)
                        .toList()
        );
    }

    @PostMapping("/my/{skillId}")
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<UserSkillResponse> addSkill(
            Authentication authentication,
            @PathVariable Long skillId,
            @RequestParam String proficiencyLevel) {

        UserSkill userSkill =
                skillService.addSkill(
                        authentication.getName(),
                        skillId,
                        proficiencyLevel
                );

        return ResponseEntity.ok(
                userSkillMapper.toResponse(userSkill)
        );
    }

    @DeleteMapping("/my/{skillId}")
    @PreAuthorize("hasRole('LEARNER')")
    public ResponseEntity<Void> removeSkill(
            Authentication authentication,
            @PathVariable Long skillId) {

        skillService.removeSkill(
                authentication.getName(),
                skillId
        );

        return ResponseEntity.noContent().build();
    }
}