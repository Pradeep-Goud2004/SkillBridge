import { NavLink } from "react-router-dom";

const MentorSidebar = () => {
    const menuItems = [
        {
            name: "Dashboard",
            path: "/mentor/dashboard"
        },
        {
            name: "My Profile",
            path: "/mentor/profile"
        },
        {
            name: "My Skills",
            path: "/mentor/skills"
        },
        {
            name: "Mentorship Requests",
            path: "/mentor/requests"
        },
        {
            name: "Sessions",
            path: "/mentor/sessions"
        },
        {
            name: "Jobs",
            path: "/mentor/jobs"
        },
        {
            name: "Applications",
            path: "/mentor/applications"
        },
        {
            name: "Reviews",
            path: "/mentor/reviews"
        },
        {
            name: "Notifications",
            path: "/mentor/notifications"
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-title">
                Mentor Panel
            </div>

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

export default MentorSidebar;