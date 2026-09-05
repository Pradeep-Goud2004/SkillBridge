import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import api from "../../services/api";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get("/admin/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId, userName) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${userName}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/admin/users/${userId}`);

            setUsers((previousUsers) =>
                previousUsers.filter(
                    (user) => user.id !== userId
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete user."
            );
        }
    };

    return (
        <div className="dashboard-layout">
            <AdminSidebar />

            <main className="dashboard-content">

                <div className="page-header">
                    <div>
                        <h1>User Management</h1>
                        <p>View and manage SkillBridge users.</p>
                    </div>
                </div>

                {loading && <p>Loading users...</p>}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {!loading && users.length === 0 && (
                    <div className="empty-state">
                        No users found.
                    </div>
                )}

                {!loading && users.length > 0 && (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.phone || "-"}
                                        </td>
                                        <td>
                                            <span className="role-badge">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>
                                            {user.createdAt
                                                ? new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td>
                                            <button
                                                className="danger-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id,
                                                        user.name
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminUsers;