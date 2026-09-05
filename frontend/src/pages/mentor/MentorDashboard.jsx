import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import { useAuth } from "../../context/AuthContext";

const MentorDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <MentorSidebar />

                <main className="dashboard-content">

                    <div className="mentor-dashboard-header">

                        <div>
                            <h1>
                                Welcome back, {user?.name}! 👋
                            </h1>

                            <p>
                                Manage your mentoring activities
                                and help learners grow.
                            </p>
                        </div>

                    </div>

                    <div className="mentor-stat-grid">

                        <div className="mentor-stat-card">
                            <div className="mentor-stat-icon">
                                👥
                            </div>

                            <div>
                                <h3>
                                    Mentorship Requests
                                </h3>

                                <p>
                                    Manage learner requests
                                </p>
                            </div>
                        </div>

                        <div className="mentor-stat-card">
                            <div className="mentor-stat-icon">
                                📅
                            </div>

                            <div>
                                <h3>
                                    Sessions
                                </h3>

                                <p>
                                    Manage your mentoring sessions
                                </p>
                            </div>
                        </div>

                        <div className="mentor-stat-card">
                            <div className="mentor-stat-icon">
                                💼
                            </div>

                            <div>
                                <h3>
                                    Jobs
                                </h3>

                                <p>
                                    Create and manage job postings
                                </p>
                            </div>
                        </div>

                        <div className="mentor-stat-card">
                            <div className="mentor-stat-icon">
                                ⭐
                            </div>

                            <div>
                                <h3>
                                    Reviews
                                </h3>

                                <p>
                                    View learner feedback
                                </p>
                            </div>
                        </div>

                    </div>

                    <section className="mentor-quick-section">

                        <h2>
                            Quick Actions
                        </h2>

                        <div className="mentor-quick-grid">

                            <a
                                href="/mentor/requests"
                                className="mentor-action-card"
                            >
                                <span>
                                    👥
                                </span>

                                <div>
                                    <h3>
                                        Mentorship Requests
                                    </h3>

                                    <p>
                                        Review requests from learners.
                                    </p>
                                </div>
                            </a>

                            <a
                                href="/mentor/sessions"
                                className="mentor-action-card"
                            >
                                <span>
                                    📅
                                </span>

                                <div>
                                    <h3>
                                        Manage Sessions
                                    </h3>

                                    <p>
                                        Schedule and manage sessions.
                                    </p>
                                </div>
                            </a>

                            <a
                                href="/mentor/jobs"
                                className="mentor-action-card"
                            >
                                <span>
                                    💼
                                </span>

                                <div>
                                    <h3>
                                        Post a Job
                                    </h3>

                                    <p>
                                        Create opportunities for learners.
                                    </p>
                                </div>
                            </a>

                            <a
                                href="/mentor/profile"
                                className="mentor-action-card"
                            >
                                <span>
                                    👤
                                </span>

                                <div>
                                    <h3>
                                        Update Profile
                                    </h3>

                                    <p>
                                        Keep your mentor profile updated.
                                    </p>
                                </div>
                            </a>

                        </div>

                    </section>

                    <section className="mentor-info-card">

                        <h2>
                            Your Role as a Mentor
                        </h2>

                        <p>
                            As a SkillBridge mentor, you can connect
                            with learners, share your professional
                            experience, conduct mentorship sessions,
                            create job opportunities, and help
                            learners develop their careers.
                        </p>

                    </section>

                </main>

            </div>

        </div>
    );
};

export default MentorDashboard;