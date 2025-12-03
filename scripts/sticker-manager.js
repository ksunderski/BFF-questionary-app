// Sticker Manager - Handle Sticker Drag and Drop

class StickerManager {
    constructor() {
        this.stickers = [];
        this.currentPage = null;
        this.isDragging = false;
        this.stickerMode = false;
        console.log('[StickerManager] Initialized');

        // 90s themed sticker emojis
        this.stickerTypes = [
            '😎', '💾', '📟', '📼', '💿',
            '🎮', '💻', '📺', '☎️', '📻',
            '🛼', '🍕', '✌️', '👾', '🎸',
            '⭐', '💖', '🌈', '✨', '🎨'
        ];
    }

    // Initialize stickers for a page
    initialize(pageName) {
        console.log('[StickerManager] Initializing for page:', pageName);
        this.currentPage = pageName;
        this.loadStickers();
        this.renderStickers();
    }

    // Load stickers from storage
    loadStickers() {
        console.log('[StickerManager] Loading stickers for page:', this.currentPage);
        const stored = localStorage.getItem(`stickers-${this.currentPage}`);
        if (stored) {
            this.stickers = JSON.parse(stored);
            console.log('[StickerManager] Loaded stickers:', this.stickers.length);
        } else {
            this.stickers = [];
        }
    }

    // Save stickers to storage
    saveStickers() {
        console.log('[StickerManager] Saving stickers for page:', this.currentPage);
        localStorage.setItem(`stickers-${this.currentPage}`, JSON.stringify(this.stickers));
    }

    // Toggle sticker mode
    toggleStickerMode() {
        this.stickerMode = !this.stickerMode;
        console.log('[StickerManager] Sticker mode:', this.stickerMode ? 'ON' : 'OFF');

        const toolbar = document.getElementById('sticker-toolbar');
        const toggleBtn = document.getElementById('toggle-stickers-btn');

        if (this.stickerMode) {
            if (toolbar) toolbar.style.display = 'flex';
            if (toggleBtn) toggleBtn.classList.add('active');
        } else {
            if (toolbar) toolbar.style.display = 'none';
            if (toggleBtn) toggleBtn.classList.remove('active');
        }
    }

    // Add new sticker
    addSticker(type, x, y) {
        console.log('[StickerManager] Adding sticker:', type, 'at', x, y);
        const sticker = {
            id: generateUUID(),
            type: type,
            x: x || 100,
            y: y || 100,
            rotation: Math.random() * 20 - 10,
            scale: 0.8 + Math.random() * 0.4
        };

        this.stickers.push(sticker);
        this.saveStickers();
        this.renderStickers();
        return sticker;
    }

    // Update sticker position
    updateStickerPosition(stickerId, x, y) {
        console.log('[StickerManager] Updating sticker position:', stickerId);
        const sticker = this.stickers.find(s => s.id === stickerId);
        if (sticker) {
            sticker.x = x;
            sticker.y = y;
            this.saveStickers();
        }
    }

    // Remove sticker
    removeSticker(stickerId) {
        console.log('[StickerManager] Removing sticker:', stickerId);
        const index = this.stickers.findIndex(s => s.id === stickerId);
        if (index !== -1) {
            this.stickers.splice(index, 1);
            this.saveStickers();
            this.renderStickers();
        }
    }

    // Get all stickers for current page
    getStickers() {
        return this.stickers;
    }

    // Render stickers on page
    renderStickers() {
        console.log('[StickerManager] Rendering stickers');
        let container = document.getElementById('stickers-container');

        if (!container) {
            const appContent = document.getElementById('app-content');
            if (!appContent) return;

            container = document.createElement('div');
            container.id = 'stickers-container';
            container.className = 'stickers-container';
            appContent.appendChild(container);
        }

        container.innerHTML = '';

        this.stickers.forEach(sticker => {
            const stickerEl = document.createElement('div');
            stickerEl.className = 'sticker floating';
            stickerEl.style.left = `${sticker.x}px`;
            stickerEl.style.top = `${sticker.y}px`;
            stickerEl.style.transform = `rotate(${sticker.rotation}deg) scale(${sticker.scale})`;
            stickerEl.dataset.stickerId = sticker.id;
            stickerEl.innerHTML = sticker.type;

            this.setupDragAndDrop(stickerEl);
            container.appendChild(stickerEl);
        });
    }

    // Setup drag and drop for sticker element
    setupDragAndDrop(element) {
        let startX, startY, initialX, initialY;

        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = parseInt(element.style.left);
            initialY = parseInt(element.style.top);

            element.style.cursor = 'grabbing';
            element.style.zIndex = '1000';

            const onMouseMove = (e) => {
                if (!this.isDragging) return;

                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;

                element.style.left = `${initialX + deltaX}px`;
                element.style.top = `${initialY + deltaY}px`;
            };

            const onMouseUp = () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    element.style.cursor = 'grab';
                    element.style.zIndex = '50';

                    const stickerId = element.dataset.stickerId;
                    const x = parseInt(element.style.left);
                    const y = parseInt(element.style.top);
                    this.updateStickerPosition(stickerId, x, y);
                }

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        // Double-click to remove
        element.addEventListener('dblclick', (e) => {
            e.preventDefault();
            const stickerId = element.dataset.stickerId;
            if (confirm('Remove this sticker?')) {
                this.removeSticker(stickerId);
            }
        });
    }

    // Render sticker toolbar and toggle button
    renderStickerUI() {
        console.log('[StickerManager] Rendering sticker UI');

        // Remove existing UI if present
        const existingToolbar = document.getElementById('sticker-toolbar');
        const existingToggle = document.getElementById('toggle-stickers-btn');
        if (existingToolbar) existingToolbar.remove();
        if (existingToggle) existingToggle.remove();

        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'toggle-stickers-btn';
        toggleBtn.className = 'toggle-stickers-btn';
        toggleBtn.innerHTML = '🎨';
        toggleBtn.title = 'Toggle Stickers';
        toggleBtn.onclick = () => this.toggleStickerMode();
        document.body.appendChild(toggleBtn);

        // Create toolbar
        const toolbar = document.createElement('div');
        toolbar.id = 'sticker-toolbar';
        toolbar.className = 'sticker-toolbar';
        toolbar.style.display = 'none';

        this.stickerTypes.forEach(emoji => {
            const option = document.createElement('div');
            option.className = 'sticker-option';
            option.innerHTML = emoji;
            option.title = 'Click to add';
            option.onclick = () => {
                const appContent = document.getElementById('app-content');
                const rect = appContent.getBoundingClientRect();
                const x = Math.random() * (rect.width - 60) + rect.left;
                const y = Math.random() * (rect.height - 60) + rect.top;
                this.addSticker(emoji, x - rect.left, y - rect.top);
            };
            toolbar.appendChild(option);
        });

        document.body.appendChild(toolbar);
    }
}

// Global instance
const stickerManager = new StickerManager();

console.log('[Sticker Manager] Module loaded');
