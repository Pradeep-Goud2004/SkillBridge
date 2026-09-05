package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.SessionResponse;
import com.Skillbridge.backend.entity.Session;
import org.springframework.stereotype.Component;

@Component
public class SessionMapper {

    public SessionResponse toResponse(Session session) {

        return SessionResponse.builder()
                .id(session.getId())
                .mentorshipRequestId(
                        session.getMentorshipRequest().getId()
                )
                .title(session.getTitle())
                .description(session.getDescription())
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .meetingLink(session.getMeetingLink())
                .status(session.getStatus().name())
                .mentorId(
                        session.getMentorshipRequest()
                                .getMentor()
                                .getId()
                )
                .mentorName(
                        session.getMentorshipRequest()
                                .getMentor()
                                .getName()
                )
                .learnerId(
                        session.getMentorshipRequest()
                                .getLearner()
                                .getId()
                )
                .learnerName(
                        session.getMentorshipRequest()
                                .getLearner()
                                .getName()
                )
                .createdAt(session.getCreatedAt())
                .build();
    }
}
