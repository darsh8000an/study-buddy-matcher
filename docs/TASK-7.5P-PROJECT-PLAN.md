# Task 7.5P - Project Plan
## Study Buddy Matcher - Individual Contributions Plan

**Date:** October 2, 2025
**Unit:** SIT725
**Project:** Study Buddy Matcher

---

## Team Overview & Target Grades

| Name | Student ID | Main Role(s) | Target Grade |
|------|------------|--------------|--------------|
| [Member 1 Name] | [ID] | Backend Lead, Database Design | HD |
| [Member 2 Name] | [ID] | Frontend Lead, UI/UX Design | HD |
| [Member 3 Name] | [ID] | Testing Lead, DevOps | HD |
| [Member 4 Name] | [ID] | Scrum Master, Full-Stack Developer | HD |

---

## Team Alignment Summary (100 words)

Our team is fully aligned on achieving High Distinction (HD) grades for the Study Buddy Matcher project. All four members have committed to contributing approximately 50 hours each across both sprints. We have distributed responsibilities based on individual strengths while ensuring everyone gains full-stack experience. Member 1 will lead backend architecture, Member 2 will focus on React frontend and design, Member 3 will implement comprehensive testing and Docker deployment, and Member 4 will serve as Scrum Master while contributing to both backend and frontend. We will support each other through pair programming, code reviews, and regular sprint meetings to ensure consistent HD-level quality across all deliverables.

**Evidence of Planning Meeting:** [Attach screenshot of team video call/meeting]

---

## Individual Contribution Plans

---

### Member 1: [Name] - Backend Lead & Database Design

**Target Grade:** High Distinction (HD)

#### Development Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Core Development (HD)** ✅ | **Exceptional backend code with MVC architecture** | - Design and implement User, Match, and future Message models<br>- Create authentication controller with JWT and bcrypt<br>- Build user controller with advanced CRUD operations<br>- Develop intelligent matching algorithm (scoring based on units, interests, preferences)<br>- Implement RESTful API with proper HTTP methods and status codes<br>- Write comprehensive inline documentation<br>**Evidence:** GitHub commits in backend/ folder, code review comments |
| **CRUD (Distinction)** ✅ | **Advanced CRUD operations** | - Implement data validation with express-validator<br>- Create error handling middleware for all edge cases<br>- Add soft delete functionality (isActive flag instead of removing records)<br>- Build bulk update endpoint for multiple users<br>- Implement search with pagination and filters<br>**Evidence:** API endpoint documentation, Postman test collection |
| **Database (Pass)** ✅ | **MongoDB integration** | - Set up MongoDB connection with Mongoose<br>- Design schemas with appropriate data types, validation, and indexes<br>- Create database configuration with connection pooling<br>- Implement pre-save hooks (password hashing)<br>**Evidence:** models/ folder, database.js config file |

#### Tools Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **GIT (HD)** ✅ | **Excellent version control** | - Create feature branches for each major feature (e.g., feature/authentication, feature/matching-algorithm)<br>- Write descriptive commit messages following convention (e.g., "feat: add matching score calculation")<br>- Create releases with semantic versioning (v1.0.0, v1.1.0)<br>- Ensure all branches map 1-to-1 with Trello tasks<br>**Evidence:** GitHub commit history, branch structure, releases tab |
| **Trello (Distinction)** ✅ | **Well-documented task management** | - Create detailed task cards for all backend work<br>- Update task status daily (Sprint Backlog → Doing → Done)<br>- Add code snippet comments showing progress<br>- Use checklists for acceptance criteria<br>- Add time tracking labels<br>**Evidence:** Trello board with backend tasks, comments showing updates |
| **README (Credit)** ✅ | **Comprehensive backend documentation** | - Write API endpoint documentation with request/response examples<br>- Document environment variables and configuration<br>- Add database schema documentation<br>- Include troubleshooting section for common backend issues<br>**Evidence:** README.md Backend API section |

