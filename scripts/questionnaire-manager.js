// Questionnaire Manager - CRUD Operations for Questionnaires

class QuestionnaireManager {
    constructor() {
        console.log('[QuestionnaireManager] Initialized');
    }

    // Get all questionnaires
    getQuestionnaires() {
        const userData = storageManager.getUserData();
        if (!userData || !userData.questionnaires) {
            console.warn('[QuestionnaireManager] No questionnaires data available');
            return [];
        }
        console.log('[QuestionnaireManager] Retrieved questionnaires:', userData.questionnaires.length);
        return userData.questionnaires;
    }

    // Get questionnaire by ID
    getQuestionnaireById(id) {
        const questionnaires = this.getQuestionnaires();
        const questionnaire = questionnaires.find(q => q.id === id);
        console.log('[QuestionnaireManager] Get questionnaire by ID:', id, questionnaire ? 'Found' : 'Not found');
        return questionnaire;
    }

    // Create new questionnaire
    async createQuestionnaire(title, questions) {
        console.log('[QuestionnaireManager] Creating questionnaire:', title);

        const questionnaire = {
            id: generateUUID(),
            title: title.trim(),
            questions: questions.map(q => q.trim()).filter(q => q),
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        const userData = storageManager.getUserData();
        userData.questionnaires.push(questionnaire);
        await storageManager.saveUserData();

        console.log('[QuestionnaireManager] Questionnaire created:', questionnaire.id);
        return questionnaire;
    }

    // Update questionnaire
    async updateQuestionnaire(id, updates) {
        console.log('[QuestionnaireManager] Updating questionnaire:', id);

        const userData = storageManager.getUserData();
        const index = userData.questionnaires.findIndex(q => q.id === id);

        if (index === -1) {
            throw new Error('Questionnaire not found');
        }

        userData.questionnaires[index] = {
            ...userData.questionnaires[index],
            ...updates,
            updatedAt: Date.now()
        };

        await storageManager.saveUserData();

        console.log('[QuestionnaireManager] Questionnaire updated');
        return userData.questionnaires[index];
    }

    // Delete questionnaire
    async deleteQuestionnaire(id) {
        console.log('[QuestionnaireManager] Deleting questionnaire:', id);

        const userData = storageManager.getUserData();
        const index = userData.questionnaires.findIndex(q => q.id === id);

        if (index === -1) {
            throw new Error('Questionnaire not found');
        }

        userData.questionnaires.splice(index, 1);
        await storageManager.saveUserData();

        console.log('[QuestionnaireManager] Questionnaire deleted');
        return true;
    }
}

// Global instance
const questionnaireManager = new QuestionnaireManager();

console.log('[Questionnaire Manager] Module loaded');
