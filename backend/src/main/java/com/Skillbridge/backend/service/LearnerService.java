package com.Skillbridge.backend.service;

import com.Skillbridge.backend.entity.LearnerProfile;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.repository.LearnerProfileRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class LearnerService {

    private final LearnerProfileRepository learnerProfileRepository;
    private final UserRepository userRepository;

    public LearnerService(
            LearnerProfileRepository learnerProfileRepository,
            UserRepository userRepository) {

        this.learnerProfileRepository = learnerProfileRepository;
        this.userRepository = userRepository;
    }

    public LearnerProfile getProfile(String email) {

        User user = getUserByEmail(email);

        return learnerProfileRepository.findByUser(user)
                .orElseGet(() -> createEmptyProfile(user));
    }

    public LearnerProfile updateProfile(
            String email,
            LearnerProfile profileData) {

        User user = getUserByEmail(email);

        LearnerProfile profile =
                learnerProfileRepository.findByUser(user)
                        .orElseGet(() -> createEmptyProfile(user));

        profile.setBio(profileData.getBio());
        profile.setEducation(profileData.getEducation());
        profile.setExperience(profileData.getExperience());
        profile.setLocation(profileData.getLocation());
        profile.setProfileImageUrl(profileData.getProfileImageUrl());

        return learnerProfileRepository.save(profile);
    }

    private LearnerProfile createEmptyProfile(User user) {

        LearnerProfile profile = LearnerProfile.builder()
                .user(user)
                .build();

        return learnerProfileRepository.save(profile);
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}