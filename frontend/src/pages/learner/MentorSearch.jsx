import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const MentorSearch = () => {

    const [skill, setSkill] = useState("");
    const [mentors, setMentors] = useState([]);

    const [selectedMentor, setSelectedMentor] = useState(null);
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);
    const [searched, setSearched] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const searchMentors = async (event) => {

        event.preventDefault();

        if (!skill.trim()) {
            setError("Please enter a skill to search.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setSuccess("");
            setSearched(false);

            const response = await api.get(
                "/mentors/search",
                {
                    params: {
                        skill: skill.trim(),
                    },
                }
            );

            setMentors(response.data);
            setSearched(true);

        } catch (error) {

            setMentors([]);

            setError(
                error.response?.data?.message ||
                "Failed to search mentors."
            );

        } finally {

            setLoading(false);
        }
    };

    const openRequestModal = (mentor) => {

        setSelectedMentor(mentor);
        setMessage("");
        setError("");
        setSuccess("");
    };

    const closeRequestModal = () => {

        setSelectedMentor(null);
        setMessage("");
    };

    const sendMentorshipRequest = async (event) => {

        event.preventDefault();

        if (!selectedMentor) {
            return;
        }

        if (!message.trim()) {
            setError("Please enter a message.");
            return;
        }

        try {

            setSendingRequest(true);
            setError("");
            setSuccess("");

            await api.post(
                "/mentorship-requests",
                null,
                {
                    params: {
                        mentorId: selectedMentor.mentorId,
                        message: message.trim(),
                    },
                }
            );

            setSuccess(
                `Mentorship request sent to ${selectedMentor.name}.`
            );

            setSelectedMentor(null);
            setMessage("");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to send mentorship request."
            );

        } finally {

            setSendingRequest(false);
        }
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    <div className="profile-header">

                        <h1>Find Mentors</h1>

                        <p>
                            Find experienced mentors based
                            on their skills.
                        </p>

                    </div>

                    {error && !selectedMentor && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {success && !selectedMentor && (
                        <div className="success-message">
                            {success}
                        </div>
                    )}

                    <div className="mentor-search-card">

                        <form
                            className="mentor-search-form"
                            onSubmit={searchMentors}
                        >

                            <div className="form-group">

                                <label>
                                    Search by Skill
                                </label>

                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(event) =>
                                        setSkill(event.target.value)
                                    }
                                    placeholder="Example: Java"
                                />

                            </div>

                            <button
                                type="submit"
                                className="auth-button mentor-search-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Searching..."
                                    : "Search Mentors"}
                            </button>

                        </form>

                    </div>

                    {searched && (

                        <div className="mentor-results">

                            <div className="mentor-results-header">

                                <h2>
                                    Mentor Results
                                </h2>

                                <span>
                                    {mentors.length} mentor
                                    {mentors.length !== 1
                                        ? "s"
                                        : ""}
                                </span>

                            </div>

                            {mentors.length === 0 ? (

                                <div className="empty-state">

                                    <p>
                                        No mentors found for{" "}
                                        <strong>{skill}</strong>.
                                    </p>

                                    <p>
                                        Try searching for another
                                        skill.
                                    </p>

                                </div>

                            ) : (

                                <div className="mentor-grid">

                                    {mentors.map((mentor) => (

                                        <div
                                            className="mentor-card"
                                            key={mentor.mentorId}
                                        >

                                            <div className="mentor-card-top">

                                                <div className="mentor-avatar">

                                                    {mentor.name
                                                        ? mentor.name
                                                            .charAt(0)
                                                            .toUpperCase()
                                                        : "M"}

                                                </div>

                                                <div>

                                                    <h3>
                                                        {mentor.name}
                                                    </h3>

                                                    <p className="mentor-designation">
                                                        {
                                                            mentor.designation ||
                                                            "Mentor"
                                                        }
                                                    </p>

                                                    {mentor.company && (
                                                        <p className="mentor-company">
                                                            {mentor.company}
                                                        </p>
                                                    )}

                                                </div>

                                            </div>

                                            <div className="mentor-details">

                                                {mentor.location && (
                                                    <p>
                                                        <strong>
                                                            Location:
                                                        </strong>{" "}
                                                        {mentor.location}
                                                    </p>
                                                )}

                                                {mentor.skill && (
                                                    <p>
                                                        <strong>
                                                            Skill:
                                                        </strong>{" "}
                                                        {mentor.skill}
                                                    </p>
                                                )}

                                                <p>
                                                    <strong>
                                                        Experience:
                                                    </strong>{" "}
                                                    {mentor.yearsOfExperience}{" "}
                                                    years
                                                </p>

                                            </div>

                                            {mentor.bio && (
                                                <p className="mentor-bio">
                                                    {mentor.bio}
                                                </p>
                                            )}

                                            <button
                                                className="request-mentor-button"
                                                type="button"
                                                onClick={() =>
                                                    openRequestModal(mentor)
                                                }
                                            >
                                                Request Mentorship
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    )}

                </main>

            </div>

            {/* Request Mentorship Modal */}

            {selectedMentor && (

                <div
                    className="modal-overlay"
                    onClick={closeRequestModal}
                >

                    <div
                        className="request-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <h2>
                                Request Mentorship
                            </h2>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={closeRequestModal}
                            >
                                ×
                            </button>

                        </div>

                        <div className="selected-mentor">

                            <div className="mentor-avatar">

                                {selectedMentor.name
                                    ? selectedMentor.name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "M"}

                            </div>

                            <div>

                                <h3>
                                    {selectedMentor.name}
                                </h3>

                                <p>
                                    {selectedMentor.designation ||
                                        "Mentor"}
                                </p>

                            </div>

                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form onSubmit={sendMentorshipRequest}>

                            <div className="form-group">

                                <label>
                                    Message
                                </label>

                                <textarea
                                    value={message}
                                    onChange={(event) =>
                                        setMessage(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Tell the mentor why you would like their guidance..."
                                    rows="5"
                                    required
                                />

                            </div>

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={closeRequestModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="auth-button send-request-button"
                                    disabled={sendingRequest}
                                >
                                    {sendingRequest
                                        ? "Sending..."
                                        : "Send Request"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default MentorSearch;