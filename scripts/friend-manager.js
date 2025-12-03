// Friend Manager - Manage Friends and Friend Codes

class FriendManager {
    constructor() {
        console.log('[FriendManager] Initialized');
    }

    // Get all friends
    getFriends() {
        const userData = storageManager.getUserData();
        console.log('[FriendManager] Retrieved friends:', userData.friends.length);
        return userData.friends || [];
    }

    // Get friend by ID
    getFriendById(id) {
        const friends = this.getFriends();
        const friend = friends.find(f => f.id === id);
        console.log('[FriendManager] Get friend by ID:', id, friend ? 'Found' : 'Not found');
        return friend;
    }

    // Add friend with questionnaire
    async addFriend(name, email, questionnaireId) {
        console.log('[FriendManager] Adding friend:', name, 'with questionnaire:', questionnaireId);

        const friendCode = generateFriendCode();

        const friend = {
            id: generateUUID(),
            name: name.trim(),
            email: email ? email.trim() : '',
            userId: null,
            addedAt: Date.now(),
            assignedQuestionnaire: questionnaireId,
            friendCode: friendCode,
            status: 'pending',
            completedAt: null
        };

        const userData = storageManager.getUserData();
        userData.friends.push(friend);
        await storageManager.saveUserData();

        console.log('[FriendManager] Friend added with code:', friendCode);
        return friend;
    }

    // Redeem friend code (called by recipient)
    async redeemFriendCode(code) {
        console.log('[FriendManager] Redeeming friend code:', code);

        const currentUserId = storageManager.userId;

        console.log('[FriendManager] Searching for code across all users...');

        const friend = await this.findFriendByCode(code);

        if (!friend) {
            console.error('[FriendManager] Friend code not found:', code);
            throw new Error('Invalid friend code');
        }

        friend.userId = currentUserId;
        friend.status = 'received';

        await this.createReceivedQuestionnaire(friend);

        console.log('[FriendManager] Friend code redeemed successfully');
        return true;
    }

    // Find friend entry by code (would need cross-user search in production)
    async findFriendByCode(code) {
        console.log('[FriendManager] Finding friend by code (local search only):', code);

        const userData = storageManager.getUserData();
        const friend = userData.friends.find(f => f.friendCode === code);

        return friend;
    }

    // Create received questionnaire for friend
    async createReceivedQuestionnaire(friend) {
        console.log('[FriendManager] Creating received questionnaire for friend');

        const userData = storageManager.getUserData();
        const questionnaire = questionnaireManager.getQuestionnaireById(friend.assignedQuestionnaire);

        if (!questionnaire) {
            throw new Error('Assigned questionnaire not found');
        }

        const receivedQuestionnaire = {
            id: generateUUID(),
            fromUserId: friend.userId,
            fromUserName: friend.name,
            questionnaireId: questionnaire.id,
            questions: questionnaire.questions,
            answers: new Array(questionnaire.questions.length).fill(''),
            status: 'pending',
            receivedAt: Date.now(),
            completedAt: null
        };

        userData.receivedQuestionnaires.push(receivedQuestionnaire);
        await notificationManager.createNotification('questionnaire_received',
            `${friend.name} sent you a questionnaire: "${questionnaire.title}"`,
            receivedQuestionnaire.id);

        console.log('[FriendManager] Received questionnaire created');
    }

    // Update friend status to completed
    async markFriendCompleted(friendId) {
        console.log('[FriendManager] Marking friend as completed:', friendId);

        const userData = storageManager.getUserData();
        const friend = userData.friends.find(f => f.id === friendId);

        if (friend) {
            friend.status = 'completed';
            friend.completedAt = Date.now();
            await storageManager.saveUserData();
            console.log('[FriendManager] Friend marked as completed');
        }
    }
}

// Global instance
const friendManager = new FriendManager();

console.log('[Friend Manager] Module loaded');
