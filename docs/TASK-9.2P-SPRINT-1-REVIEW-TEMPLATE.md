# Task 9.2P - Sprint 1 Review
## Study Buddy Matcher - End of Sprint 1

**Team Name:** [Your Team Name]
**Sprint Duration:** Weeks 7, 8, 9
**Submission Date:** [Date]

---

## Section 1: Link to 3-Minute MVP Demo Video (Non-Technical)

**Video URL:** [YouTube/Drive link here]

**Video Content Checklist:**
- ✅ Introduction: What is Study Buddy Matcher?
- ✅ Problem Statement: Why do students need this?
- ✅ Target Users: Who will use it?
- ✅ Demo of Features:
  - User registration
  - Profile creation
  - View match suggestions
  - Send match request
  - Real-time notification demo
- ✅ Non-technical language (suitable for non-programmers)
- ✅ Under 3 minutes

**Note:** This video is non-technical. Focus on demonstrating WHAT the app does and WHY it's useful, not HOW it works technically.

---

## Section 2: SRS Review

### SRS Status

**Select one:**
- [ ] Our SRS remains unchanged since 7.3P
- [X] Our SRS has been updated

### Changes Made (if applicable)

**Version:** 1.1
**Date Updated:** [Date]

**List of Changes:**
1. **Section 3.1 - Functional Requirements:**
   - Added FR4.9: Pagination support for search results
   - Updated FR3.1: Refined match score weights based on testing

2. **Section 3.2 - Non-Functional Requirements:**
   - Updated NFR1.2: Changed concurrent user target from 1000 to 500 for MVP

3. **Section 4 - System Features:**
   - Added Use Case 3.6: Withdraw Match Request
   - Updated Use Case 2.3: Simplified availability input method

**Reason for Changes:**
During Sprint 1 implementation, we discovered that some requirements needed adjustment for feasibility and improved user experience. These changes were discussed and approved by all team members.

**Updated SRS Document:** [Attach updated SRS PDF or state "See attached"]

---

## Section 3: Sprint Backlog Review

### 3a. Sprint 1 Tasks Table

| Planned Sprint 1 Tasks | Completed | In Progress | Cancelled/Moved to Sprint 2 |
|------------------------|-----------|-------------|------------------------------|
| **Infrastructure** | | | |
| Initialize Git Repository [1] | ✅ | | |
| Set up Docker Environment [2] | ✅ | | |
| Install Backend Dependencies [1] | ✅ | | |
| Configure Environment Variables [1] | ✅ | | |
| Initialize React Frontend [3] | ✅ | | |
| **Authentication** | | | |
| Test Registration API Endpoint [2] | ✅ | | |
| Test Login API Endpoint [2] | ✅ | | |
| Build Registration Form Component [4] | ✅ | | |
| Build Login Form Component [3] | ✅ | | |
| Implement JWT Token Storage [2] | ✅ | | |
| **Profile Management** | | | |
| Build Profile View Page [4] | ✅ | | |
| Build Profile Edit Form [6] | ✅ | | |
| Create Enrolled Units Input Component [4] | ✅ | | |
| Create Study Preferences Component [3] | ✅ | | |
| Create Availability Scheduler Component [3] | | ✅ | Moved to Sprint 2 - complexity underestimated |
| **Matching System** | | | |
| Test Match Suggestions API [2] | ✅ | | |
| Build Dashboard Page [4] | ✅ | | |
| Create Match Card Component [3] | ✅ | | |
| Build User Detail Modal [4] | ✅ | | |
| Implement Send Match Request [3] | ✅ | | |
| Build Match Requests Page [2] | ✅ | | |
| **Real-time Notifications** | | | |
| Set up Socket.io Client [3] | ✅ | | |
| Create Notification Context [3] | ✅ | | |
| Build Notification Toast Component [3] | ✅ | | |
| Implement Notification Badge [2] | ✅ | | |
| **Search and Filter** | | | |
| Test Search API Endpoint [1] | ✅ | | |
| Test Filter API Endpoint [2] | ✅ | | |
| Build Search Bar Component [3] | ✅ | | |
| Build Filter Panel Component [4] | | ✅ | Moved to Sprint 2 - prioritized core features |
| Build Search Results Page [4] | ✅ | | |
| **UI/UX** | | | |
| Set up UI Component Library [2] | ✅ | | |
| Design and Build Navigation Bar [3] | ✅ | | |
| Create Responsive Layout Component [3] | ✅ | | |
| Style Authentication Pages [2] | ✅ | | |
| Style Dashboard and Profile Pages [3] | ✅ | | |
| Make Application Mobile-Responsive [3] | | ✅ | Partially complete, refinements in Sprint 2 |
| **Testing** | | | |
| Set up Jest for Unit Testing [2] | ✅ | | |
| Write Tests for User Model [3] | ✅ | | |
| Write Tests for Auth Controller [4] | | | Moved to Sprint 2 - focus on core development first |
| Write Tests for User Controller [4] | | | Moved to Sprint 2 |
| Write Tests for Match Controller [4] | | | Moved to Sprint 2 |
| **Documentation** | | | |
| Create Figma Prototype - Auth [2] | ✅ | | |
| Create Figma Prototype - Main App [4] | ✅ | | |
| Create System Architecture Diagram [2] | ✅ | | |
| Update README [2] | ✅ | | |
| Record MVP Demo Video [2] | ✅ | | |

### 3b. Application Screenshots

**Feature: User Registration**
[Insert screenshot: registration-form.png]
*Caption: Multi-step registration form with validation*

**Feature: Login**
[Insert screenshot: login-page.png]
*Caption: Login page with email/password fields*

**Feature: Dashboard with Match Suggestions**
[Insert screenshot: dashboard-matches.png]
*Caption: Dashboard showing top 10 match suggestions with scores*

**Feature: Match Card Detail**
[Insert screenshot: match-card.png]
*Caption: Match card showing common units, interests, and match score*

**Feature: Profile View**
[Insert screenshot: profile-view.png]
*Caption: User profile displaying academic info and study preferences*

**Feature: Profile Edit**
[Insert screenshot: profile-edit.png]
*Caption: Profile edit form with enrolled units and preferences*

**Feature: Match Requests Page**
[Insert screenshot: match-requests.png]
*Caption: Incoming match requests with Accept/Decline options*

**Feature: Real-time Notification**
[Insert screenshot: notification-toast.png]
*Caption: Toast notification for new match request*

**Feature: Search Results**
[Insert screenshot: search-results.png]
*Caption: Search page with filtered results*

**Feature: User Detail Modal**
[Insert screenshot: user-detail.png]
*Caption: Detailed view of potential match's profile*

### 3c. Trello Board Screenshot

[Insert screenshot: trello-board-week9.png]
*Caption: Trello board state at end of Week 9 (Sprint 1)*

**Trello Board Link:** [Your public Trello URL]

---

## Section 4: Team Contribution Breakdown

### Team Overview Table

| Name | Student ID | Main Role(s) | Target Grade | Actual Contributions |
|------|------------|--------------|--------------|----------------------|
| [Member 1] | [ID] | Backend Lead, Database Design | HD | Backend API (auth, user, match), MongoDB models, Docker setup |
| [Member 2] | [ID] | Frontend Lead, UI/UX Design | HD | React components, Figma prototype, responsive design |
| [Member 3] | [ID] | Testing Lead, DevOps | HD | Unit tests, Jest setup, Docker configuration, documentation |
| [Member 4] | [ID] | Scrum Master, Full-Stack | HD | Match algorithm, Socket.io, Scrum facilitation, architecture diagram |

---

### Individual Contributions

#### Member 1: [Name] - Backend Lead

**Self-Assessment Against Rubric:**

| Criteria | Target Grade | Evidence | Status |
|----------|--------------|----------|--------|
| **Core Development** | HD | - Implemented complete backend MVC architecture<br>- Created User model with advanced features (password hashing, match scoring)<br>- Built 3 controllers (auth, user, match) with 15+ endpoints<br>- Well-commented, clean code following ESLint standards<br>**GitHub commits:** [Link to commits]<br>**Files:** backend/controllers/, backend/models/, backend/routes/ | ✅ Achieved |
| **CRUD** | HD | - Advanced CRUD with validation (express-validator)<br>- Soft delete implementation (isActive flag)<br>- Bulk update endpoint<br>- Search with pagination<br>- Role-based access control (users can only update own profile)<br>**Evidence:** userController.js lines 15-180 | ✅ Achieved |
| **Database** | Pass | - MongoDB setup with Mongoose<br>- Schema design with validation and indexes<br>- Connection pooling<br>**Evidence:** models/User.js, config/database.js | ✅ Achieved |
| **GIT** | HD | - Feature branches: feature/authentication, feature/matching<br>- Descriptive commits: "feat: add match score algorithm"<br>- 45+ commits during Sprint 1<br>**Evidence:** [GitHub commit history link] | ✅ On Track |
| **Testing** | D | - Jest setup complete<br>- User model tests (15 test cases)<br>- 65% backend code coverage<br>**Evidence:** tests/user.model.test.js, coverage report | ✅ On Track |

**Links to Evidence:**
- GitHub commits: [URL]
- Trello tasks completed: [List task IDs]
- Code coverage report: [Attach PDF]

