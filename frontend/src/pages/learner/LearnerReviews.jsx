import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const LearnerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [sessions, setSessions] = useState([]);

    const [sessionId, setSessionId] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const [reviewsResponse, sessionsResponse] =
                await Promise.all([
                    api.get("/reviews/my"),
                    api.get("/sessions/learner")
                ]);

            setReviews(reviewsResponse.data);

            const completedSessions =
                sessionsResponse.data.filter(
                    (session) => session.status === "COMPLETED"
                );

            setSessions(completedSessions);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load reviews."
            );
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async (event) => {
        event.preventDefault();

        if (!sessionId) {
            setError("Please select a completed session.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            await api.post("/reviews", null, {
                params: {
                    sessionId: sessionId,
                    rating: rating,
                    comment: comment
                }
            });

            setSuccess("Review submitted successfully.");

            setSessionId("");
            setRating(5);
            setComment("");

            await loadData();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to submit review."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateTime) => {
        if (!dateTime) {
            return "Not available";
        }

        return new Date(dateTime).toLocaleString();
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    <div className="profile-header">
                        <h1>Reviews</h1>

                        <p>
                            Rate and review your completed
                            mentorship sessions.
                        </p>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}

                    {loading ? (

                        <div className="loading-state">
                            Loading reviews...
                        </div>

                    ) : (

                        <>
                            <section className="review-form-card">

                                <h2>Write a Review</h2>

                                {sessions.length === 0 ? (

                                    <div className="review-empty-message">
                                        You don't have any completed
                                        sessions available for review.
                                    </div>

                                ) : (

                                    <form
                                        className="review-form"
                                        onSubmit={submitReview}
                                    >

                                        <div className="form-group">

                                            <label>
                                                Select Completed Session
                                            </label>

                                            <select
                                                value={sessionId}
                                                onChange={(event) =>
                                                    setSessionId(
                                                        event.target.value
                                                    )
                                                }
                                                required
                                            >

                                                <option value="">
                                                    Select a session
                                                </option>

                                                {sessions.map((session) => (
                                                    <option
                                                        key={session.id}
                                                        value={session.id}
                                                    >
                                                        {session.title}
                                                        {" - "}
                                                        {session.mentorName}
                                                    </option>
                                                ))}

                                            </select>

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Rating
                                            </label>

                                            <div className="star-rating">

                                                {[1, 2, 3, 4, 5].map(
                                                    (star) => (

                                                        <button
                                                            type="button"
                                                            key={star}
                                                            className={
                                                                star <= rating
                                                                    ? "star active"
                                                                    : "star"
                                                            }
                                                            onClick={() =>
                                                                setRating(star)
                                                            }
                                                        >
                                                            ★
                                                        </button>

                                                    )
                                                )}

                                                <span>
                                                    {rating} / 5
                                                </span>

                                            </div>

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Comment
                                            </label>

                                            <textarea
                                                value={comment}
                                                onChange={(event) =>
                                                    setComment(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Share your experience with this mentor..."
                                                rows="5"
                                            />

                                        </div>

                                        <button
                                            type="submit"
                                            className="primary-button"
                                            disabled={submitting}
                                        >
                                            {submitting
                                                ? "Submitting..."
                                                : "Submit Review"}
                                        </button>

                                    </form>

                                )}

                            </section>

                            <section className="my-reviews-section">

                                <div className="section-title">
                                    <h2>My Reviews</h2>

                                    <span>
                                        {reviews.length} review
                                        {reviews.length !== 1
                                            ? "s"
                                            : ""}
                                    </span>
                                </div>

                                {reviews.length === 0 ? (

                                    <div className="empty-state">
                                        <h3>
                                            No reviews yet
                                        </h3>

                                        <p>
                                            Your submitted reviews
                                            will appear here.
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
                                                            {review.mentorName}
                                                        </h3>

                                                        <p>
                                                            Session ID:{" "}
                                                            {review.sessionId}
                                                        </p>
                                                    </div>

                                                    <div className="review-rating">

                                                        {"★".repeat(
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
                                                    Submitted:{" "}
                                                    {formatDate(
                                                        review.createdAt
                                                    )}
                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </section>
                        </>

                    )}

                </main>

            </div>

        </div>
    );
};

export default LearnerReviews;