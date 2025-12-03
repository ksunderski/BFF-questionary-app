// Notification Manager - Handle User Notifications

class NotificationManager {
    constructor() {
        console.log('[NotificationManager] Initialized');
    }

    // Get all notifications
    getNotifications() {
        const userData = storageManager.getUserData();
        console.log('[NotificationManager] Retrieved notifications:', userData.notifications.length);
        return userData.notifications || [];
    }

    // Get unread notifications count
    getUnreadCount() {
        const notifications = this.getNotifications();
        const count = notifications.filter(n => !n.read).length;
        console.log('[NotificationManager] Unread notifications:', count);
        return count;
    }

    // Create new notification
    async createNotification(type, message, relatedId = null) {
        console.log('[NotificationManager] Creating notification:', type, message);

        const notification = {
            id: generateUUID(),
            type: type,
            message: message,
            read: false,
            createdAt: Date.now(),
            relatedId: relatedId
        };

        const userData = storageManager.getUserData();
        userData.notifications.push(notification);
        await storageManager.saveUserData();

        console.log('[NotificationManager] Notification created:', notification.id);
        return notification;
    }

    // Mark notification as read
    async markAsRead(notificationId) {
        console.log('[NotificationManager] Marking notification as read:', notificationId);

        const userData = storageManager.getUserData();
        const notification = userData.notifications.find(n => n.id === notificationId);

        if (notification) {
            notification.read = true;
            await storageManager.saveUserData();
            console.log('[NotificationManager] Notification marked as read');
        }
    }

    // Mark all notifications as read
    async markAllAsRead() {
        console.log('[NotificationManager] Marking all notifications as read');

        const userData = storageManager.getUserData();
        userData.notifications.forEach(n => n.read = true);
        await storageManager.saveUserData();

        console.log('[NotificationManager] All notifications marked as read');
    }

    // Delete notification
    async deleteNotification(notificationId) {
        console.log('[NotificationManager] Deleting notification:', notificationId);

        const userData = storageManager.getUserData();
        const index = userData.notifications.findIndex(n => n.id === notificationId);

        if (index !== -1) {
            userData.notifications.splice(index, 1);
            await storageManager.saveUserData();
            console.log('[NotificationManager] Notification deleted');
        }
    }
}

// Global instance
const notificationManager = new NotificationManager();

console.log('[Notification Manager] Module loaded');
