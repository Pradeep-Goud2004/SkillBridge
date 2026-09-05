package com.Skillbridge.backend.service;

import com.Skillbridge.backend.dto.LoginRequest;
import com.Skillbridge.backend.dto.LoginResponse;
import com.Skillbridge.backend.dto.RegisterRequest;
import com.Skillbridge.backend.dto.UserResponse;
import com.Skillbridge.backend.entity.Role;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.mapper.UserMapper;
import com.Skillbridge.backend.repository.RoleRepository;
import com.Skillbridge.backend.repository.UserRepository;
import com.Skillbridge.backend.security.CustomUserDetailsService;
import com.Skillbridge.backend.security.JwtService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            UserMapper userMapper,
            CustomUserDetailsService customUserDetailsService,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtService = jwtService;
    }

    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (request.getPhone() != null
                && !request.getPhone().isBlank()
                && userRepository.existsByPhone(request.getPhone())) {

            throw new RuntimeException("Phone number already registered");
        }

        Role role = roleRepository
                .findByName(request.getRole().toUpperCase())
                .orElseThrow(() ->
                        new RuntimeException("Invalid role"));

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(role)
                .build();

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }
    public LoginResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }

        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(
                        user.getEmail()
                );

        String token = jwtService.generateToken(userDetails);

        return LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(userMapper.toResponse(user))
                .build();
    }
}