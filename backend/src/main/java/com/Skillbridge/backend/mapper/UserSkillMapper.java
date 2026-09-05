package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.UserSkillResponse;
import com.Skillbridge.backend.entity.UserSkill;
import org.springframework.stereotype.Component;

@Component
public class UserSkillMapper {

    public UserSkillResponse toResponse(UserSkill userSkill) {

        if (userSkill == null) {
            return null;
        }

        return UserSkillResponse.builder()
                .id(userSkill.getId())
                .skillId(userSkill.getSkill().getId())
                .skillName(userSkill.getSkill().getName())
                .skillDescription(userSkill.getSkill().getDescription())
                .skillCategory(userSkill.getSkill().getCategory())
                .proficiencyLevel(userSkill.getProficiencyLevel())
                .build();
    }
}
