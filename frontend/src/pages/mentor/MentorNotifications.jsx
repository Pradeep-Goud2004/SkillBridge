import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MentorSidebar from "../../components/MentorSidebar";
import api from "../../services/api";

const MentorNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const [loading, setLoading] = useState(true);
    const [markingRead, setMarkingRead] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {
        loadNotifications();
    }, [showUnreadOnly]);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            setError("");

            const notificationsResponse =
                showUnreadOnly
                    ? await api.get("/notifications/unread")
                    : await api.get("/notifications");

            setNotifications(
                notificationsResponse.data
            );

            const countResponse = await api.get(
                "/notifications/unread/count"
            );

            setUnreadCount(countResponse.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load notifications."
            );
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            setMarkingRead(id);
            setError("");

            await api.put(
                `/notifications/${id}/read`
            );

            await loadNotifications();

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to mark notification as read."
            );
        } finally {
            setMarkingRead(null);
        }
    };

    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-body">

                <MentorSidebar />

                <main className="dashboard-content">

                    <div className="notification-page-header">

                        <div>
                            <h1>Notifications</h1>

                            <p>
                                Stay updated with your
                                SkillBridge activities.
                            </p>
                        </div>

                        <div className="unread-count-card">

                            <span>
                                Unread
                            </span>

                            <strong>
                                {unreadCount}
                            </strong>

                        </div>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="notification-filters">

                        <button
                            className={
                                !showUnreadOnly
                                    ? "notification-filter active"
                                    : "notification-filter"
                            }
                            onClick={() =>
                                setShowUnreadOnly(false)
                            }
                        >
                            All Notifications
                        </button>

                        <button
                            className={
                                showUnreadOnly
                                    ? "notification-filter active"
                                    : "notification-filter"
                            }
                            onClick={() =>
                                setShowUnreadOnly(true)
                            }
                        >
                            Unread

                            {unreadCount > 0 && (
                                <span className="filter-count">
                                    {unreadCount}
                                </span>
                            )}

                        </button>

                    </div>

                    {loading ? (

                        <div className="loading-state">
                            Loading notifications...
                        </div>

                    ) : notifications.length === 0 ? (

                        <div className="empty-state notification-empty-state">

                            <div className="notification-empty-icon">
                                🔔
                            </div>

                            <h3>
                                {showUnreadOnly
                                    ? "No unread notifications"
                                    : "No notifications yet"}
                            </h3>

                            <p>
                                {showUnreadOnly
                                    ? "You're all caught up!"
                                    : "Your SkillBridge notifications will appear here."}
                            </p>

                        </div>

                    ) : (

                        <div className="notification-list">

                            {notifications.map(
                                (notification) => (

                                    <div
                                        key={
                                            notification.id
                                        }
                                        className={
                                            notification.read
                                                ? "notification-card"
                                                : "notification-card unread"
                                        }
                                    >

                                        <div className="notification-icon">
                                            🔔
                                        </div>

                                        <div className="notification-content">

                                            <div className="notification-top">

                                                <div>

                                                    {!notification.read && (
                                                        <span className="unread-dot"></span>
                                                    )}

                                                    <h3>
                                                        {notification.title ||
                                                            "SkillBridge Notification"}
                                                    </h3>

                                                </div>

                                                {!notification.read && (
                                                    <span className="unread-label">
                                                        NEW
                                                    </span>
                                                )}

                                            </div>

                                            <p>
                                                {
                                                    notification.message
                                                }
                                            </p>

                                            <div className="notification-footer">

                                                <span>
                                                    {notification.createdAt
                                                        ? new Date(
                                                            notification.createdAt
                                                        ).toLocaleString()
                                                        : "Date unavailable"}
                                                </span>

                                                {!notification.read && (
                                                    <button
                                                        className="mark-read-button"
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification.id
                                                            )
                                                        }
                                                        disabled={
                                                            markingRead ===
                                                            notification.id
                                                        }
                                                    >
                                                        {markingRead ===
                                                        notification.id
                                                            ? "Marking..."
                                                            : "Mark as Read"}
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
};

export default MentorNotifications;