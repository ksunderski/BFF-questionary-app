# BFF Questionary - Testing Guide

## 🧪 Comprehensive Testing Checklist

This document provides a complete testing guide for the BFF Questionary application across all phases and features.

---

## 📋 Pre-Testing Setup

### Requirements:
- ✅ Chrome browser (latest version)
- ✅ Meta internal network access
- ✅ API key from wearables-ape.io

### Setup Steps:
1. Navigate to `/Users/kseniiat/Downloads/BFF questionary`
2. Open `index.html` in Chrome
3. Have 2-3 different browser profiles ready for multi-user testing

---

## Phase 1: Core Infrastructure Testing

### Test 1.1: API Key Validation
**Steps:**
1. Open application (first time - no API key stored)
2. Verify API key setup modal appears
3. Enter invalid API key
4. Click "Save"

**Expected Results:**
- ❌ Error message: "Invalid API Key. Please check your key and try again."
- Modal remains open
- API key not saved to localStorage

**Steps (Success Case):**
1. Visit https://wearables-ape.io/settings/api-keys
2. Generate new API key
3. Copy and paste into modal
4. Click "Save"

**Expected Results:**
- ✅ Success message appears
- Page automatically reloads after 1-2 seconds
- API key saved to localStorage under `ape-api-key`
- Timestamp saved under `ape-api-key-last-validated`

### Test 1.2: User Profile Creation
**Steps:**
1. After API key validation, profile setup screen should appear
2. Leave name field empty
3. Click "Continue"

**Expected Results:**
- Alert: "Please enter your name"

**Steps (Success Case):**
1. Enter name (e.g., "Alice")
2. Click "Continue"

**Expected Results:**
- Profile created and saved to cloud
- Redirect to Main Menu
- Name displayed in welcome message

### Test 1.3: Navigation
**Steps:**
1. From Main Menu, click each navigation button
2. Verify back buttons work
3. Test browser back/forward buttons

**Expected Results:**
- All pages load correctly
- Back buttons return to previous page
- No console errors

---

## Phase 2: Questionnaire Management Testing

### Test 2.1: Create Questionnaire
**Steps:**
1. Navigate to "My Questionnaires"
2. Click "+ New Questionnaire"
3. Leave title empty
4. Click "Save Questionnaire"

**Expected Results:**
- Alert: "Please enter a title for your questionnaire"

**Steps (Success Case):**
1. Enter title: "Getting to Know My BFF"
2. Enter question 1: "What's your favorite color?"
3. Click "+ Add Question"
4. Enter question 2: "Where would you travel if you could go anywhere?"
5. Click "Save Questionnaire"

**Expected Results:**
- Loading message appears
- Questionnaire saved to cloud
- Redirect to questionnaires list
- New questionnaire appears with:
  - Title: "Getting to Know My BFF"
  - 2 questions
  - Created date (today)
  - Action buttons: View, Edit, Delete

### Test 2.2: Edit Questionnaire
**Steps:**
1. From questionnaires list, click "Edit" on a questionnaire
2. Modify title
3. Add a new question
4. Remove a question (click × button)
5. Click "Save Questionnaire"

**Expected Results:**
- Changes persist to cloud
- Redirect to questionnaires list
- Updated data displayed

### Test 2.3: View Questionnaire (Read-Only)
**Steps:**
1. Click "View" on a questionnaire

**Expected Results:**
- Questions displayed in numbered cards
- "Edit Questionnaire" button available
- No input fields (read-only)

### Test 2.4: Delete Questionnaire
**Steps:**
1. Click "Delete" on a questionnaire
2. Click "Cancel" in confirmation dialog

**Expected Results:**
- Questionnaire NOT deleted

**Steps (Confirm Delete):**
1. Click "Delete" again
2. Click "OK" in confirmation dialog

**Expected Results:**
- Loading message appears
- Questionnaire removed from cloud
- List refreshes without deleted questionnaire
- Badge count updates

---

## Phase 3: Friend & Sharing System Testing

### Test 3.1: Add Friend (No Questionnaires)
**Steps:**
1. Navigate to "My Friends"
2. Click "+ Add Friend"

**Expected Results:**
- Empty state message: "You need to create a questionnaire first!"
- "Create Questionnaire" button shown

