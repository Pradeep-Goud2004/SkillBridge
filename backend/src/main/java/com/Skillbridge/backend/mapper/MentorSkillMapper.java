package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.MentorSkillResponse;
import com.Skillbridge.backend.entity.MentorSkill;
import org.springframework.stereotype.Component;

@Component
public class MentorSkillMapper {

    public MentorSkillResponse toResponse(MentorSkill mentorSkill) {

        if (mentorSkill == null) {
            return null;
        }

        return MentorSkillResponse.builder()
                .id(mentorSkill.getId())
                .skillId(mentorSkill.getSkill().getId())
                .skillName(mentorSkill.getSkill().getName())
                .skillDescription(mentorSkill.getSkill().getDescription())
                .skillCategory(mentorSkill.getSkill().getCategory())
                .yearsOfExperience(mentorSkill.getYearsOfExperience())
                .description(mentorSkill.getDescription())
                .build();
    }
}