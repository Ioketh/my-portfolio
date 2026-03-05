# ════════════════════════════════════════════════
#  PALAMENA PORTFOLIO — Firebase Setup Guide
# ════════════════════════════════════════════════

## STEP 1 — Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name: portfolio-profile-16519
4. Enable Google Analytics (optional)
5. Click "Create project"


## STEP 2 — Enable Firestore Database

1. In Firebase Console → Build → Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a region (e.g., eur3 or us-central1)
5. Click "Enable"


## STEP 3 — Enable Authentication

1. In Firebase Console → Build → Authentication
2. Click "Get started"
3. Enable "Email/Password" provider
4. Enable "Google" provider (for Google login)
5. Create admin user:
   - Click "Users" tab → "Add user"
   - Email: innoxoketh@gmail.com
   - Set a strong password


## STEP 4 — Get Firebase Config

1. In Firebase Console → Project Settings (gear icon)
2. Scroll to "Your apps" → Add web app (</>)
3. Register app name: "PALAMENA Portfolio"
4. Copy the firebaseConfig object
5. Replace the config in BOTH index.html and admin.html:

   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "portfolio-profile-16519.firebaseapp.com",
     projectId: "portfolio-profile-16519",
     storageBucket: "portfolio-profile-16519.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };


## STEP 5 — Set Firestore Security Rules

Go to Firestore Database → Rules tab and paste these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Projects — anyone can read, only admin can write
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "innoxoketh@gmail.com";
    }

    // News — anyone can read, only admin can write
    match /news/{newsId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "innoxoketh@gmail.com";
    }

    // Notifications — anyone can read, only admin can write
    match /notifications/{notifId} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "innoxoketh@gmail.com";
    }

    // Analytics — anyone can read/write (for visitor tracking)
    match /analytics/{docId} {
      allow read, write: if true;
    }

    // Messages — anyone can create (contact form), only admin can read/delete
    match /messages/{messageId} {
      allow create: if true;
      allow read, delete: if request.auth != null
        && request.auth.token.email == "innoxoketh@gmail.com";
    }
  }
}
```


## STEP 6 — Deploy to Firebase Hosting (Optional)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize in your project folder
firebase init hosting

# Answer prompts:
# - Select existing project: portfolio-profile-16519
# - Public directory: . (current folder)
# - Single-page app: No
# - Overwrite index.html: No

# Deploy
firebase deploy
```

Your site will be live at:
https://portfolio-profile-16519.web.app


## STEP 7 — GitHub API (Optional)

To display real repositories, update index.html:

Find this line in the loadGithub() function:
  const res = await fetch("https://api.github.com/users/palamena/repos?...")

Replace "palamena" with your actual GitHub username.

If you hit rate limits, create a GitHub Personal Access Token:
1. GitHub → Settings → Developer Settings → Personal access tokens
2. Generate token with "public_repo" scope
3. Add header to the fetch: Authorization: token YOUR_TOKEN


## FILE STRUCTURE

portfolio/
├── index.html      ← Main portfolio page
├── admin.html      ← Admin dashboard
├── style.css       ← All styles for index.html
└── SETUP.md        ← This file


## FIRESTORE COLLECTIONS STRUCTURE

/projects/{id}
  - name: string
  - description: string
  - image: string (base64 or URL)
  - link: string (URL)
  - progress: number (0–100)
  - status: "active" | "done" | "pending"
  - startDate: string
  - endDate: string
  - createdAt: timestamp
  - updatedAt: timestamp

/news/{id}
  - title: string
  - description: string
  - image: string (base64 or URL)
  - createdAt: timestamp
  - updatedAt: timestamp

/notifications/{id}
  - message: string
  - createdAt: timestamp

/analytics/visitors
  - totalVisitors: number

/analytics/chat
  - totalChats: number

/messages/{id}
  - name: string
  - email: string
  - subject: string
  - message: string
  - createdAt: timestamp


## CUSTOMIZATION TIPS

1. ADD YOUR PHOTO:
   - Convert your photo to base64 at: https://base64.guru/converter/encode/image
   - In index.html, find the ".avatar-placeholder" div
   - Replace it with: <img src="data:image/jpeg;base64,YOUR_BASE64" style="width:100%;height:100%;object-fit:cover;border-radius:50%">

2. UPDATE GITHUB USERNAME:
   - Search for "palamena" in index.html
   - Replace with your actual GitHub username

3. CHANGE COLORS:
   - In style.css, find [data-theme="dark"] { }
   - Change --accent: #3fffa0 to any color you prefer

4. ADD MORE SKILLS:
   - Copy a .skill-card div in index.html
   - Update the icon, name, and data-width value

5. ADMIN PASSWORD:
   - Set in Firebase Console → Authentication → Users
   - Must be at least 6 characters

## ADMIN ACCESS

URL: yoursite.com/admin.html
Email: innoxoketh@gmail.com
Password: (set in Firebase Auth)

The admin dashboard allows you to:
✅ Add / Edit / Delete projects
✅ Publish news and updates
✅ Read visitor messages
✅ Send notification banners to visitors
✅ View live analytics (visitors, chat interactions)
✅ Track project progress in real-time