#### Other Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Testing (Distinction)** ✅ | **Unit tests for backend** | - Write Jest tests for User model methods (comparePassword, getMatchScore)<br>- Test all controller functions with Supertest<br>- Test middleware (authentication, error handling)<br>- Achieve 70%+ code coverage for backend<br>**Evidence:** tests/ folder, coverage report |
| **SRS (Credit)** ✅ | **Backend requirements documentation** | - Author Functional Requirements section (FR1-FR6)<br>- Define API endpoints in Interface Requirements<br>- Contribute to Use Cases for authentication and matching<br>**Evidence:** SRS Document Section 3.1, Member Contributions section |
| **Discuss with Tutor (Distinction)** ✅ | **2+ workshop discussions** | - Present backend architecture in Week 8 workshop<br>- Demo matching algorithm in Week 10 workshop<br>- Get feedback on API design and integrate improvements<br>**Evidence:** Tutor signoff, meeting notes |

**Estimated Hours:** 50 hours
- Backend development: 25 hours
- Testing: 10 hours
- Documentation: 8 hours
- Code reviews & support: 7 hours

**Links to Evidence:**
- GitHub commits: [Will provide after setup]
- Trello board: [Will provide]
- Test coverage report: [Will generate]

---

### Member 2: [Name] - Frontend Lead & UI/UX Design

**Target Grade:** High Distinction (HD)

#### Development Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Core Development (HD)** ✅ | **Exceptional React frontend** | - Build all React components following best practices (functional components, hooks)<br>- Implement React Router for navigation<br>- Create reusable components (MatchCard, UserProfile, NotificationToast)<br>- Integrate Axios for API calls with proper error handling<br>- Implement Socket.io client for real-time notifications<br>- Write clean, commented JSX code<br>**Evidence:** GitHub commits in frontend/ folder |
| **UI (HD)** ✅ | **High-fidelity design and implementation** | - Create HI-FI prototype in Figma with all pages (Login, Dashboard, Profile, Matches, Search)<br>- Make prototype interactive and clickable<br>- Implement responsive design using Material-UI or Tailwind CSS<br>- Ensure mobile-first approach (works on 320px width)<br>- Apply consistent branding, colors, and typography<br>**Evidence:** Figma prototype link, responsive screenshots |
| **Functionalities (Pass)** ✅ | **All features work** | - Authentication flows (login, register, logout)<br>- Profile CRUD (view, edit, save)<br>- Match suggestions display<br>- Search and filter interface<br>**Evidence:** Working application demo |

#### Design Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Design (HD)** ✅ | **Complete design documentation** | - Create clickable Figma prototype with all user flows<br>- Design system with colors, typography, components<br>- Create mobile and desktop versions of all screens<br>- User flow diagrams showing navigation paths<br>**Evidence:** Figma project link (public access) |

#### Tools Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **GIT (HD)** ✅ | **Frontend version control** | - Feature branches for each page/component<br>- Descriptive commits (e.g., "feat: add dashboard with match cards")<br>- Pull requests with code review requests<br>- Map branches to Trello tasks<br>**Evidence:** GitHub commit history for frontend/ |
| **Trello (HD)** ✅ | **Detailed frontend task tracking** | - Create cards for all UI components and pages<br>- Add design mockup links to relevant cards<br>- Use labels (Frontend, Design, Bug, Enhancement)<br>- Regular updates with screenshots of progress<br>- Checklists for acceptance criteria<br>**Evidence:** Trello board, cards with design links and screenshots |
| **README (Credit)** ✅ | **Frontend setup documentation** | - Document React setup steps<br>- List all dependencies and their purpose<br>- Add screenshots of UI<br>- Document component structure<br>**Evidence:** README.md Frontend section |

