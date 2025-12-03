// Main App - Application Initialization and Routing

class App {
    constructor() {
        this.initialized = false;
        this.currentRoute = null;
        console.log('[App] Initialized');
    }

    // Initialize application
    async init() {
        console.log('[App] Starting application initialization...');

        try {
            // Step 1: Check API key
            console.log('[App] Step 1: Checking API key...');
            const hasValidKey = await apiManager.checkAPIKey();

            if (!hasValidKey) {
                console.log('[App] No valid API key, initialization stopped');
                return;
            }

            // Step 2: Initialize auth system
            console.log('[App] Step 2: Initializing authentication...');
            await auth.initialize();

            // Step 3: Check for friend code redemption
            await auth.checkForPendingInvites();

            // Step 4: Check if profile is complete
            console.log('[App] Step 3: Checking profile status...');
            if (!auth.isProfileComplete()) {
                console.log('[App] Profile incomplete, showing setup');
                this.navigateToProfileSetup();
                this.initialized = true;
                return;
            }

            // Step 5: Navigate to main menu
            console.log('[App] Step 4: Navigating to main menu...');
            this.navigateToMainMenu();

            this.initialized = true;
            console.log('[App] Application initialized successfully');

        } catch (error) {
            console.error('[App] Initialization error:', error);
            showError('Failed to initialize application', error.message);
        }
    }

    // Navigation methods
    navigateToProfileSetup() {
        console.log('[App] Navigating to profile setup');
        this.currentRoute = 'profile-setup';
        uiRenderer.renderProfileSetup();
    }

    navigateToMainMenu() {
        console.log('[App] Navigating to main menu');
        this.currentRoute = 'main-menu';
        uiRenderer.renderMainMenu();

        // Initialize stickers for main menu
        stickerManager.initialize('main-menu');
        stickerManager.renderStickerUI();
    }

    navigateToProfile() {
        console.log('[App] Navigating to profile');
        this.currentRoute = 'profile';
        uiRenderer.renderProfile();
    }

    navigateToQuestionnaires() {
        console.log('[App] Navigating to questionnaires');
        this.currentRoute = 'questionnaires';
        uiRenderer.renderQuestionnairesList();
    }

    createQuestionnaire() {
        console.log('[App] Creating new questionnaire');
        this.currentRoute = 'questionnaire-editor';
        this.currentQuestionnaireId = null;
        uiRenderer.renderQuestionnaireEditor(null);
    }

    editQuestionnaire(id) {
        console.log('[App] Editing questionnaire:', id);
        this.currentRoute = 'questionnaire-editor';
        this.currentQuestionnaireId = id;
        uiRenderer.renderQuestionnaireEditor(id);
    }

    viewQuestionnaire(id) {
        console.log('[App] Viewing questionnaire:', id);
        this.currentRoute = 'view-questionnaire';
        uiRenderer.renderViewQuestionnaire(id);
    }

    async deleteQuestionnaire(id) {
        console.log('[App] Delete questionnaire requested:', id);

        const questionnaire = questionnaireManager.getQuestionnaireById(id);
        if (!questionnaire) {
            alert('Questionnaire not found');
            return;
        }

        const confirmDelete = confirm(`Are you sure you want to delete "${questionnaire.title}"?\n\nThis action cannot be undone.`);

        if (!confirmDelete) {
            console.log('[App] Delete cancelled by user');
            return;
        }

        try {
            console.log('[App] Deleting questionnaire...');
            showLoading('Deleting questionnaire...');

            await questionnaireManager.deleteQuestionnaire(id);

            console.log('[App] Questionnaire deleted successfully');
            this.navigateToQuestionnaires();

        } catch (error) {
            console.error('[App] Error deleting questionnaire:', error);
            showError('Failed to delete questionnaire', error.message);
        }
    }

    cancelQuestionnaireEditor() {
        console.log('[App] Cancelling questionnaire editor');
        this.navigateToQuestionnaires();
    }

