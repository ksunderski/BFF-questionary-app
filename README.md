# BFF Questionary

A mobile-first web application that simulates a high school friend questionnaire experience with an authentic 80s-90s college notebook aesthetic. Create personalized questionnaires, share them with friends using unique codes, and view completed responses in a charming, nostalgic interface.

## 🎨 Features

- **Profile Management**: Create and manage your personal profile
- **Questionnaire Creation**: Design custom questionnaires with multiple questions
- **Friend System**: Add friends and share questionnaires via unique BFF codes
- **Inbox System**: Receive, fill out, and submit questionnaires from friends
- **Nostalgic Design**: 80s-90s notebook paper theme with ruled lines and decorative stickers
- **iPhone Mockup**: Beautiful mobile-first design wrapped in an iPhone frame
- **Cloud Sync**: All data persists via structured memories API

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Google Chrome recommended)
- Meta internal network access (for API access)
- API key from wearables-ape.io

### First-Time Setup

1. Open `index.html` in your web browser
2. You'll see an API Key Setup modal on first launch
3. Follow these steps:
   - Visit https://wearables-ape.io/consent (if first time)
   - Go to https://wearables-ape.io/settings/api-keys
   - Click "New API Key" and copy the generated key
   - Paste the key into the setup modal and click "Save"
4. Create your profile by entering your name
5. Start using the app!

## 📁 Project Structure

```
BFF-Questionary-App/
├── index.html                 # Main entry point
├── styles/
│   ├── main.css              # Global styles, reset, variables
│   ├── iphone-mockup.css     # iPhone frame styling
│   ├── notebook.css          # Notebook paper theme
│   ├── components.css        # Reusable UI components
│   └── stickers.css          # Sticker animations
├── scripts/
│   ├── app.js                # App initialization, routing
│   ├── api-manager.js        # API key validation, setup flow
│   ├── api-client.js         # All API calls, rate limiting
│   ├── storage-manager.js    # Structured memory operations
│   ├── auth.js               # User session management
│   ├── questionnaire-manager.js  # CRUD for questionnaires
│   ├── friend-manager.js     # Friend operations
│   ├── notification-manager.js   # Notification handling
│   ├── sticker-manager.js    # Sticker drag-and-drop
│   ├── ui-renderer.js        # Dynamic UI generation
│   └── utils.js              # Helper functions
├── assets/
│   ├── images/
│   │   └── stickers/         # 80s-90s themed sticker images
│   └── fonts/                # Handwritten fonts (if self-hosted)
├── README.md                 # This file
└── tasks.md                  # Development task tracking
```

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- **No Frameworks**: Built with web standards for simplicity
- **API Base**: https://api.wearables-ape.io
- **Authentication**: API key-based
- **Storage**: Structured Memories API for cloud persistence
- **Analytics**: Google Analytics (G-Q98010P7LZ)

## 💾 Data Architecture

### User Data Structure

All user data is stored in the cloud using the Structured Memories API with a unique key per user: `bff-questionary-{userId}`

```javascript
{
  "profile": {
    "name": string,
    "userId": string,
    "createdAt": timestamp
  },
  "questionnaires": [
    {
      "id": string (UUID),
      "title": string,
      "questions": [string],
      "createdAt": timestamp,
      "updatedAt": timestamp
    }
  ],
  "friends": [
    {
      "id": string (UUID),
      "name": string,
      "userId": string,
      "email": string,
      "friendCode": string,
      "addedAt": timestamp,
      "assignedQuestionnaire": string,
      "status": "pending" | "completed",
      "completedAt": timestamp | null
    }
  ],
  "receivedQuestionnaires": [
    {
      "id": string (UUID),
      "fromUserId": string,
      "fromUserName": string,
      "questionnaireId": string,
      "questions": [string],
      "answers": [string],
      "status": "pending" | "in_progress" | "completed",
      "receivedAt": timestamp,
      "completedAt": timestamp | null
    }
  ],
  "notifications": [
    {
      "id": string (UUID),
      "type": "questionnaire_received" | "questionnaire_completed",
      "message": string,
      "read": boolean,
      "createdAt": timestamp,
      "relatedId": string
    }
  ]
}
```

