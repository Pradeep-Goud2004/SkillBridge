import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-brand">
                SkillBridge
            </div>

            <div className="navbar-right">
                <span className="welcome-text">
                    Welcome, {user?.name}
                </span>

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;