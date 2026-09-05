import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../services/api";

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get("/jobs");
            setJobs(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load jobs.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseJob = async (jobId) => {
        const confirmed = window.confirm(
            "Are you sure you want to close this job?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.put(`/admin/jobs/${jobId}/close`);

            setJobs((previousJobs) =>
                previousJobs.map((job) =>
                    job.id === jobId
                        ? { ...job, status: "CLOSED" }
                        : job
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to close job."
            );
        }
    };

    return (
        <div className="dashboard-layout">
            <AdminSidebar />

            <main className="dashboard-content">

                <div className="page-header">
                    <div>
                        <h1>Job Management</h1>
                        <p>View and manage jobs posted on SkillBridge.</p>
                    </div>
                </div>

                {loading && <p>Loading jobs...</p>}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!loading && jobs.length === 0 && (
                    <div className="empty-state">
                        No jobs found.
                    </div>
                )}

                {!loading && jobs.length > 0 && (
                    <div className="admin-table-container">
                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Company</th>
                                    <th>Location</th>
                                    <th>Job Type</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id}>

                                        <td>{job.id}</td>

                                        <td>{job.title}</td>

                                        <td>{job.company}</td>

                                        <td>{job.location}</td>

                                        <td>
                                            {job.jobType || "-"}
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    job.status === "ACTIVE"
                                                        ? "status-active"
                                                        : "status-closed"
                                                }
                                            >
                                                {job.status}
                                            </span>
                                        </td>

                                        <td>
                                            {job.createdAt
                                                ? new Date(
                                                    job.createdAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td>
                                            {job.status === "ACTIVE" ? (
                                                <button
                                                    className="danger-button"
                                                    onClick={() =>
                                                        handleCloseJob(
                                                            job.id
                                                        )
                                                    }
                                                >
                                                    Close Job
                                                </button>
                                            ) : (
                                                <span>
                                                    Closed
                                                </span>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminJobs;