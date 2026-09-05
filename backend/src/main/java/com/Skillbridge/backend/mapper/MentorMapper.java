package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.MentorResponse;
import com.Skillbridge.backend.entity.MentorProfile;
import com.Skillbridge.backend.entity.MentorSkill;

import org.springframework.stereotype.Component;

@Component
public class MentorMapper {

    public MentorResponse toResponse(
            MentorSkill mentorSkill,
            MentorProfile mentorProfile) {

        return MentorResponse.builder()
                .mentorId(mentorSkill.getMentor().getId())
                .name(mentorSkill.getMentor().getName())
                .email(mentorSkill.getMentor().getEmail())
                .company(mentorProfile.getCompany())
                .designation(mentorProfile.getDesignation())
                .location(mentorProfile.getLocation())
                .bio(mentorProfile.getBio())
                .skill(mentorSkill.getSkill().getName())
                .yearsOfExperience(
                        mentorSkill.getYearsOfExperience()
                )
                .build();
    }
}