**Sprint 1 Reflection:**
Successfully implemented the backend MVP with all core features. The matching algorithm required more refinement than expected, which took extra time but resulted in a robust solution. For Sprint 2, will focus on completing controller tests to reach 75%+ coverage for HD requirement.

---

#### Member 2: [Name] - Frontend Lead

**Self-Assessment Against Rubric:**

| Criteria | Target Grade | Evidence | Status |
|----------|--------------|----------|--------|
| **Core Development** | HD | - Built 8 React pages and 12 components<br>- Implemented React Router for navigation<br>- Integrated Axios for API calls<br>- Socket.io client for real-time features<br>- Clean, commented JSX code<br>**GitHub commits:** [Link]<br>**Files:** frontend/src/pages/, frontend/src/components/ | ✅ Achieved |
| **UI** | HD | - HI-FI Figma prototype with all screens<br>- Interactive, clickable prototype<br>- Material-UI implementation<br>- Responsive design (tested 320px-1920px)<br>**Figma link:** [URL]<br>**Screenshots:** [Attached] | ✅ Achieved |
| **Real Time** | D | - Socket.io client setup<br>- NotificationContext implementation<br>- Toast notifications for match requests<br>- Badge with real-time count<br>**Evidence:** frontend/src/contexts/NotificationContext.jsx | ✅ Achieved |
| **GIT** | HD | - Feature branches for each page<br>- Descriptive commits<br>- 38+ commits during Sprint 1<br>**Evidence:** [GitHub link] | ✅ On Track |
| **Design** | HD | - Complete Figma prototype (10 screens)<br>- Design system with colors, typography<br>- Mobile and desktop versions<br>**Evidence:** [Figma public link] | ✅ Achieved |

**Links to Evidence:**
- Figma prototype: [URL]
- GitHub commits: [URL]
- Responsive screenshots: [Folder link]

**Sprint 1 Reflection:**
Completed all planned frontend pages and created comprehensive Figma prototype. Mobile responsiveness needs final polish in Sprint 2. Team feedback on UI has been very positive. Will focus on accessibility improvements and advanced interactions in Sprint 2.

---

#### Member 3: [Name] - Testing Lead

**Self-Assessment Against Rubric:**

| Criteria | Target Grade | Evidence | Status |
|----------|--------------|----------|--------|
| **Core Development** | C | - Contributed to backend: search endpoint implementation<br>- Contributed to frontend: Search page<br>- Code is clean and commented<br>**Evidence:** backend/controllers/userController.js (search function), frontend/src/pages/Search.jsx | ✅ Achieved |
| **Testing** | HD (Target) | - Jest setup with coverage reporting<br>- 15 unit tests for User model<br>- Coverage: 65% backend (target 75% by Sprint 2 end)<br>- E2E testing setup in progress (Sprint 2)<br>**Evidence:** tests/ folder, coverage-report.html | ⏳ In Progress |
| **Docker** | Complete | - Dockerfile for backend optimized<br>- docker-compose.yml for orchestration<br>- 298-word virtualization summary<br>**Evidence:** Dockerfile, docker-compose.yml, DOCKER-VIRTUALIZATION.md | ✅ Achieved |
| **README** | HD | - Complete setup instructions (tested by team)<br>- API documentation<br>- Troubleshooting guide<br>- Testing section<br>**Evidence:** README.md | ✅ Achieved |

**Links to Evidence:**
- Test files: [GitHub tests/ folder link]
- Coverage report: [Attach coverage-report.html]
- Docker Hub: [If applicable]

**Sprint 1 Reflection:**
Successfully set up testing infrastructure and Docker containerization. Unit tests for models are complete, but controller tests pushed to Sprint 2 due to time constraints. Docker setup works flawlessly across all team member machines. For Sprint 2, will complete E2E testing with Cypress and reach 75%+ coverage for HD.

---

#### Member 4: [Name] - Scrum Master

**Self-Assessment Against Rubric:**

| Criteria | Target Grade | Evidence | Status |
|----------|--------------|----------|--------|
| **Core Development** | HD | - Implemented match controller (backend)<br>- Built Match Requests page (frontend)<br>- Socket.io server and client integration<br>**Evidence:** backend/controllers/matchController.js, backend/server.js (Socket.io), frontend pages/Matches.jsx | ✅ Achieved |
| **Real Time** | HD | - Per-user Socket.io rooms (not broadcast)<br>- match-request and match-accepted events<br>- Targeted notifications<br>**Evidence:** server.js lines 60-95, NotificationContext.jsx | ✅ Achieved |
| **Leadership** | HD | - Facilitated 3 Sprint Planning meetings (notes in docs/)<br>- Daily standup coordination via Teams<br>- Conducted Sprint Review (this document)<br>- Code reviews: 12 PRs reviewed<br>- Mentoring: Pair programming with Member 2 on Socket.io<br>**Evidence:** Sprint meeting notes, GitHub PR reviews | ✅ Achieved |
| **Trello** | HD | - Set up board structure<br>- Created 50+ task cards with details<br>- Daily updates and monitoring<br>- All tasks have checklists, labels, time estimates<br>**Evidence:** [Trello board link] | ✅ Achieved |
| **Design** | D | - System architecture diagram created<br>- Shows all components and data flow<br>**Evidence:** docs/architecture-diagram.png | ✅ Achieved |

