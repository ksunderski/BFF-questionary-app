// API Manager - Handles API Key Setup Flow

class APIManager {
    constructor() {
        console.log('[APIManager] Initialized');
        this.modal = document.getElementById('api-key-modal');
        this.input = document.getElementById('api-key-input');
        this.saveBtn = document.getElementById('save-api-key-btn');
        this.message = document.getElementById('api-key-message');

        this.setupEventListeners();
    }

    setupEventListeners() {
        console.log('[APIManager] Setting up event listeners');

        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.handleSaveAPIKey());
        }

        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSaveAPIKey();
                }
            });
        }
    }

    async checkAPIKey() {
        console.log('[APIManager] Checking API key...');

        const apiKey = apiClient.getAPIKey();
        const lastValidated = localStorage.getItem('ape-api-key-last-validated');

        console.log('[APIManager] API key present:', apiKey ? 'Yes' : 'No');
        console.log('[APIManager] Last validated:', lastValidated);

        if (!apiKey) {
            console.log('[APIManager] No API key found, showing setup modal');
            this.showSetupModal();
            return false;
        }

        if (!lastValidated) {
            console.log('[APIManager] Never validated, validating now...');
            const isValid = await apiClient.validateAPIKey(apiKey);
            if (!isValid) {
                console.log('[APIManager] Validation failed, clearing and showing setup');
                apiClient.clearAPIKey();
                this.showSetupModal();
                return false;
            }
            return true;
        }

        const dayInMs = 24 * 60 * 60 * 1000;
        const timeSinceValidation = Date.now() - parseInt(lastValidated);

        console.log('[APIManager] Time since last validation:', Math.round(timeSinceValidation / 1000 / 60), 'minutes');

        if (timeSinceValidation > dayInMs) {
            console.log('[APIManager] Validation expired, revalidating...');
            const isValid = await apiClient.validateAPIKey(apiKey);
            if (!isValid) {
                console.log('[APIManager] Revalidation failed, clearing and showing setup');
                apiClient.clearAPIKey();
                this.showSetupModal();
                return false;
            }
        }

        console.log('[APIManager] API key valid');
        return true;
    }

    showSetupModal() {
        console.log('[APIManager] Showing setup modal');
        if (this.modal) {
            this.modal.style.display = 'flex';
        }
    }

    hideSetupModal() {
        console.log('[APIManager] Hiding setup modal');
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    showMessage(text, type = 'info') {
        console.log(`[APIManager] Showing message (${type}):`, text);
        if (this.message) {
            this.message.textContent = text;
            this.message.className = `message ${type}`;
        }
    }

    async handleSaveAPIKey() {
        console.log('[APIManager] Save button clicked');

        const apiKey = this.input.value.trim();

        if (!apiKey) {
            this.showMessage('Please enter an API key', 'error');
            return;
        }

        console.log('[APIManager] Validating API key...');
        this.showMessage('Validating API key...', 'info');
        this.saveBtn.disabled = true;
        this.saveBtn.textContent = 'Validating...';

        try {
            const isValid = await apiClient.validateAPIKey(apiKey);

            if (isValid) {
                console.log('[APIManager] API key valid, saving...');
                apiClient.setAPIKey(apiKey);
                this.showMessage('Success! Your API key has been saved. Reloading...', 'success');

                setTimeout(() => {
                    console.log('[APIManager] Reloading page');
                    window.location.reload();
                }, 1500);
            } else {
                console.log('[APIManager] API key invalid');
                this.showMessage('Invalid API Key. Please check your key and try again.', 'error');
                this.saveBtn.disabled = false;
                this.saveBtn.textContent = 'Save';
            }
        } catch (error) {
            console.error('[APIManager] Validation error:', error);
            this.showMessage('Error validating API key. Please try again.', 'error');
            this.saveBtn.disabled = false;
            this.saveBtn.textContent = 'Save';
        }
    }
}

// Global instance
let apiManager;

document.addEventListener('DOMContentLoaded', () => {
    console.log('[APIManager] DOM loaded, initializing');
    apiManager = new APIManager();
});

console.log('[API Manager] Module loaded');
