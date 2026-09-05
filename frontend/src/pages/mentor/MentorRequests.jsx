import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorRequests = () => {
    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/mentorship-requests/received"
            );

            setRequests(response.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load mentorship requests."
            );
        } finally {
            setLoading(false);
        }
    };

    const updateRequest = async (requestId, action) => {
        try {
            setProcessing(requestId);
            setError("");
            setSuccess("");

            await api.put(
                `/mentorship-requests/${requestId}/${action}`
            );

            setSuccess(
                action === "accept"
                    ? "Mentorship request accepted."
                    : "Mentorship request rejected."
            );

            await loadRequests();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update request."
            );
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <MentorSidebar />

                <main className="dashboard-content">

                    <div className="profile-header">
                        <h1>Mentorship Requests</h1>

                        <p>
                            Review learners who want to connect
                            with you.
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
                            Loading requests...
                        </div>

                    ) : requests.length === 0 ? (

                        <div className="empty-state">
                            <h3>
                                No mentorship requests
                            </h3>

                            <p>
                                New learner requests will appear here.
                            </p>
                        </div>

                    ) : (

                        <div className="mentor-request-list">

                            {requests.map((request) => (

                                <div
                                    className="mentor-request-card"
                                    key={request.id}
                                >

                                    <div className="mentor-request-header">

                                        <div>
                                            <h2>
                                                {request.learnerName}
                                            </h2>

                                            <p>
                                                Request ID: #
                                                {request.id}
                                            </p>
                                        </div>

                                        <span
                                            className={`status-badge ${
                                                request.status ===
                                                "ACCEPTED"
                                                    ? "accepted"
                                                    : request.status ===
                                                      "REJECTED"
                                                    ? "rejected"
                                                    : "pending"
                                            }`}
                                        >
                                            {request.status}
                                        </span>

                                    </div>

                                    {request.message && (
                                        <div className="request-message">

                                            <strong>
                                                Message
                                            </strong>

                                            <p>
                                                {request.message}
                                            </p>

                                        </div>
                                    )}

                                    {request.createdAt && (
                                        <p className="request-date">
                                            Received:{" "}
                                            {new Date(
                                                request.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    )}

                                    {request.status === "PENDING" && (
                                        <div className="request-actions">

                                            <button
                                                className="primary-button"
                                                onClick={() =>
                                                    updateRequest(
                                                        request.id,
                                                        "accept"
                                                    )
                                                }
                                                disabled={
                                                    processing ===
                                                    request.id
                                                }
                                            >
                                                {processing === request.id
                                                    ? "Processing..."
                                                    : "Accept"}
                                            </button>

                                            <button
                                                className="danger-button"
                                                onClick={() =>
                                                    updateRequest(
                                                        request.id,
                                                        "reject"
                                                    )
                                                }
                                                disabled={
                                                    processing ===
                                                    request.id
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>
                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default MentorRequests;