import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

const LearnerDashboard = () => {

    const { user } = useAuth();

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    <h1>
                        Learner Dashboard
                    </h1>

                    <p className="dashboard-welcome">
                        Welcome back, {user?.name}! 👋
                    </p>

                    <div className="dashboard-cards">

                        <div className="dashboard-card">
                            <h3>My Skills</h3>
                            <p>
                                Manage your skills and
                                proficiency levels.
                            </p>
                        </div>

                        <div className="dashboard-card">
                            <h3>Find Mentors</h3>
                            <p>
                                Discover mentors who can
                                help you grow.
                            </p>
                        </div>

                        <div className="dashboard-card">
                            <h3>Sessions</h3>
                            <p>
                                View your upcoming and
                                completed sessions.
                            </p>
                        </div>

                        <div className="dashboard-card">
                            <h3>Jobs</h3>
                            <p>
                                Explore job opportunities
                                matching your skills.
                            </p>
                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default LearnerDashboard;