import React, { useState } from 'react';
import { BsBell, BsBellSlash, BsCheckCircle, BsTrash, BsFilter, BsClock, BsExclamationCircle, BsInfoCircle } from 'react-icons/bs';

const NotificationsView = ({ notifications = [], onMarkAsRead, onDeleteNotification, onClearAll }) => {
    const [filter, setFilter] = useState('all'); // all, unread, read

    // Sample notifications if none provided
    const sampleNotifications = [
        {
            id: 1,
            type: 'order',
            title: 'New Order Received',
            message: 'Table 5 placed a new order - $45.50',
            timestamp: new Date(Date.now() - 5 * 60000),
            read: false,
            icon: 'order'
        },
        {
            id: 2,
            type: 'warning',
            title: 'Low Stock Alert',
            message: 'Burger ingredients running low (3 remaining)',
            timestamp: new Date(Date.now() - 30 * 60000),
            read: false,
            icon: 'warning'
        },
        {
            id: 3,
            type: 'success',
            title: 'Payment Completed',
            message: 'Table 8 paid $78.90 successfully',
            timestamp: new Date(Date.now() - 45 * 60000),
            read: true,
            icon: 'success'
        },
        {
            id: 4,
            type: 'info',
            title: 'Daily Report Ready',
            message: 'Your daily sales report is available',
            timestamp: new Date(Date.now() - 2 * 60 * 60000),
            read: true,
            icon: 'info'
        },
        {
            id: 5,
            type: 'order',
            title: 'Order Ready',
            message: 'Order #1234 for Table 3 is ready to serve',
            timestamp: new Date(Date.now() - 10 * 60000),
            read: false,
            icon: 'order'
        }
    ];

    const notificationData = notifications.length > 0 ? notifications : sampleNotifications;

    // Filter notifications
    const filteredNotifications = notificationData.filter(notification => {
        if (filter === 'unread') return !notification.read;
        if (filter === 'read') return notification.read;
        return true;
    });

    const unreadCount = notificationData.filter(n => !n.read).length;

    // Get relative time
    const getRelativeTime = (timestamp) => {
        const now = new Date();
        const diff = now - new Date(timestamp);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    // Get icon based on type
    const getIcon = (type) => {
        switch (type) {
            case 'order':
                return <BsBell />;
            case 'warning':
                return <BsExclamationCircle />;
            case 'success':
                return <BsCheckCircle />;
            case 'info':
                return <BsInfoCircle />;
            default:
                return <BsBell />;
        }
    };

    // Get notification class based on type
    const getNotificationClass = (notification) => {
        const baseClass = 'notification-item';
        const typeClass = `notification-${notification.type}`;
        const readClass = notification.read ? 'read' : 'unread';
        return `${baseClass} ${typeClass} ${readClass}`;
    };

    return (
        <div className="view-container full-width">
            <div className="page-card">
                {/* Header */}
                <div className="page-header">
                    <div>
                        <h1>Notifications</h1>
                        <p className="page-subtitle">
                            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                        </p>
                    </div>
                    <div className="header-actions">
                        {unreadCount > 0 && (
                            <button 
                                className="action-btn-secondary" 
                                onClick={() => onMarkAsRead && onMarkAsRead('all')}
                                data-tooltip="Mark all as read"
                            >
                                <BsCheckCircle /> Mark all read
                            </button>
                        )}
                        {notificationData.length > 0 && (
                            <button 
                                className="action-btn-danger" 
                                onClick={() => onClearAll && onClearAll()}
                                data-tooltip="Clear all notifications"
                            >
                                <BsTrash /> Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="notification-filters">
                    <button 
                        className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        <BsFilter /> All ({notificationData.length})
                    </button>
                    <button 
                        className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
                        onClick={() => setFilter('unread')}
                    >
                        <BsBell /> Unread ({unreadCount})
                    </button>
                    <button 
                        className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
                        onClick={() => setFilter('read')}
                    >
                        <BsBellSlash /> Read ({notificationData.length - unreadCount})
                    </button>
                </div>

                {/* Notifications List */}
                <div className="notifications-container">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map(notification => (
                            <div 
                                key={notification.id} 
                                className={getNotificationClass(notification)}
                            >
                                <div className="notification-icon">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="notification-content">
                                    <div className="notification-header">
                                        <h4>{notification.title}</h4>
                                        <span className="notification-time">
                                            <BsClock /> {getRelativeTime(notification.timestamp)}
                                        </span>
                                    </div>
                                    <p className="notification-message">{notification.message}</p>
                                </div>
                                <div className="notification-actions">
                                    {!notification.read && (
                                        <button 
                                            className="notification-action-btn"
                                            onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
                                            title="Mark as read"
                                        >
                                            <BsCheckCircle />
                                        </button>
                                    )}
                                    <button 
                                        className="notification-action-btn delete"
                                        onClick={() => onDeleteNotification && onDeleteNotification(notification.id)}
                                        title="Delete"
                                    >
                                        <BsTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-icon">
                                {filter === 'unread' ? <BsCheckCircle /> : <BsBellSlash />}
                            </div>
                            <h3>
                                {filter === 'unread' ? 'All caught up!' : 
                                 filter === 'read' ? 'No read notifications' : 
                                 'No notifications'}
                            </h3>
                            <p>
                                {filter === 'unread' ? 'You have no unread notifications' : 
                                 filter === 'read' ? 'No notifications marked as read yet' : 
                                 'You have no notifications at this time'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsView;
