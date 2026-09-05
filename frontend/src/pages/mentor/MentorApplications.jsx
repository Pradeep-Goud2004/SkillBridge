import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorApplications = () => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    const [selectedJobId, setSelectedJobId] = useState("");

    const [loading, setLoading] = useState(true);
    const [loadingApplications, setLoadingApplications] =
        useState(false);

    const [processing, setProcessing] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);

            const response = await api.get("/jobs/my");

            setJobs(response.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load jobs."
            );
        } finally {
            setLoading(false);
        }
    };

    const loadApplications = async (jobId) => {
        if (!jobId) {
            setApplications([]);
            return;
        }

        try {
            setLoadingApplications(true);
            setError("");

            const response = await api.get(
                `/applications/job/${jobId}`
            );

            setApplications(response.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load applications."
            );
        } finally {
            setLoadingApplications(false);
        }
    };

    const handleJobChange = (event) => {
        const id = event.target.value;

        setSelectedJobId(id);

        loadApplications(id);
    };

    const updateStatus = async (
        applicationId,
        status
    ) => {
        try {
            setProcessing(applicationId);
            setError("");
            setSuccess("");

            await api.put(
                `/applications/${applicationId}/status`,
                null,
                {
                    params: {
                        status
                    }
                }
            );

            setSuccess(
                `Application ${status.toLowerCase()} successfully.`
            );

            await loadApplications(selectedJobId);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update application."
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

                        <h1>Applications</h1>

                        <p>
                            Review applications submitted
                            by learners.
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

                    <section className="mentor-application-selector">

                        <label>
                            Select Job
                        </label>

                        {loading ? (

                            <div className="loading-state">
                                Loading jobs...
                            </div>

                        ) : (

                            <select
                                value={selectedJobId}
                                onChange={handleJobChange}
                            >

                                <option value="">
                                    Select a job
                                </option>

                                {jobs.map((job) => (
                                    <option
                                        key={job.id}
                                        value={job.id}
                                    >
                                        {job.title}
                                    </option>
                                ))}

                            </select>

                        )}

                    </section>

                    {!selectedJobId ? (

                        <div className="empty-state">
                            <h3>
                                Select a job
                            </h3>

                            <p>
                                Choose one of your job postings
                                to view applications.
                            </p>
                        </div>

                    ) : loadingApplications ? (

                        <div className="loading-state">
                            Loading applications...
                        </div>

                    ) : applications.length === 0 ? (

                        <div className="empty-state">
                            <h3>
                                No applications
                            </h3>

                            <p>
                                No learners have applied for
                                this job yet.
                            </p>
                        </div>

                    ) : (

                        <div className="application-list">

                            {applications.map((application) => (

                                <div
                                    className="application-card"
                                    key={application.id}
                                >

                                    <div className="application-header">

                                        <div>
                                            <h2>
                                                {application.learnerName}
                                            </h2>

                                            <p className="application-company">
                                                Application #
                                                {application.id}
                                            </p>
                                        </div>

                                        <span
                                            className={`application-status ${
                                                application.status ===
                                                "ACCEPTED"
                                                    ? "accepted"
                                                    : application.status ===
                                                      "REJECTED"
                                                    ? "rejected"
                                                    : "pending"
                                            }`}
                                        >
                                            {application.status}
                                        </span>

                                    </div>

                                    {application.coverLetter && (
                                        <div className="cover-letter">

                                            <strong>
                                                Cover Letter
                                            </strong>

                                            <p>
                                                {application.coverLetter}
                                            </p>

                                        </div>
                                    )}

                                    {application.createdAt && (
                                        <p className="review-date">
                                            Applied:{" "}
                                            {new Date(
                                                application.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    )}

                                    {application.status ===
                                        "PENDING" && (

                                        <div className="request-actions">

                                            <button
                                                className="primary-button"
                                                onClick={() =>
                                                    updateStatus(
                                                        application.id,
                                                        "ACCEPTED"
                                                    )
                                                }
                                                disabled={
                                                    processing ===
                                                    application.id
                                                }
                                            >
                                                Accept
                                            </button>

                                            <button
                                                className="danger-button"
                                                onClick={() =>
                                                    updateStatus(
                                                        application.id,
                                                        "REJECTED"
                                                    )
                                                }
                                                disabled={
                                                    processing ===
                                                    application.id
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

export default MentorApplications;