package com.Skillbridge.backend.service;

import com.Skillbridge.backend.entity.Skill;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.entity.UserSkill;
import com.Skillbridge.backend.repository.SkillRepository;
import com.Skillbridge.backend.repository.UserRepository;
import com.Skillbridge.backend.repository.UserSkillRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;
    private final UserRepository userRepository;

    public SkillService(
            SkillRepository skillRepository,
            UserSkillRepository userSkillRepository,
            UserRepository userRepository) {

        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
        this.userRepository = userRepository;
    }

    // Get all available skills
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Create a new skill
    public Skill createSkill(Skill skill) {

        if (skillRepository.existsByNameIgnoreCase(skill.getName())) {
            throw new RuntimeException("Skill already exists");
        }

        return skillRepository.save(skill);
    }

    // Get logged-in user's skills
    public List<UserSkill> getMySkills(String email) {

        User user = getUserByEmail(email);

        return userSkillRepository.findByUser(user);
    }

    // Add skill to logged-in user
    public UserSkill addSkill(
            String email,
            Long skillId,
            String proficiencyLevel) {

        User user = getUserByEmail(email);

        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() ->
                        new RuntimeException("Skill not found"));

        if (userSkillRepository.existsByUserAndSkillId(
                user, skillId)) {

            throw new RuntimeException(
                    "Skill already added to your profile"
            );
        }

        UserSkill userSkill = UserSkill.builder()
                .user(user)
                .skill(skill)
                .proficiencyLevel(proficiencyLevel.toUpperCase())
                .build();

        return userSkillRepository.save(userSkill);
    }

    // Remove skill from logged-in user
    public void removeSkill(
            String email,
            Long skillId) {

        User user = getUserByEmail(email);

        UserSkill userSkill =
                userSkillRepository
                        .findByUserAndSkillId(user, skillId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Skill not found in your profile"
                                ));

        userSkillRepository.delete(userSkill);
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}
