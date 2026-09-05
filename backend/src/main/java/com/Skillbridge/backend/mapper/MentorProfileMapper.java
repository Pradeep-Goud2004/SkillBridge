package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.MentorProfileResponse;
import com.Skillbridge.backend.entity.MentorProfile;
import org.springframework.stereotype.Component;

@Component
public class MentorProfileMapper {

    public MentorProfileResponse toResponse(MentorProfile profile) {

        if (profile == null) {
            return null;
        }

        return MentorProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .name(profile.getUser().getName())
                .email(profile.getUser().getEmail())
                .phone(profile.getUser().getPhone())
                .bio(profile.getBio())
                .experience(profile.getExperience())
                .company(profile.getCompany())
                .designation(profile.getDesignation())
                .location(profile.getLocation())
                .profileImageUrl(profile.getProfileImageUrl())
                .linkedinUrl(profile.getLinkedinUrl())
                .githubUrl(profile.getGithubUrl())
                .build();
    }
}
