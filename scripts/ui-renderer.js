// UI Renderer - Dynamic UI Generation

class UIRenderer {
    constructor() {
        this.appContent = document.getElementById('app-content');
        console.log('[UIRenderer] Initialized');
    }

    // Render Main Menu
    renderMainMenu() {
        console.log('[UIRenderer] Rendering main menu');
        const user = auth.getCurrentUser();
        const stats = auth.getUserStats();

        this.appContent.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <div class="page-title">BFF Questionary</div>
                    <div class="page-subtitle">Welcome, ${escapeHTML(user.profile.name)}! 💌</div>
                </div>

                <div class="menu-buttons">
                    <button class="menu-button" onclick="app.navigateToProfile()">
                        📋 My Profile
                    </button>

                    <button class="menu-button" onclick="app.navigateToQuestionnaires()">
                        📝 My Questionnaires
                        <span class="badge">${stats.questionnairesCreated}</span>
                    </button>

                    <button class="menu-button" onclick="app.navigateToFriends()">
                        👥 My Friends
                        <span class="badge">${stats.friendsAdded}</span>
                    </button>

                    <button class="menu-button" onclick="app.navigateToInbox()">
                        📬 Inbox
                        ${stats.unreadNotifications > 0 ? `<span class="badge">${stats.unreadNotifications}</span>` : ''}
                    </button>
                </div>
            </div>
        `;
    }

    // Render Profile Setup Page
    renderProfileSetup() {
        console.log('[UIRenderer] Rendering profile setup');

        this.appContent.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <div class="page-title">Welcome! 🎉</div>
                    <div class="page-subtitle">Let's get you set up</div>
                </div>

                <div class="card">
                    <div class="card-title">Create Your Profile</div>
                    <p>What should your friends call you?</p>

                    <div class="form-group">
                        <label class="form-label" for="profile-name">Your Name</label>
                        <input type="text" id="profile-name" class="form-input" placeholder="Enter your name" />
                    </div>

                    <button class="btn btn-primary btn-block" onclick="app.handleCreateProfile()">
                        Continue
                    </button>
                </div>
            </div>
        `;
    }

    // Render Profile Page
    renderProfile() {
        console.log('[UIRenderer] Rendering profile page');
        const user = auth.getCurrentUser();
        const stats = auth.getUserStats();

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.navigateToMainMenu()">
                    ← Back
                </button>

                <div class="page-header">
                    <div class="page-title">My Profile</div>
                </div>

                <div class="card">
                    <div class="card-title">${escapeHTML(user.profile.name)}</div>
                    <p>Member since: ${formatDate(user.profile.createdAt)}</p>
                </div>

                <div class="card">
                    <div class="card-title">Statistics</div>
                    <p><strong>Questionnaires Created:</strong> ${stats.questionnairesCreated}</p>
                    <p><strong>Friends Added:</strong> ${stats.friendsAdded}</p>
                    <p><strong>Completed Questionnaires:</strong> ${stats.completedQuestionnaires}</p>
                </div>
            </div>
        `;
    }

    // Render My Questionnaires List
    renderQuestionnairesList() {
        console.log('[UIRenderer] Rendering questionnaires list');
        const questionnaires = questionnaireManager.getQuestionnaires();

        let questionnairesHTML = '';

        if (questionnaires.length === 0) {
            questionnairesHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <div class="empty-state-text">
                        You haven't created any questionnaires yet.<br>
                        Create your first one to share with friends!
                    </div>
                </div>
            `;
        } else {
            questionnairesHTML = '<ul class="list">';
            questionnaires.forEach(q => {
                questionnairesHTML += `
                    <li class="card">
                        <div class="card-title">${escapeHTML(q.title)}</div>
                        <div class="card-subtitle">
                            ${q.questions.length} question${q.questions.length !== 1 ? 's' : ''} •
                            Created ${formatDate(q.createdAt)}
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-secondary" onclick="app.viewQuestionnaire('${q.id}')">
                                View
                            </button>
                            <button class="btn btn-primary" onclick="app.editQuestionnaire('${q.id}')">
                                Edit
                            </button>
                            <button class="btn btn-secondary" onclick="app.deleteQuestionnaire('${q.id}')">
                                Delete
                            </button>
                        </div>
                    </li>
                `;
            });
            questionnairesHTML += '</ul>';
        }

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.navigateToMainMenu()">
                    ← Back
                </button>

