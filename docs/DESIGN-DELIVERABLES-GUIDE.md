# Design Deliverables Guide
## Study Buddy Matcher - Figma Prototypes & Architecture Diagram

This guide explains how to create the HD-level design deliverables.

---

## 1. Figma HI-FI Prototype (HD Requirement)

### Getting Started with Figma

1. **Create Account:**
   - Go to https://www.figma.com/
   - Sign up with your university email (free for students)
   - Download Figma desktop app (recommended)

2. **Create New Project:**
   - Click "New Design File"
   - Name it: "Study Buddy Matcher - HI-FI Prototype"

### Screens to Design (Minimum for HD)

#### 1. Authentication Screens

**Login Page:**
- Logo and app name "Study Buddy Matcher"
- Email input field
- Password input field
- "Sign In" button
- "Don't have an account? Sign Up" link
- Clean, centered layout
- Brand colors (blue primary color)

**Register Page:**
- Logo and app name
- Multi-step form:
  - Step 1: Email, Password, Confirm Password
  - Step 2: First Name, Last Name
  - Step 3: University, Degree, Year of Study
- Progress indicator (1 of 3, 2 of 3, 3 of 3)
- "Sign Up" / "Next" / "Back" buttons
- "Already have an account? Sign In" link

#### 2. Main Application Screens

**Dashboard:**
- Top Navigation Bar:
  - Logo/App name (left)
  - Menu items: Dashboard, Profile, Matches, Search
  - Notification bell icon with badge
  - User avatar dropdown (right)
- Page Title: "Suggested Study Buddies"
- Grid of Match Cards (3 columns):
  - User avatar
  - Name
  - University, Degree, Year
  - Match score (with star icon)
  - Common units (chips/tags)
  - Common interests (chips/tags)
  - "View Profile" button
  - "Send Request" button (primary color)
- Filter sidebar (optional):
  - Filter by year
  - Filter by unit
  - Filter by study mode

**Profile Page:**
- Two modes: View and Edit
- **View Mode:**
  - Profile header with avatar and name
  - Personal Info section
  - Enrolled Units section (displayed as cards)
  - Academic Interests (tags)
  - Study Preferences (icons + text)
  - Availability Schedule (calendar grid showing time slots)
  - "Edit Profile" button
- **Edit Mode:**
  - All fields editable
  - Add/Remove units interface
  - Add/Remove interests
  - Dropdowns for preferences
  - Interactive availability selector
  - "Save" and "Cancel" buttons

**Matches Page:**
- Tabs:
  - Pending Requests (badge with count)
  - My Connections
- **Pending Requests Tab:**
  - List of incoming match requests
  - Each request card shows:
    - Sender avatar and name
    - Match score
    - Common units
    - Message (optional)
    - "Accept" button (green)
    - "Decline" button (red/gray)
- **My Connections Tab:**
  - List of accepted matches
  - Each connection card shows:
    - User avatar and name
    - Matched date
    - "View Profile" button
    - "Message" button (future feature)

**Search Page:**
- Search bar at top
- Filter Panel (left side or collapsible):
  - University dropdown
  - Year dropdown
  - Study Mode dropdown
  - Group Size dropdown
  - Unit Code text input
  - "Apply Filters" button
  - "Clear Filters" button
- Results Grid (right side):
  - User cards similar to dashboard
  - Pagination controls at bottom
  - Results count "Showing 1-10 of 45 results"

**User Detail Modal/Page:**
- Full-screen modal or dedicated page
- Complete user profile:
  - Large avatar
  - Full name
  - University, Degree, Year
  - Bio
  - Enrolled Units (all)
  - Academic Interests (all)
  - Study Preferences (detailed)
  - Availability Schedule
- "Send Match Request" button (if not already connected)
- "Close" or back button

**Notification Toast:**
- Small popup appearing from top-right
- Shows:
  - Icon (info/success)
  - Message text
  - Sender name
  - Auto-dismisses after 5 seconds
  - Close button (X)

