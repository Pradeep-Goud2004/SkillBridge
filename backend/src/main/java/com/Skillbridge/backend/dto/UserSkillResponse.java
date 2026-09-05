package com.Skillbridge.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSkillResponse {

    private Long id;

    private Long skillId;

    private String skillName;

    private String skillDescription;

    private String skillCategory;

    private String proficiencyLevel;
}