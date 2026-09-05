import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const LearnerProfile = () => {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        education: "",
        experience: "",
        location: "",
        profileImageUrl: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/learners/me");

            setProfile(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setMessage("");
            setError("");

            const response = await api.put(
                "/learners/me",
                {
                    bio: profile.bio,
                    education: profile.education,
                    experience: profile.experience,
                    location: profile.location,
                    profileImageUrl: profile.profileImageUrl,
                }
            );

            setProfile(response.data);

            setMessage("Profile updated successfully.");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to update profile"
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-layout">
                <Navbar />

                <div className="dashboard-body">
                    <Sidebar />

                    <main className="dashboard-content">
                        <p>Loading profile...</p>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <Sidebar />

                <main className="dashboard-content">

                    <div className="profile-header">
                        <h1>My Profile</h1>

                        <p>
                            Manage your SkillBridge learner profile.
                        </p>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}

                    <div className="profile-card">

                        <div className="profile-basic-info">

                            <div className="profile-avatar">
                                {profile.name
                                    ? profile.name.charAt(0).toUpperCase()
                                    : "L"}
                            </div>

                            <div>
                                <h2>{profile.name}</h2>

                                <p>{profile.email}</p>

                                {profile.phone && (
                                    <p>{profile.phone}</p>
                                )}
                            </div>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">

                                <label>Bio</label>

                                <textarea
                                    name="bio"
                                    value={profile.bio || ""}
                                    onChange={handleChange}
                                    placeholder="Tell mentors about yourself"
                                    rows="4"
                                />

                            </div>

                            <div className="form-group">

                                <label>Education</label>

                                <input
                                    type="text"
                                    name="education"
                                    value={profile.education || ""}
                                    onChange={handleChange}
                                    placeholder="Example: B.Tech Computer Science"
                                />

                            </div>

                            <div className="form-group">

                                <label>Experience</label>

                                <input
                                    type="text"
                                    name="experience"
                                    value={profile.experience || ""}
                                    onChange={handleChange}
                                    placeholder="Example: Fresher / 2 years"
                                />

                            </div>

                            <div className="form-group">

                                <label>Location</label>

                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location || ""}
                                    onChange={handleChange}
                                    placeholder="Example: Hyderabad"
                                />

                            </div>

                            <div className="form-group">

                                <label>Profile Image URL</label>

                                <input
                                    type="url"
                                    name="profileImageUrl"
                                    value={profile.profileImageUrl || ""}
                                    onChange={handleChange}
                                    placeholder="https://example.com/profile.jpg"
                                />

                            </div>

                            <button
                                type="submit"
                                className="auth-button profile-save-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Profile"}
                            </button>

                        </form>

                    </div>

                </main>

            </div>

        </div>
    );
};

export default LearnerProfile;