package com.Skillbridge.backend.service;

import com.Skillbridge.backend.entity.MentorSkill;
import com.Skillbridge.backend.entity.Skill;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.repository.MentorSkillRepository;
import com.Skillbridge.backend.repository.SkillRepository;
import com.Skillbridge.backend.repository.UserRepository;
import com.Skillbridge.backend.dto.MentorResponse;
import com.Skillbridge.backend.entity.MentorProfile;
import com.Skillbridge.backend.mapper.MentorMapper;
import com.Skillbridge.backend.repository.MentorProfileRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentorSkillService {

    private final MentorSkillRepository mentorSkillRepository;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;
    private final MentorProfileRepository mentorProfileRepository;
    private final MentorMapper mentorMapper;

    public MentorSkillService(
            MentorSkillRepository mentorSkillRepository,
            SkillRepository skillRepository,
            UserRepository userRepository,
            MentorProfileRepository mentorProfileRepository,
            MentorMapper mentorMapper) {

        this.mentorSkillRepository = mentorSkillRepository;
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
        this.mentorProfileRepository = mentorProfileRepository;
        this.mentorMapper = mentorMapper;
    }

    public List<MentorSkill> getMySkills(String email) {

        User mentor = getUserByEmail(email);

        return mentorSkillRepository.findByMentor(mentor);
    }

    public MentorSkill addSkill(
            String email,
            Long skillId,
            Integer yearsOfExperience,
            String description) {

        User mentor = getUserByEmail(email);

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new RuntimeException("Skill not found"));

        if (mentorSkillRepository.existsByMentorAndSkillId(
                mentor, skillId)) {

            throw new RuntimeException(
                    "This skill is already added to your profile"
            );
        }

        if (yearsOfExperience == null || yearsOfExperience < 0) {
            throw new RuntimeException(
                    "Years of experience cannot be negative"
            );
        }

        MentorSkill mentorSkill = MentorSkill.builder()
                .mentor(mentor)
                .skill(skill)
                .yearsOfExperience(yearsOfExperience)
                .description(description)
                .build();

        return mentorSkillRepository.save(mentorSkill);
    }

    public void removeSkill(
            String email,
            Long skillId) {

        User mentor = getUserByEmail(email);

        MentorSkill mentorSkill =
                mentorSkillRepository
                        .findByMentorAndSkillId(
                                mentor,
                                skillId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Skill not found in your profile"
                                ));

        mentorSkillRepository.delete(mentorSkill);
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    public List<MentorResponse> searchMentorsBySkill(
            String skillName) {

        List<MentorSkill> mentorSkills =
                mentorSkillRepository
                        .findBySkillNameIgnoreCase(skillName);

        return mentorSkills.stream()
                .map(mentorSkill -> {

                    MentorProfile mentorProfile =
                            mentorProfileRepository
                                    .findByUser(
                                            mentorSkill.getMentor()
                                    )
                                    .orElse(null);

                    if (mentorProfile == null) {
                        mentorProfile = MentorProfile.builder()
                                .user(mentorSkill.getMentor())
                                .build();
                    }

                    return mentorMapper.toResponse(
                            mentorSkill,
                            mentorProfile
                    );
                })
                .toList();
    }
}
