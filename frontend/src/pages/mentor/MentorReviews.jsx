import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            setLoading(true);

            const profileResponse =
                await api.get("/mentors/me");

            const mentorId =
                profileResponse.data.userId ||
                profileResponse.data.id;

            const response = await api.get(
                `/reviews/mentor/${mentorId}`
            );

            setReviews(response.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load reviews."
            );
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return (
            <span className="review-stars">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
            </span>
        );
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <MentorSidebar />

                <main className="dashboard-content">

                    <div className="profile-header">

                        <h1>Reviews</h1>

                        <p>
                            See feedback from learners who
                            completed mentorship sessions.
                        </p>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {loading ? (

                        <div className="loading-state">
                            Loading reviews...
                        </div>

                    ) : reviews.length === 0 ? (

                        <div className="empty-state">
                            <h3>
                                No reviews yet
                            </h3>

                            <p>
                                Learner feedback will appear here
                                after completed sessions.
                            </p>
                        </div>

                    ) : (

                        <div className="review-list">

                            {reviews.map((review) => (

                                <div
                                    className="review-card"
                                    key={review.id}
                                >

                                    <div className="review-card-header">

                                        <div>
                                            <h3>
                                                {review.learnerName}
                                            </h3>

                                            <p>
                                                Session ID:{" "}
                                                {review.sessionId}
                                            </p>
                                        </div>

                                        <div className="review-rating">

                                            {renderStars(
                                                review.rating
                                            )}

                                            <span>
                                                {" "}
                                                {review.rating}/5
                                            </span>

                                        </div>

                                    </div>

                                    {review.comment && (
                                        <p className="review-comment">
                                            {review.comment}
                                        </p>
                                    )}

                                    <p className="review-date">
                                        {review.createdAt
                                            ? new Date(
                                                review.createdAt
                                            ).toLocaleString()
                                            : "Date unavailable"}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default MentorReviews;