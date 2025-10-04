# Software Requirements Specification (SRS)
## Study Buddy Matcher

**Version:** 1.0
**Date:** October 2, 2025
**Unit:** SIT725 - Advanced Programming and Web Development
**Team Members:**
- [Member 1 Name] - [Role]
- [Member 2 Name] - [Role]
- [Member 3 Name] - [Role]
- [Member 4 Name] - [Role]

---

## Table of Contents
1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Scope
   - 1.3 Definitions, Acronyms, and Abbreviations
   - 1.4 References
   - 1.5 Overview
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective
   - 2.2 Product Functions
   - 2.3 User Characteristics
   - 2.4 Constraints
   - 2.5 Assumptions and Dependencies
3. [Specific Requirements](#3-specific-requirements)
   - 3.1 Functional Requirements
   - 3.2 Non-Functional Requirements
   - 3.3 Interface Requirements
4. [System Features](#4-system-features)
   - 4.1 User Management
   - 4.2 Profile Management
   - 4.3 Matching System
   - 4.4 Communication System
   - 4.5 Search and Filter

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a comprehensive description of the Study Buddy Matcher system. It details the functional and non-functional requirements, system features, and constraints for the development team and stakeholders. This document serves as the primary reference for all development activities and ensures all team members have a shared understanding of the system requirements.

### 1.2 Scope
Study Buddy Matcher is a web-based application designed to connect university students with compatible study partners. The system addresses the challenge of finding suitable study companions, particularly in online or hybrid learning environments where traditional networking opportunities are limited.

**Product Name:** Study Buddy Matcher

**What the software will do:**
- Enable students to create comprehensive profiles including academic interests, enrolled units, study preferences, and availability schedules
- Automatically match students based on shared courses, compatible study preferences, and overlapping availability
- Facilitate communication between matched students through connection requests and messaging capabilities
- Provide real-time notifications for match requests and messages
- Allow students to search and filter potential study partners based on specific criteria

**What the software will not do:**
- Replace official university learning management systems (LMS)
- Provide academic tutoring or educational content
- Facilitate financial transactions or payment for tutoring services
- Monitor or track actual study session attendance
- Store or grade academic assignments

**Benefits:**
- Reduces isolation in online and hybrid learning environments
- Improves academic performance through peer-to-peer learning
- Increases student engagement and motivation
- Provides inclusive support for diverse learning needs (ESL students, neurodivergent learners, first-year students)
- Saves time in finding compatible study partners

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| API | Application Programming Interface - set of protocols for building software applications |
| CRUD | Create, Read, Update, Delete - basic database operations |
| ESL | English as a Second Language |
| JWT | JSON Web Token - authentication mechanism |
| MERN | MongoDB, Express.js, React.js, Node.js - technology stack |
| MVP | Minimum Viable Product - initial version with core features |
| RBAC | Role-Based Access Control - authorization mechanism |
| REST | Representational State Transfer - architectural style for APIs |
| Socket.io | Real-time bidirectional event-based communication library |
| SRS | Software Requirements Specification |
| UI/UX | User Interface / User Experience |
| WebSocket | Protocol providing full-duplex communication channels |

### 1.4 References
- IEEE Standard 830-1998 - IEEE Recommended Practice for Software Requirements Specifications
- SIT725 Lecture 2 - Software Requirements Specification Guidelines
- MongoDB Documentation - https://docs.mongodb.com/
- Express.js Documentation - https://expressjs.com/
- React.js Documentation - https://reactjs.org/docs/
- Socket.io Documentation - https://socket.io/docs/

### 1.5 Overview
This SRS document is organized into four main sections. Section 1 provides introductory information. Section 2 describes the overall system from a high-level perspective. Section 3 details specific functional and non-functional requirements. Section 4 breaks down individual system features with their associated requirements and use cases.

---

## 2. Overall Description

### 2.1 Product Perspective
Study Buddy Matcher is an independent, self-contained web application that operates within the broader ecosystem of university student support services. While it does not integrate directly with existing Learning Management Systems (LMS), it complements them by addressing the social and collaborative learning aspects that LMS platforms typically do not cover.

**System Context:**
- **Standalone Application**: Does not require integration with existing university systems but can coexist alongside them
- **Cloud-Based**: Accessible from any device with internet connectivity and a modern web browser
- **Cross-Platform**: Responsive design enables access from desktops, tablets, and mobile devices

**System Interfaces:**
- **User Interface**: Web-based responsive interface built with React.js
- **Database Interface**: MongoDB for persistent data storage
- **External APIs**: None required for MVP (future: email service, calendar integration)

### 2.2 Product Functions
The major functions provided by Study Buddy Matcher include:

1. **User Registration and Authentication**
   - Secure account creation with email verification
   - Login/logout functionality with session management
   - Password recovery and reset capabilities

2. **Profile Creation and Management**
   - Input academic information (university, degree, year of study)
   - Specify enrolled units and academic interests
   - Define study preferences and learning style
   - Set availability schedule
   - Upload profile picture and write bio

3. **Intelligent Matching**
   - Algorithmic matching based on multiple criteria:
     - Common enrolled units (highest weight)
     - Shared academic interests
     - Compatible study preferences
     - Overlapping availability
     - Similar year of study
   - Display match scores and compatibility reasons
   - Suggest top 20 most compatible matches

4. **Connection Management**
   - Send match requests to other students
   - Accept or decline incoming requests
   - View list of current connections
   - Remove connections if needed

5. **Search and Filter**
   - Search users by name, university, or unit code
   - Filter by year of study, study mode, group size preference
   - View detailed profiles of potential matches

6. **Real-Time Notifications**
   - Instant notifications for new match requests
   - Alerts for accepted connections
   - Message notifications (future enhancement)

### 2.3 User Characteristics

**Primary User: University Student**
- **Age Range**: 18-30 years old
- **Education Level**: Undergraduate or postgraduate students
- **Technical Expertise**: Basic to intermediate computer skills; comfortable with web applications
- **Frequency of Use**: 2-5 times per week during active study periods; daily during exam preparation
- **Device Usage**: Primarily laptop/desktop for profile setup; mobile for checking notifications

**User Personas:**

**Persona 1: First-Year International Student (Emma)**
- Struggling to make friends in online classes
- English is second language; prefers study partners with similar background
- Needs help understanding local academic culture
- Values patient, discussion-based study sessions

**Persona 2: Third-Year Engineering Student (Alex)**
- Taking advanced technical courses with small class sizes
- Prefers task-oriented, focused study sessions
- Looking for study partners for specific units only
- Limited availability due to part-time work

**Persona 3: Neurodivergent Student (Jordan)**
- Requires structured, predictable study environments
- Works better in one-on-one settings
- Needs clear communication about study methods and goals
- Benefits from visual schedules and explicit expectations

**Persona 4: Online/Distance Learning Student (Sam)**
- Lives far from campus; attends classes virtually
- Feels isolated from peer learning opportunities
- Needs flexible scheduling across time zones
- Wants to maintain academic engagement despite physical distance

### 2.4 Constraints

**Technical Constraints:**
- Must be developed using MERN stack (MongoDB, Express.js, React.js, Node.js)
- Must implement Socket.io for real-time features
- Must use Docker for containerization
- Must follow MVC (Model-View-Controller) architectural pattern
- Backend API must be RESTful with proper HTTP methods

**Regulatory Constraints:**
- Must comply with data privacy regulations (GDPR considerations for student data)
- Must not collect or store sensitive personal information beyond necessary academic details
- Must implement secure authentication and authorization

**Project Constraints:**
- Development timeline: 5 weeks (Sprint 1: 3 weeks, Sprint 2: 2 weeks)
- Team size: 4 members with approximately 50 hours contribution each
- Must be completed within SIT725 unit requirements
- Limited to technologies approved by unit chair

**Performance Constraints:**
- System must support at least 1000 concurrent users
- API response time must be under 2 seconds for 95% of requests
- Database queries must be optimized with appropriate indexing
- Real-time notifications must be delivered within 1 second

### 2.5 Assumptions and Dependencies

**Assumptions:**
- Users have reliable internet connectivity
- Users have access to modern web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- Users will provide accurate information in their profiles
- University course codes follow standard naming conventions
- Users understand basic web application interactions (forms, buttons, navigation)
- Mobile devices have screen sizes of at least 320px width

**Dependencies:**
- MongoDB database availability and performance
- Node.js runtime environment
- Third-party npm packages (Express, Mongoose, Socket.io, etc.)
- Docker for containerization (development and deployment)
- Internet connectivity for accessing the application
- Modern browser support for WebSocket protocol (Socket.io)

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### FR1: User Authentication
**FR1.1** The system shall allow users to register with email, password, first name, last name, university, degree program, and year of study.

**FR1.2** The system shall validate email addresses using standard email format validation.

**FR1.3** The system shall require passwords to be at least 6 characters long.

**FR1.4** The system shall hash passwords using bcrypt before storing them in the database.

**FR1.5** The system shall allow users to log in using their registered email and password.

**FR1.6** The system shall generate a JSON Web Token (JWT) upon successful authentication with a 7-day expiration period.

**FR1.7** The system shall allow users to log out, invalidating their session.

**FR1.8** The system shall prevent duplicate registrations with the same email address.

**FR1.9** The system shall allow users to update their password by providing current password and new password.

**FR1.10** The system shall track user login count and last login timestamp.

#### FR2: Profile Management
**FR2.1** The system shall allow users to add enrolled units with unit code and unit name.

**FR2.2** The system shall store unit codes in uppercase format automatically.

**FR2.3** The system shall allow users to specify multiple academic interests as text tags.

**FR2.4** The system shall allow users to set study preferences including:
- Preferred study mode (online, in-person, hybrid, flexible)
- Group size preference (one-on-one, small-group, large-group, any)
- Study style (discussion-based, task-oriented, mixed)
- Language preference

**FR2.5** The system shall allow users to define availability by:
- Selecting days of the week (Monday-Sunday)
- Specifying time slots with start and end times for each day

**FR2.6** The system shall allow users to write a bio with a maximum length of 500 characters.

**FR2.7** The system shall allow users to upload a profile picture (default provided if not uploaded).

**FR2.8** The system shall allow users to view and edit their own profile information at any time.

**FR2.9** The system shall allow users to set their account as active or inactive.

**FR2.10** The system shall display a computed full name field combining first and last name.

#### FR3: Matching System
**FR3.1** The system shall calculate a match score between the current user and all other active users based on:
- Common enrolled units (10 points per common unit)
- Common academic interests (5 points per common interest)
- Compatible preferred study mode (3 points)
- Compatible group size preference (2 points)
- Same year of study (1 point)

**FR3.2** The system shall suggest up to 20 users with the highest match scores greater than zero.

**FR3.3** The system shall display match suggestions sorted in descending order of match score.

**FR3.4** The system shall show common units and common interests for each suggested match.

**FR3.5** The system shall allow users to send match requests to suggested users.

**FR3.6** The system shall prevent users from sending duplicate match requests to the same user.

**FR3.7** The system shall allow users to accept incoming match requests.

**FR3.8** The system shall allow users to decline incoming match requests.

**FR3.9** The system shall update match status to "accepted" for both users when a request is accepted.

**FR3.10** The system shall update match status to "declined" for both users when a request is declined.

**FR3.11** The system shall display all current matches with their status (pending, accepted, declined).

**FR3.12** The system shall send real-time notifications when match requests are sent or accepted.

#### FR4: Search and Filter
**FR4.1** The system shall allow users to search for other users by first name, last name, or email.

**FR4.2** The system shall perform case-insensitive searches.

**FR4.3** The system shall allow users to filter other users by:
- University
- Year of study
- Unit code
- Preferred study mode
- Group size preference

**FR4.4** The system shall support combining multiple filters in a single query.

**FR4.5** The system shall paginate search and filter results with configurable page size (default 10 per page).

**FR4.6** The system shall return total count and total pages along with paginated results.

**FR4.7** The system shall only display active users in search results (respecting soft delete).

**FR4.8** The system shall display search results sorted by creation date (newest first).

#### FR5: User Management (Advanced CRUD)
**FR5.1** The system shall implement data validation for all user input fields according to specified formats and constraints.

**FR5.2** The system shall return descriptive error messages when validation fails.

**FR5.3** The system shall implement role-based access control, ensuring users can only modify their own profiles.

**FR5.4** The system shall implement soft delete functionality, setting isActive flag to false instead of removing records.

**FR5.5** The system shall support bulk update operations for multiple users simultaneously (future admin feature).

**FR5.6** The system shall prevent modification of sensitive fields (email, password, verification status) through standard update endpoints.

**FR5.7** The system shall log all CRUD operations for audit purposes (timestamps via createdAt/updatedAt).

#### FR6: Real-Time Communication
**FR6.1** The system shall establish WebSocket connections using Socket.io for real-time features.

**FR6.2** The system shall allow users to join their personal notification room upon connection.

**FR6.3** The system shall send real-time notifications to specific users (per-user notifications, not broadcast).

**FR6.4** The system shall deliver notifications for:
- New match requests
- Accepted match requests
- New messages (future enhancement)

**FR6.5** The system shall include sender information and timestamp in all notifications.

**FR6.6** The system shall handle Socket.io disconnections gracefully and allow reconnection.

### 3.2 Non-Functional Requirements

#### NFR1: Performance
**NFR1.1** The system shall respond to API requests within 2 seconds for 95% of requests under normal load.

**NFR1.2** The system shall support at least 1000 concurrent users without performance degradation.

**NFR1.3** The system shall deliver real-time notifications within 1 second of the triggering event.

**NFR1.4** Database queries shall be optimized with appropriate indexes on frequently queried fields (email, unit codes, university).

**NFR1.5** The system shall implement database connection pooling for efficient resource utilization.

#### NFR2: Security
**NFR2.1** The system shall use HTTPS for all communications in production environment.

**NFR2.2** The system shall implement JWT-based authentication with token expiration.

**NFR2.3** The system shall hash all passwords using bcrypt with a salt factor of 10.

**NFR2.4** The system shall validate and sanitize all user inputs to prevent injection attacks.

**NFR2.5** The system shall implement CORS (Cross-Origin Resource Sharing) restrictions to prevent unauthorized access.

**NFR2.6** The system shall use Helmet middleware for setting secure HTTP headers.

**NFR2.7** The system shall not expose sensitive information in error messages.

**NFR2.8** The system shall require authentication for all protected routes.

**NFR2.9** The system shall implement rate limiting to prevent abuse (future enhancement).

#### NFR3: Reliability
**NFR3.1** The system shall have an uptime of 99% excluding scheduled maintenance.

**NFR3.2** The system shall implement error handling middleware to catch and log all errors.

**NFR3.3** The system shall gracefully handle database connection failures with appropriate error messages.

**NFR3.4** The system shall implement input validation at both client and server sides.

**NFR3.5** The system shall use MongoDB transactions where data consistency is critical (future enhancement).

**NFR3.6** The system shall log all critical errors for debugging and monitoring.

#### NFR4: Usability
**NFR4.1** The system shall provide a responsive user interface that works on devices with screen widths from 320px to 2560px.

**NFR4.2** The system shall provide clear and descriptive error messages for all validation failures.

**NFR4.3** The system shall follow consistent UI/UX design patterns across all pages.

**NFR4.4** The system shall provide visual feedback for all user actions (loading states, success messages, error alerts).

**NFR4.5** The system shall be accessible to users with basic web application knowledge, requiring no technical training.

**NFR4.6** The system shall follow WCAG 2.1 Level AA accessibility guidelines where possible.

#### NFR5: Maintainability
**NFR5.1** The system shall follow MVC (Model-View-Controller) architectural pattern with clear separation of concerns.

**NFR5.2** The system shall use consistent coding standards across all modules (ESLint configuration).

**NFR5.3** The system shall include inline comments for complex logic and algorithms.

**NFR5.4** The system shall use meaningful variable and function names following camelCase convention.

**NFR5.5** The system shall maintain comprehensive documentation including API documentation and setup instructions.

**NFR5.6** The system shall use version control (Git) with descriptive commit messages.

**NFR5.7** The system shall use Docker for consistent development and deployment environments.

#### NFR6: Scalability
**NFR6.1** The system architecture shall support horizontal scaling by adding more server instances.

**NFR6.2** The system shall use stateless API design to facilitate load balancing.

**NFR6.3** The system shall use MongoDB's indexing and query optimization for efficient data retrieval as user base grows.

**NFR6.4** The system shall be containerized using Docker for easy deployment and scaling.

#### NFR7: Portability
**NFR7.1** The system shall be deployable on any platform supporting Docker (Linux, macOS, Windows).

**NFR7.2** The system shall work on all modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).

**NFR7.3** The system shall not rely on platform-specific features or libraries.

**NFR7.4** The system configuration shall be environment-variable based for easy deployment across different environments.

### 3.3 Interface Requirements

#### External Interface Requirements

**User Interfaces:**
- Login page with email and password fields
- Registration page with multi-step form (personal info, academic info, preferences)
- Dashboard showing match suggestions and notifications
- Profile page with editable fields
- Match requests page showing pending, accepted, and declined requests
- Search page with filters and results list
- User detail page showing full profile of potential matches

**Hardware Interfaces:**
- No special hardware requirements
- Standard keyboard and mouse/trackpad for input
- Display resolution: minimum 320x568 (mobile), recommended 1920x1080 (desktop)

**Software Interfaces:**
- **MongoDB Database**: NoSQL database for data persistence
  - Interface: Mongoose ODM (Object Data Modeling library)
  - Data exchanged: JSON documents
  - Communication: TCP/IP on port 27017

- **Node.js Runtime**: Server-side JavaScript execution environment
  - Version: 16.x or higher
  - Purpose: Execute backend application code

- **Express.js Framework**: Web application framework for Node.js
  - Version: 4.x
  - Purpose: Handle HTTP requests, routing, middleware

- **Socket.io Library**: Real-time bidirectional communication
  - Version: 4.x
  - Protocol: WebSocket with fallbacks
  - Purpose: Real-time notifications

**Communication Interfaces:**
- **HTTP/HTTPS Protocol**: Client-server communication
  - REST API endpoints
  - JSON request/response format
  - Standard HTTP methods (GET, POST, PUT, DELETE)

- **WebSocket Protocol**: Real-time bidirectional communication
  - Port: Same as HTTP server (upgrade from HTTP)
  - Used by Socket.io for notifications

---

## 4. System Features

### 4.1 User Management

**Description**: This feature encompasses user registration, authentication, and account management functionalities. It forms the foundation of the system by ensuring secure access and identity management.

**Priority**: High (Critical for system operation)

**Functional Requirements**:
- FR1.1 - FR1.10 (User Authentication requirements from Section 3.1)

**Use Cases**:

**UC1.1: User Registration**
- **Actor**: New User
- **Preconditions**: User has access to a web browser and internet connection
- **Main Flow**:
  1. User navigates to registration page
  2. User enters email, password, first name, last name, university, degree, and year of study
  3. System validates all input fields
  4. System checks if email is already registered
  5. System hashes password using bcrypt
  6. System creates user account in database
  7. System generates JWT token
  8. System returns success message and token
  9. User is redirected to profile completion page
- **Alternative Flows**:
  - 4a. Validation fails: System displays specific error messages for each invalid field
  - 4b. Email already exists: System displays "User already exists" error
- **Postconditions**: User account is created with isActive=true and loginCount=0

**UC1.2: User Login**
- **Actor**: Registered User
- **Preconditions**: User has a registered account
- **Main Flow**:
  1. User navigates to login page
  2. User enters email and password
  3. System validates input format
  4. System retrieves user from database by email
  5. System compares hashed passwords
  6. System increments login count and updates last login timestamp
  7. System generates JWT token
  8. System returns success message, token, and user data
  9. User is redirected to dashboard
- **Alternative Flows**:
  - 5a. User not found: System displays "Invalid credentials" error
  - 5b. Password incorrect: System displays "Invalid credentials" error
- **Postconditions**: User is authenticated with valid JWT token; loginCount incremented

**UC1.3: Update Password**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in
- **Main Flow**:
  1. User navigates to settings/security page
  2. User enters current password and new password
  3. System validates both passwords are provided
  4. System retrieves user with password field
  5. System verifies current password is correct
  6. System validates new password meets requirements
  7. System hashes new password
  8. System updates password in database
  9. System generates new JWT token
  10. System returns success message and new token
- **Alternative Flows**:
  - 5a. Current password incorrect: System displays "Current password is incorrect" error
  - 6a. New password too short: System displays "Password must be at least 6 characters" error
- **Postconditions**: User's password is updated; new token is issued

### 4.2 Profile Management

**Description**: This feature allows users to create, view, and modify their academic profiles, including personal information, enrolled units, study preferences, and availability schedules.

**Priority**: High (Essential for matching functionality)

**Functional Requirements**:
- FR2.1 - FR2.10 (Profile Management requirements from Section 3.1)

**Use Cases**:

**UC2.1: Add Enrolled Units**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in
- **Main Flow**:
  1. User navigates to profile edit page
  2. User clicks "Add Unit" button
  3. User enters unit code and unit name
  4. System converts unit code to uppercase
  5. System validates both fields are non-empty
  6. System adds unit to enrolledUnits array
  7. System saves profile
  8. System displays updated profile with new unit
- **Alternative Flows**:
  - 5a. Fields empty: System displays "Unit code and name are required" error
- **Postconditions**: User's enrolledUnits array includes new unit

**UC2.2: Set Study Preferences**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in and on profile edit page
- **Main Flow**:
  1. User selects preferred study mode from dropdown (online/in-person/hybrid/flexible)
  2. User selects group size preference from dropdown (one-on-one/small-group/large-group/any)
  3. User selects study style from dropdown (discussion-based/task-oriented/mixed)
  4. User enters language preference in text field
  5. System validates selections are from allowed enum values
  6. System updates studyPreferences object
  7. System saves profile
  8. System displays success message
- **Alternative Flows**:
  - 5a. Invalid enum value: System displays "Invalid selection" error
- **Postconditions**: User's studyPreferences are updated with selected values

**UC2.3: Define Availability Schedule**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in and on profile edit page
- **Main Flow**:
  1. User selects day of week (Monday-Sunday)
  2. User clicks "Add Time Slot" for selected day
  3. User enters start time (e.g., "09:00")
  4. User enters end time (e.g., "11:00")
  5. System validates day is valid weekday
  6. System validates time format
  7. System validates end time is after start time
  8. System adds time slot to availability array for that day
  9. System saves profile
  10. System displays updated availability schedule
- **Alternative Flows**:
  - 5a. Invalid day: System displays "Invalid day of week" error
  - 7a. End time before start time: System displays "End time must be after start time" error
- **Postconditions**: User's availability array includes new time slot for specified day

**UC2.4: Update Profile Information**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in
- **Main Flow**:
  1. User navigates to profile edit page
  2. User modifies editable fields (bio, academic interests, degree, year of study, etc.)
  3. User clicks "Save" button
  4. System validates bio length (max 500 characters)
  5. System validates all required fields are present
  6. System prevents modification of email, password, isVerified, loginCount
  7. System updates user document in database
  8. System returns updated user data
  9. System displays success message
- **Alternative Flows**:
  - 4a. Bio too long: System displays "Bio cannot exceed 500 characters" error
  - 5a. Required field empty: System displays specific error for missing field
- **Postconditions**: User's profile is updated with new information; updatedAt timestamp is current

### 4.3 Matching System

**Description**: This is the core feature that algorithmically matches students based on academic compatibility, study preferences, and availability. It calculates match scores and facilitates connection requests.

**Priority**: High (Core differentiating feature)

**Functional Requirements**:
- FR3.1 - FR3.12 (Matching System requirements from Section 3.1)

**Use Cases**:

**UC3.1: View Suggested Matches**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in and has completed profile with at least one enrolled unit
- **Main Flow**:
  1. User navigates to "Find Matches" or Dashboard page
  2. System retrieves current user's profile
  3. System retrieves all other active users
  4. System calculates match score for each user:
     - +10 points per common enrolled unit
     - +5 points per common academic interest
     - +3 points for compatible study mode
     - +2 points for compatible group size
     - +1 point for same year of study
  5. System filters users with score > 0
  6. System sorts by score descending
  7. System takes top 20 matches
  8. System identifies common units and interests for each match
  9. System displays match suggestions with scores, common units, and common interests
- **Alternative Flows**:
  - 3a. No other active users: System displays "No potential matches found" message
  - 5a. No users with score > 0: System displays "No compatible matches found. Try updating your profile with more units." message
- **Postconditions**: User sees list of up to 20 suggested matches sorted by compatibility

**UC3.2: Send Match Request**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in and viewing a potential match's profile
- **Main Flow**:
  1. User clicks "Send Match Request" button on target user's profile
  2. User optionally enters a personal message
  3. System validates recipient ID is provided
  4. System checks recipient exists and is active
  5. System checks if match already exists (pending/accepted/declined)
  6. System adds match to sender's matches array with status="pending"
  7. System adds match to recipient's matches array with status="pending"
  8. System sends real-time notification to recipient via Socket.io
  9. System displays "Match request sent successfully" message to sender
- **Alternative Flows**:
  - 4a. Recipient not found: System displays "User not found" error
  - 5a. Match already exists: System displays "Match request already [status]" error
- **Postconditions**:
  - Both users have match entry with status="pending"
  - Recipient receives real-time notification
  - Sender's UI shows request as "pending"

**UC3.3: Accept Match Request**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in and has received a pending match request
- **Main Flow**:
  1. User views match requests page or receives notification
  2. User clicks "Accept" button on specific match request
  3. System validates match request exists in user's matches
  4. System updates match status to "accepted" in current user's matches
  5. System finds corresponding match in sender's matches
  6. System updates match status to "accepted" in sender's matches
  7. System sends real-time notification to sender via Socket.io
  8. System displays "Match accepted! You can now connect with [name]" message
- **Alternative Flows**:
  - 3a. Match not found: System displays "Match request not found" error
- **Postconditions**:
  - Both users have match entry with status="accepted"
  - Sender receives real-time notification
  - Both users can see each other in "My Connections" list

**UC3.4: Decline Match Request**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in and has received a pending match request
- **Main Flow**:
  1. User views match requests page
  2. User clicks "Decline" button on specific match request
  3. System validates match request exists in user's matches
  4. System updates match status to "declined" in current user's matches
  5. System finds corresponding match in sender's matches
  6. System updates match status to "declined" in sender's matches
  7. System displays "Match request declined" message
- **Alternative Flows**:
  - 3a. Match not found: System displays "Match request not found" error
- **Postconditions**:
  - Both users have match entry with status="declined"
  - Sender can see request was declined
  - Request removed from recipient's pending list

**UC3.5: View My Matches**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in
- **Main Flow**:
  1. User navigates to "My Connections" or "Matches" page
  2. System retrieves current user with matches array populated
  3. System fetches full user details for each match from database
  4. System groups matches by status:
     - Pending (sent and received)
     - Accepted (active connections)
     - Declined (optional to show)
  5. System displays matches in organized sections with user info and match date
- **Alternative Flows**:
  - None
- **Postconditions**: User sees all their matches organized by status

### 4.4 Communication System

**Description**: This feature enables real-time notifications for match-related events using WebSocket technology (Socket.io). It ensures users are immediately informed of match requests and acceptances.

**Priority**: Medium-High (Important for engagement but not blocking core functionality)

**Functional Requirements**:
- FR6.1 - FR6.6 (Real-Time Communication requirements from Section 3.1)

**Use Cases**:

**UC4.1: Receive Match Request Notification**
- **Actor**: Authenticated User
- **Preconditions**:
  - User is logged in
  - User's browser has active Socket.io connection
  - User has joined their personal notification room
- **Main Flow**:
  1. Another user sends a match request (triggers UC3.2)
  2. Backend emits "new-match-request" event to recipient's Socket.io room
  3. Frontend Socket.io client receives event
  4. System displays browser notification/toast with sender's name and message
  5. System updates match requests badge count
  6. System plays notification sound (if enabled)
- **Alternative Flows**:
  - 2a. User offline: Notification queued; delivered when user next logs in and joins room
- **Postconditions**: User is aware of new match request in real-time

**UC4.2: Receive Match Accepted Notification**
- **Actor**: Authenticated User
- **Preconditions**:
  - User is logged in
  - User has sent a match request that is pending
  - User's browser has active Socket.io connection
- **Main Flow**:
  1. Recipient accepts user's match request (triggers UC3.3)
  2. Backend emits "match-accepted" event to sender's Socket.io room
  3. Frontend Socket.io client receives event
  4. System displays congratulatory notification with recipient's name
  5. System updates connections count
  6. System plays success sound (if enabled)
- **Alternative Flows**:
  - None
- **Postconditions**: User is aware their request was accepted in real-time

**UC4.3: Join Notification Room**
- **Actor**: Authenticated User
- **Preconditions**: User has successfully logged in
- **Main Flow**:
  1. Frontend establishes Socket.io connection to backend
  2. Frontend emits "join" event with user's ID
  3. Backend joins user's socket to room named "user_{userId}"
  4. Backend logs join event
  5. System is ready to receive notifications for this user
- **Alternative Flows**:
  - 1a. Connection fails: System retries connection with exponential backoff
- **Postconditions**: User is subscribed to their personal notification channel

### 4.5 Search and Filter

**Description**: This feature provides users with flexible ways to discover study partners beyond algorithmic suggestions, including text search and multi-criteria filtering with pagination.

**Priority**: Medium (Enhances usability but not critical for MVP)

**Functional Requirements**:
- FR4.1 - FR4.8 (Search and Filter requirements from Section 3.1)

**Use Cases**:

**UC5.1: Search Users by Name or Email**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in
- **Main Flow**:
  1. User navigates to "Find Study Buddies" or "Search" page
  2. User enters search query in search box (name or email)
  3. User clicks "Search" or presses Enter
  4. System performs case-insensitive search on firstName, lastName, and email fields
  5. System filters out inactive users
  6. System limits results to 20 matches
  7. System displays results with basic user info (name, university, degree, year)
- **Alternative Flows**:
  - 2a. Empty query: System displays "Please enter a search term" error
  - 4a. No results: System displays "No users found matching '[query]'" message
- **Postconditions**: User sees list of up to 20 users matching search query

**UC5.2: Filter Users by Criteria**
- **Actor**: Authenticated User
- **Preconditions**: User is logged in and on search/browse page
- **Main Flow**:
  1. User selects one or more filter criteria:
     - University (dropdown/autocomplete)
     - Year of Study (dropdown: 1-6)
     - Unit Code (text input)
     - Preferred Study Mode (dropdown)
     - Group Size Preference (dropdown)
  2. User clicks "Apply Filters" button
  3. System builds query object with selected criteria
  4. System queries database with filters
  5. System paginates results (10 per page by default)
  6. System returns results with pagination metadata (total count, total pages, current page)
  7. System displays filtered users with pagination controls
- **Alternative Flows**:
  - 4a. No users match filters: System displays "No users found with selected criteria" message
- **Postconditions**: User sees paginated list of users matching all selected filters

**UC5.3: Navigate Paginated Results**
- **Actor**: Authenticated User
- **Preconditions**: User has performed a search or applied filters with more than 10 results
- **Main Flow**:
  1. System displays first page of results (page 1, 10 items)
  2. System shows pagination controls with page numbers and next/previous buttons
  3. User clicks "Next" or specific page number
  4. System fetches results for requested page
  5. System displays new page of results
  6. System updates pagination controls to highlight current page
- **Alternative Flows**:
  - None
- **Postconditions**: User navigates through search results efficiently

**UC5.4: View User Detail from Search**
- **Actor**: Authenticated User
- **Preconditions**: User has search results displayed
- **Main Flow**:
  1. User clicks on a user card/profile in search results
  2. System fetches full profile for selected user
  3. System displays detailed profile modal or page with:
     - Full name, university, degree, year
     - Enrolled units
     - Academic interests
     - Study preferences
     - Availability (if shared)
     - Bio
     - "Send Match Request" button
  4. User can read full profile and decide to send match request
- **Alternative Flows**:
  - 2a. User not found or deactivated: System displays "User profile unavailable" error
- **Postconditions**: User can view complete profile and initiate match request from search

---

## Member Contributions to the SRS

**Note:** This section will be updated as team members contribute to different sections of the SRS throughout the project lifecycle.

### Initial Version (v1.0 - October 2, 2025)

**[Member 1 Name] - [Role]:**
- Drafted Introduction section (1.1-1.5)
- Defined system scope and boundaries
- Created definitions, acronyms, and abbreviations table

**[Member 2 Name] - [Role]:**
- Authored Overall Description section (2.1-2.5)
- Developed user personas
- Identified system constraints and dependencies

**[Member 3 Name] - [Role]:**
- Specified Functional Requirements (3.1)
- Detailed all FR1-FR6 requirements
- Ensured requirements are testable and unambiguous

**[Member 4 Name] - [Role]:**
- Defined Non-Functional Requirements (3.2)
- Specified Interface Requirements (3.3)
- Authored System Features section (4.1-4.5) with detailed use cases

**Team Collaborative Efforts:**
- All members participated in brainstorming sessions for feature prioritization
- All members reviewed and validated final SRS document for consistency and completeness
- All members contributed to user stories that informed the functional requirements

### Future Updates

As the project evolves through Sprint 1 and Sprint 2, team members will continue to refine and update this SRS document. Changes will be documented with version numbers, dates, and contributor names.

---

**Document End**

*Last Updated: October 2, 2025*
*Version: 1.0*
*Total Pages: [To be determined when exported to PDF]*
