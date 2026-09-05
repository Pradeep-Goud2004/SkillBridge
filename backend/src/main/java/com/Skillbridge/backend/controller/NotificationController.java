package com.Skillbridge.backend.controller;

import com.Skillbridge.backend.dto.NotificationResponse;
import com.Skillbridge.backend.service.NotificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR')")
    public ResponseEntity<List<NotificationResponse>> getMyNotifications(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                notificationService.getMyNotifications(email)
        );
    }

    @GetMapping("/unread")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR')")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                notificationService.getUnreadNotifications(email)
        );
    }

    @GetMapping("/unread/count")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR')")
    public ResponseEntity<Long> getUnreadCount(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                notificationService.getUnreadCount(email)
        );
    }

    @PutMapping("/{notificationId}/read")
    @PreAuthorize("hasAnyRole('LEARNER', 'MENTOR')")
    public ResponseEntity<NotificationResponse> markAsRead(
            Authentication authentication,
            @PathVariable Long notificationId) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                notificationService.markAsRead(
                        email,
                        notificationId
                )
        );
    }
}