### Design Specifications

**Color Palette:**
- Primary: #1976d2 (Blue)
- Secondary: #dc004e (Pink/Red)
- Success: #4caf50 (Green)
- Warning: #ff9800 (Orange)
- Error: #f44336 (Red)
- Background: #fafafa (Light gray)
- Text Primary: #212121 (Dark gray)
- Text Secondary: #757575 (Medium gray)

**Typography:**
- Font Family: Roboto (or Inter, Poppins)
- Headings: 24px, 20px, 18px (bold)
- Body: 16px (regular)
- Small text: 14px, 12px

**Spacing:**
- Use 8px grid system
- Padding: 8px, 16px, 24px, 32px
- Margins: 8px, 16px, 24px

**Components:**
- Buttons: Rounded corners (4px), padding (12px 24px)
- Cards: White background, shadow, rounded corners (8px)
- Input Fields: Border, focused state (blue outline)
- Chips/Tags: Small rounded rectangles with light background

### Making it Interactive (HD Requirement)

1. **Connect Screens:**
   - Use Figma's Prototype mode
   - Click on elements and drag to target screens
   - Example flows:
     - Login button → Dashboard
     - "Sign Up" link → Register page
     - "Dashboard" menu → Dashboard screen
     - Match card → User Detail modal
     - "Send Request" button → Success toast

2. **Add Interactions:**
   - Button hovers (change color)
   - Form field focus (outline)
   - Navigation highlighting (active page)
   - Modal open/close animations

3. **Create Multiple States:**
   - Empty states ("No matches found")
   - Loading states (spinners)
   - Error states (red error messages)
   - Success states (green checkmarks)

### Exporting and Sharing

1. **Share Prototype:**
   - Click "Share" button (top-right)
   - Set to "Anyone with the link can view"
   - Copy link
   - Include this link in your Task 9.2P submission

2. **Export Screens:**
   - Select frames
   - File → Export
   - Format: PNG (2x for high quality)
   - Use these screenshots in documentation

---

## 2. System Architecture Diagram (HD Requirement)

### Tools to Use

**Option 1: Draw.io (Free, Recommended)**
- Go to https://app.diagrams.net/
- No account needed
- Start with "Blank Diagram"

**Option 2: Lucidchart**
- https://www.lucidchart.com/
- Free account for students

**Option 3: Microsoft Visio**
- If you have access via university

### What to Include

**Components to Show:**

1. **Client Layer (Frontend)**
   - Browser icon
   - "React Application"
   - Components: UI Components, React Router, Axios, Socket.io Client

2. **Application Layer (Backend)**
   - Server icon
   - "Node.js + Express Server"
   - Components:
     - Routes (authRoutes, userRoutes, matchRoutes)
     - Controllers (authController, userController, matchController)
     - Models (User Model)
     - Middleware (auth, errorHandler)

3. **Real-Time Layer**
   - "Socket.io Server"
   - WebSocket connections
   - Notification Rooms

4. **Data Layer**
   - Database icon
   - "MongoDB"
   - Collections: users

5. **Infrastructure**
   - Docker containers
   - "Docker Compose"

### Connections to Show

**HTTP/REST API:**
- Frontend → Backend
- Arrows labeled:
  - POST /api/auth/login
  - GET /api/matches/suggestions
  - POST /api/matches/request
  - etc.

**WebSocket:**
- Frontend Socket.io Client ↔ Backend Socket.io Server
- Bidirectional arrow
- Label: "Real-time Notifications"

**Database:**
- Backend → MongoDB
- Arrow labeled: "Mongoose ODM"

**Request Flow Example:**
1. User clicks "Login" in React
2. Axios sends POST request to /api/auth/login
3. Express routes to authController.login()
4. Controller validates credentials with User Model
5. User Model queries MongoDB
6. MongoDB returns user data
7. Controller generates JWT token
8. Response sent back to Frontend
9. Frontend stores token and redirects to Dashboard

