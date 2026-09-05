import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        experience: "",
        company: "",
        designation: "",
        location: "",
        profileImageUrl: "",
        linkedinUrl: "",
        githubUrl: ""
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
            const response = await api.get("/mentors/me");

            setProfile(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        });
    };

    const updateProfile = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setMessage("");
            setError("");

            const response = await api.put(
                "/mentors/me",
                profile
            );

            setProfile(response.data);

            setMessage("Profile updated successfully.");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="loading-state">Loading profile...</div>;
    }

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <MentorSidebar />

                <main className="dashboard-content">

                    <div className="profile-header">
                        <h1>My Profile</h1>
                        <p>
                            Manage your professional mentor profile.
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

                    <form
                        className="profile-form-card mentor-profile-form"
                        onSubmit={updateProfile}
                    >

                        <div className="form-grid">

                            <div className="form-group">
                                <label>Name</label>

                                <input
                                    name="name"
                                    value={profile.name || ""}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>

                                <input
                                    name="email"
                                    value={profile.email || ""}
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>

                                <input
                                    name="phone"
                                    value={profile.phone || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Company</label>

                                <input
                                    name="company"
                                    value={profile.company || ""}
                                    onChange={handleChange}
                                    placeholder="Company name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Designation</label>

                                <input
                                    name="designation"
                                    value={profile.designation || ""}
                                    onChange={handleChange}
                                    placeholder="Senior Java Developer"
                                />
                            </div>

                            <div className="form-group">
                                <label>Experience</label>

                                <input
                                    name="experience"
                                    value={profile.experience || ""}
                                    onChange={handleChange}
                                    placeholder="5 years"
                                />
                            </div>

                            <div className="form-group">
                                <label>Location</label>

                                <input
                                    name="location"
                                    value={profile.location || ""}
                                    onChange={handleChange}
                                    placeholder="Hyderabad"
                                />
                            </div>

                            <div className="form-group">
                                <label>Profile Image URL</label>

                                <input
                                    name="profileImageUrl"
                                    value={profile.profileImageUrl || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>LinkedIn URL</label>

                                <input
                                    name="linkedinUrl"
                                    value={profile.linkedinUrl || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>GitHub URL</label>

                                <input
                                    name="githubUrl"
                                    value={profile.githubUrl || ""}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Bio</label>

                            <textarea
                                name="bio"
                                value={profile.bio || ""}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Tell learners about your professional experience..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Update Profile"}
                        </button>

                    </form>

                </main>

            </div>

        </div>
    );
};

export default MentorProfile;