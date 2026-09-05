import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

const LearnerSkills = () => {

    const [mySkills, setMySkills] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);

    const [selectedSkill, setSelectedSkill] = useState("");
    const [proficiencyLevel, setProficiencyLevel] = useState("");

    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {

        try {

            setLoading(true);
            setError("");

            const [mySkillsResponse, allSkillsResponse] =
                await Promise.all([
                    api.get("/skills/my"),
                    api.get("/skills"),
                ]);

            setMySkills(mySkillsResponse.data);
            setAvailableSkills(allSkillsResponse.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load skills"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleAddSkill = async (event) => {

        event.preventDefault();

        if (!selectedSkill || !proficiencyLevel) {
            setError("Please select a skill and proficiency level.");
            return;
        }

        try {

            setAdding(true);
            setError("");
            setMessage("");

            const response = await api.post(
                `/skills/my/${selectedSkill}`,
                null,
                {
                    params: {
                        proficiencyLevel,
                    },
                }
            );

            setMySkills((previous) => [
                ...previous,
                response.data,
            ]);

            setSelectedSkill("");
            setProficiencyLevel("");

            setMessage("Skill added successfully.");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to add skill"
            );

        } finally {

            setAdding(false);
        }
    };

    const handleRemoveSkill = async (skillId) => {

        try {

            setError("");
            setMessage("");

            await api.delete(`/skills/my/${skillId}`);

            setMySkills((previous) =>
                previous.filter(
                    (skill) => skill.skillId !== skillId
                )
            );

            setMessage("Skill removed successfully.");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to remove skill"
            );
        }
    };

    const isSkillAlreadyAdded = (skillId) => {

        return mySkills.some(
            (skill) => skill.skillId === skillId
        );
    };

    if (loading) {

        return (
            <div className="dashboard-layout">

                <Navbar />

                <div className="dashboard-body">

                    <Sidebar />

                    <main className="dashboard-content">
                        <p>Loading skills...</p>
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

                        <h1>My Skills</h1>

                        <p>
                            Manage your technical skills
                            and proficiency levels.
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

                    {/* Add Skill */}

                    <div className="skills-card">

                        <h2>Add a Skill</h2>

                        <form
                            className="skill-form"
                            onSubmit={handleAddSkill}
                        >

                            <div className="form-group">

                                <label>
                                    Select Skill
                                </label>

                                <select
                                    value={selectedSkill}
                                    onChange={(event) =>
                                        setSelectedSkill(
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        -- Select a skill --
                                    </option>

                                    {availableSkills.map((skill) => (

                                        <option
                                            key={skill.id}
                                            value={skill.id}
                                            disabled={isSkillAlreadyAdded(
                                                skill.id
                                            )}
                                        >
                                            {skill.name}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Proficiency Level
                                </label>

                                <select
                                    value={proficiencyLevel}
                                    onChange={(event) =>
                                        setProficiencyLevel(
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        -- Select level --
                                    </option>

                                    <option value="BEGINNER">
                                        Beginner
                                    </option>

                                    <option value="INTERMEDIATE">
                                        Intermediate
                                    </option>

                                    <option value="ADVANCED">
                                        Advanced
                                    </option>

                                    <option value="EXPERT">
                                        Expert
                                    </option>

                                </select>

                            </div>

                            <button
                                type="submit"
                                className="auth-button add-skill-button"
                                disabled={adding}
                            >
                                {adding
                                    ? "Adding..."
                                    : "Add Skill"}
                            </button>

                        </form>

                    </div>

                    {/* My Skills */}

                    <div className="skills-card">

                        <div className="skills-card-header">

                            <h2>My Skills</h2>

                            <span>
                                {mySkills.length} skill
                                {mySkills.length !== 1
                                    ? "s"
                                    : ""}
                            </span>

                        </div>

                        {mySkills.length === 0 ? (

                            <div className="empty-state">

                                <p>
                                    You haven't added any
                                    skills yet.
                                </p>

                            </div>

                        ) : (

                            <div className="skills-list">

                                {mySkills.map((skill) => (

                                    <div
                                        className="skill-item"
                                        key={skill.id}
                                    >

                                        <div className="skill-info">

                                            <h3>
                                                {skill.skillName}
                                            </h3>

                                            {skill.skillCategory && (
                                                <p>
                                                    {
                                                        skill.skillCategory
                                                    }
                                                </p>
                                            )}

                                            {skill.skillDescription && (
                                                <small>
                                                    {
                                                        skill.skillDescription
                                                    }
                                                </small>
                                            )}

                                        </div>

                                        <div className="skill-actions">

                                            <span className="proficiency-badge">
                                                {
                                                    skill.proficiencyLevel
                                                }
                                            </span>

                                            <button
                                                className="remove-skill-button"
                                                onClick={() =>
                                                    handleRemoveSkill(
                                                        skill.skillId
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default LearnerSkills;