## 🎮 User Flows

### Create and Share a Questionnaire

1. Navigate to "My Questionnaires"
2. Click "+ New Questionnaire"
3. Enter a title and add questions
4. Save the questionnaire
5. Go to "My Friends" and click "+ Add Friend"
6. Enter friend's name and select your questionnaire
7. Share the generated BFF code with your friend

### Fill Out a Received Questionnaire

1. Friend creates an account with their own API key
2. Friend redeems your BFF code during setup or via special link
3. Questionnaire appears in their Inbox
4. Friend clicks "Start" to begin filling it out
5. Answers are saved as drafts automatically
6. Friend clicks "Submit" when complete
7. You receive a notification and can view their answers

## 🔒 Security & Privacy

- **Internal Use Only**: Designed for Meta internal network
- **API Key Authentication**: User-specific API keys from wearables-ape.io
- **Data Isolation**: Each user's data is stored separately by user ID
- **30-Day Retention**: Cloud storage automatically expires after 30 days
- **No Sensitive Data**: Questionnaires contain only user-provided content

## 📊 Analytics

Google Analytics is integrated with Tag ID: G-Q98010P7LZ

All significant user interactions are tracked for product insights.

## 🐛 Debugging

The application includes extensive console logging for debugging purposes:

- All API calls (endpoints, payloads, responses)
- User flow steps
- State changes
- Error conditions
- Data persistence operations

Open your browser's developer console to view detailed logs.

## 🎨 Design Philosophy

The application embraces a nostalgic 80s-90s aesthetic:

- **Notebook Paper**: Ruled lines, red margin, cream background
- **Handwritten Fonts**: Google Fonts "Indie Flower" and "Patrick Hand"
- **Stickers**: Draggable animated stickers (smiley faces, stars, etc.)
- **iPhone Frame**: Modern mobile-first design in retro packaging
- **Color Palette**: Soft blues, pinks, and yellows reminiscent of the era

## 🚧 Development Status

### Phase 1: Core Infrastructure ✅ (Completed)
- [x] Project file structure
- [x] API key validation and setup flow
- [x] Structured memory initialization
- [x] User profile creation
- [x] Basic routing and navigation
- [x] Main menu with navigation buttons

### Phase 2-8: Feature Implementation 🚧 (In Progress)
See `tasks.md` for detailed task breakdown and current status.

## 🔮 Future Enhancements

- Profile pictures using file storage API
- Custom questionnaire themes
- Additional sticker packs
- Export questionnaires as PDF
- Questionnaire templates
- Friend groups/categories
- Rich text formatting in answers
- Real-time collaboration

## 📝 License

Internal Meta project - not for external distribution

## 👥 Contributing

This is an internal prototype. For questions or suggestions, please refer to the Vibe Coding @ Meta workshop.

---

## Original Prompt

Build me a BFF (Best Friends Forever) Questionary app. This is a mobile-first web application that simulates the nostalgic high school experience of passing around friend questionnaires. The app should have an authentic 80s-90s college notebook aesthetic with ruled paper, handwritten-style fonts, and draggable decorative stickers.

Key features:
- Create personalized questionnaires with custom questions
- Share questionnaires with friends using unique BFF codes (e.g., BFF-X7K9P2)
- Fill out questionnaires received from friends in a two-column table format
- View completed responses from friends
- Manage a list of friends and track questionnaire status
- Receive notifications when friends complete your questionnaires
- Beautiful iPhone mockup wrapper for mobile-first experience
- Draggable 80s-90s themed stickers that persist per questionnaire

Technical requirements:
- Pure HTML, CSS, and vanilla JavaScript (no frameworks)
- API Base: https://api.wearables-ape.io
- Use Structured Memories API for data persistence
- API key authentication (stored in localStorage)
- Google Analytics integration (G-Q98010P7LZ)
- Friend code system for sharing (manual code-based, not email matching)
- Comprehensive console logging for debugging

The app should feel warm, nostalgic, and fun - like finding an old high school yearbook filled with friendship questionnaires and decorative stickers.

---

Protohub fullscreen deployment: true
