import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorSkills = () => {
    const [skills, setSkills] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);

    const [skillId, setSkillId] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const [mySkillsResponse, skillsResponse] =
                await Promise.all([
                    api.get("/mentors/my-skills"),
                    api.get("/skills")
                ]);

            setSkills(mySkillsResponse.data);
            setAvailableSkills(skillsResponse.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load skills."
            );
        } finally {
            setLoading(false);
        }
    };

    const addSkill = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            await api.post("/mentors/my-skills", null, {
                params: {
                    skillId,
                    yearsOfExperience,
                    description
                }
            });

            setSuccess("Skill added successfully.");

            setSkillId("");
            setYearsOfExperience("");
            setDescription("");

            await loadData();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to add skill."
            );
        } finally {
            setSaving(false);
        }
    };

    const removeSkill = async (id) => {
        try {
            setError("");

            await api.delete(
                `/mentors/my-skills/${id}`
            );

            await loadData();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to remove skill."
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
                        <h1>My Skills</h1>

                        <p>
                            Showcase the skills and experience
                            you can offer learners.
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

                    <section className="mentor-skill-form-card">

                        <h2>Add Skill</h2>

                        <form
                            onSubmit={addSkill}
                            className="mentor-skill-form"
                        >

                            <div className="form-group">

                                <label>
                                    Skill
                                </label>

                                <select
                                    value={skillId}
                                    onChange={(event) =>
                                        setSkillId(
                                            event.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select a skill
                                    </option>

                                    {availableSkills.map((skill) => (
                                        <option
                                            key={skill.id}
                                            value={skill.id}
                                        >
                                            {skill.name}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Years of Experience
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={yearsOfExperience}
                                    onChange={(event) =>
                                        setYearsOfExperience(
                                            event.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(
                                            event.target.value
                                        )
                                    }
                                    rows="4"
                                    placeholder="Describe your experience with this skill..."
                                />

                            </div>

                            <button
                                type="submit"
                                className="primary-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Adding..."
                                    : "Add Skill"}
                            </button>

                        </form>

                    </section>

                    <section className="mentor-skills-section">

                        <h2>My Skills</h2>

                        {loading ? (

                            <div className="loading-state">
                                Loading skills...
                            </div>

                        ) : skills.length === 0 ? (

                            <div className="empty-state">
                                <h3>
                                    No skills added yet
                                </h3>

                                <p>
                                    Add your professional skills
                                    above.
                                </p>
                            </div>

                        ) : (

                            <div className="mentor-skill-list">

                                {skills.map((skill) => (

                                    <div
                                        className="mentor-skill-card"
                                        key={skill.id}
                                    >

                                        <div>
                                            <h3>
                                                {skill.skillName}
                                            </h3>

                                            <p>
                                                {skill.yearsOfExperience}{" "}
                                                years experience
                                            </p>

                                            {skill.description && (
                                                <span>
                                                    {skill.description}
                                                </span>
                                            )}

                                        </div>

                                        <button
                                            className="danger-button"
                                            onClick={() =>
                                                removeSkill(
                                                    skill.skillId
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

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

export default MentorSkills;