                <div class="page-header">
                    <div class="page-title">My Questionnaires</div>
                    <div class="page-subtitle">${questionnaires.length} questionnaire${questionnaires.length !== 1 ? 's' : ''}</div>
                </div>

                <button class="btn btn-pink btn-block mb-lg" onclick="app.createQuestionnaire()">
                    + New Questionnaire
                </button>

                ${questionnairesHTML}
            </div>
        `;
    }

    // Render Questionnaire Editor (Create/Edit)
    renderQuestionnaireEditor(questionnaireId = null) {
        console.log('[UIRenderer] Rendering questionnaire editor for:', questionnaireId || 'new');

        let questionnaire = null;
        let title = '';
        let questions = [''];

        if (questionnaireId) {
            questionnaire = questionnaireManager.getQuestionnaireById(questionnaireId);
            if (questionnaire) {
                title = questionnaire.title;
                questions = [...questionnaire.questions];
            }
        }

        const pageTitle = questionnaireId ? 'Edit Questionnaire' : 'New Questionnaire';

        let questionsHTML = '';
        questions.forEach((q, index) => {
            questionsHTML += `
                <div class="question-item">
                    <span class="question-drag-handle">☰</span>
                    <input
                        type="text"
                        class="form-input question-input"
                        placeholder="Enter question ${index + 1}"
                        value="${escapeHTML(q)}"
                        data-question-index="${index}"
                    />
                    ${questions.length > 1 ? `
                        <button class="question-delete" onclick="app.removeQuestion(${index})">
                            ×
                        </button>
                    ` : ''}
                </div>
            `;
        });

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.cancelQuestionnaireEditor()">
                    ← Cancel
                </button>

                <div class="page-header">
                    <div class="page-title">${pageTitle}</div>
                </div>

                <div class="card">
                    <div class="form-group">
                        <label class="form-label" for="questionnaire-title">Questionnaire Title</label>
                        <input
                            type="text"
                            id="questionnaire-title"
                            class="form-input"
                            placeholder="e.g., Getting to Know My BFF"
                            value="${escapeHTML(title)}"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Questions</label>
                        <div id="questions-container" class="question-list">
                            ${questionsHTML}
                        </div>

                        <button class="add-question-btn" onclick="app.addQuestion()">
                            + Add Question
                        </button>
                    </div>

                    <button class="btn btn-primary btn-block" onclick="app.saveQuestionnaire('${questionnaireId || ''}')">
                        Save Questionnaire
                    </button>
                </div>
            </div>
        `;
    }

    // Render View Questionnaire (Read-Only)
    renderViewQuestionnaire(questionnaireId) {
        console.log('[UIRenderer] Rendering view questionnaire:', questionnaireId);

        const questionnaire = questionnaireManager.getQuestionnaireById(questionnaireId);

        if (!questionnaire) {
            showError('Questionnaire not found');
            return;
        }

        let questionsHTML = '';
        questionnaire.questions.forEach((q, index) => {
            questionsHTML += `
                <div class="card">
                    <div class="card-subtitle">Question ${index + 1}</div>
                    <div class="card-title">${escapeHTML(q)}</div>
                </div>
            `;
        });

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.navigateToQuestionnaires()">
                    ← Back
                </button>

                <div class="page-header">
                    <div class="page-title">${escapeHTML(questionnaire.title)}</div>
                    <div class="page-subtitle">
                        ${questionnaire.questions.length} question${questionnaire.questions.length !== 1 ? 's' : ''} •
                        Created ${formatDate(questionnaire.createdAt)}
                    </div>
                </div>

                ${questionsHTML}

                <button class="btn btn-primary btn-block mt-lg" onclick="app.editQuestionnaire('${questionnaireId}')">
                    Edit Questionnaire
                </button>
            </div>
        `;
    }

    // Render My Friends List
    renderFriendsList() {
        console.log('[UIRenderer] Rendering friends list');
        const friends = friendManager.getFriends();

        let friendsHTML = '';

        if (friends.length === 0) {
            friendsHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <div class="empty-state-text">
                        You haven't added any friends yet.<br>
                        Add friends to share questionnaires!
                    </div>
                </div>
            `;
        } else {
            friendsHTML = '<ul class="list">';
            friends.forEach(f => {
                const questionnaire = questionnaireManager.getQuestionnaireById(f.assignedQuestionnaire);
                const questionnaireTitle = questionnaire ? questionnaire.title : 'Unknown';

                friendsHTML += `
                    <li class="card">
                        <div class="card-title">${escapeHTML(f.name)}</div>
                        <div class="card-subtitle">
                            Questionnaire: ${escapeHTML(questionnaireTitle)}<br>
                            Code: <strong>${escapeHTML(f.friendCode)}</strong><br>
                            Status: <span class="status-badge status-${f.status}">${f.status}</span>
                        </div>
                        ${f.status === 'completed' ? `
                            <div class="card-actions">
                                <button class="btn btn-primary" onclick="app.viewFriendAnswers('${f.id}')">
                                    View Answers
                                </button>
                            </div>
                        ` : ''}
                    </li>
                `;
            });
            friendsHTML += '</ul>';
        }

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.navigateToMainMenu()">
                    ← Back
                </button>

                <div class="page-header">
                    <div class="page-title">My Friends</div>
                    <div class="page-subtitle">${friends.length} friend${friends.length !== 1 ? 's' : ''}</div>
                </div>

                <button class="btn btn-pink btn-block mb-lg" onclick="app.addFriend()">
                    + Add Friend
                </button>

                ${friendsHTML}
            </div>
        `;
    }

    // Render Add Friend Form
    renderAddFriendForm() {
        console.log('[UIRenderer] Rendering add friend form');
        const questionnaires = questionnaireManager.getQuestionnaires();

        if (questionnaires.length === 0) {
            this.appContent.innerHTML = `
                <div class="page">
                    <button class="back-button" onclick="app.navigateToFriends()">
                        ← Back
                    </button>

                    <div class="page-header">
                        <div class="page-title">Add Friend</div>
                    </div>

                    <div class="empty-state">
                        <div class="empty-state-icon">📝</div>
                        <div class="empty-state-text">
                            You need to create a questionnaire first!<br>
                            Go to "My Questionnaires" to create one.
                        </div>
                    </div>

                    <button class="btn btn-primary btn-block mt-lg" onclick="app.navigateToQuestionnaires()">
                        Create Questionnaire
                    </button>
                </div>
            `;
            return;
        }

        let optionsHTML = questionnaires.map(q =>
            `<option value="${q.id}">${escapeHTML(q.title)}</option>`
        ).join('');

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.cancelAddFriend()">
                    ← Cancel
                </button>

                <div class="page-header">
                    <div class="page-title">Add Friend</div>
                    <div class="page-subtitle">Share a questionnaire with a friend</div>
                </div>

                <div class="card">
                    <div class="form-group">
                        <label class="form-label" for="friend-name">Friend's Name</label>
                        <input
                            type="text"
                            id="friend-name"
                            class="form-input"
                            placeholder="Enter your friend's name"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="friend-email">Friend's Email (Optional)</label>
                        <input
                            type="email"
                            id="friend-email"
                            class="form-input"
                            placeholder="friend@example.com"
                        />
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="questionnaire-select">Select Questionnaire</label>
                        <select id="questionnaire-select" class="form-select">
                            ${optionsHTML}
                        </select>
                    </div>

                    <div class="card" style="background: #fff9e6; border-color: #ffc107;">
                        <div class="card-subtitle">How it works:</div>
                        <p style="font-size: 14px; line-height: 1.6;">
                            1. You'll receive a unique BFF code (e.g., BFF-ABC123)<br>
                            2. Share this code with your friend<br>
                            3. Your friend needs to create their own account<br>
                            4. They'll redeem the code to receive your questionnaire<br>
                            5. Once completed, you can view their answers!
                        </p>
                    </div>

                    <button class="btn btn-primary btn-block" onclick="app.saveFriend()">
                        Generate Friend Code
                    </button>
                </div>
            </div>
        `;
    }

    // Render Friend Code Generated Success
    renderFriendCodeSuccess(friendCode, friendName) {
        console.log('[UIRenderer] Rendering friend code success:', friendCode);

        this.appContent.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <div class="page-title">Friend Added! 🎉</div>
                    <div class="page-subtitle">Share this code with ${escapeHTML(friendName)}</div>
                </div>

                <div class="card" style="background: #e8f5e9; border-color: #4caf50;">
                    <div class="card-title" style="text-align: center; font-size: 32px; color: #2e7d32; margin: 20px 0;">
                        ${escapeHTML(friendCode)}
                    </div>
                    <button class="btn btn-primary btn-block" onclick="app.copyFriendCode('${escapeHTML(friendCode)}')">
                        Copy Code to Clipboard
                    </button>
                </div>

                <div class="card">
                    <div class="card-title">Instructions for ${escapeHTML(friendName)}:</div>
                    <ol style="line-height: 1.8; padding-left: 20px;">
                        <li>Create an account (if they don't have one)</li>
                        <li>When creating their profile, enter this code: <strong>${escapeHTML(friendCode)}</strong></li>
                        <li>The questionnaire will appear in their Inbox</li>
                        <li>They can fill it out and submit their answers</li>
                        <li>You'll get notified when they complete it!</li>
                    </ol>
                </div>

                <button class="btn btn-secondary btn-block" onclick="app.navigateToFriends()">
                    Back to My Friends
                </button>

                <button class="btn btn-primary btn-block" onclick="app.addFriend()">
                    Add Another Friend
                </button>
            </div>
        `;
    }

    // Render Inbox (Received Questionnaires)
    renderInbox() {
        console.log('[UIRenderer] Rendering inbox');
        const userData = storageManager.getUserData();
        const receivedQuestionnaires = userData.receivedQuestionnaires || [];
        const notifications = notificationManager.getNotifications();
        const unreadCount = notificationManager.getUnreadCount();

        let receivedHTML = '';

        if (receivedQuestionnaires.length === 0) {
            receivedHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📬</div>
                    <div class="empty-state-text">
                        No questionnaires received yet.<br>
                        Friends will send you questionnaires using BFF codes!
                    </div>
                </div>
            `;
        } else {
            receivedHTML = '<ul class="list">';
            receivedQuestionnaires.forEach(q => {
                const statusBadge = q.status === 'completed' ? 'completed' :
                    q.status === 'in_progress' ? 'in-progress' : 'pending';
                const actionText = q.status === 'completed' ? 'View' :
                    q.status === 'in_progress' ? 'Continue' : 'Start';

                receivedHTML += `
                    <li class="card">
                        <div class="card-title">${escapeHTML(q.fromUserName)}</div>
                        <div class="card-subtitle">
                            Received: ${formatDate(q.receivedAt)}<br>
                            ${q.questions.length} question${q.questions.length !== 1 ? 's' : ''}<br>
                            Status: <span class="status-badge status-${statusBadge}">${q.status.replace('_', ' ')}</span>
                            ${q.completedAt ? `<br>Completed: ${formatDate(q.completedAt)}` : ''}
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-primary" onclick="app.fillQuestionnaire('${q.id}')">
                                ${actionText}
                            </button>
                        </div>
                    </li>
                `;
            });
            receivedHTML += '</ul>';
        }

        // Notifications section
        let notificationsHTML = '';
        if (notifications.length > 0) {
            notificationsHTML = `
                <div class="card" style="background: #e3f2fd; border-color: #2196f3; margin-bottom: 20px;">
                    <div class="card-title" style="display: flex; justify-content: space-between; align-items: center;">
                        <span>📣 Notifications</span>
                        ${unreadCount > 0 ? `
                            <button class="btn btn-secondary" onclick="app.markAllNotificationsRead()" style="padding: 8px 16px; font-size: 14px;">
                                Mark All Read
                            </button>
                        ` : ''}
                    </div>
                    <ul style="list-style: none; padding: 0; margin-top: 10px;">
                        ${notifications.slice(0, 5).map(n => `
                            <li style="padding: 8px 0; border-bottom: 1px solid #ddd; opacity: ${n.read ? '0.6' : '1'};">
                                ${n.read ? '✓' : '🔔'} ${escapeHTML(n.message)}
                                <br><small style="color: #666;">${formatDateTime(n.createdAt)}</small>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.navigateToMainMenu()">
                    ← Back
                </button>

                <div class="page-header">
                    <div class="page-title">Inbox</div>
                    <div class="page-subtitle">
                        ${receivedQuestionnaires.length} questionnaire${receivedQuestionnaires.length !== 1 ? 's' : ''}
                        ${unreadCount > 0 ? ` • ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : ''}
                    </div>
                </div>

                ${notificationsHTML}
                ${receivedHTML}
            </div>
        `;
    }

    // Render Questionnaire Filling Interface (Two-Column Table)
    renderFillQuestionnaire(receivedQuestionnaireId) {
        console.log('[UIRenderer] Rendering fill questionnaire:', receivedQuestionnaireId);

        const userData = storageManager.getUserData();
        const receivedQuestionnaire = userData.receivedQuestionnaires.find(q => q.id === receivedQuestionnaireId);

        if (!receivedQuestionnaire) {
            showError('Questionnaire not found');
            return;
        }

        const isCompleted = receivedQuestionnaire.status === 'completed';
        const pageTitle = isCompleted ? 'View Questionnaire' :
            receivedQuestionnaire.status === 'in_progress' ? 'Continue Questionnaire' :
                'Fill Questionnaire';

        let tableRows = '';
        receivedQuestionnaire.questions.forEach((question, index) => {
            const answer = receivedQuestionnaire.answers[index] || '';
            tableRows += `
                <tr>
                    <td class="question-cell">
                        <strong>Q${index + 1}:</strong> ${escapeHTML(question)}
                    </td>
                    <td class="answer-cell">
                        <textarea
                            class="form-input form-textarea answer-textarea"
                            data-question-index="${index}"
                            placeholder="Your answer..."
                            ${isCompleted ? 'readonly' : ''}
                        >${escapeHTML(answer)}</textarea>
                    </td>
                </tr>
            `;
        });

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.navigateToInbox()">
                    ← Back to Inbox
                </button>

                <div class="page-header">
                    <div class="page-title">${pageTitle}</div>
                    <div class="page-subtitle">
                        From: ${escapeHTML(receivedQuestionnaire.fromUserName)}<br>
                        ${receivedQuestionnaire.questions.length} question${receivedQuestionnaire.questions.length !== 1 ? 's' : ''}
                        ${isCompleted ? ` • Completed ${formatDate(receivedQuestionnaire.completedAt)}` : ''}
                    </div>
                </div>

                ${!isCompleted ? `
                    <div class="card" style="background: #fff9e6; border-color: #ffc107; margin-bottom: 20px;">
                        <p style="font-size: 14px; line-height: 1.6; margin: 0;">
                            💡 <strong>Tip:</strong> Your answers are automatically saved as drafts. You can come back anytime to continue!
                        </p>
                    </div>
                ` : ''}

                <table class="questionnaire-table">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Your Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>

                ${!isCompleted ? `
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button class="btn btn-secondary btn-block" onclick="app.saveDraft('${receivedQuestionnaireId}')">
                            💾 Save Draft
                        </button>
                        <button class="btn btn-primary btn-block" onclick="app.submitQuestionnaire('${receivedQuestionnaireId}')">
                            ✓ Submit Answers
                        </button>
                    </div>
                ` : `
                    <button class="btn btn-primary btn-block mt-lg" onclick="app.editSubmittedQuestionnaire('${receivedQuestionnaireId}')">
                        ✏️ Edit Answers
                    </button>
                `}
            </div>
        `;

        // Set up auto-save for draft mode (only if not completed)
        if (!isCompleted) {
            this.setupAutoSave(receivedQuestionnaireId);
        }
    }

    // Setup auto-save functionality
    setupAutoSave(receivedQuestionnaireId) {
        console.log('[UIRenderer] Setting up auto-save for questionnaire:', receivedQuestionnaireId);

        const textareas = document.querySelectorAll('.answer-textarea');
        const debouncedSave = debounce(async () => {
            console.log('[UIRenderer] Auto-saving draft...');
            await app.saveDraft(receivedQuestionnaireId, true); // silent save
        }, 2000); // 2 seconds debounce

        textareas.forEach(textarea => {
            textarea.addEventListener('input', debouncedSave);
        });
    }

    // Render View Friend's Completed Answers
    renderViewFriendAnswers(friendId) {
        console.log('[UIRenderer] Rendering friend answers for:', friendId);

        const friend = friendManager.getFriendById(friendId);

        if (!friend) {
            showError('Friend not found');
            return;
        }

        if (friend.status !== 'completed') {
            showError('This friend has not completed the questionnaire yet');
            return;
        }

        const questionnaire = questionnaireManager.getQuestionnaireById(friend.assignedQuestionnaire);

        if (!questionnaire) {
            showError('Questionnaire not found');
            return;
        }

        // Find the completed questionnaire response
        // Note: In a full implementation, we'd need to fetch this from the friend's data
        // For now, we'll show a placeholder message
        const userData = storageManager.getUserData();
        const completedResponse = userData.receivedQuestionnaires.find(
            rq => rq.fromUserId === friend.userId && rq.questionnaireId === questionnaire.id && rq.status === 'completed'
        );

        if (!completedResponse) {
            // Friend hasn't actually submitted yet, or data mismatch
            this.appContent.innerHTML = `
                <div class="page">
                    <button class="back-button" onclick="app.navigateToFriends()">
                        ← Back to Friends
                    </button>

                    <div class="page-header">
                        <div class="page-title">${escapeHTML(friend.name)}'s Answers</div>
                        <div class="page-subtitle">Questionnaire: ${escapeHTML(questionnaire.title)}</div>
                    </div>

                    <div class="card" style="background: #fff3cd; border-color: #ffc107;">
                        <div class="card-title">⏳ Waiting for Response</div>
                        <p>${escapeHTML(friend.name)} has not submitted their answers yet.</p>
                        <p style="margin-top: 10px;"><strong>Shared Code:</strong> ${escapeHTML(friend.friendCode)}</p>
                        <p style="font-size: 14px; color: #666;">Make sure they've created an account and redeemed the code!</p>
                    </div>
                </div>
            `;
            return;
        }

        // Display the completed answers in a two-column table
        let tableRows = '';
        questionnaire.questions.forEach((question, index) => {
            const answer = completedResponse.answers[index] || '(No answer provided)';
            tableRows += `
                <tr>
                    <td class="question-cell">
                        <strong>Q${index + 1}:</strong> ${escapeHTML(question)}
                    </td>
                    <td class="answer-cell">
                        <div style="white-space: pre-wrap; font-family: var(--font-handwritten);">
                            ${escapeHTML(answer)}
                        </div>
                    </td>
                </tr>
            `;
        });

        this.appContent.innerHTML = `
            <div class="page">
                <button class="back-button" onclick="app.navigateToFriends()">
                    ← Back to Friends
                </button>

                <div class="page-header">
                    <div class="page-title">${escapeHTML(friend.name)}'s Answers</div>
                    <div class="page-subtitle">
                        Questionnaire: ${escapeHTML(questionnaire.title)}<br>
                        Completed: ${formatDate(completedResponse.completedAt)}
                    </div>
                </div>

                <div class="card" style="background: #e8f5e9; border-color: #4caf50; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 14px;">
                        ✓ <strong>${escapeHTML(friend.name)}</strong> completed this questionnaire on ${formatDateTime(completedResponse.completedAt)}
                    </p>
                </div>

                <table class="questionnaire-table">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>${escapeHTML(friend.name)}'s Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Global instance
const uiRenderer = new UIRenderer();

console.log('[UI Renderer] Module loaded');
