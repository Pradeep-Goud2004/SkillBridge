package com.Skillbridge.backend.service;

import com.Skillbridge.backend.dto.NotificationResponse;
import com.Skillbridge.backend.entity.Notification;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.mapper.NotificationMapper;
import com.Skillbridge.backend.repository.NotificationRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    public NotificationService(
            NotificationRepository notificationRepository,
            UserRepository userRepository,
            NotificationMapper notificationMapper) {

        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.notificationMapper = notificationMapper;
    }

    public List<NotificationResponse> getMyNotifications(
            String email) {

        User user = getUserByEmail(email);

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    public List<NotificationResponse> getUnreadNotifications(
            String email) {

        User user = getUserByEmail(email);

        return notificationRepository
                .findByUserAndReadFalseOrderByCreatedAtDesc(user)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    public long getUnreadCount(String email) {

        User user = getUserByEmail(email);

        return notificationRepository
                .countByUserAndReadFalse(user);
    }

    public NotificationResponse markAsRead(
            String email,
            Long notificationId) {

        User user = getUserByEmail(email);

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Notification not found"));

        if (!notification.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "You are not authorized to access this notification");
        }

        notification.setRead(true);

        Notification savedNotification =
                notificationRepository.save(notification);

        return notificationMapper.toResponse(savedNotification);
    }

    public Notification createNotification(
            User user,
            String message) {

        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .read(false)
                .build();

        return notificationRepository.save(notification);
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }
}
