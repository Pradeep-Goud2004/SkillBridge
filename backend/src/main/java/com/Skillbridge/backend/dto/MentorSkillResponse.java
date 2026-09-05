package com.Skillbridge.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorSkillResponse {

    private Long id;

    private Long skillId;

    private String skillName;

    private String skillDescription;

    private String skillCategory;

    private Integer yearsOfExperience;

    private String description;
}
