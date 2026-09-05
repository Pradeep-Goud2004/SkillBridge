package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.MentorSkill;
import com.Skillbridge.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentorSkillRepository
        extends JpaRepository<MentorSkill, Long> {

    List<MentorSkill> findByMentor(User mentor);

    Optional<MentorSkill> findByMentorAndSkillId(
            User mentor,
            Long skillId
    );

    boolean existsByMentorAndSkillId(
            User mentor,
            Long skillId
    );

    List<MentorSkill> findBySkillId(Long skillId);

    List<MentorSkill> findBySkillNameIgnoreCase(String skillName);
}
