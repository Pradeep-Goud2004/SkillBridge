package com.Skillbridge.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearnerProfileResponse {

    private Long id;

    private Long userId;

    private String name;

    private String email;

    private String phone;

    private String bio;

    private String education;

    private String experience;

    private String location;

    private String profileImageUrl;
}
