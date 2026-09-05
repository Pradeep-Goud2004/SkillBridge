import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const MentorshipRequests = () => {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/mentorship-requests/sent"
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

    const getStatusClass = (status) => {

        switch (status) {

            case "ACCEPTED":
                return "status-badge accepted";

            case "REJECTED":
                return "status-badge rejected";

            case "PENDING":
            default:
                return "status-badge pending";
        }
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    <div className="profile-header">

                        <h1>Mentorship Requests</h1>

                        <p>
                            Track the mentorship requests
                            you have sent to mentors.
                        </p>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {loading ? (

                        <div className="loading-state">
                            Loading mentorship requests...
                        </div>

                    ) : requests.length === 0 ? (

                        <div className="empty-state request-empty-state">

                            <h3>
                                No mentorship requests
                            </h3>

                            <p>
                                You haven't sent any mentorship
                                requests yet.
                            </p>

                        </div>

                    ) : (

                        <div className="request-list">

                            {requests.map((request) => (

                                <div
                                    className="request-card"
                                    key={request.id}
                                >

                                    <div className="request-card-header">

                                        <div className="request-mentor-info">

                                            <div className="mentor-avatar">
                                                {request.mentorName
                                                    ? request.mentorName
                                                        .charAt(0)
                                                        .toUpperCase()
                                                    : "M"}
                                            </div>

                                            <div>

                                                <h2>
                                                    {request.mentorName}
                                                </h2>

                                                <p>
                                                    Mentor
                                                </p>

                                            </div>

                                        </div>

                                        <span
                                            className={getStatusClass(
                                                request.status
                                            )}
                                        >
                                            {request.status}
                                        </span>

                                    </div>

                                    <div className="request-message">

                                        <h4>
                                            Your Message
                                        </h4>

                                        <p>
                                            {request.message ||
                                                "No message provided."}
                                        </p>

                                    </div>

                                    <div className="request-footer">

                                        <span>
                                            Request ID:{" "}
                                            {request.id}
                                        </span>

                                        <span>
                                            {request.createdAt
                                                ? new Date(
                                                    request.createdAt
                                                ).toLocaleString()
                                                : ""}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default MentorshipRequests;