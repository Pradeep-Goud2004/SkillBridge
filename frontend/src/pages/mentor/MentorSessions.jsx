import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [requests, setRequests] = useState([]);

    const [mentorshipRequestId, setMentorshipRequestId] =
        useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [meetingLink, setMeetingLink] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [processing, setProcessing] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const [sessionsResponse, requestsResponse] =
                await Promise.all([
                    api.get("/sessions/mentor"),
                    api.get("/mentorship-requests/received")
                ]);

            setSessions(sessionsResponse.data);

            setRequests(
                requestsResponse.data.filter(
                    (request) =>
                        request.status === "ACCEPTED"
                )
            );

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load sessions."
            );
        } finally {
            setLoading(false);
        }
    };

    const createSession = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            await api.post("/sessions", null, {
                params: {
                    mentorshipRequestId,
                    title,
                    description,
                    startTime,
                    endTime,
                    meetingLink
                }
            });

            setSuccess("Session scheduled successfully.");

            setMentorshipRequestId("");
            setTitle("");
            setDescription("");
            setStartTime("");
            setEndTime("");
            setMeetingLink("");

            await loadData();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to schedule session."
            );
        } finally {
            setSaving(false);
        }
    };

    const updateSession = async (id, action) => {
        try {
            setProcessing(id);
            setError("");
            setSuccess("");

            await api.put(`/sessions/${id}/${action}`);

            setSuccess(
                action === "complete"
                    ? "Session marked as completed."
                    : "Session cancelled."
            );

            await loadData();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update session."
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
                        <h1>Sessions</h1>

                        <p>
                            Schedule and manage your mentorship
                            sessions.
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

                    <section className="mentor-session-form-card">

                        <h2>Schedule Session</h2>

                        {requests.length === 0 ? (

                            <div className="review-empty-message">
                                You need an accepted mentorship request
                                before scheduling a session.
                            </div>

                        ) : (

                            <form
                                className="mentor-session-form"
                                onSubmit={createSession}
                            >

                                <div className="form-group">

                                    <label>
                                        Learner
                                    </label>

                                    <select
                                        value={mentorshipRequestId}
                                        onChange={(event) =>
                                            setMentorshipRequestId(
                                                event.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select learner
                                        </option>

                                        {requests.map((request) => (
                                            <option
                                                key={request.id}
                                                value={request.id}
                                            >
                                                {request.learnerName}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                                <div className="form-group">

                                    <label>
                                        Session Title
                                    </label>

                                    <input
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Java Spring Boot Mentoring"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Description
                                    </label>

                                    <textarea
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(
                                                event.target.value
                                            )
                                        }
                                        rows="3"
                                        placeholder="What will you discuss?"
                                    />

                                </div>

                                <div className="form-grid">

                                    <div className="form-group">

                                        <label>
                                            Start Time
                                        </label>

                                        <input
                                            type="datetime-local"
                                            value={startTime}
                                            onChange={(event) =>
                                                setStartTime(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="form-group">

                                        <label>
                                            End Time
                                        </label>

                                        <input
                                            type="datetime-local"
                                            value={endTime}
                                            onChange={(event) =>
                                                setEndTime(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                                <div className="form-group">

                                    <label>
                                        Meeting Link
                                    </label>

                                    <input
                                        type="url"
                                        value={meetingLink}
                                        onChange={(event) =>
                                            setMeetingLink(
                                                event.target.value
                                            )
                                        }
                                        placeholder="https://meet.google.com/..."
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Scheduling..."
                                        : "Schedule Session"}
                                </button>

                            </form>

                        )}

                    </section>

                    <section className="mentor-sessions-section">

                        <h2>My Sessions</h2>

                        {loading ? (

                            <div className="loading-state">
                                Loading sessions...
                            </div>

                        ) : sessions.length === 0 ? (

                            <div className="empty-state">
                                <h3>
                                    No sessions yet
                                </h3>

                                <p>
                                    Scheduled sessions will appear here.
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
                                                    Learner:{" "}
                                                    <strong>
                                                        {session.learnerName}
                                                    </strong>
                                                </p>
                                            </div>

                                            <span
                                                className={
                                                    session.status ===
                                                    "COMPLETED"
                                                        ? "status-badge accepted"
                                                        : session.status ===
                                                          "CANCELLED"
                                                        ? "status-badge rejected"
                                                        : "status-badge pending"
                                                }
                                            >
                                                {session.status}
                                            </span>

                                        </div>

                                        {session.description && (
                                            <p className="session-description">
                                                {session.description}
                                            </p>
                                        )}

                                        <div className="session-details">

                                            <div className="session-detail">
                                                <span>
                                                    Start
                                                </span>

                                                <strong>
                                                    {new Date(
                                                        session.startTime
                                                    ).toLocaleString()}
                                                </strong>
                                            </div>

                                            <div className="session-detail">
                                                <span>
                                                    End
                                                </span>

                                                <strong>
                                                    {new Date(
                                                        session.endTime
                                                    ).toLocaleString()}
                                                </strong>
                                            </div>

                                        </div>

                                        {session.meetingLink &&
                                            session.status ===
                                                "SCHEDULED" && (
                                                <a
                                                    href={
                                                        session.meetingLink
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="meeting-link"
                                                >
                                                    Join Meeting
                                                </a>
                                            )}

                                        {session.status ===
                                            "SCHEDULED" && (
                                            <div className="session-actions">

                                                <button
                                                    className="primary-button"
                                                    onClick={() =>
                                                        updateSession(
                                                            session.id,
                                                            "complete"
                                                        )
                                                    }
                                                    disabled={
                                                        processing ===
                                                        session.id
                                                    }
                                                >
                                                    Complete
                                                </button>

                                                <button
                                                    className="danger-button"
                                                    onClick={() =>
                                                        updateSession(
                                                            session.id,
                                                            "cancel"
                                                        )
                                                    }
                                                    disabled={
                                                        processing ===
                                                        session.id
                                                    }
                                                >
                                                    Cancel
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>

                </main>

            </div>

        </div>
    );
};

export default MentorSessions;