package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.LearnerProfileResponse;
import com.Skillbridge.backend.entity.LearnerProfile;
import org.springframework.stereotype.Component;

@Component
public class LearnerProfileMapper {

    public LearnerProfileResponse toResponse(LearnerProfile profile) {

        if (profile == null) {
            return null;
        }

        return LearnerProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .name(profile.getUser().getName())
                .email(profile.getUser().getEmail())
                .phone(profile.getUser().getPhone())
                .bio(profile.getBio())
                .education(profile.getEducation())
                .experience(profile.getExperience())
                .location(profile.getLocation())
                .profileImageUrl(profile.getProfileImageUrl())
                .build();
    }
}
