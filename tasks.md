# BFF Questionary - Project Tasks

## Phase 1: Core Infrastructure
- [ ] Set up project file structure (directories and placeholder files)
- [ ] Create base HTML structure with iPhone mockup
- [ ] Implement API key validation and setup flow
- [ ] Create API request queue for rate limiting (1 req/sec per model)
- [ ] Implement user ID retrieval from `/user/me` endpoint
- [ ] Create structured memory initialization with user-specific key (`bff-questionary-{userId}`)
- [ ] Implement default data structure for new users
- [ ] Build user profile creation flow for first-time users
- [ ] Create basic routing/navigation system
- [ ] Implement main menu with navigation buttons

## Phase 2: Questionnaire Management
- [ ] Create questionnaire data model and storage functions
- [ ] Build "My Questionnaires" page UI
- [ ] Implement questionnaire list display with metadata
- [ ] Create questionnaire editor UI (create/edit mode)
- [ ] Add dynamic question management (add/remove/reorder)
- [ ] Implement save questionnaire functionality
- [ ] Add delete questionnaire with confirmation
- [ ] Build view questionnaire (read-only) display

## Phase 3: Friend & Sharing System
- [ ] Create friend data model
- [ ] Build "My Friends" page UI
- [ ] Implement friend list display with status indicators
- [ ] Create "Add Friend" form with code generation
- [ ] Generate unique shareable codes (BFF-{randomString} format)
- [ ] Implement code redemption system during user registration
- [ ] Link questionnaire assignment to friends
- [ ] Build friend-to-user matching logic
- [ ] Add questionnaire to friend's inbox when code redeemed

## Phase 4: Inbox & Receiving
- [ ] Create inbox data model for received questionnaires
- [ ] Build "Inbox" page UI
- [ ] Display received questionnaires with metadata
- [ ] Implement notification system (questionnaire_received type)
- [ ] Add notification badge counter on inbox icon
- [ ] Create mark-as-read functionality
- [ ] Handle questionnaire status transitions (pending/in_progress/completed)

## Phase 5: Questionnaire Filling
- [ ] Create two-column table UI (questions left, answers right)
- [ ] Implement answer input fields (text areas)
- [ ] Add draft auto-save functionality
- [ ] Build submit questionnaire functionality
- [ ] Implement edit submitted answers feature
- [ ] Send completion notification to original user
- [ ] Update friend status to "completed" in original user's data

## Phase 6: View Completed Answers
- [ ] Create "View Answers" UI for completed questionnaires
- [ ] Display questions and answers in table format
- [ ] Show completion metadata (date, time)
- [ ] Add back navigation to friends list
- [ ] Implement read-only view for questionnaire owner

## Phase 7: Visual Theme & Stickers
- [ ] Create notebook paper CSS (ruled lines, margin, cream background)
- [ ] Style with handwritten fonts (Google Fonts: Indie Flower, Patrick Hand)
- [ ] Build iPhone mockup frame (375px × 812px viewport)
- [ ] Add iPhone UI elements (status bar, home indicator)
- [ ] Create/source 80s-90s themed sticker images
- [ ] Implement sticker drag-and-drop functionality
- [ ] Add sticker positioning persistence per questionnaire
- [ ] Create CSS animations for stickers (hover, pulse)
- [ ] Apply consistent theme across all pages

## Phase 8: Polish & Testing
- [ ] Add comprehensive console.log statements throughout
- [ ] Implement error handling and user-friendly error messages
- [ ] Add loading states for API calls
- [ ] Create empty state UIs (no questionnaires, no friends, etc.)
- [ ] Integrate Google Analytics (Tag: G-Q98010P7LZ)
- [ ] Test complete user journey (new user to completed questionnaire)
- [ ] Test questionnaire creation and editing
- [ ] Test friend code generation and redemption
- [ ] Test notification system
- [ ] Test data persistence across sessions
- [ ] Test cross-browser compatibility (Chrome focus)
- [ ] Create comprehensive README.md documentation
- [ ] Add "Original Prompt" section to README
- [ ] Add "Protohub fullscreen deployment: true" to README
- [ ] Final code review and cleanup
