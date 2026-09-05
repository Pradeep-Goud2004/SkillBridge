import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const LearnerJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [applying, setApplying] = useState(false);

    const [error, setError] = useState("");
    const [applicationMessage, setApplicationMessage] = useState("");

    const [selectedJob, setSelectedJob] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/jobs");

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

    const searchJobs = async (event) => {
        event.preventDefault();

        if (!keyword.trim()) {
            loadJobs();
            return;
        }

        try {
            setSearching(true);
            setError("");

            const response = await api.get("/jobs/search", {
                params: {
                    keyword: keyword.trim()
                }
            });

            setJobs(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to search jobs."
            );
        } finally {
            setSearching(false);
        }
    };

    const clearSearch = () => {
        setKeyword("");
        loadJobs();
    };

    const openJobDetails = (job) => {
        setSelectedJob(job);
        setCoverLetter("");
        setApplicationMessage("");
    };

    const closeJobDetails = () => {
        setSelectedJob(null);
        setCoverLetter("");
        setApplicationMessage("");
    };

    const applyForJob = async () => {
        if (!selectedJob) {
            return;
        }

        try {
            setApplying(true);
            setApplicationMessage("");

            await api.post("/applications", null, {
                params: {
                    jobId: selectedJob.id,
                    coverLetter: coverLetter
                }
            });

            setApplicationMessage(
                "Application submitted successfully!"
            );

            setCoverLetter("");

        } catch (error) {
            setApplicationMessage(
                error.response?.data?.message ||
                "Failed to submit application."
            );
        } finally {
            setApplying(false);
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

                        <h1>Jobs</h1>

                        <p>
                            Explore job opportunities and find
                            the right opportunity for you.
                        </p>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {/* Search */}
                    <form
                        className="job-search-form"
                        onSubmit={searchJobs}
                    >

                        <input
                            type="text"
                            placeholder="Search jobs by title, company, skill..."
                            value={keyword}
                            onChange={(event) =>
                                setKeyword(event.target.value)
                            }
                        />

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={searching}
                        >
                            {searching
                                ? "Searching..."
                                : "Search"}
                        </button>

                        {keyword && (
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={clearSearch}
                            >
                                Clear
                            </button>
                        )}

                    </form>

                    {loading ? (

                        <div className="loading-state">
                            Loading jobs...
                        </div>

                    ) : jobs.length === 0 ? (

                        <div className="empty-state job-empty-state">

                            <h3>
                                No jobs found
                            </h3>

                            <p>
                                Try another search or check
                                back later for new opportunities.
                            </p>

                        </div>

                    ) : (

                        <div className="job-list">

                            {jobs.map((job) => (

                                <div
                                    className="job-card"
                                    key={job.id}
                                >

                                    <div className="job-card-header">

                                        <div>

                                            <h2>
                                                {job.title}
                                            </h2>

                                            <p className="job-company">
                                                {job.company}
                                            </p>

                                        </div>

                                        <span className="job-status">
                                            {job.status}
                                        </span>

                                    </div>

                                    <div className="job-info">

                                        {job.location && (
                                            <span>
                                                📍 {job.location}
                                            </span>
                                        )}

                                        {job.jobType && (
                                            <span>
                                                💼 {job.jobType}
                                            </span>
                                        )}

                                        {job.salary && (
                                            <span>
                                                💰 {job.salary}
                                            </span>
                                        )}

                                    </div>

                                    {job.description && (
                                        <p className="job-description">
                                            {job.description}
                                        </p>
                                    )}

                                    <div className="job-card-footer">

                                        <small>
                                            Posted:{" "}
                                            {formatDate(
                                                job.createdAt
                                            )}
                                        </small>

                                        <button
                                            className="primary-button"
                                            onClick={() =>
                                                openJobDetails(job)
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                    {/* =========================
                        JOB DETAILS MODAL
                       ========================= */}

                    {selectedJob && (

                        <div
                            className="modal-overlay"
                            onClick={closeJobDetails}
                        >

                            <div
                                className="job-details-modal"
                                onClick={(event) =>
                                    event.stopPropagation()
                                }
                            >

                                <button
                                    className="modal-close"
                                    onClick={closeJobDetails}
                                >
                                    ×
                                </button>

                                <h2>
                                    {selectedJob.title}
                                </h2>

                                <p className="modal-company">
                                    {selectedJob.company}
                                </p>

                                <div className="job-modal-info">

                                    {selectedJob.location && (
                                        <div>
                                            <strong>
                                                Location
                                            </strong>

                                            <span>
                                                {selectedJob.location}
                                            </span>
                                        </div>
                                    )}

                                    {selectedJob.jobType && (
                                        <div>
                                            <strong>
                                                Job Type
                                            </strong>

                                            <span>
                                                {selectedJob.jobType}
                                            </span>
                                        </div>
                                    )}

                                    {selectedJob.salary && (
                                        <div>
                                            <strong>
                                                Salary
                                            </strong>

                                            <span>
                                                {selectedJob.salary}
                                            </span>
                                        </div>
                                    )}

                                    <div>
                                        <strong>
                                            Status
                                        </strong>

                                        <span>
                                            {selectedJob.status}
                                        </span>
                                    </div>

                                </div>

                                <div className="job-modal-section">

                                    <h3>
                                        Description
                                    </h3>

                                    <p>
                                        {selectedJob.description ||
                                            "No description provided."}
                                    </p>

                                </div>

                                {selectedJob.requiredSkills && (
                                    <div className="job-modal-section">

                                        <h3>
                                            Required Skills
                                        </h3>

                                        <p>
                                            {selectedJob.requiredSkills}
                                        </p>

                                    </div>
                                )}

                                {/* =========================
                                    APPLICATION SECTION
                                   ========================= */}

                              {selectedJob.status === "ACTIVE" && (
                                  <div className="application-form">

                                        <h3>
                                            Apply for this Job
                                        </h3>

                                        <label>
                                            Cover Letter
                                        </label>

                                        <textarea
                                            value={coverLetter}
                                            onChange={(event) =>
                                                setCoverLetter(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Write a short cover letter explaining why you are a good fit for this job..."
                                            rows="6"
                                        />

                                        <p className="cover-letter-hint">
                                            Introduce yourself and briefly
                                            explain your skills and why
                                            you are interested in this role.
                                        </p>

                                        {applicationMessage && (
                                            <div className="application-message">
                                                {applicationMessage}
                                            </div>
                                        )}

                                    </div>

                                )}

                                <div className="job-modal-actions">

                                    <button
                                        className="secondary-button"
                                        onClick={closeJobDetails}
                                    >
                                        Close
                                    </button>

                                    {selectedJob.status === "ACTIVE" && (
                                        <button
                                            className="primary-button"
                                            onClick={applyForJob}
                                            disabled={applying}
                                        >
                                            {applying
                                                ? "Applying..."
                                                : "Apply Now"}
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default LearnerJobs;