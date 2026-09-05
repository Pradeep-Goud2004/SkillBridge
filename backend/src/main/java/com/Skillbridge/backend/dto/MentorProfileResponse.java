package com.Skillbridge.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorProfileResponse {

    private Long id;

    private Long userId;

    private String name;

    private String email;

    private String phone;

    private String bio;

    private String experience;

    private String company;

    private String designation;

    private String location;

    private String profileImageUrl;

    private String linkedinUrl;

    private String githubUrl;
}
