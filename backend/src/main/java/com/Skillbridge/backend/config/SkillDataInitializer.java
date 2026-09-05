package com.Skillbridge.backend.config;

import com.Skillbridge.backend.entity.Skill;
import com.Skillbridge.backend.repository.SkillRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SkillDataInitializer {

    @Bean
    CommandLineRunner initializeSkills(
            SkillRepository skillRepository) {

        return args -> {

            createSkill(
                    skillRepository,
                    "Java",
                    "Object-oriented programming language",
                    "Programming"
            );

            createSkill(
                    skillRepository,
                    "Spring Boot",
                    "Framework for building Java backend applications",
                    "Backend"
            );

            createSkill(
                    skillRepository,
                    "React",
                    "JavaScript library for building user interfaces",
                    "Frontend"
            );

            createSkill(
                    skillRepository,
                    "JavaScript",
                    "Programming language for web development",
                    "Frontend"
            );

            createSkill(
                    skillRepository,
                    "HTML",
                    "Markup language for creating web pages",
                    "Frontend"
            );

            createSkill(
                    skillRepository,
                    "CSS",
                    "Styling language for web pages",
                    "Frontend"
            );

            createSkill(
                    skillRepository,
                    "Python",
                    "General-purpose programming language",
                    "Programming"
            );

            createSkill(
                    skillRepository,
                    "SQL",
                    "Language for managing relational databases",
                    "Database"
            );

            createSkill(
                    skillRepository,
                    "Git",
                    "Distributed version control system",
                    "Tools"
            );

            createSkill(
                    skillRepository,
                    "GitHub",
                    "Platform for hosting and collaborating on code",
                    "Tools"
            );

            createSkill(
                    skillRepository,
                    "Docker",
                    "Platform for containerizing applications",
                    "DevOps"
            );

            createSkill(
                    skillRepository,
                    "AWS",
                    "Cloud computing platform",
                    "Cloud"
            );

            createSkill(
                    skillRepository,
                    "Data Structures & Algorithms",
                    "Core concepts for efficient problem solving",
                    "Computer Science"
            );

            createSkill(
                    skillRepository,
                    "Microservices",
                    "Architecture for developing distributed applications",
                    "Backend"
            );

            createSkill(
                    skillRepository,
                    "REST API",
                    "Architecture for communication between applications",
                    "Backend"
            );
        };
    }

    private void createSkill(
            SkillRepository skillRepository,
            String name,
            String description,
            String category) {

        if (!skillRepository.existsByNameIgnoreCase(name)) {

            Skill skill = Skill.builder()
                    .name(name)
                    .description(description)
                    .category(category)
                    .build();

            skillRepository.save(skill);
        }
    }
}