#### Other Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Real Time (Distinction)** ✅ | **Socket.io client implementation** | - Set up Socket.io client connection<br>- Create NotificationContext for global notification state<br>- Build toast notification component<br>- Implement notification badge with real-time count updates<br>**Evidence:** frontend/src/contexts/NotificationContext.js, components/NotificationToast.js |
| **SRS (Credit)** ✅ | **User personas and UI requirements** | - Author User Personas section (4 personas)<br>- Contribute to Interface Requirements (User Interfaces)<br>- Write Use Cases for frontend interactions<br>**Evidence:** SRS Document Section 2.3, 3.3 |
| **Leadership (Distinction)** ✅ | **Design leadership** | - Lead design review meetings<br>- Mentor team on React best practices<br>- Conduct UI/UX testing with team members<br>**Evidence:** Meeting notes, design feedback documents |
| **Discuss with Tutor (Distinction)** ✅ | **2+ workshop discussions** | - Present UI/UX designs in Week 7 workshop<br>- Demo responsive design in Week 9 workshop<br>**Evidence:** Tutor signoff |

**Estimated Hours:** 50 hours
- Frontend development: 25 hours
- UI/UX design (Figma): 12 hours
- Responsive testing: 6 hours
- Documentation: 7 hours

**Links to Evidence:**
- Figma prototype: [Will provide]
- GitHub commits: [Will provide]
- Trello board: [Will provide]

---

### Member 3: [Name] - Testing Lead & DevOps

**Target Grade:** High Distinction (HD)

#### Development Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Core Development (Credit)** ✅ | **Full-stack contributions** | - Contribute to both backend API routes and frontend pages<br>- Implement search functionality (backend + frontend)<br>- Build filter panel component<br>- Code is tidy and well-commented<br>**Evidence:** GitHub commits in both backend/ and frontend/ |

#### Testing Criteria (Primary Focus)

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Testing (HD)** ✅ | **Comprehensive testing strategy** | **Unit Tests:**<br>- Write Jest tests for all backend controllers (auth, user, match)<br>- Test all model methods<br>- Test middleware functions<br>- Achieve 75%+ backend code coverage<br><br>**End-to-End Tests:**<br>- Set up Cypress for E2E testing<br>- Write test scripts for critical user workflows:<br>  - User registration and login flow<br>  - Profile creation and editing flow<br>  - Match request flow (send, receive, accept)<br>  - Search and filter flow<br>- Run tests in CI/CD pipeline (if time permits)<br><br>**Test Report:**<br>- Generate code coverage report with Jest<br>- Document test results with screenshots<br>- Create testing documentation explaining test strategy<br>**Evidence:** tests/ folder, cypress/ folder, coverage report, test-report.pdf |

#### Tools Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Docker (Task 8.1P)** ✅ | **Containerization and deployment** | - Create optimized Dockerfile for backend<br>- Write docker-compose.yml for multi-container orchestration<br>- Document Docker setup and deployment process<br>- Write 300-word virtualization summary<br>- Test Docker setup on multiple machines<br>**Evidence:** Dockerfile, docker-compose.yml, DOCKER-VIRTUALIZATION.md |
| **GIT (Distinction)** ✅ | **Feature branches and versioning** | - Create feature branches for testing and DevOps work<br>- Regular commits with clear messages<br>- Document branching strategy<br>**Evidence:** GitHub commits, branches |
| **Trello (Distinction)** ✅ | **Testing task management** | - Create detailed cards for all test suites<br>- Document test coverage progress<br>- Use checklists for test cases<br>- Link to test results in comments<br>**Evidence:** Trello cards for testing tasks |
| **README (HD)** ✅ | **Complete documentation** | - Write comprehensive setup instructions (verified by testing)<br>- Add testing section with commands to run tests<br>- Document Docker usage<br>- Create detailed troubleshooting guide<br>**Evidence:** README.md complete with all sections |

#### Other Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **SRS (Credit)** ✅ | **Non-functional requirements** | - Author Non-Functional Requirements section (NFR1-NFR7)<br>- Define performance, security, reliability requirements<br>- Contribute to testing use cases<br>**Evidence:** SRS Document Section 3.2 |
| **Leadership (Distinction)** ✅ | **Technical leadership** | - Establish testing standards and practices<br>- Set up CI/CD pipeline basics<br>- Mentor team on writing testable code<br>**Evidence:** Testing guidelines document, CI/CD configuration |
| **Discuss with Tutor (HD)** ✅ | **3+ workshop discussions** | - Present testing strategy in Week 8<br>- Demo E2E tests in Week 10<br>- Discuss Docker deployment in Week 11<br>**Evidence:** Tutor signoff (3 times) |

