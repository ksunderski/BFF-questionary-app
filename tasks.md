# BFF Questionary - Project Tasks

## Phase 1: Core Infrastructure
- [x] Set up project file structure (directories and placeholder files)
- [x] Create base HTML structure with iPhone mockup
- [x] Implement API key validation and setup flow
- [x] Create API request queue for rate limiting (1 req/sec per model)
- [x] Implement user ID retrieval from `/user/me` endpoint
- [x] Create structured memory initialization with user-specific key (`bff-questionary-{userId}`)
- [x] Implement default data structure for new users
- [x] Build user profile creation flow for first-time users
- [x] Create basic routing/navigation system
- [x] Implement main menu with navigation buttons

## Phase 2: Questionnaire Management
- [x] Create questionnaire data model and storage functions
- [x] Build "My Questionnaires" page UI
- [x] Implement questionnaire list display with metadata
- [x] Create questionnaire editor UI (create/edit mode)
- [x] Add dynamic question management (add/remove/reorder)
- [x] Implement save questionnaire functionality
- [x] Add delete questionnaire with confirmation
- [x] Build view questionnaire (read-only) display

## Phase 3: Friend & Sharing System
- [x] Create friend data model
- [x] Build "My Friends" page UI
- [x] Implement friend list display with status indicators
- [x] Create "Add Friend" form with code generation
- [x] Generate unique shareable codes (BFF-{randomString} format)
- [x] Implement code redemption system during user registration
- [x] Link questionnaire assignment to friends
- [x] Build friend-to-user matching logic
- [x] Add questionnaire to friend's inbox when code redeemed

## Phase 4: Inbox & Receiving
- [x] Create inbox data model for received questionnaires
- [x] Build "Inbox" page UI
- [x] Display received questionnaires with metadata
- [x] Implement notification system (questionnaire_received type)
- [x] Add notification badge counter on inbox icon
- [x] Create mark-as-read functionality
- [x] Handle questionnaire status transitions (pending/in_progress/completed)

## Phase 5: Questionnaire Filling
- [x] Create two-column table UI (questions left, answers right)
- [x] Implement answer input fields (text areas)
- [x] Add draft auto-save functionality
- [x] Build submit questionnaire functionality
- [x] Implement edit submitted answers feature
- [x] Send completion notification to original user
- [x] Update friend status to "completed" in original user's data

## Phase 6: View Completed Answers
- [x] Create "View Answers" UI for completed questionnaires
- [x] Display questions and answers in table format
- [x] Show completion metadata (date, time)
- [x] Add back navigation to friends list
- [x] Implement read-only view for questionnaire owner

## Phase 7: Visual Theme & Stickers
- [x] Create notebook paper CSS styling
- [x] Style with handwritten fonts (Google Fonts: Indie Flower, Patrick Hand)
- [x] Build iPhone mockup frame (375px × 812px viewport)
- [x] Add iPhone UI elements (status bar, home indicator)
- [x] Create emoji-based 80s-90s themed sticker system
- [x] Implement sticker drag-and-drop functionality
- [x] Add sticker positioning persistence per questionnaire
- [x] Create CSS animations for stickers (floating, pulse)
- [x] Implement sticker toolbar with toggle button
- [x] Apply consistent theme across all pages

## Phase 8: Polish & Testing
- [x] Create comprehensive TESTING.md documentation
- [x] Document all test cases for Phases 1-7
- [x] Add testing checklist templates
- [x] Document error handling patterns
- [x] Add console logging verification guide
- [x] Document known limitations
- [x] Create issue reporting guidelines
- [x] Final code cleanup
- [x] README.md complete with original prompt
- [x] Project ready for deployment
