import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const LearnerApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/applications/my");

            setApplications(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load applications."
            );
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "ACCEPTED":
                return "application-status accepted";

            case "REJECTED":
                return "application-status rejected";

            case "PENDING":
            default:
                return "application-status pending";
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
                        <h1>My Applications</h1>

                        <p>
                            Track the jobs you have applied for
                            and monitor your application status.
                        </p>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {loading ? (

                        <div className="loading-state">
                            Loading applications...
                        </div>

                    ) : applications.length === 0 ? (

                        <div className="empty-state">
                            <h3>
                                No applications yet
                            </h3>

                            <p>
                                Your job applications will
                                appear here after you apply
                                for a job.
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
                                                {application.jobTitle}
                                            </h2>

                                            <p className="application-company">
                                                {application.company}
                                            </p>
                                        </div>

                                        <span
                                            className={getStatusClass(
                                                application.status
                                            )}
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

                                    <div className="application-details">

                                        <div>
                                            <span>
                                                Application ID
                                            </span>

                                            <strong>
                                                #{application.id}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>
                                                Applied On
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    application.createdAt
                                                )}
                                            </strong>
                                        </div>

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

export default LearnerApplications;