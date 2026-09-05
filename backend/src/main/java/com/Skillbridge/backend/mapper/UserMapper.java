package com.Skillbridge.backend.mapper;


import com.Skillbridge.backend.dto.UserResponse;
import com.Skillbridge.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user)
    {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().getName())
                .createdAt(user.getCreatedAt())
                .build();
 
    }
}
