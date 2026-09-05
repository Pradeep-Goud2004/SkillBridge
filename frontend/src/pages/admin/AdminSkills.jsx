import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../services/api";

const AdminSkills = () => {
    const [skills, setSkills] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await api.get("/skills");
            setSkills(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load skills.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddSkill = async (event) => {
        event.preventDefault();

        if (!name.trim() || !category.trim()) {
            alert("Skill name and category are required.");
            return;
        }

        try {
            setSaving(true);

            const response = await api.post("/skills", {
                name: name.trim(),
                description: description.trim(),
                category: category.trim()
            });

            setSkills((previousSkills) => [
                ...previousSkills,
                response.data
            ]);

            setName("");
            setDescription("");
            setCategory("");

            alert("Skill added successfully.");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add skill."
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <AdminSidebar />

            <main className="dashboard-content">

                <div className="page-header">
                    <div>
                        <h1>Skill Management</h1>
                        <p>Manage skills available on SkillBridge.</p>
                    </div>
                </div>

                <div className="admin-form-card">
                    <h2>Add New Skill</h2>

                    <form onSubmit={handleAddSkill}>

                        <div className="form-group">
                            <label>Skill Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Example: Spring Boot"
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(event) =>
                                    setCategory(event.target.value)
                                }
                                placeholder="Example: Backend"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="Enter skill description"
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >
                            {saving ? "Adding..." : "Add Skill"}
                        </button>

                    </form>
                </div>

                <div className="admin-section">

                    <h2>Available Skills</h2>

                    {loading && <p>Loading skills...</p>}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {!loading && skills.length === 0 && (
                        <div className="empty-state">
                            No skills found.
                        </div>
                    )}

                    {!loading && skills.length > 0 && (
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {skills.map((skill) => (
                                        <tr key={skill.id}>
                                            <td>{skill.id}</td>
                                            <td>{skill.name}</td>
                                            <td>
                                                <span className="role-badge">
                                                    {skill.category}
                                                </span>
                                            </td>
                                            <td>
                                                {skill.description || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>

            </main>
        </div>
    );
};

export default AdminSkills;