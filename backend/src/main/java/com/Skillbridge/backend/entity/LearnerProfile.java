package com.Skillbridge.backend.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@AllArgsConstructor@NoArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "learner_profiles")
public class LearnerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id",nullable=false, unique=true)
    private User user;

    @Column(length = 1000)
    private String bio;
    private String education;
    private String experience;
    private String location;
    private String profileImageUrl;
}