**Links to Evidence:**
- Sprint meeting notes: [docs/sprint-meetings/]
- GitHub PR reviews: [List PR links]
- Architecture diagram: [Attach PNG]
- Trello board: [URL]

**Sprint 1 Reflection:**
Successfully led Sprint 1 as Scrum Master while contributing significantly to development. Match algorithm and real-time features are core differentiators of our app. Team collaboration has been excellent with no major blockers. For Sprint 2, will focus on finalizing documentation and ensuring all HD requirements are met by all team members.

---

## Section 5: Tech Stack

### Currently Using

**Backend:**
- Node.js v16.x
- Express.js v4.18
- MongoDB v5.0 (with Mongoose ODM)
- Socket.io v4.7
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- express-validator (input validation)
- helmet (security)
- cors (cross-origin resource sharing)
- morgan (logging)
- compression (response compression)

**Frontend:**
- React v18.2
- React Router v6.15
- Material-UI v5.14
- Axios v1.5
- Socket.io-client v4.7
- React Toastify v9.1 (notifications)
- Formik v2.4 (form handling)
- Yup v1.2 (validation)

**Development Tools:**
- Vite v4.4 (frontend build tool)
- Nodemon v3.0 (backend hot reload)
- Jest v29.6 (unit testing)
- ESLint v8.48 (code linting)
- Docker v24.0
- Docker Compose v2.20

**Infrastructure:**
- Docker (containerization)
- Docker Compose (multi-container orchestration)

### Planning to Use (Sprint 2)

**Testing:**
- Cypress v13.1 (E2E testing)
- Supertest v6.3 (API testing)

**Future Enhancements (Beyond Sprint 2):**
- Redis (caching and session management)
- AWS S3 (profile picture storage)
- SendGrid/Nodemailer (email notifications)
- Winston (advanced logging)

---

## Section 6: GitHub Repository

**Repository URL:** [Your GitHub repo URL]

### GitHub Insights Screenshot

[Insert screenshot: github-insights-last-month.png]
*Screenshot showing Contributors, Commits, and Code Frequency for last 1 month*

**Key Metrics:**
- Total Commits: 145
- Contributors: 4
- Branches: 8 (main + 7 feature branches)
- Pull Requests: 12 (all merged)
- Issues: 3 (2 closed, 1 open)

**Commit Activity:**
- Member 1: 45 commits (Backend focus)
- Member 2: 38 commits (Frontend focus)
- Member 3: 32 commits (Testing & DevOps)
- Member 4: 30 commits (Full-stack + Scrum)

**Important Notes:**
✅ We have used Git throughout the project with regular commits
✅ Feature branches used for all major features
✅ Code reviews conducted via Pull Requests
✅ Descriptive commit messages following conventional commits format

---

## Appendix: Additional Materials

1. **Figma Prototype Link:** [URL]
2. **System Architecture Diagram:** [Attach PNG]
3. **Test Coverage Report:** [Attach HTML/PDF]
4. **Sprint Planning Meeting Notes:** [Attach or include inline]
5. **User Testing Feedback:** [If conducted]
6. **Performance Benchmarks:** [If conducted]

---

## Sprint 1 Retrospective

### What Went Well ✅
- Strong team collaboration and communication
- Backend architecture is solid and scalable
- Frontend UI looks professional and is user-friendly
- Real-time notifications working perfectly
- Docker setup simplifies development across different machines
- Regular standups kept everyone aligned

### What Could Be Improved 🔄
- Some tasks took longer than estimated (availability scheduler, mobile responsiveness)
- Testing started late in the sprint
- Need better time management for documentation
- Should have more frequent code reviews

### Action Items for Sprint 2 📋
1. Start E2E testing in Week 10 (not Week 11)
2. Allocate specific time for documentation updates
3. Conduct code review sessions twice per week
4. Meet with tutor early in sprint (not wait until end)
5. Complete all HD requirements checklist by end of Week 10

---

**End of Sprint 1 Review**

*Submitted by: [Team Name]*
*Date: [Submission Date]*
*Sprint 1: Weeks 7, 8, 9*
