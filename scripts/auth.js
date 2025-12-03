// Auth - User Authentication and Profile Management

class Auth {
    constructor() {
        this.currentUser = null;
        console.log('[Auth] Initialized');
    }

    // Initialize auth system
    async initialize() {
        console.log('[Auth] Starting authentication...');
        try {
            await storageManager.initialize();
            this.currentUser = storageManager.getUserData();
            console.log('[Auth] Current user:', this.currentUser);
            return this.currentUser;
        } catch (error) {
            console.error('[Auth] Initialization error:', error);
            throw error;
        }
    }

    // Check if user profile is complete
    isProfileComplete() {
        return storageManager.isProfileComplete();
    }

    // Create user profile (first-time setup)
    async createProfile(name) {
        console.log('[Auth] Creating user profile with name:', name);

        if (!name || name.trim() === '') {
            throw new Error('Name is required');
        }

        await storageManager.updateProfile({ name: name.trim() });
        this.currentUser = storageManager.getUserData();

        console.log('[Auth] Profile created successfully');
        return this.currentUser;
    }

    // Get current user data
    getCurrentUser() {
        return this.currentUser;
    }

    // Get user statistics
    getUserStats() {
        const stats = {
            questionnairesCreated: this.currentUser.questionnaires.length,
            friendsAdded: this.currentUser.friends.length,
            completedQuestionnaires: this.currentUser.receivedQuestionnaires.filter(q => q.status === 'completed').length,
            unreadNotifications: this.currentUser.notifications.filter(n => !n.read).length
        };

        console.log('[Auth] User stats:', stats);
        return stats;
    }

    // Check for pending friend codes (during registration/first login)
    async checkForPendingInvites() {
        console.log('[Auth] Checking for pending friend invites...');

        // This function would be called when user enters a friend code during setup
        // For now, this is a placeholder for the friend code redemption logic
        const pendingCode = getQueryParam('friendCode');

        if (pendingCode) {
            console.log('[Auth] Found pending friend code:', pendingCode);
            // Redeem the code
            await friendManager.redeemFriendCode(pendingCode);
            // Clear the query parameter
            clearQueryParams();
        }
    }
}

// Global instance
const auth = new Auth();

console.log('[Auth] Module loaded');
