import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorJobs = () => {
    const [jobs, setJobs] = useState([]);

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("FULL_TIME");
    const [description, setDescription] = useState("");
    const [requiredSkills, setRequiredSkills] = useState("");
    const [salary, setSalary] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
                "Failed to load your jobs."
            );
        } finally {
            setLoading(false);
        }
    };

    const createJob = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            await api.post("/jobs", {
                title,
                company,
                location,
                jobType,
                description,
                requiredSkills,
                salary
            });

            setSuccess("Job created successfully.");

            setTitle("");
            setCompany("");
            setLocation("");
            setJobType("FULL_TIME");
            setDescription("");
            setRequiredSkills("");
            setSalary("");

            await loadJobs();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create job."
            );
        } finally {
            setSaving(false);
        }
    };

    const closeJob = async (jobId) => {
        try {
            setError("");

            await api.put(`/jobs/${jobId}/close`);

            await loadJobs();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to close job."
            );
        }
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <MentorSidebar />

                <main className="dashboard-content">

                    <div className="profile-header">
                        <h1>Jobs</h1>

                        <p>
                            Create and manage opportunities for
                            SkillBridge learners.
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

                    <section className="mentor-job-form-card">

                        <h2>Post a Job</h2>

                        <form
                            className="mentor-job-form"
                            onSubmit={createJob}
                        >

                            <div className="form-grid">

                                <div className="form-group">
                                    <label>Job Title</label>

                                    <input
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Java Backend Developer"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Company</label>

                                    <input
                                        value={company}
                                        onChange={(event) =>
                                            setCompany(
                                                event.target.value
                                            )
                                        }
                                        placeholder="SkillBridge Technologies"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Location</label>

                                    <input
                                        value={location}
                                        onChange={(event) =>
                                            setLocation(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Hyderabad"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Job Type</label>

                                    <select
                                        value={jobType}
                                        onChange={(event) =>
                                            setJobType(
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="FULL_TIME">
                                            FULL_TIME
                                        </option>

                                        <option value="PART_TIME">
                                            PART_TIME
                                        </option>

                                        <option value="CONTRACT">
                                            CONTRACT
                                        </option>

                                        <option value="INTERNSHIP">
                                            INTERNSHIP
                                        </option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Salary</label>

                                    <input
                                        value={salary}
                                        onChange={(event) =>
                                            setSalary(
                                                event.target.value
                                            )
                                        }
                                        placeholder="₹8 - ₹12 LPA"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Required Skills</label>

                                    <input
                                        value={requiredSkills}
                                        onChange={(event) =>
                                            setRequiredSkills(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Java, Spring Boot, MySQL"
                                    />
                                </div>

                            </div>

                            <div className="form-group">
                                <label>Description</label>

                                <textarea
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(
                                            event.target.value
                                        )
                                    }
                                    rows="5"
                                    placeholder="Describe the job..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="primary-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Posting..."
                                    : "Post Job"}
                            </button>

                        </form>

                    </section>

                    <section className="mentor-jobs-section">

                        <h2>My Job Postings</h2>

                        {loading ? (

                            <div className="loading-state">
                                Loading jobs...
                            </div>

                        ) : jobs.length === 0 ? (

                            <div className="empty-state">
                                <h3>
                                    No jobs posted yet
                                </h3>

                                <p>
                                    Create your first job posting above.
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
                                                    📍{" "}
                                                    {job.location}
                                                </span>
                                            )}

                                            {job.jobType && (
                                                <span>
                                                    💼{" "}
                                                    {job.jobType}
                                                </span>
                                            )}

                                            {job.salary && (
                                                <span>
                                                    💰{" "}
                                                    {job.salary}
                                                </span>
                                            )}

                                        </div>

                                        <p className="job-description">
                                            {job.description}
                                        </p>

                                        {job.requiredSkills && (
                                            <p className="job-description">
                                                <strong>
                                                    Skills:
                                                </strong>{" "}
                                                {job.requiredSkills}
                                            </p>
                                        )}

                                        {job.status === "ACTIVE" && (
                                            <button
                                                className="danger-button"
                                                onClick={() =>
                                                    closeJob(job.id)
                                                }
                                            >
                                                Close Job
                                            </button>
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

export default MentorJobs;