package com.Skillbridge.backend.dto;

import lombok.AllArgsConstructor;
import lombok.*;


import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Getter
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private LocalDateTime createdAt;
}
