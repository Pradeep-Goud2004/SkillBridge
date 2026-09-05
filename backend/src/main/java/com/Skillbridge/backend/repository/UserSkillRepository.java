package com.Skillbridge.backend.repository;

import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.entity.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSkillRepository
        extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUser(User user);

    Optional<UserSkill> findByUserAndSkillId(
            User user,
            Long skillId
    );

    boolean existsByUserAndSkillId(
            User user,
            Long skillId
    );
}