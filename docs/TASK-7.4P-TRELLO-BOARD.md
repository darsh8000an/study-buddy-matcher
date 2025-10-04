# Task 7.4P - Sprint Planning & Trello Board Setup

## Study Buddy Matcher - Sprint 1 Planning

**Date:** October 2, 2025
**Sprint Duration:** Weeks 7, 8, 9
**Team Members:** [Fill in your team members]

---

## Trello Board Link

**Public Trello Board URL:** [Your Trello board URL here]

**Instructions to Access:**
1. Go to the URL above
2. Board is set to public - no login required for viewing

---

## Sprint 1 User Stories (Selected from SRS)

### High Priority - Must Have (Sprint 1)

**US1: User Registration and Authentication**
As a student, I want to register and log in securely so that I can access the platform and protect my personal information.

**US2: Create and Edit Profile**
As a student, I want to create and edit my profile with my academic information, study preferences, and availability so that I can be matched with compatible study partners.

**US3: View Match Suggestions**
As a student, I want to see a list of suggested study partners ranked by compatibility so that I can find the best matches for my needs.

**US4: Send Match Requests**
As a student, I want to send connection requests to potential study partners so that I can initiate study collaborations.

**US5: Manage Match Requests**
As a student, I want to accept or decline incoming match requests so that I can control who I connect with.

**US6: Real-time Notifications**
As a student, I want to receive instant notifications when someone sends me a match request or accepts my request so that I can respond quickly.

### Medium Priority - Should Have (Sprint 1 if time permits)

**US7: Search for Study Partners**
As a student, I want to search for other students by name, university, or unit code so that I can find specific people or students in my courses.

**US8: Filter Users by Criteria**
As a student, I want to filter potential study partners by university, year, study mode, and other preferences so that I can narrow down my search.

---

## Sprint 1 Backlog - Task Breakdown

### 1. Project Setup & Infrastructure [12 hours]

**TASK-001: Initialize Git Repository [1]**
- Description: Initialize Git repo, create .gitignore, make initial commit
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Git repo initialized
  - .gitignore configured
  - Initial commit completed

**TASK-002: Set up Docker Environment [2]**
- Description: Test Docker setup, ensure MongoDB and backend containers work
- Assigned to: [Team Member]
- Acceptance Criteria:
  - docker-compose up runs successfully
  - Backend accessible at localhost:5000
  - MongoDB accessible and persists data

**TASK-003: Install Backend Dependencies [1]**
- Description: Run npm install in backend, verify all packages installed
- Assigned to: [Team Member]
- Acceptance Criteria:
  - node_modules populated
  - No installation errors
  - package-lock.json generated

**TASK-004: Configure Environment Variables [1]**
- Description: Create .env file, set up MongoDB URI, JWT secret, etc.
- Assigned to: [Team Member]
- Acceptance Criteria:
  - .env file created from .env.example
  - All required variables configured
  - Backend starts without errors

**TASK-005: Test Backend Health Endpoint [1]**
- Description: Start backend, test /health endpoint returns 200 OK
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Backend runs on port 5000
  - GET /health returns success response
  - Postman collection created

**TASK-006: Initialize React Frontend [3]**
- Description: Create React app using create-react-app or Vite
- Assigned to: [Team Member]
- Acceptance Criteria:
  - React app created in /frontend
  - Runs on port 3000
  - Default page loads successfully

**TASK-007: Set up Frontend Project Structure [3]**
- Description: Create folder structure (components, pages, services, styles)
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Folders created: components, pages, services, utils, styles
  - React Router installed
  - Axios installed for API calls

---

### 2. User Authentication (US1) [16 hours]

**TASK-008: Test Registration API Endpoint [2]**
- Description: Test POST /api/auth/register with Postman
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Can register new user successfully
  - Validation errors work correctly
  - JWT token returned

**TASK-009: Test Login API Endpoint [2]**
- Description: Test POST /api/auth/login with Postman
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Can login with registered credentials
  - Invalid credentials return 401
  - JWT token returned

**TASK-010: Build Registration Form Component [4]**
- Description: Create React registration form with validation
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Form includes: email, password, firstName, lastName, university, degree, yearOfStudy
  - Client-side validation implemented
  - Error messages displayed
  - Connects to registration API

**TASK-011: Build Login Form Component [3]**
- Description: Create React login form
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Form includes: email, password
  - Client-side validation
  - Error handling
  - Redirects to dashboard on success

**TASK-012: Implement JWT Token Storage [2]**
- Description: Store JWT in localStorage, create auth context
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Token saved to localStorage on login
  - Token removed on logout
  - Auth context provides user state globally

**TASK-013: Create Protected Route Component [3]**
- Description: Implement route protection for authenticated pages
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Unauthenticated users redirected to login
  - Token validated before allowing access
  - Works with React Router

---

### 3. Profile Management (US2) [20 hours]

**TASK-014: Build Profile View Page [4]**
- Description: Create page to display user's own profile
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Fetches user data from GET /api/auth/me
  - Displays all profile fields
  - Edit button to switch to edit mode

