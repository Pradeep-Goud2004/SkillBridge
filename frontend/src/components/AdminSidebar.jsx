import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Users", path: "/admin/users" },
        { name: "Skills", path: "/admin/skills" },
        { name: "Jobs", path: "/admin/jobs" }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-title">Admin Panel</div>

            <nav className="sidebar-menu">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;