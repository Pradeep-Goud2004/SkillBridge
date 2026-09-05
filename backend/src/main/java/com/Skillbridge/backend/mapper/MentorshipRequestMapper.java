package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.MentorshipRequestResponse;
import com.Skillbridge.backend.entity.MentorshipRequest;

import org.springframework.stereotype.Component;

@Component
public class MentorshipRequestMapper {

    public MentorshipRequestResponse toResponse(
            MentorshipRequest request) {

        return MentorshipRequestResponse.builder()
                .id(request.getId())

                .learnerId(
                        request.getLearner().getId()
                )

                .learnerName(
                        request.getLearner().getName()
                )

                .mentorId(
                        request.getMentor().getId()
                )

                .mentorName(
                        request.getMentor().getName()
                )

                .message(request.getMessage())

                .status(
                        request.getStatus().name()
                )

                .createdAt(request.getCreatedAt())

                .build();
    }
}