**TASK-015: Build Profile Edit Form [6]**
- Description: Create comprehensive profile editing interface
- Assigned to: [Team Member]
- Acceptance Criteria:
  - All fields editable: bio, units, interests, preferences, availability
  - Add/remove enrolled units dynamically
  - Add/remove academic interests
  - Save button calls PUT /api/auth/profile

**TASK-016: Create Enrolled Units Input Component [4]**
- Description: Component to add/remove units with unit code and name
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Can add multiple units
  - Each unit has code and name fields
  - Can delete units
  - Displays current units as chips/tags

**TASK-017: Create Study Preferences Component [3]**
- Description: Dropdowns/selects for study preferences
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Study mode dropdown (online/in-person/hybrid/flexible)
  - Group size dropdown
  - Study style dropdown
  - Language preference input

**TASK-018: Create Availability Scheduler Component [3]**
- Description: Weekly schedule grid to set availability
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Can select days of week
  - Can add time slots for each day
  - Visual calendar/grid display
  - Save availability to backend

---

### 4. Matching System (US3, US4, US5) [18 hours]

**TASK-019: Test Match Suggestions API [2]**
- Description: Test GET /api/matches/suggestions endpoint
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Returns list of suggested matches
  - Each match has score, common units, interests
  - Sorted by score descending

**TASK-020: Build Dashboard Page [4]**
- Description: Main dashboard showing match suggestions
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Fetches and displays top match suggestions
  - Shows match score for each user
  - Shows common units and interests
  - Links to user detail pages

**TASK-021: Create Match Card Component [3]**
- Description: Reusable card to display a match suggestion
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Shows user photo, name, university, degree
  - Displays match score prominently
  - Shows common units/interests tags
  - "Send Request" button

**TASK-022: Build User Detail Modal/Page [4]**
- Description: Detailed view of a potential match's profile
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Fetches user by ID from GET /api/users/:id
  - Shows full profile information
  - Displays availability schedule
  - "Send Match Request" button

**TASK-023: Implement Send Match Request [3]**
- Description: Connect "Send Request" button to API
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Calls POST /api/matches/request
  - Optional message input
  - Success/error feedback
  - Disables button after sending

**TASK-024: Build Match Requests Page [2]**
- Description: Page showing incoming match requests
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Lists pending match requests
  - Accept/Decline buttons for each
  - Shows sender info
  - Updates list after action

---

### 5. Real-time Notifications (US6) [12 hours]

**TASK-025: Set up Socket.io Client [3]**
- Description: Install socket.io-client and configure connection
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Socket.io-client installed
  - Connection established to backend
  - Emits "join" event with user ID

**TASK-026: Create Notification Context [3]**
- Description: React context to manage notifications globally
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Socket connection managed in context
  - Listens for notification events
  - Provides notification state to components

**TASK-027: Build Notification Toast Component [3]**
- Description: Pop-up notification display
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Displays notification message
  - Shows sender name and action
  - Auto-dismisses after 5 seconds
  - Click to navigate to match requests

**TASK-028: Implement Notification Badge [2]**
- Description: Badge on navigation showing unread count
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Shows count of pending match requests
  - Updates in real-time
  - Clicking navigates to match requests page

**TASK-029: Test Real-time Notifications [1]**
- Description: End-to-end test of notification flow
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Send match request from User A
  - User B receives instant notification
  - Accept from User B
  - User A receives acceptance notification

---

### 6. Search and Filter (US7, US8) [14 hours]

**TASK-030: Test Search API Endpoint [1]**
- Description: Test GET /api/users/search with query parameter
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Returns users matching search query
  - Case-insensitive search works
  - Limit to 20 results

**TASK-031: Test Filter API Endpoint [2]**
- Description: Test GET /api/users with filter parameters
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Can filter by university
  - Can filter by yearOfStudy
  - Can filter by unitCode
  - Can combine multiple filters

**TASK-032: Build Search Bar Component [3]**
- Description: Search input with live results
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Search input field
  - Calls search API on submit
  - Displays results below
  - Debounced for performance

**TASK-033: Build Filter Panel Component [4]**
- Description: Side panel with filter options
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Dropdowns for: university, year, study mode, group size
  - Text input for unit code
  - Apply filters button
  - Clear filters button

**TASK-034: Build Search Results Page [4]**
- Description: Page showing search/filter results
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Displays filtered users as cards
  - Pagination controls (10 per page)
  - Shows total count
  - Click card to view full profile

---

### 7. UI/UX and Styling [16 hours]

**TASK-035: Set up UI Component Library [2]**
- Description: Install and configure Material-UI or Tailwind CSS
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Library installed (Material-UI or Tailwind)
  - Theme configured
  - Can use components/utilities

**TASK-036: Design and Build Navigation Bar [3]**
- Description: Top navigation with logo, menu, user avatar
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Logo and app name
  - Links: Dashboard, Profile, Matches, Search
  - User avatar/dropdown with logout
  - Notification badge

**TASK-037: Create Responsive Layout Component [3]**
- Description: Main layout wrapper for consistent page structure
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Header (nav bar)
  - Main content area
  - Footer (optional)
  - Responsive on mobile/tablet/desktop

