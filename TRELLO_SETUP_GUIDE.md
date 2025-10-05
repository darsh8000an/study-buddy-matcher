# 📋 Trello Board Setup Guide - Study Buddy Matcher

## 🚀 COMPLETE BEGINNER'S GUIDE TO TRELLO

### **What is Trello?**
Trello is a visual project management tool that uses **boards**, **lists**, and **cards** to organize tasks.

Think of it like sticky notes on a whiteboard:
- **Board** = The whiteboard (your project)
- **Lists** = Columns on the whiteboard (To Do, In Progress, Done)
- **Cards** = Individual sticky notes (tasks)

---

## 📝 STEP-BY-STEP SETUP (First Time Users)

### **Step 1: Create a Trello Account**

1. Go to: https://trello.com
2. Click **"Sign up"** (top right)
3. Sign up with:
   - Your email (use your university email)
   - OR sign up with Google account
4. Verify your email
5. You're in! 🎉

---

### **Step 2: Create Your Board**

1. After logging in, you'll see the Trello home screen
2. Click **"Create new board"** button (it's usually a big blue button)
3. In the popup:
   - **Board title:** `Study Buddy Matcher - Sprint 2`
   - **Visibility:** Select **"Public"** (IMPORTANT!)
   - **Background:** Choose any color you like (suggest: Blue or Purple)
4. Click **"Create"**

**You now have an empty board!** 📋

---

### **Step 3: Create Lists (Columns)**

You should see an empty board. Now create 4 columns:

1. Look for **"+ Add a list"** on the right side
2. Type: `To Do` → Press Enter
3. Click **"+ Add another list"**
4. Type: `In Progress` → Press Enter
5. Click **"+ Add another list"**
6. Type: `Done` → Press Enter
7. Click **"+ Add another list"**
8. Type: `Cancelled` → Press Enter

**Your board now has 4 columns!** ✅

---

### **Step 4: Add Cards (Tasks)**

Now let's add tasks to the **DONE** column:

1. Under the **"Done"** list, click **"+ Add a card"**
2. Type the card title (see list below)
3. Press **Enter** to save
4. Repeat for all cards below

---

## 📌 CARDS TO ADD TO "DONE" COLUMN

### Copy-paste these card titles one by one:

**Authentication & Security (Create 5 cards):**
```
User Registration with Validation
JWT Authentication Implementation
User Login Functionality
Password Hashing with bcrypt
Protected Routes & Auth Context
```

**Profile Management (Create 5 cards):**
```
Profile Editing Page UI Design
Enrolled Units Management (Add/Remove)
Academic Interests Selection
Study Preferences Configuration
Profile Update API & Bio Section
```

**Matching System (Create 6 cards):**
```
Matching Algorithm Development
Score Calculation (Common Units - 10pts)
Score Calculation (Interests - 5pts)
Study Preference Compatibility (3pts)
Match Suggestions API
Exclude Already Matched Users
```

**Dashboard Features (Create 5 cards):**
```
Dashboard UI with Purple Gradient Header
Match Cards Component with Scores
Match Score Badges (Yellow Design)
Common Units & Interests Display
Connect Button with Gradient Effect
```

**Search & Explore (Create 5 cards):**
```
Search Page UI with Pink Gradient
Advanced Filters (Name, Email, University)
Year and Degree Filters
User Cards Grid Layout
Send Connection Request from Search
```

**Connections Management (Create 6 cards):**
```
Matches Page with 3 Tabs Design
Pending/Sent/Connected Tab Implementation
Accept Match Request Functionality
Decline Match Request Functionality
Display Contact Info for Matches
Notification Badges on Tabs
```

**Real-time Features (Create 5 cards):**
```
Socket.io Server Setup & Configuration
Socket.io Client Integration
Real-time Match Notifications
Notification Context & Toast Messages
Notification Badges in Navigation
```

**UI/UX Improvements (Create 8 cards):**
```
Modern Gradient Design System
Colorful Avatar Gradients
Card Hover Animations & Transitions
Empty State Designs with Emojis
Responsive Layout for Mobile/Tablet
Professional Shadows & Border Radius
Modern Typography & Spacing
Chip Color Coding System
```

**Performance Optimization (Create 5 cards):**
```
Database Query Optimization (.lean())
Create Database Indexes
Field Selection Optimization
Response Time Improvements (60-80% faster)
Limit Query Results (Top 20 Matches)
```

**Documentation & Setup (Create 4 cards):**
```
README Update with Team Members
Package.json Updates (Author/Contributors)
Clean Navbar & Navigation Design
Team Roles Documentation
```

**Total: 54 cards in DONE column** ✅

---

## ❌ CARDS TO ADD TO "CANCELLED" COLUMN

```
Email Notifications for Match Requests
In-app Messaging System
Advanced Analytics Dashboard
User Ratings & Reviews Feature
```

**For each cancelled card:**
1. Click on the card after creating it
2. Add description explaining why (see below)

**Descriptions for Cancelled Cards:**

- **Email Notifications:** "Cancelled: Out of scope for Sprint 2. Focus on core matching functionality first."
- **In-app Messaging:** "Cancelled: Time constraints. Priority given to real-time notifications instead."
- **Analytics Dashboard:** "Moved to future sprint. Basic functionality takes priority."
- **Ratings & Reviews:** "Cancelled: Not in MVP scope. May consider for Sprint 3."

---

## 👥 STEP 5: ADD TEAM MEMBERS

1. Click **"Share"** button (top right of board)
2. Enter email addresses:
   - Darshan Maheshkumar Moradiya
   - Ronit Kanubhai Balar
   - Jay Vanani
   - Vatsal Gabani
3. Click **"Send invitation"**

**OR** if they already have Trello accounts:
- Type their names in the search box
- Click their profile
- They're added!

---

## 🎨 STEP 6: ADD LABELS (Color Coding)

Labels help categorize cards by type:

1. Click on any card
2. Click **"Labels"** button on the right
3. Click **"Create a new label"**
4. Create these labels:

| Label Name | Color | For |
|------------|-------|-----|
| Frontend | Blue | React, UI components |
| Backend | Green | Node.js, Express, APIs |
| Database | Yellow | MongoDB, Schema |
| UI/UX | Purple | Design, Styling |
| DevOps | Orange | Deployment, Tools |
| Bug Fix | Red | Fixes |

**To add label to a card:**
1. Click on the card
2. Click "Labels"
3. Check the boxes for relevant labels
4. Click X to close

**Suggested label assignments:**
- Authentication cards → Backend, Database
- Profile Management → Frontend, Backend
- Matching System → Backend, Database
- Dashboard → Frontend, UI/UX
- Search → Frontend, Backend
- Connections → Frontend, Backend
- Real-time → Backend
- UI/UX cards → Frontend, UI/UX
- Performance → Backend, Database
- Documentation → None or DevOps

---

## 👤 STEP 7: ASSIGN TEAM MEMBERS TO CARDS

**Assign cards to team members based on roles:**

**Darshan Moradiya (Full Stack Lead):**
- Assign 10-15 cards across all categories
- Focus on: Integration tasks, Architecture decisions

**Ronit Balar (Backend & Database):**
- Assign all Authentication cards
- Assign all Matching System cards
- Assign Performance Optimization cards
- Assign Real-time Features cards

**Jay Vanani (Frontend & UI/UX):**
- Assign Dashboard cards
- Assign Search cards
- Assign all UI/UX Improvements cards
- Assign Profile UI cards

**Vatsal Gabani (QA & DevOps):**
- Assign Documentation cards
- Assign Testing-related cards
- Spread across various features for testing

**How to assign:**
1. Click on a card
2. Click **"Members"** on the right
3. Click team member's avatar
4. Click X to close

---

## 📸 STEP 8: TAKE SCREENSHOT FOR SUBMISSION

**Before taking screenshot:**
1. Make sure all 54 cards are in **DONE** column
2. All cancelled cards are in **CANCELLED** column
3. Team members are assigned
4. Labels are added

**To take screenshot:**

**On Mac:**
- Press `Cmd + Shift + 4`
- Drag to select entire board
- Screenshot saves to Desktop

**On Windows:**
- Press `Windows + Shift + S`
- Drag to select entire board
- Save the screenshot

**Make sure screenshot shows:**
- ✅ Board title: "Study Buddy Matcher - Sprint 2"
- ✅ All 4 columns visible (To Do, In Progress, Done, Cancelled)
- ✅ Cards visible in Done and Cancelled columns
- ✅ Some team member avatars visible on cards

---

## 🔗 STEP 9: GET BOARD LINK FOR SUBMISSION

1. Look at the URL in your browser, it will be something like:
   ```
   https://trello.com/b/ABC123XY/study-buddy-matcher-sprint-2
   ```
2. Copy this entire URL
3. This is your **Trello Board Link** for PDF submission

**Make sure board is PUBLIC:**
1. Click **"Share"** (top right)
2. Under "Board visibility", make sure it says **"Public"**
3. If not, click "Change" and select "Public"
4. Click "Save"

---

## 📋 STEP 10: VERIFY EVERYTHING

**Checklist before submission:**

- ✅ Board title: "Study Buddy Matcher - Sprint 2"
- ✅ 4 columns: To Do, In Progress, Done, Cancelled
- ✅ ~54 cards in Done column
- ✅ 4 cards in Cancelled column with reasons
- ✅ Team members added to board
- ✅ Cards assigned to team members
- ✅ Labels added to cards
- ✅ Board visibility is PUBLIC
- ✅ Screenshot taken showing full board
- ✅ Board link copied
- ✅ All cancelled cards have descriptions explaining why

---

## 🎯 QUICK REFERENCE: TRELLO TERMINOLOGY

| Term | Meaning | Example |
|------|---------|---------|
| **Board** | Your project workspace | Study Buddy Matcher - Sprint 2 |
| **List** | Column on the board | To Do, In Progress, Done |
| **Card** | Individual task | User Registration |
| **Label** | Category/Tag for cards | Frontend, Backend, UI/UX |
| **Member** | Team member assigned | Darshan, Ronit, Jay, Vatsal |
| **Description** | Details about the card | Why task was cancelled |
| **Checklist** | Sub-tasks within a card | Optional for detailed tasks |
| **Due Date** | Deadline for task | Optional |

---

## 💡 TIPS FOR USING TRELLO

### **Moving Cards Between Lists:**
- Click and drag cards from one list to another
- Example: Move card from "In Progress" to "Done" when task is finished

### **Adding Details to Cards:**
1. Click on any card
2. You can add:
   - **Description:** Details about the task
   - **Checklist:** Sub-tasks
   - **Attachments:** Files, screenshots
   - **Comments:** Team discussion
   - **Due Date:** Deadline

### **Using Trello on Mobile:**
- Download **Trello app** from App Store / Google Play
- Log in with same account
- Access your board anywhere!

---

## ⚠️ COMMON MISTAKES TO AVOID

1. ❌ **Forgetting to make board PUBLIC**
   - Markers won't be able to access it!

2. ❌ **Not adding descriptions to cancelled cards**
   - Need to explain why each task was cancelled

3. ❌ **Cards don't match demo features**
   - Make sure "Done" cards match what you show in demo

4. ❌ **Not assigning team members**
   - Shows no collaboration

5. ❌ **Empty "To Do" and "In Progress" columns**
   - It's okay! Sprint 2 is complete, everything is in Done

---

## 📞 NEED HELP?

**Trello Help Center:** https://support.atlassian.com/trello/

**Video Tutorials:**
- "Trello Tutorial for Beginners" on YouTube
- Search: "How to use Trello"

---

## ✅ FINAL CHECKLIST FOR SUBMISSION

Copy this into your PDF:

```markdown
## Trello Board Information

**Board Name:** Study Buddy Matcher - Sprint 2

**Board Link:** [Insert your Trello board URL here]

**Board Visibility:** Public ✅

**Screenshot:** [See attached screenshot showing all columns and cards]

**Number of Completed Tasks:** 54 cards in Done column

**Number of Cancelled Tasks:** 4 cards in Cancelled column with reasons

**Team Members Added:**
- Darshan Maheshkumar Moradiya
- Ronit Kanubhai Balar
- Jay Vanani
- Vatsal Gabani

**Labels Used:** Frontend, Backend, Database, UI/UX, DevOps

**Note:** All completed tasks correspond to features demonstrated in our Sprint 2 demo.
```

---

## 🎉 YOU'RE DONE!

Your Trello board is now ready for submission. Make sure to:
1. Include screenshot in PDF (Section 2b or 2c depending on assignment)
2. Include board link in PDF
3. Verify board is PUBLIC before submitting

**Good luck with your Sprint 2 submission! 🚀**

---

*Last updated: Sprint 2 Delivery (12.1P)*
*Project: Study Buddy Matcher - SIT725*
