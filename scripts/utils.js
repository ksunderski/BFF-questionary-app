// Utility Functions

// Generate unique ID (UUID v4 format)
function generateUUID() {
    console.log('[Utils] Generating UUID');
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Generate friend code (BFF-XXXXX format)
function generateFriendCode() {
    console.log('[Utils] Generating friend code');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'BFF-';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log('[Utils] Generated code:', code);
    return code;
}

// Format date for display
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format date with time
function formatDateTime(timestamp) {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Escape HTML to prevent XSS
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show loading state
function showLoading(message = 'Loading...') {
    console.log('[Utils] Showing loading state:', message);
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">${escapeHTML(message)}</div>
        </div>
    `;
}

// Show error message
function showError(message, details = '') {
    console.error('[Utils] Error:', message, details);
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="page">
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <div class="empty-state-text">
                    <strong>Oops! Something went wrong</strong><br>
                    ${escapeHTML(message)}
                    ${details ? `<br><small>${escapeHTML(details)}</small>` : ''}
                </div>
                <button class="btn btn-primary mt-lg" onclick="app.navigateToMainMenu()">
                    Back to Main Menu
                </button>
            </div>
        </div>
    `;
}

// Validate email format
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Get query parameter from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set query parameter in URL
function setQueryParam(param, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url.toString());
}

// Clear all query parameters
function clearQueryParams() {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.pushState({}, '', url.toString());
}

// Truncate text with ellipsis
function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

console.log('[Utils] Utility functions loaded');