**TASK-038: Style Authentication Pages [2]**
- Description: Design login and registration pages
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Clean, modern design
  - Centered form layout
  - Branded colors
  - Responsive

**TASK-039: Style Dashboard and Profile Pages [3]**
- Description: Apply consistent styling to main pages
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Cards for match suggestions
  - Clean profile layout
  - Consistent spacing and colors
  - Icons for actions

**TASK-040: Make Application Mobile-Responsive [3]**
- Description: Ensure all pages work well on mobile devices
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Test on 320px width (smallest mobile)
  - Navigation collapses to hamburger menu
  - Forms and cards stack vertically
  - Touch-friendly button sizes

---

### 8. Testing [20 hours]

**TASK-041: Set up Jest for Unit Testing [2]**
- Description: Configure Jest for backend testing
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Jest installed and configured
  - Test script in package.json
  - Can run: npm test

**TASK-042: Write Tests for User Model [3]**
- Description: Unit tests for User model methods
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Test password hashing
  - Test comparePassword method
  - Test getMatchScore method
  - Test virtual fields (fullName)

**TASK-043: Write Tests for Auth Controller [4]**
- Description: Unit tests for authentication endpoints
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Test registration (success and failure cases)
  - Test login (success and failure cases)
  - Test JWT token generation
  - Test password update

**TASK-044: Write Tests for User Controller [4]**
- Description: Unit tests for user CRUD operations
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Test getUsers with filters
  - Test getUser by ID
  - Test updateUser
  - Test soft delete
  - Test search functionality

**TASK-045: Write Tests for Match Controller [4]**
- Description: Unit tests for matching functionality
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Test getSuggestedMatches algorithm
  - Test sendMatchRequest
  - Test acceptMatchRequest
  - Test declineMatchRequest

**TASK-046: Set up Cypress for E2E Testing [3]**
- Description: Install and configure Cypress
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Cypress installed in frontend
  - Test script configured
  - Sample test runs successfully

---

### 9. Documentation and Deliverables [12 hours]

**TASK-047: Create Figma Prototype - Authentication [2]**
- Description: Design high-fidelity login/register screens
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Login screen designed
  - Registration screen designed
  - Clickable prototype
  - Follows brand colors

**TASK-048: Create Figma Prototype - Main App [4]**
- Description: Design dashboard, profile, matches screens
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Dashboard with match suggestions
  - Profile view and edit screens
  - Match requests page
  - Search page
  - All screens linked (clickable)

**TASK-049: Create System Architecture Diagram [2]**
- Description: Visual diagram showing system components
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Shows: Frontend (React), Backend (Express/Node), Database (MongoDB), Socket.io
  - Shows API communication flow
  - Shows data flow
  - Professional quality (use draw.io or similar)

**TASK-050: Update README with Setup Instructions [2]**
- Description: Ensure README has complete, tested instructions
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Backend setup steps verified
  - Frontend setup steps added
  - Docker instructions tested
  - Troubleshooting section complete

**TASK-051: Record MVP Demo Video [2]**
- Description: 3-minute non-technical demo for Task 9.2P
- Assigned to: [Team Member]
- Acceptance Criteria:
  - Introduces problem and solution
  - Demos key features (register, create profile, view matches, send request)
  - Non-technical language
  - Under 3 minutes
  - Uploaded to YouTube/accessible platform

---

## Sprint 1 Summary

**Total Estimated Hours:** 140 hours
**Team Members:** 4
**Hours per Member:** ~35 hours (target: 50 hours total for project)

**Sprint Goal:** Deliver a working MVP with user authentication, profile management, intelligent matching, and real-time notifications.

---

## How to Use This in Trello

### Step-by-Step Setup:

1. **Go to Trello.com** and create account
2. **Create New Board**: "Study Buddy Matcher"
3. **Create Lists:**
   - Product Backlog
   - Sprint 1 Backlog
   - Doing
   - Done
   - Cancelled

4. **Add Cards:**
   - Copy tasks TASK-001 through TASK-051
   - Each task becomes a Trello card
   - Put all in "Sprint 1 Backlog" initially

5. **For Each Card, Add:**
   - **Title:** e.g., "Initialize Git Repository [1]"
   - **Description:** Full task description from above
   - **Members:** Assign to team member
   - **Labels:** Create labels for:
     - Backend
     - Frontend
     - Testing
     - Documentation
     - Design
   - **Checklist:** Break down acceptance criteria

6. **Make Board Public:**
   - Click "Share"
   - Select "Public"
   - Copy link

7. **Export to PDF:**
   - Take screenshot of board
   - Or use browser print to PDF
   - Include the board URL in document
   - Submit for Task 7.4P

---

## Sprint Tracking

**Update Trello Daily:**
- Move cards from "Sprint 1 Backlog" → "Doing" when you start
- Move from "Doing" → "Done" when complete
- Add comments with progress updates
- Update time estimates if needed

**Weekly Sprint Check-ins:**
- Review board with team
- Identify blockers
- Reassign tasks if needed
- Update priorities

---

**This document serves as your guide for creating the Trello board. Once created, submit a PDF with the board link for Task 7.4P.**
