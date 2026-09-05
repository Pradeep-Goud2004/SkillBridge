package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.AdminDashboardResponse;
import com.Skillbridge.backend.dto.AdminUserResponse;
import com.Skillbridge.backend.service.AdminService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                adminService.getDashboard()
        );
    }

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>> getAllUsers() {

        return ResponseEntity.ok(
                adminService.getAllUsers()
        );
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long userId) {

        adminService.deleteUser(userId);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/jobs/{jobId}/close")
    public ResponseEntity<Void> closeJob(
            @PathVariable Long jobId) {

        adminService.closeJob(jobId);

        return ResponseEntity.noContent().build();
    }
}
