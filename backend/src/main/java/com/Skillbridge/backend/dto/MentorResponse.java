package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MentorResponse {

    private Long mentorId;

    private String name;

    private String email;

    private String company;

    private String designation;

    private String location;

    private String bio;

    private String skill;

    private Integer yearsOfExperience;
}
