import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/learner/dashboard",
        },
        {
            name: "My Profile",
            path: "/learner/profile",
        },
        {
            name: "My Skills",
            path: "/learner/skills",
        },
        {
            name: "Find Mentors",
            path: "/learner/mentors",
        },
        {
            name: "Mentorship Requests",
            path: "/learner/requests",
        },
        {
            name: "Sessions",
            path: "/learner/sessions",
        },
        {
            name: "Reviews",
            path: "/learner/reviews",
        },
        {
            name: "Jobs",
            path: "/learner/jobs",
        },
        {
            name: "Applications",
            path: "/learner/applications",
        },
        {
            name: "Notifications",
            path: "/learner/notifications",
        },
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-title">
                Learner Menu
            </div>

            <nav>
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

export default Sidebar;