**Estimated Hours:** 50 hours
- Unit testing: 15 hours
- E2E testing: 12 hours
- Docker setup: 6 hours
- Development contributions: 10 hours
- Documentation: 7 hours

**Links to Evidence:**
- Test coverage report: [Will generate]
- Docker Hub: [If pushing images]
- GitHub commits: [Will provide]

---

### Member 4: [Name] - Scrum Master & Full-Stack Developer

**Target Grade:** High Distinction (HD)

#### Development Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Core Development (HD)** ✅ | **Full-stack contributions** | - Implement match controller and routes (backend)<br>- Build Match Requests page (frontend)<br>- Create real-time notification system (Socket.io server + client)<br>- Well-structured, optimized code with MVC pattern<br>**Evidence:** GitHub commits in both backend/ and frontend/ |
| **Real Time (HD)** ✅ | **Per-user notifications** | - Implement Socket.io server in backend<br>- Create personal notification rooms for each user<br>- Emit targeted notifications (not broadcast)<br>- Handle match-request and match-accepted events<br>- Implement Socket.io client with React hooks<br>**Evidence:** backend/server.js Socket.io setup, frontend notification system |

#### Leadership Criteria (Primary Focus)

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **Leadership (HD)** ✅ | **Consistent Scrum Master role** | **Scrum Master Responsibilities:**<br>- Facilitate Sprint Planning meetings (record attendance, meeting notes)<br>- Organize daily standups (async via Teams/Slack)<br>- Run Sprint Reviews (end of Sprint 1 and Sprint 2)<br>- Conduct Sprint Retrospectives<br>- Remove blockers for team members<br><br>**Sprint Planning:**<br>- Lead SRS review and user story identification<br>- Help team break down stories into tasks<br>- Ensure realistic time estimates<br>- Facilitate task assignment<br><br>**Technical Leadership:**<br>- Set coding standards (ESLint config, naming conventions)<br>- Conduct code reviews for all major features<br>- Resolve technical disagreements<br>- Guide architecture decisions<br><br>**Mentoring:**<br>- Pair programming sessions with team members<br>- Help debug issues<br>- Share knowledge on Git, React, Node.js<br>**Evidence:** Sprint meeting notes, sprint review documents, code review comments, team feedback |

#### Tools Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **GIT (HD)** ✅ | **Git workflow management** | - Establish branching strategy for team<br>- Create feature branches with clear naming<br>- Review all pull requests before merging<br>- Create releases (v1.0.0 for Sprint 1, v2.0.0 for Sprint 2)<br>- Ensure 1-to-1 branch-to-Trello mapping<br>**Evidence:** GitHub insights showing contributions, PRs reviewed |
| **Trello (HD)** ✅ | **Project management** | - Set up Trello board structure<br>- Create all initial task cards from SRS<br>- Ensure all tasks have:<br>  - Clear descriptions<br>  - Assigned members<br>  - Time estimates<br>  - Acceptance criteria checklists<br>  - Appropriate labels<br>- Monitor board daily and remind team to update<br>- Generate burn-down charts or progress reports<br>**Evidence:** Trello board (clearly shows story), sprint reports |
| **README (HD)** ✅ | **Project documentation owner** | - Ensure README is comprehensive and up-to-date<br>- Review and approve all documentation changes<br>- Add team member information<br>- Include all setup instructions for newcomers<br>**Evidence:** README.md with complete information |

#### Other Criteria