### Test 3.2: Add Friend (Success)
**Steps:**
1. Create at least one questionnaire first
2. Navigate to "My Friends"
3. Click "+ Add Friend"
4. Leave name empty
5. Click "Generate Friend Code"

**Expected Results:**
- Alert: "Please enter your friend's name"

**Steps (Success Case):**
1. Enter friend name: "Bob"
2. (Optional) Enter email
3. Select questionnaire from dropdown
4. Click "Generate Friend Code"

**Expected Results:**
- Loading message appears
- Success screen displays unique BFF code (format: BFF-XXXXXX)
- Code displayed prominently in large text
- "Copy Code to Clipboard" button available
- Instructions for friend displayed

### Test 3.3: Copy Friend Code
**Steps:**
1. On friend code success screen, click "Copy Code to Clipboard"

**Expected Results:**
- Alert: "Code BFF-XXXXXX copied to clipboard!"
- Code actually copied (test by pasting elsewhere)

### Test 3.4: View Friends List
**Steps:**
1. Return to "My Friends" list

**Expected Results:**
- Friend "Bob" listed with:
  - Name
  - Assigned questionnaire title
  - BFF code displayed
  - Status badge showing "pending"
  - No "View Answers" button (not completed yet)

---

## Phase 4: Inbox & Receiving Testing

### Test 4.1: Empty Inbox
**Steps:**
1. Navigate to "Inbox"

**Expected Results:**
- Empty state: "No questionnaires received yet"
- No notifications section (if no notifications)

### Test 4.2: Notification Display
**Note:** To fully test this, you need another user account to send you a questionnaire

**Expected Results (when notifications exist):**
- Notifications section displayed
- Recent notifications listed (up to 5)
- Unread notifications marked with 🔔
- Read notifications marked with ✓
- Timestamps shown
- "Mark All Read" button visible if unread exist

### Test 4.3: Mark Notifications as Read
**Steps:**
1. If unread notifications exist, click "Mark All Read"

**Expected Results:**
- Loading message appears
- All notifications marked as read
- Badge count on Main Menu inbox button updates to 0
- Page refreshes

---

## Phase 5: Questionnaire Filling Testing

### Test 5.1: Start Questionnaire
**Note:** Requires received questionnaire in inbox

**Steps:**
1. From Inbox, click "Start" on a pending questionnaire

**Expected Results:**
- Two-column table interface loads
- Questions displayed in left column
- Empty textareas in right column for answers
- Tip banner about auto-save displayed
- "Save Draft" and "Submit Answers" buttons shown

### Test 5.2: Auto-Save Draft
**Steps:**
1. Type in first answer field
2. Wait 3 seconds (no further typing)

**Expected Results:**
- Console log shows: "Auto-saving draft..."
- Status silently updated to "in_progress"
- No UI disruption

### Test 5.3: Manual Save Draft
**Steps:**
1. Type in multiple answer fields
2. Click "Save Draft" button

**Expected Results:**
- Loading message: "Saving draft..."
- Alert: "Draft saved! You can come back to continue anytime."
- Redirect to Inbox
- Questionnaire status shows "in_progress"
- "Continue" button available

### Test 5.4: Continue Draft
**Steps:**
1. From Inbox, click "Continue" on in_progress questionnaire

**Expected Results:**
- Previously entered answers displayed in fields
- Can edit existing answers
- Can add new answers

### Test 5.5: Submit with Unanswered Questions
**Steps:**
1. Leave some questions unanswered
2. Click "Submit Answers"

**Expected Results:**
- Confirmation dialog: "You have X unanswered questions. Are you sure you want to submit?"
- Option to cancel or continue

### Test 5.6: Submit Completed Questionnaire
**Steps:**
1. Fill all questions
2. Click "Submit Answers"

**Expected Results:**
- Loading message: "Submitting your answers..."
- Notification created for original sender
- Alert: "Thank you! Your answers have been submitted."
- Redirect to Inbox
- Status changed to "completed"
- Completion timestamp recorded
- "View" button now available

### Test 5.7: Edit Submitted Answers
**Steps:**
1. From Inbox, click "View" on completed questionnaire
2. Click "✏️ Edit Answers" button
3. Click "Cancel" in confirmation

**Expected Results:**
- No changes made

**Steps (Confirm Edit):**
1. Click "✏️ Edit Answers" again
2. Click "OK" in confirmation

