# Protohub Deployment Guide

## 🚀 Deploying BFF Questionary to Protohub

This guide provides step-by-step instructions for deploying the BFF Questionary app to Protohub with fullscreen mode enabled.

---

## Prerequisites

✅ **Completed:**
- Git repository initialized
- All code committed (2 commits)
- README.md includes: `Protohub fullscreen deployment: true`
- Application tested and validated

---

## Deployment Steps

### Step 1: Push to Remote Repository

The BFF Questionary code is currently in a local Git repository. To deploy to Protohub, you need to push it to a Meta-accessible remote repository.

**Option A: Push to GitHub Enterprise**

```bash
# Navigate to project directory
cd "/Users/kseniiat/Downloads/BFF questionary"

# Add remote repository (replace with your repo URL)
git remote add origin <your-github-enterprise-repo-url>

# Push to remote
git push -u origin master
```

**Option B: Push to Phabricator**

```bash
# Navigate to project directory
cd "/Users/kseniiat/Downloads/BFF questionary"

# Add Phabricator remote
git remote add origin <your-phabricator-repo-url>

# Push to remote
git push -u origin master
```

### Step 2: Access Protohub

1. Navigate to **Protohub** (internal Meta tool)
2. Login with your Meta credentials

### Step 3: Create New Prototype

1. Click **"New Prototype"** or **"Import from Repository"**
2. Select **"Import from Git"**
3. Enter your repository URL
4. Choose branch: `master`

### Step 4: Configure Deployment Settings

**Entry Point Configuration:**
- Set entry point file: `index.html`
- Framework: `Static HTML/CSS/JavaScript`

**Display Settings:**
- Enable **Fullscreen Mode** ✅
  - This is automatically detected from the README.md flag: `Protohub fullscreen deployment: true`
- iPhone mockup will be centered and displayed in fullscreen

**Environment Variables:**
- None required (API key is user-provided via modal)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build process to complete (~30-60 seconds)
3. Protohub will generate a unique URL for your prototype

### Step 6: Share with Users

Once deployed, Protohub provides:
- **Public URL:** `https://protohub.meta.com/<your-prototype-id>`
- **QR Code:** For easy mobile access
- **Embed Code:** For inclusion in documents

---

## 📱 User Experience on Protohub

When users access the deployed prototype:

1. **Fullscreen Display:**
   - iPhone mockup centered on screen
   - No extra chrome or navigation bars
   - Immersive notebook experience

2. **First-Time Setup:**
   - API key modal appears automatically
   - Users follow instructions to get wearables-ape.io API key
   - One-time setup per user

3. **Persistent Data:**
   - All data stored in cloud (Structured Memories)
   - Works across devices with same API key
   - 30-day retention

---

## 🔧 Alternative: Local GitHub Pages Deployment

If Protohub is not available, you can deploy to GitHub Enterprise Pages:

### Step 1: Push to GitHub Enterprise

```bash
cd "/Users/kseniiat/Downloads/BFF questionary"
git remote add origin <github-enterprise-url>
git push -u origin master
```

### Step 2: Enable GitHub Pages

1. Go to repository **Settings**
2. Navigate to **Pages** section
3. Source: Select `master` branch
4. Root directory: `/` (root)
5. Click **Save**

### Step 3: Access Deployed Site

GitHub will provide a URL like:
`https://<your-org>.github.io/<repo-name>/`

**Note:** Fullscreen mode is a Protohub-specific feature. On GitHub Pages, the iPhone mockup will still display correctly but won't have the dedicated fullscreen treatment.

---

## 🎯 Post-Deployment Testing

After deployment, test the following:

### ✅ Deployment Checklist

- [ ] App loads without errors
- [ ] API key modal appears for new users
- [ ] API key validation works
- [ ] Profile creation successful
- [ ] All navigation works
- [ ] Questionnaire CRUD operations function
- [ ] Friend code generation works
- [ ] Sticker system operational
- [ ] iPhone mockup displays correctly
- [ ] Console logs visible (for debugging)
- [ ] Google Analytics tracking active

### 🐛 Common Issues

**Issue: API key validation fails**
- Solution: Verify users are on Meta internal network
- Check wearables-ape.io is accessible

**Issue: Stickers don't persist**
- Solution: Check browser localStorage permissions
- Ensure cookies/storage not blocked

**Issue: iPhone mockup cut off**
- Solution: Verify fullscreen mode enabled in Protohub
- Check CSS viewport settings

---

## 📊 Monitoring & Analytics

### Google Analytics Dashboard

Access analytics at:
`https://analytics.google.com/analytics/web/#/report/visitors-overview/a<account>/w<property>/p<project>/`

**Tag ID:** `G-Q98010P7LZ`

**Key Metrics to Monitor:**
- Daily active users
- Feature usage (questionnaire creation, friend adds)
- Error rates (failed API calls)
- Session duration
- Device breakdown

### Console Monitoring

For debugging deployed instances:
1. Users can open Chrome DevTools (F12)
2. Check Console tab for detailed logs
3. All API calls, payloads, and responses logged
4. Error messages clearly displayed

---

## 🔄 Updating the Deployed Prototype

To push updates after deployment:

### Step 1: Make Changes Locally

```bash
cd "/Users/kseniiat/Downloads/BFF questionary"

# Make your code changes
# Test locally by opening index.html

# Commit changes
git add -A
git commit -m "Your update description"
```

### Step 2: Push to Remote

```bash
git push origin master
```

### Step 3: Redeploy on Protohub

Protohub typically auto-deploys on push, but you can also:
1. Go to your prototype in Protohub
2. Click **"Redeploy"** or **"Sync from Repository"**
3. Wait for new build to complete

---

## 📞 Support & Documentation

### Internal Resources

- **Protohub Docs:** fburl.com/protohub
- **Vibe Coding Workshop:** fburl.com/vibe-code
- **Wearables APE API:** api.wearables-ape.io/docs

### Project Resources

- **Testing Guide:** See `TESTING.md` in repository
- **Task Tracking:** See `tasks.md` in repository
- **Full Documentation:** See `README.md`

---

## ✅ Deployment Complete!

Your BFF Questionary app is now deployed and accessible to Meta employees!

**Next Steps:**
1. Share the Protohub URL with your team
2. Collect user feedback
3. Monitor analytics
4. Iterate based on usage patterns

**Questions?** Check the internal Protohub documentation or reach out to the Vibe Coding @ Meta community.

---

**Note:** The `Protohub fullscreen deployment: true` flag in README.md ensures your prototype is automatically displayed in fullscreen mode, providing the best user experience for the iPhone mockup interface.
