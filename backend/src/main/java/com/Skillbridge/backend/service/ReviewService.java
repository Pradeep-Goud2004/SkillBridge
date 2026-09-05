package com.Skillbridge.backend.service;

import com.Skillbridge.backend.dto.ReviewResponse;
import com.Skillbridge.backend.entity.Review;
import com.Skillbridge.backend.entity.Session;
import com.Skillbridge.backend.entity.User;
import com.Skillbridge.backend.mapper.ReviewMapper;
import com.Skillbridge.backend.repository.ReviewRepository;
import com.Skillbridge.backend.repository.SessionRepository;
import com.Skillbridge.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final ReviewMapper reviewMapper;

    public ReviewService(
            ReviewRepository reviewRepository,
            SessionRepository sessionRepository,
            UserRepository userRepository,
            ReviewMapper reviewMapper) {

        this.reviewRepository = reviewRepository;
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.reviewMapper = reviewMapper;
    }

    public ReviewResponse createReview(
            String learnerEmail,
            Long sessionId,
            Integer rating,
            String comment) {

        User learner = getUserByEmail(learnerEmail);

        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() ->
                        new RuntimeException("Session not found"));

        if (!session.getMentorshipRequest()
                .getLearner()
                .getId()
                .equals(learner.getId())) {

            throw new RuntimeException(
                    "You are not authorized to review this session");
        }

        if (session.getStatus()
                != Session.SessionStatus.COMPLETED) {

            throw new RuntimeException(
                    "You can only review a completed session");
        }

        if (rating == null || rating < 1 || rating > 5) {

            throw new RuntimeException(
                    "Rating must be between 1 and 5");
        }

        if (reviewRepository.existsBySessionId(sessionId)) {

            throw new RuntimeException(
                    "This session has already been reviewed");
        }

        User mentor = session.getMentorshipRequest()
                .getMentor();

        Review review = Review.builder()
                .session(session)
                .learner(learner)
                .mentor(mentor)
                .rating(rating)
                .comment(comment)
                .build();

        Review savedReview =
                reviewRepository.save(review);

        return reviewMapper.toResponse(savedReview);
    }

    public List<ReviewResponse> getMentorReviews(
            Long mentorId) {

        return reviewRepository
                .findByMentorId(mentorId)
                .stream()
                .map(reviewMapper::toResponse)
                .toList();
    }

    public List<ReviewResponse> getMyReviews(
            String learnerEmail) {

        User learner = getUserByEmail(learnerEmail);

        return reviewRepository
                .findByLearner(learner)
                .stream()
                .map(reviewMapper::toResponse)
                .toList();
    }

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }
}
