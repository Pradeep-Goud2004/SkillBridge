package com.Skillbridge.backend.mapper;

import com.Skillbridge.backend.dto.ReviewResponse;
import com.Skillbridge.backend.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public ReviewResponse toResponse(Review review) {

        return ReviewResponse.builder()
                .id(review.getId())

                .sessionId(
                        review.getSession().getId()
                )

                .learnerId(
                        review.getLearner().getId()
                )

                .learnerName(
                        review.getLearner().getName()
                )

                .mentorId(
                        review.getMentor().getId()
                )

                .mentorName(
                        review.getMentor().getName()
                )

                .rating(review.getRating())

                .comment(review.getComment())

                .createdAt(review.getCreatedAt())

                .build();
    }
}
