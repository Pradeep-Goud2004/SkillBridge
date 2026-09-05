package com.Skillbridge.backend.service;

import com.Skillbridge.backend.entity.MentorProfile;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.repository.MentorProfileRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class MentorService {

    private final MentorProfileRepository mentorProfileRepository;
    private final UserRepository userRepository;

    public MentorService(
            MentorProfileRepository mentorProfileRepository,
            UserRepository userRepository) {

        this.mentorProfileRepository = mentorProfileRepository;
        this.userRepository = userRepository;
    }

    public MentorProfile getProfile(String email) {

        User user = getUserByEmail(email);

        return mentorProfileRepository.findByUser(user)
                .orElseGet(() -> createEmptyProfile(user));
    }

    public MentorProfile updateProfile(
            String email,
            MentorProfile profileData) {

        User user = getUserByEmail(email);

        MentorProfile profile =
                mentorProfileRepository.findByUser(user)
                        .orElseGet(() -> createEmptyProfile(user));

        profile.setBio(profileData.getBio());
        profile.setExperience(profileData.getExperience());
        profile.setCompany(profileData.getCompany());
        profile.setDesignation(profileData.getDesignation());
        profile.setLocation(profileData.getLocation());
        profile.setProfileImageUrl(profileData.getProfileImageUrl());
        profile.setLinkedinUrl(profileData.getLinkedinUrl());
        profile.setGithubUrl(profileData.getGithubUrl());

        return mentorProfileRepository.save(profile);
    }

    private MentorProfile createEmptyProfile(User user) {

        MentorProfile profile = MentorProfile.builder()
                .user(user)
                .build();

        return mentorProfileRepository.save(profile);
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}
