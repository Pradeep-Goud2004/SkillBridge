import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../services/api";

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await api.get("/admin/dashboard");
            setDashboard(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <AdminSidebar />

            <main className="dashboard-content">
                <div className="page-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Overview of the SkillBridge platform.</p>
                    </div>
                </div>

                {loading && <p>Loading dashboard...</p>}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {dashboard && (
                    <div className="stats-grid">

                        <div className="stat-card">
                            <h3>Total Users</h3>
                            <p>{dashboard.totalUsers}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Learners</h3>
                            <p>{dashboard.totalLearners}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Mentors</h3>
                            <p>{dashboard.totalMentors}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Admins</h3>
                            <p>{dashboard.totalAdmins}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Total Jobs</h3>
                            <p>{dashboard.totalJobs}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Active Jobs</h3>

                            <p>{dashboard.activeJobs}</p>
                        </div>

                        <div className="stat-card">
                            <h3>Closed Jobs</h3>
                            <p>{dashboard.closedJobs}</p>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;