**Expected Results:**
- Questionnaire reopens in edit mode
- All previous answers displayed
- Can modify and resubmit

---

## Phase 6: View Completed Answers Testing

### Test 6.1: View Friend's Answers (Not Completed)
**Steps:**
1. Navigate to "My Friends"
2. Friend status is "pending"
3. No "View Answers" button visible

**Expected Results:**
- Cannot view answers until friend completes questionnaire

### Test 6.2: View Friend's Completed Answers
**Note:** Requires friend to have submitted questionnaire

**Steps:**
1. Navigate to "My Friends"
2. Friend status shows "completed"
3. Click "View Answers" button

**Expected Results:**
- Two-column table displays:
  - Left: Your questions
  - Right: Friend's answers
- Success banner shows completion info
- Friend's name in page title
- Completion timestamp displayed
- Answers preserved with original formatting

### Test 6.3: Empty/Unanswered Questions
**Expected Results:**
- Empty answers display as "(No answer provided)"

---

## Phase 7: Stickers & Visual Theme Testing

### Test 7.1: Sticker Toggle Button
**Steps:**
1. Navigate to Main Menu
2. Look for pink paint brush button (🎨) in bottom-right

**Expected Results:**
- Button visible and floating
- Hover effect (scale up)
- Pink background color

### Test 7.2: Activate Sticker Mode
**Steps:**
1. Click sticker toggle button

**Expected Results:**
- Button turns yellow
- Toolbar slides up from bottom
- 15 emoji stickers displayed in toolbar
- Each sticker clickable

### Test 7.3: Add Stickers
**Steps:**
1. With sticker mode active, click any emoji in toolbar

**Expected Results:**
- Sticker appears at random position on page
- Sticker has slight rotation
- Sticker has floating animation
- Can add multiple stickers

### Test 7.4: Drag Stickers
**Steps:**
1. Click and hold any sticker
2. Drag to new position
3. Release

**Expected Results:**
- Cursor changes to "grabbing"
- Sticker follows mouse
- Position updates when released
- New position saved to localStorage

### Test 7.5: Remove Stickers
**Steps:**
1. Double-click any sticker
2. Click "Cancel" in confirmation

**Expected Results:**
- Sticker NOT removed

**Steps (Confirm):**
1. Double-click again
2. Click "OK"

**Expected Results:**
- Sticker disappears
- Removed from localStorage

### Test 7.6: Sticker Persistence
**Steps:**
1. Add 3-5 stickers to Main Menu
2. Navigate to "My Questionnaires"
3. Navigate back to Main Menu

**Expected Results:**
- Stickers appear exactly where placed
- Same rotation and scale

### Test 7.7: Per-Page Stickers
**Steps:**
1. Add stickers to Main Menu
2. Navigate to "My Questionnaires"
3. Toggle sticker mode and add different stickers
4. Navigate between pages

**Expected Results:**
- Each page has its own set of stickers
- Stickers don't appear on other pages
- Separate localStorage keys per page

### Test 7.8: Notebook Theme
**Visual Checks:**
- ✅ Ruled lines visible on paper background
- ✅ Red margin line on left side
- ✅ Cream/off-white paper color
- ✅ Handwritten fonts (Indie Flower, Patrick Hand)
- ✅ iPhone mockup frame with rounded corners
- ✅ Status bar at top (time, battery, signal)
- ✅ Home indicator at bottom

---

## Cross-Browser & Performance Testing

### Test 8.1: Chrome (Primary)
- All features work as expected
- No console errors
- Smooth animations

### Test 8.2: Performance
**Checks:**
- Page load time < 2 seconds
- Smooth scrolling in iPhone mockup
- No lag when dragging stickers
- Auto-save doesn't impact typing
- API rate limiting working (1 req/sec)

---

## Data Persistence Testing

### Test 9.1: LocalStorage
**Steps:**
1. Open Chrome DevTools
2. Go to Application > Local Storage
3. Verify keys exist:
   - `ape-api-key`
   - `ape-api-key-last-validated`
   - `stickers-main-menu` (if stickers added)
   - `stickers-questionnaires` (if stickers added)

### Test 9.2: Cloud Persistence (Structured Memories)
**Steps:**
1. Create questionnaire, add friend, fill questionnaire
2. Close browser completely
3. Open application again
4. Log in with same API key