### Layout

```
┌─────────────────────┐
│   Browser/Client    │
│   React App         │
│ - Components        │
│ - Socket.io Client  │
└──────────┬──────────┘
           │
           │ HTTP/REST API
           │ WebSocket
           │
┌──────────▼──────────┐
│   Backend Server    │
│   Node.js + Express │
│ ┌─────────────────┐ │
│ │ Routes          │ │
│ │ - authRoutes    │ │
│ │ - userRoutes    │ │
│ │ - matchRoutes   │ │
│ └────────┬────────┘ │
│          │          │
│ ┌────────▼────────┐ │
│ │ Controllers     │ │
│ │ - authCtrl      │ │
│ │ - userCtrl      │ │
│ │ - matchCtrl     │ │
│ └────────┬────────┘ │
│          │          │
│ ┌────────▼────────┐ │
│ │ Models          │ │
│ │ - User Model    │ │
│ └────────┬────────┘ │
│          │          │
│ ┌────────▼────────┐ │
│ │ Socket.io       │ │
│ │ Server          │ │
│ └─────────────────┘ │
└──────────┬──────────┘
           │
           │ Mongoose ODM
           │
┌──────────▼──────────┐
│     MongoDB         │
│  - users collection │
└─────────────────────┘

┌─────────────────────┐
│  Docker Compose     │
│ - Backend Container │
│ - MongoDB Container │
└─────────────────────┘
```

### Diagram Requirements

✅ **Must Include:**
- All major components (Frontend, Backend, Database)
- Clear labels for each component
- Arrows showing data flow
- Technology names (React, Express, MongoDB, Socket.io)
- HTTP methods for key API calls
- Legend explaining symbols

✅ **Professional Quality:**
- Clean, organized layout
- Consistent colors and shapes
- Readable font sizes
- No overlapping elements
- Proper alignment

### Export Format

- Export as PNG (high resolution, 300 DPI)
- Also save as PDF (for submission)
- File name: `study-buddy-matcher-architecture.png`
- Save in `/docs/` folder

---

## 3. Submission Checklist

For HD-level design deliverables:

**Figma Prototype:**
- [ ] All 8+ screens designed
- [ ] Consistent branding and colors
- [ ] Interactive (clickable)
- [ ] Multiple states (loading, error, success, empty)
- [ ] Responsive layouts shown
- [ ] Public share link generated
- [ ] Screenshots exported

**Architecture Diagram:**
- [ ] All components shown
- [ ] Clear data flow
- [ ] Technology stack labeled
- [ ] Professional appearance
- [ ] High-resolution export
- [ ] Saved in docs/ folder

**Documentation:**
- [ ] Figma link in Task 9.2P submission
- [ ] Architecture diagram in Task 9.2P submission
- [ ] Design decisions documented
- [ ] Screenshots in README

---

## Tips for Success

**Figma:**
- Use components for reusable elements (buttons, cards)
- Create a style guide page (colors, typography, spacing)
- Use auto-layout for responsive designs
- Add comments explaining design decisions
- Get feedback from team members

**Architecture Diagram:**
- Start with high-level view, then add details
- Use standard symbols (rectangles for components, cylinders for databases)
- Group related components
- Use color coding (frontend=blue, backend=green, database=orange)
- Add a legend

**Time Management:**
- Figma prototype: 8-12 hours
- Architecture diagram: 2-3 hours
- Start early to allow time for revisions

---

## Example References

**Good Figma Prototypes to Learn From:**
- https://www.figma.com/community/file/768809027799962739
- Search "Dashboard UI" in Figma Community
- Look for education/student apps

**Architecture Diagram Examples:**
- Search "MERN Stack Architecture"
- Look at three-tier architecture diagrams
- Check AWS architecture diagrams for inspiration

---

**With these design deliverables, you'll demonstrate HD-level planning and visual communication skills!**
