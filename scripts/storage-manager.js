// Storage Manager - Handles Structured Memory Operations

class StorageManager {
    constructor() {
        this.userId = null;
        this.memoryKey = null;
        this.userData = null;
        console.log('[StorageManager] Initialized');
    }

    // Initialize storage for current user
    async initialize() {
        console.log('[StorageManager] Starting initialization...');

        try {
            // Step 1: Get user ID
            console.log('[StorageManager] Fetching user information...');
            const userInfo = await apiClient.getUserInfo();
            this.userId = userInfo.id;
            console.log('[StorageManager] User ID:', this.userId);

            // Step 2: Construct memory key
            this.memoryKey = `bff-questionary-${this.userId}`;
            console.log('[StorageManager] Memory key:', this.memoryKey);

            // Step 3: Try to fetch existing data
            console.log('[StorageManager] Checking for existing data...');
            const existingData = await apiClient.getStructuredMemory(this.memoryKey);

            if (existingData) {
                console.log('[StorageManager] Found existing data');
                this.userData = existingData;
            } else {
                console.log('[StorageManager] No existing data, creating default structure...');
                this.userData = this.getDefaultUserData();
                await apiClient.createStructuredMemory(this.memoryKey, this.userData);
                console.log('[StorageManager] Default data created');
            }

            console.log('[StorageManager] Initialization complete');
            return this.userData;
        } catch (error) {
            console.error('[StorageManager] Initialization error:', error);
            throw error;
        }
    }

    // Get default user data structure
    getDefaultUserData() {
        console.log('[StorageManager] Creating default user data structure');
        return {
            profile: {
                name: '',
                userId: this.userId,
                createdAt: Date.now()
            },
            questionnaires: [],
            friends: [],
            receivedQuestionnaires: [],
            notifications: []
        };
    }

    // Get current user data
    getUserData() {
        return this.userData;
    }

    // Save user data to cloud
    async saveUserData() {
        console.log('[StorageManager] Saving user data to cloud...');
        try {
            await apiClient.updateStructuredMemory(this.memoryKey, this.userData);
            console.log('[StorageManager] User data saved successfully');
            return true;
        } catch (error) {
            console.error('[StorageManager] Error saving user data:', error);
            throw error;
        }
    }

    // Update user profile
    async updateProfile(profileData) {
        console.log('[StorageManager] Updating user profile:', profileData);
        this.userData.profile = {
            ...this.userData.profile,
            ...profileData
        };
        await this.saveUserData();
        console.log('[StorageManager] Profile updated');
    }

    // Check if user profile is complete
    isProfileComplete() {
        const isComplete = this.userData && this.userData.profile && this.userData.profile.name;
        console.log('[StorageManager] Profile complete:', isComplete);
        return isComplete;
    }
}

// Global instance
const storageManager = new StorageManager();

console.log('[Storage Manager] Module loaded');