**Expected Results:**
- All questionnaires present
- All friends present with status
- All inbox items present
- Profile data intact
- Notification history preserved

### Test 9.3: Multi-Device Sync
**Steps:**
1. Use application on one device
2. Open same API key on different device/browser

**Expected Results:**
- All cloud data synced
- LocalStorage stickers may differ (device-specific)

---

## Error Handling Testing

### Test 10.1: Network Failure
**Steps:**
1. Disconnect from internet
2. Try to save questionnaire

**Expected Results:**
- Error message displayed
- User-friendly error description
- Console shows detailed error

### Test 10.2: Invalid Data
**Steps:**
1. Try to save questionnaire with no questions
2. Try to add friend with no name

**Expected Results:**
- Validation alerts prevent submission
- No API calls made

### Test 10.3: API Errors
**Steps:**
1. Use expired/invalid API key (clear localStorage)
2. Try to use application

**Expected Results:**
- API key validation fails
- Setup modal appears
- Clear error message shown

---

## Multi-User Testing

### Test 11.1: Complete End-to-End Flow
**Users:** Alice and Bob

**Alice's Steps:**
1. Create questionnaire: "Friendship Quiz"
2. Add friend "Bob"
3. Copy BFF code: BFF-ABC123

**Bob's Steps:**
1. Create account with different API key
2. (Manual) Enter URL with code parameter: `?friendCode=BFF-ABC123`
3. Navigate to Inbox
4. See questionnaire from Alice
5. Click "Start" and fill out answers
6. Click "Submit Answers"

**Alice's Steps (Continued):**
1. Check notifications (should see new notification)
2. Navigate to "My Friends"
3. See Bob's status changed to "completed"
4. Click "View Answers"
5. Review Bob's responses

**Expected Results:**
- Complete workflow functions end-to-end
- All data persists correctly
- Notifications triggered appropriately

---

## Console Logging Verification

### Check console logs for:
- ✅ API key validation steps
- ✅ User ID retrieval
- ✅ Structured memory operations (GET, POST, PUT)
- ✅ All API endpoints called
- ✅ Full payloads logged (excluding base64 images)
- ✅ Response status codes
- ✅ State changes logged
- ✅ Navigation events logged
- ✅ Error conditions logged with details

---

## Known Limitations (by Design)

1. **Friend Code Redemption:** Currently requires manual URL parameter or code entry during setup (no automatic cross-user discovery implemented)
2. **Stickers:** Emoji-based (not PNG images) for simplicity
3. **Cross-User Communication:** Limited to friend codes and notification creation
4. **Data Retention:** 30 days via Structured Memories API
5. **Browser Support:** Optimized for Chrome only

---

## Testing Summary Template

Use this template to track your testing progress:

```markdown
## Test Date: [YYYY-MM-DD]
## Tester: [Name]
## Browser: Chrome [Version]

### Phase 1: Core Infrastructure
- [ ] API Key Validation
- [ ] User Profile Creation
- [ ] Navigation

### Phase 2: Questionnaire Management
- [ ] Create Questionnaire
- [ ] Edit Questionnaire
- [ ] View Questionnaire
- [ ] Delete Questionnaire

### Phase 3: Friend & Sharing
- [ ] Add Friend
- [ ] Generate BFF Code
- [ ] Copy Code
- [ ] View Friends List

### Phase 4: Inbox & Receiving
- [ ] View Inbox
- [ ] Notifications Display
- [ ] Mark as Read

### Phase 5: Questionnaire Filling
- [ ] Start Questionnaire
- [ ] Auto-Save
- [ ] Manual Save
- [ ] Submit
- [ ] Edit Submitted

### Phase 6: View Answers
- [ ] View Friend's Answers
- [ ] Answer Formatting

### Phase 7: Stickers & Theme
- [ ] Add Stickers
- [ ] Drag Stickers
- [ ] Remove Stickers
- [ ] Persistence
- [ ] Visual Theme

### Issues Found:
1. [Description]
2. [Description]

### Notes:
[Any additional observations]
```

---

## Reporting Issues

When reporting issues, please include:
1. Browser version
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Console error messages
6. Screenshots (if applicable)

---

**Testing Complete!** ✅

This guide covers all major features and edge cases for the BFF Questionary application.
