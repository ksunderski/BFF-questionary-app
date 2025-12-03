// API Client with Rate Limiting
// API Base: https://api.wearables-ape.io

const API_BASE_URL = 'https://api.wearables-ape.io';

// Rate Limiting Queue - 1 request per second per model
class APIRequestQueue {
    constructor(intervalMs = 1000) {
        this.queue = [];
        this.intervalMs = intervalMs;
        this.lastCallTime = 0;
        this.processing = false;
        console.log(`[APIRequestQueue] Initialized with ${intervalMs}ms interval`);
    }

    async enqueue(apiCall) {
        console.log('[APIRequestQueue] Enqueuing API call');
        const now = Date.now();
        const timeSinceLastCall = now - this.lastCallTime;
        const waitTime = Math.max(0, this.intervalMs - timeSinceLastCall);

        if (waitTime > 0) {
            console.log(`[APIRequestQueue] Waiting ${waitTime}ms before next call`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.lastCallTime = Date.now();
        console.log('[APIRequestQueue] Executing API call');
        return apiCall();
    }
}

// Separate queues for different models
const gpt4oQueue = new APIRequestQueue(1000);
const gpt4oMiniQueue = new APIRequestQueue(1000);
const structuredMemoryQueue = new APIRequestQueue(1000);

// API Client Class
class APIClient {
    constructor() {
        this.apiKey = null;
        console.log('[APIClient] Initialized');
    }

    // Get API key from localStorage
    getAPIKey() {
        if (!this.apiKey) {
            this.apiKey = localStorage.getItem('ape-api-key');
            console.log('[APIClient] Retrieved API key from localStorage:', this.apiKey ? 'Present' : 'Missing');
        }
        return this.apiKey;
    }

    // Set API key
    setAPIKey(key) {
        this.apiKey = key;
        localStorage.setItem('ape-api-key', key);
        console.log('[APIClient] API key stored');
    }

    // Clear API key
    clearAPIKey() {
        this.apiKey = null;
        localStorage.removeItem('ape-api-key');
        localStorage.removeItem('ape-api-key-last-validated');
        console.log('[APIClient] API key cleared');
    }

    // Validate API key
    async validateAPIKey(key) {
        console.log('[APIClient] Validating API key...');
        try {
            const response = await fetch(`${API_BASE_URL}/models/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [{ role: 'user', content: 'test' }],
                    max_tokens: 5
                })
            });

            console.log('[APIClient] Validation response status:', response.status);

            if (response.ok) {
                localStorage.setItem('ape-api-key-last-validated', Date.now().toString());
                console.log('[APIClient] API key validated successfully');
                return true;
            }

            console.error('[APIClient] API key validation failed');
            return false;
        } catch (error) {
            console.error('[APIClient] Validation error:', error);
            return false;
        }
    }

    // Get user information
    async getUserInfo() {
        console.log('[APIClient] Fetching user info...');
        const apiKey = this.getAPIKey();

        return structuredMemoryQueue.enqueue(async () => {
            const response = await fetch(`${API_BASE_URL}/user/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'accept': 'application/json'
                }
            });

            console.log('[APIClient] User info response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to fetch user info: ${response.status}`);
            }

            const data = await response.json();
            console.log('[APIClient] User info retrieved:', data);
            return data;
        });
    }

    // Get structured memory
    async getStructuredMemory(key) {
        console.log('[APIClient] Fetching structured memory with key:', key);
        const apiKey = this.getAPIKey();

        return structuredMemoryQueue.enqueue(async () => {
            const response = await fetch(`${API_BASE_URL}/structured-memories/${key}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'accept': 'application/json'
                }
            });

            console.log('[APIClient] Structured memory GET response status:', response.status);

            if (response.status === 404) {
                console.log('[APIClient] Structured memory not found (new user)');
                return null;
            }

            if (!response.ok) {
                throw new Error(`Failed to fetch structured memory: ${response.status}`);
            }

            const data = await response.json();
            console.log('[APIClient] Structured memory retrieved:', data);
            return data.value;
        });
    }

    // Create structured memory (POST)
    async createStructuredMemory(key, value) {
        console.log('[APIClient] Creating structured memory with key:', key);
        console.log('[APIClient] Initial data:', value);
        const apiKey = this.getAPIKey();

        return structuredMemoryQueue.enqueue(async () => {
            const response = await fetch(`${API_BASE_URL}/structured-memories/${key}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value })
            });

            console.log('[APIClient] Structured memory POST response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('[APIClient] Error creating structured memory:', errorText);
                throw new Error(`Failed to create structured memory: ${response.status}`);
            }

            const data = await response.json();
            console.log('[APIClient] Structured memory created successfully');
            return data;
        });
    }

    // Update structured memory (PUT)
    async updateStructuredMemory(key, value) {
        console.log('[APIClient] Updating structured memory with key:', key);
        console.log('[APIClient] Updated data:', value);
        const apiKey = this.getAPIKey();

        return structuredMemoryQueue.enqueue(async () => {
            const response = await fetch(`${API_BASE_URL}/structured-memories/${key}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ value })
            });

            console.log('[APIClient] Structured memory PUT response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('[APIClient] Error updating structured memory:', errorText);
                throw new Error(`Failed to update structured memory: ${response.status}`);
            }

            const data = await response.json();
            console.log('[APIClient] Structured memory updated successfully');
            return data;
        });
    }

    // Delete structured memory
    async deleteStructuredMemory(key) {
        console.log('[APIClient] Deleting structured memory with key:', key);
        const apiKey = this.getAPIKey();

        return structuredMemoryQueue.enqueue(async () => {
            const response = await fetch(`${API_BASE_URL}/structured-memories/${key}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'accept': 'application/json'
                }
            });

            console.log('[APIClient] Structured memory DELETE response status:', response.status);

            if (!response.ok) {
                throw new Error(`Failed to delete structured memory: ${response.status}`);
            }

            console.log('[APIClient] Structured memory deleted successfully');
            return true;
        });
    }
}

// Global instance
const apiClient = new APIClient();

console.log('[API Client] Module loaded');
