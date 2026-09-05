import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const LearnerSessions = () => {

    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/sessions/learner");

            setSessions(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load sessions."
            );

        } finally {

            setLoading(false);
        }
    };

    const getStatusClass = (status) => {

        switch (status) {

            case "COMPLETED":
                return "status-badge accepted";

            case "CANCELLED":
                return "status-badge rejected";

            case "SCHEDULED":
            default:
                return "status-badge pending";
        }
    };

    const formatDateTime = (dateTime) => {

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

                        <h1>My Sessions</h1>

                        <p>
                            View and manage your mentorship
                            sessions.
                        </p>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {loading ? (

                        <div className="loading-state">
                            Loading sessions...
                        </div>

                    ) : sessions.length === 0 ? (

                        <div className="empty-state session-empty-state">

                            <h3>
                                No sessions yet
                            </h3>

                            <p>
                                Your scheduled mentorship
                                sessions will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="session-list">

                            {sessions.map((session) => (

                                <div
                                    className="session-card"
                                    key={session.id}
                                >

                                    <div className="session-header">

                                        <div>

                                            <h2>
                                                {session.title}
                                            </h2>

                                            <p className="session-mentor">
                                                Mentor:{" "}
                                                <strong>
                                                    {session.mentorName}
                                                </strong>
                                            </p>

                                        </div>

                                        <span
                                            className={getStatusClass(
                                                session.status
                                            )}
                                        >
                                            {session.status}
                                        </span>

                                    </div>

                                    {session.description && (
                                        <div className="session-description">

                                            <h4>
                                                Description
                                            </h4>

                                            <p>
                                                {session.description}
                                            </p>

                                        </div>
                                    )}

                                    <div className="session-details">

                                        <div className="session-detail">

                                            <span>
                                                Start
                                            </span>

                                            <strong>
                                                {formatDateTime(
                                                    session.startTime
                                                )}
                                            </strong>

                                        </div>

                                        <div className="session-detail">

                                            <span>
                                                End
                                            </span>

                                            <strong>
                                                {formatDateTime(
                                                    session.endTime
                                                )}
                                            </strong>

                                        </div>

                                    </div>

                                    {session.meetingLink &&
                                        session.status === "SCHEDULED" && (

                                            <a
                                                href={session.meetingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="meeting-link"
                                            >
                                                Join Meeting
                                            </a>

                                        )}

                                    {session.status === "COMPLETED" && (
                                        <div className="completed-message">
                                            This session has been completed.
                                            You can submit a review from the
                                            Reviews section.
                                        </div>
                                    )}

                                    {session.status === "CANCELLED" && (
                                        <div className="cancelled-message">
                                            This session was cancelled.
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

export default LearnerSessions;