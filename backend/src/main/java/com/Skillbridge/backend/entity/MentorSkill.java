package com.Skillbridge.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "mentor_skills",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"mentor_id", "skill_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_id", nullable = false)
    private User mentor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(nullable = false)
    private Integer yearsOfExperience;

    @Column(length = 500)
    private String description;
}