# BFF Questionary - Teammate Testing Guide

## 🎯 Purpose

This guide will help you set up the BFF Questionary app on your laptop so you can test the multi-user questionnaire sharing workflow with your teammate.

---

## 📋 Prerequisites

- ✅ Macbook (Mac laptop)
- ✅ Google Chrome browser (latest version)
- ✅ Meta internal network access
- ✅ 10-15 minutes for setup

---

## 🚀 Setup Instructions

### **Step 1: Get the Code from GitHub**

#### Option A: Clone with Git (Recommended)

```bash
# Open Terminal and run:
cd ~/Downloads
git clone https://github.com/ksunderski/BFF-questionary-app.git
cd BFF-questionary-app
```

#### Option B: Download ZIP

1. Go to: https://github.com/ksunderski/BFF-questionary-app
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to your Downloads folder
5. You should have a folder called `BFF-questionary-app` (or `BFF-questionary-app-main`)

---

### **Step 2: Get Your Own API Key**

**IMPORTANT:** You need your OWN API key (different from your teammate's). Each person needs their own key to simulate different users.

1. **First-time setup:** Visit https://wearables-ape.io/consent and sign the consent form
2. **Get your key:** Go to https://wearables-ape.io/settings/api-keys
3. Click **"New API Key"**
4. **Copy the key** (it's a long string like: `c957d869-2fb4-427c-bfe6-72ac70ced836`)
5. **Save it somewhere** (Notes app, TextEdit, etc.) - you'll need it in the next step

---

### **Step 3: Open the Application**

#### Find the folder:

```bash
# If you cloned with git:
cd ~/Downloads/BFF-questionary-app

# If you downloaded ZIP, the folder might be named:
cd ~/Downloads/BFF-questionary-app-main
```

#### Open in Chrome:

```bash
# From Terminal:
open index.html -a "Google Chrome"

# OR use Finder:
# Navigate to the folder → Double-click "index.html"
```

---

### **Step 4: Complete Your Setup**

When the app opens, you'll see an **API Key Setup Modal**:

1. **Paste your API key** (from Step 2) into the text field
2. Click **"Save"**
3. Wait for validation (1-2 seconds)
4. Page will reload automatically
5. **Create your profile:**
   - Enter your name (e.g., "Bob", "Sarah", etc.)
   - Click **"Continue"**
6. You'll see the **Main Menu** - Setup complete! ✅

---

## 🧪 Multi-User Testing Workflow

Now you can test the complete friend questionnaire workflow with your teammate!

### **Your Teammate's Role (The Sender):**

Your teammate will:
1. Create a questionnaire
2. Add you as a friend
3. Generate a BFF code
4. **Share the code with you** (via Slack, email, or just tell you)

### **Your Role (The Receiver):**

#### **Step 1: Receive the BFF Code**

Your teammate will give you a code like: `BFF-ABC123`

#### **Step 2: Redeem the Code**

Currently, code redemption requires manually adding it to the URL:

1. Look at your browser's address bar
2. It should look like: `file:///Users/yourusername/Downloads/BFF-questionary-app/index.html`
3. **Add the code as a URL parameter:**
   - Click at the end of the URL
   - Type: `?friendCode=BFF-ABC123` (use the actual code your teammate gave you)
   - Press **Enter**
4. The page will reload

#### **Step 3: Check Your Inbox**

1. From the Main Menu, click **"Inbox"**
2. You should see a questionnaire from your teammate!
3. Click **"Start"** to begin filling it out

#### **Step 4: Fill Out the Questionnaire**

1. You'll see a two-column table:
   - **Left column:** Questions from your teammate
   - **Right column:** Text areas for your answers
2. Fill in your answers
3. **Auto-save:** Your answers are automatically saved every 2 seconds as a draft
4. **Manual save:** Click **"Save Draft"** to save and come back later
5. **Submit:** Click **"Submit Answers"** when you're done

#### **Step 5: Your Teammate Views Your Answers**

Once you submit:
1. Your teammate will get a notification
2. They can go to **"My Friends"**
3. They'll see your status changed to **"completed"**
4. They can click **"View Answers"** to see your responses!

---

## 🎨 Extra: Try the Stickers!

While you're testing, try out the fun sticker feature:

1. Click the **pink paint brush button** (🎨) in the bottom-right corner
2. Button turns yellow, toolbar slides up with emoji stickers
3. Click any emoji to add it to the page
4. **Drag stickers** around to position them
5. **Double-click** a sticker to remove it
6. Navigate to different pages - each page has its own stickers!

---

## 🔄 Testing Multiple Rounds

You can test the reverse flow too:

1. **You create a questionnaire** in your app
2. **Add your teammate as a friend** and generate a BFF code
3. **Share the code** with your teammate
4. **Your teammate redeems your code** and fills out your questionnaire
5. **You view their answers** in your "My Friends" section

---

## ✅ What to Test

Here's a checklist of features to verify:

### Core Workflow:
- [ ] API key validation works
- [ ] Profile creation successful
- [ ] Can receive questionnaire via BFF code
- [ ] Questionnaire appears in Inbox
- [ ] Can fill out answers
- [ ] Draft auto-save works
- [ ] Can submit completed questionnaire
- [ ] Original sender sees completion notification
- [ ] Original sender can view your answers

### Optional Features:
- [ ] Can create your own questionnaires
- [ ] Can edit questionnaires
- [ ] Can delete questionnaires
- [ ] Can add friends and generate codes
- [ ] Stickers are draggable
- [ ] Stickers persist when navigating back
- [ ] 80s-90s notebook theme looks good

---

## 🐛 Troubleshooting

### Issue: API Key Modal Keeps Appearing

**Solution:**
- Make sure you clicked "Save" after pasting the key
- Wait for the "Success!" message
- Check that you're on the Meta internal network

### Issue: BFF Code Doesn't Work

**Solution:**
- Make sure you added `?friendCode=BFF-ABC123` to the URL exactly
- Check that you copied the code correctly (it should start with `BFF-`)
- Try refreshing the page after adding the parameter

### Issue: Can't See Teammate's Questionnaire in Inbox

**Solution:**
1. Make sure you used the code parameter in the URL
2. Navigate to Inbox from the Main Menu
3. If still not there, your teammate may need to regenerate the code and send it again

### Issue: Stickers Not Appearing

**Solution:**
- Click the pink paint brush button (🎨) first
- Toolbar should slide up from the bottom
- Make sure you're clicking the emoji icons in the toolbar

---

## 📊 What You're Testing

This app demonstrates:
- **Cloud-based data persistence** (all data saved to Meta's servers)
- **Cross-user communication** via unique friend codes
- **Real-time notifications** when friends complete questionnaires
- **Draft auto-save** functionality
- **Nostalgic 80s-90s design** with draggable stickers

---

## 💡 Tips

1. **Open Chrome DevTools** (F12 or Cmd+Option+I) to see detailed console logs of all API calls
2. **Try editing submitted answers** - you can reopen and modify your responses
3. **Test on different pages** - each page has its own set of persistent stickers
4. **Create multiple questionnaires** to test different workflows

---

## 📞 Questions?

If you run into any issues:
1. Check the console logs in Chrome DevTools
2. Make sure you're on the Meta internal network
3. Verify your API key is valid
4. Contact your teammate who shared this guide

---

## 🎉 You're Ready!

You now have everything you need to test the BFF Questionary app with your teammate. Enjoy the nostalgic experience! 📝💌

**Testing Time:** Plan for 15-20 minutes to complete a full multi-user test workflow.

---

**Note:** All data is stored for 30 days and then automatically deleted from the cloud storage.