| Criteria | Planned Contribution | Specific Tasks |
|----------|----------------------|----------------|
| **SRS (Distinction)** ✅ | **System features and use cases** | - Author System Features section (Section 4) with all use cases<br>- Ensure traceability between features and requirements<br>- Review entire SRS for consistency<br>**Evidence:** SRS Document Section 4, Member Contributions |
| **Design (Distinction)** ✅ | **System architecture diagram** | - Create detailed system architecture diagram<br>- Show all components: Frontend, Backend, Database, Socket.io<br>- Document data flow and API interactions<br>- Use professional diagramming tool (draw.io, Lucidchart)<br>**Evidence:** architecture-diagram.png in docs/ |
| **Discuss with Tutor (HD)** ✅ | **3+ workshop discussions** | - Present project overview in Week 7<br>- Discuss sprint progress in Week 9<br>- Demo final features in Week 11<br>- Get feedback and integrate into project<br>**Evidence:** Tutor signoff (3 documented sessions) |

**Estimated Hours:** 50 hours
- Scrum Master duties: 12 hours
- Development (backend + frontend): 20 hours
- Code reviews & mentoring: 8 hours
- Documentation & planning: 10 hours

**Links to Evidence:**
- Sprint meeting notes: [docs/sprint-meetings/]
- GitHub PRs reviewed: [Will provide]
- Trello board: [Will provide]
- Architecture diagram: [Will create]

---

## Project Timeline

### Sprint 1 (Weeks 7-9)
**Goals:**
- Complete backend MVP
- Build frontend core pages
- Implement matching algorithm
- Set up real-time notifications
- Write unit tests

**Key Deliverables:**
- Task 7.3P: SRS Document ✅
- Task 7.4P: Trello Board ⏳
- Task 7.5P: Project Plan (this document) ⏳
- Task 8.1P: Docker Summary ✅
- Task 8.2P: Updated Project Plan ⏳
- Task 9.2P: Sprint 1 Review ⏳

### Sprint 2 (Weeks 10-11)
**Goals:**
- Polish UI/UX
- Complete E2E testing
- Add advanced features
- Finalize documentation
- Prepare demo

**Key Deliverables:**
- Task 9.1P: Guest Lecture Reflection ⏳
- Task 10.1P: Sprint 2 Planning ⏳
- Task 12.1P: Final Delivery & Demo ⏳

---

## Success Metrics

For our team to achieve HD grades, we must:

✅ **Technical Excellence:**
- MVC architecture throughout
- 75%+ test coverage
- Advanced CRUD with validation, RBAC, soft delete
- Per-user real-time notifications
- Responsive, polished UI

✅ **Documentation:**
- Comprehensive SRS (✅ Complete)
- HI-FI Figma prototypes
- System architecture diagram
- Complete README
- Test reports

✅ **Process:**
- Well-maintained Trello board
- Proper Git workflow (feature branches, releases)
- Regular commits (not one big dump)
- 3+ tutor meetings with evidence

✅ **Collaboration:**
- All 4 members contribute ~50 hours each
- Balanced workload distribution
- Code reviews
- Sprint meetings

---

## Risks and Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| Team member unavailable | High | Cross-training on each other's areas; documentation of all work |
| Technical blocker | Medium | Daily standups to identify blockers early; reach out to tutor |
| Scope creep | Medium | Strict adherence to Sprint goals; move non-essential features to Sprint 2 |
| Testing takes longer than expected | Medium | Start testing early in Sprint 1; allocate buffer time |
| Integration issues between frontend/backend | Medium | Define API contracts early; test endpoints before frontend implementation |

---

## Communication Plan

- **Daily:** Async standup updates in Teams channel
- **Twice weekly:** Video meetings (1 hour each)
- **Sprint Reviews:** End of Sprint 1 and Sprint 2
- **Ad-hoc:** Slack/Teams for quick questions

---

## Conclusion

Our team is committed to delivering an HD-quality Study Buddy Matcher application. With clear role definitions, balanced workload distribution, and comprehensive planning, we are confident in achieving our target grades. Each member brings unique strengths while supporting the overall project goals. We will maintain open communication, follow agile best practices, and produce high-quality, well-documented code throughout both sprints.

**Signatures:**

[Member 1]: _________________  Date: __________

[Member 2]: _________________  Date: __________

[Member 3]: _________________  Date: __________

[Member 4]: _________________  Date: __________

---

**This document should be submitted for Task 7.5P after filling in team member names and adding meeting evidence.**
