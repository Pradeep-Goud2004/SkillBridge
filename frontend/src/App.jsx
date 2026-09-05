import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import LearnerDashboard from "./pages/learner/LearnerDashboard";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LearnerProfile from "./pages/learner/LearnerProfile";
import LearnerSkills from "./pages/learner/LearnerSkills";
import MentorSearch from "./pages/learner/MentorSearch";
import MentorshipRequests from "./pages/learner/MentorshipRequests";
import LearnerSessions from "./pages/learner/LearnerSessions";
import LearnerReviews from "./pages/learner/LearnerReviews";
import LearnerJobs from "./pages/learner/LearnerJobs";
import LearnerApplications from "./pages/learner/LearnerApplications";
import LearnerNotifications from "./pages/learner/LearnerNotifications";
import MentorProfile from "./pages/mentor/MentorProfile";
import MentorSkills from "./pages/mentor/MentorSkills";
import MentorRequests from "./pages/mentor/MentorRequests";
import MentorSessions from "./pages/mentor/MentorSessions";
import MentorJobs from "./pages/mentor/MentorJobs";
import MentorApplications from "./pages/mentor/MentorApplications";
import MentorReviews from "./pages/mentor/MentorReviews";
import MentorNotifications from "./pages/mentor/MentorNotifications";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminJobs from "./pages/admin/AdminJobs";


import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const App = () => {

    return (
        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/learner/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["LEARNER"]}
                    >
                        <LearnerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learner/profile"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <LearnerProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["MENTOR"]}
                    >
                        <MentorDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={["ADMIN"]}
                    >
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={
                    <Navigate to="/login" replace />
                }
            />

            <Route
                path="/learner/skills"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <LearnerSkills />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learner/mentors"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <MentorSearch />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learner/requests"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <MentorshipRequests />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learner/sessions"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <LearnerSessions />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/learner/reviews"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <LearnerReviews />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/learner/jobs"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <LearnerJobs />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learner/applications"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <LearnerApplications />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/learner/notifications"
                element={
                    <ProtectedRoute allowedRoles={["LEARNER"]}>
                        <LearnerNotifications />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/mentor/profile"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorProfile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/skills"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorSkills />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/requests"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorRequests />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/sessions"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorSessions />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/jobs"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorJobs />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/applications"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorApplications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/reviews"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorReviews />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/mentor/notifications"
                element={
                    <ProtectedRoute allowedRoles={["MENTOR"]}>
                        <MentorNotifications />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
            />

            <Route
                path="/admin/users"
                element={<AdminUsers />}
            />

            <Route
                path="/admin/skills"
                element={<AdminSkills />}
            />

            <Route
                path="/admin/jobs"
                element={<AdminJobs />}
            />

        </Routes>
    );
};

export default App;