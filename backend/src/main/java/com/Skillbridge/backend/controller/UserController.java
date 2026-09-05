package com.Skillbridge.backend.controller;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/me")
    public String getCurentUser(Authentication authentication)
    {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return "Authenticated user" + userDetails.getUsername();
    }
}
