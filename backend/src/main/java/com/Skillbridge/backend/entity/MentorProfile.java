package com.Skillbridge.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mentor_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 1000)
    private String bio;

    private String experience;

    private String company;

    private String designation;

    private String location;

    private String profileImageUrl;

    private String linkedinUrl;

    private String githubUrl;
}