    addQuestion() {
        console.log('[App] Adding new question');

        const container = document.getElementById('questions-container');
        if (!container) return;

        const questionIndex = container.querySelectorAll('.question-item').length;

        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <span class="question-drag-handle">☰</span>
            <input
                type="text"
                class="form-input question-input"
                placeholder="Enter question ${questionIndex + 1}"
                value=""
                data-question-index="${questionIndex}"
            />
            <button class="question-delete" onclick="app.removeQuestion(${questionIndex})">
                ×
            </button>
        `;

        container.appendChild(questionItem);
    }

    removeQuestion(index) {
        console.log('[App] Removing question at index:', index);

        const container = document.getElementById('questions-container');
        if (!container) return;

        const items = container.querySelectorAll('.question-item');

        if (items.length <= 1) {
            alert('You must have at least one question');
            return;
        }

        items[index].remove();

        this.reindexQuestions();
    }

    reindexQuestions() {
        console.log('[App] Reindexing questions');

        const container = document.getElementById('questions-container');
        if (!container) return;

        const items = container.querySelectorAll('.question-item');
        items.forEach((item, index) => {
            const input = item.querySelector('.question-input');
            const deleteBtn = item.querySelector('.question-delete');

            if (input) {
                input.dataset.questionIndex = index;
                input.placeholder = `Enter question ${index + 1}`;
            }

            if (deleteBtn) {
                deleteBtn.onclick = () => this.removeQuestion(index);
            }
        });
    }

    async saveQuestionnaire(id = '') {
        console.log('[App] Saving questionnaire, ID:', id || 'new');

        const titleInput = document.getElementById('questionnaire-title');
        const title = titleInput ? titleInput.value.trim() : '';

        if (!title) {
            alert('Please enter a title for your questionnaire');
            return;
        }

        const questionInputs = document.querySelectorAll('.question-input');
        const questions = Array.from(questionInputs)
            .map(input => input.value.trim())
            .filter(q => q);

        if (questions.length === 0) {
            alert('Please add at least one question');
            return;
        }

        try {
            console.log('[App] Saving questionnaire with', questions.length, 'questions');
            showLoading('Saving questionnaire...');

            if (id) {
                await questionnaireManager.updateQuestionnaire(id, { title, questions });
                console.log('[App] Questionnaire updated successfully');
            } else {
                await questionnaireManager.createQuestionnaire(title, questions);
                console.log('[App] Questionnaire created successfully');
            }

            this.navigateToQuestionnaires();

        } catch (error) {
            console.error('[App] Error saving questionnaire:', error);
            showError('Failed to save questionnaire', error.message);
        }
    }

    navigateToFriends() {
        console.log('[App] Navigating to friends');
        this.currentRoute = 'friends';
        uiRenderer.renderFriendsList();
    }

    addFriend() {
        console.log('[App] Adding friend');
        this.currentRoute = 'add-friend';
        uiRenderer.renderAddFriendForm();
    }

    cancelAddFriend() {
        console.log('[App] Cancelling add friend');
        this.navigateToFriends();
    }

    async saveFriend() {
        console.log('[App] Saving friend');

        const nameInput = document.getElementById('friend-name');
        const emailInput = document.getElementById('friend-email');
        const questionnaireSelect = document.getElementById('questionnaire-select');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const questionnaireId = questionnaireSelect ? questionnaireSelect.value : '';

        if (!name) {
            alert('Please enter your friend\'s name');
            return;
        }

        if (!questionnaireId) {
            alert('Please select a questionnaire');
            return;
        }

        try {
            console.log('[App] Creating friend with questionnaire:', questionnaireId);
            showLoading('Generating friend code...');

            const friend = await friendManager.addFriend(name, email, questionnaireId);

            console.log('[App] Friend created with code:', friend.friendCode);
            uiRenderer.renderFriendCodeSuccess(friend.friendCode, friend.name);

        } catch (error) {
            console.error('[App] Error adding friend:', error);
            showError('Failed to add friend', error.message);
        }
    }

    copyFriendCode(code) {
        console.log('[App] Copying friend code to clipboard:', code);

        navigator.clipboard.writeText(code).then(() => {
            alert(`Code ${code} copied to clipboard!`);
        }).catch(err => {
            console.error('[App] Failed to copy to clipboard:', err);
            alert('Failed to copy code. Please copy it manually: ' + code);
        });
    }

    viewFriendAnswers(friendId) {
        console.log('[App] Viewing friend answers:', friendId);
        this.currentRoute = 'view-friend-answers';
        uiRenderer.renderViewFriendAnswers(friendId);
    }

    navigateToInbox() {
        console.log('[App] Navigating to inbox');
        this.currentRoute = 'inbox';
        uiRenderer.renderInbox();
    }

    fillQuestionnaire(id) {
        console.log('[App] Filling questionnaire:', id);
        this.currentRoute = 'fill-questionnaire';
        this.currentReceivedQuestionnaireId = id;
        uiRenderer.renderFillQuestionnaire(id);
    }

    async saveDraft(id, silent = false) {
        console.log('[App] Saving draft for questionnaire:', id, 'silent:', silent);

        try {
            const textareas = document.querySelectorAll('.answer-textarea');
            const answers = Array.from(textareas).map(ta => ta.value);

            const userData = storageManager.getUserData();
            const questionnaire = userData.receivedQuestionnaires.find(q => q.id === id);

            if (!questionnaire) {
                throw new Error('Questionnaire not found');
            }

            questionnaire.answers = answers;
            questionnaire.status = 'in_progress';

            if (!silent) showLoading('Saving draft...');
            await storageManager.saveUserData();

            console.log('[App] Draft saved successfully');

            if (!silent) {
                alert('Draft saved! You can come back to continue anytime.');
                this.navigateToInbox();
            }

        } catch (error) {
            console.error('[App] Error saving draft:', error);
            if (!silent) {
                showError('Failed to save draft', error.message);
            }
        }
    }

    async submitQuestionnaire(id) {
        console.log('[App] Submitting questionnaire:', id);

        const textareas = document.querySelectorAll('.answer-textarea');
        const answers = Array.from(textareas).map(ta => ta.value.trim());

        // Check if all questions are answered
        const unansweredCount = answers.filter(a => !a).length;
        if (unansweredCount > 0) {
            const confirmSubmit = confirm(
                `You have ${unansweredCount} unanswered question${unansweredCount !== 1 ? 's' : ''}.\n\nAre you sure you want to submit?`
            );

            if (!confirmSubmit) {
                console.log('[App] Submit cancelled by user');
                return;
            }
        }

        try {
            console.log('[App] Submitting answers...');
            showLoading('Submitting your answers...');

            const userData = storageManager.getUserData();
            const questionnaire = userData.receivedQuestionnaires.find(q => q.id === id);

            if (!questionnaire) {
                throw new Error('Questionnaire not found');
            }

            questionnaire.answers = answers;
            questionnaire.status = 'completed';
            questionnaire.completedAt = Date.now();

            await storageManager.saveUserData();

            // Create notification for the original sender
            await notificationManager.createNotification(
                'questionnaire_completed',
                `${auth.getCurrentUser().profile.name} completed your questionnaire!`,
                questionnaire.fromUserId
            );

            console.log('[App] Questionnaire submitted successfully');
            alert('Thank you! Your answers have been submitted.');
            this.navigateToInbox();

        } catch (error) {
            console.error('[App] Error submitting questionnaire:', error);
            showError('Failed to submit questionnaire', error.message);
        }
    }

    editSubmittedQuestionnaire(id) {
        console.log('[App] Editing submitted questionnaire:', id);

        const confirmEdit = confirm(
            'Do you want to edit your submitted answers?\n\nYour friend will see the updated answers.'
        );

        if (!confirmEdit) {
            console.log('[App] Edit cancelled by user');
            return;
        }

        try {
            const userData = storageManager.getUserData();
            const questionnaire = userData.receivedQuestionnaires.find(q => q.id === id);

            if (!questionnaire) {
                throw new Error('Questionnaire not found');
            }

            questionnaire.status = 'in_progress';

            console.log('[App] Questionnaire reopened for editing');
            this.fillQuestionnaire(id);

        } catch (error) {
            console.error('[App] Error editing questionnaire:', error);
            showError('Failed to edit questionnaire', error.message);
        }
    }

    async markAllNotificationsRead() {
        console.log('[App] Marking all notifications as read');

        try {
            showLoading('Marking notifications as read...');
            await notificationManager.markAllAsRead();
            console.log('[App] All notifications marked as read');
            this.navigateToInbox();
        } catch (error) {
            console.error('[App] Error marking notifications as read:', error);
            showError('Failed to mark notifications as read', error.message);
        }
    }

    // Event handlers
    async handleCreateProfile() {
        console.log('[App] Handle create profile called');

        const nameInput = document.getElementById('profile-name');
        const name = nameInput ? nameInput.value.trim() : '';

        if (!name) {
            alert('Please enter your name');
            return;
        }

        try {
            console.log('[App] Creating profile with name:', name);
            showLoading('Creating your profile...');

            await auth.createProfile(name);

            console.log('[App] Profile created successfully');
            this.navigateToMainMenu();

        } catch (error) {
            console.error('[App] Error creating profile:', error);
            showError('Failed to create profile', error.message);
        }
    }
}

// Global instance
const app = new App();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('[App] DOM Content Loaded');
    console.log('[App] Starting app initialization...');

    setTimeout(() => {
        app.init();
    }, 100);
});

console.log('[App] Main module loaded');
