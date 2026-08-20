# 🎟️ EventHub — Full-Stack Event Management System

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk" alt="Java 17"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/Spring%20Security-JWT-green?style=for-the-badge&logo=springsecurity" alt="Spring Security"/>
  <img src="https://img.shields.io/badge/Angular-19-red?style=for-the-badge&logo=angular" alt="Angular"/>
  <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Maven-Build-orange?style=for-the-badge&logo=apachemaven" alt="Maven"/>
</p>

<p align="center">
  <strong>A complete full-stack event management platform built using Spring Boot, Angular, PostgreSQL and JWT authentication.</strong>
</p>

<p align="center">
  EventHub provides secure authentication, role-based access, event management,
  event registration, user management and administrative dashboards through a
  modern REST-based architecture.
</p>

---

# 📌 Table of Contents

* [About the Project](#-about-the-project)
* [Problem Statement](#-problem-statement)
* [Project Objectives](#-project-objectives)
* [Key Features](#-key-features)
* [User Roles](#-user-roles)
* [Technology Stack](#-technology-stack)
* [System Architecture](#-system-architecture)
* [Application Workflow](#-application-workflow)
* [Project Structure](#-project-structure)
* [Backend Architecture](#-backend-architecture)
* [Frontend Architecture](#-frontend-architecture)
* [Authentication and Security](#-authentication-and-security)
* [Database Design](#-database-design)
* [REST API](#-rest-api)
* [Installation](#-installation)
* [Backend Configuration](#-backend-configuration)
* [Frontend Configuration](#-frontend-configuration)
* [Running the Application](#-running-the-application)
* [Testing](#-testing)
* [Error Handling](#-error-handling)
* [Project Highlights](#-project-highlights)
* [Future Enhancements](#-future-enhancements)
* [Screenshots](#-screenshots)
* [Learning Outcomes](#-learning-outcomes)
* [Developer](#-developer)
* [License](#-license)

---

# 🎯 About the Project

**EventHub** is a full-stack web-based event management system designed to provide a centralized platform for managing events and event registrations.

The system allows users to discover available events, view event information, register for events and manage their registrations. Administrators have additional privileges to manage users, events and registrations through dedicated administrative functionality.

The project follows a **client-server architecture**:

```text
Angular Frontend
       │
       │ HTTP / REST APIs
       ▼
Spring Boot Backend
       │
       │ JPA / Hibernate
       ▼
PostgreSQL Database
```

Authentication and authorization are implemented using **Spring Security and JWT (JSON Web Tokens)**.

The Angular application communicates with the Spring Boot backend through REST APIs, while PostgreSQL provides persistent storage for users, events, categories and registrations.

---

# ❗ Problem Statement

Traditional event management systems can involve manual registration, disconnected event information and inefficient management of participants.

EventHub aims to solve these problems by providing a centralized digital platform where:

* Users can discover events.
* Users can register for events online.
* Users can view their registrations.
* Administrators can manage events.
* Administrators can manage users.
* Administrators can monitor registrations.
* Authentication is handled securely.
* Application access is controlled based on user roles.

---

# 🎯 Project Objectives

The primary objectives of EventHub are:

1. Build a centralized event management platform.
2. Provide secure user authentication.
3. Implement role-based authorization.
4. Allow administrators to create and manage events.
5. Allow users to browse available events.
6. Allow users to register for events.
7. Provide users with a personal registration history.
8. Provide administrators with management dashboards.
9. Store application data securely in PostgreSQL.
10. Build a scalable REST API backend.
11. Create a responsive and modular Angular frontend.
12. Maintain a clean separation between frontend, backend and database layers.

---

# 🚀 Key Features

## 🔐 Authentication

EventHub provides a complete authentication system.

### User Registration

Users can create an account by providing the required registration information.

### User Login

Registered users can authenticate using their credentials.

### JWT Authentication

After successful authentication, the backend generates a JWT token.

The token is then used to authenticate protected API requests.

### Secure API Access

Protected endpoints require a valid authentication token.

---

# 👨‍💼 Admin Features

Administrators have access to additional functionality.

### Admin Dashboard

The admin dashboard provides an overview of the application.

It can include information such as:

* Total users
* Total events
* Total registrations
* Event-related statistics
* Registration-related information

### User Management

Administrators can:

* View users
* Manage user information
* Monitor registered users
* Access user-related information

### Event Management

Administrators can:

* Create events
* Edit events
* Delete events
* View events
* Manage event information

### Registration Management

Administrators can:

* View registrations
* Monitor event participation
* Review registration information

---

# 👨‍🎓 Student/User Features

Normal users can access the user-facing event functionality.

### User Dashboard

Users receive a personalized dashboard after login.

### Browse Events

Users can view available events.

### Event Details

Users can view information about an event before registering.

### Event Registration

Users can register for available events.

### My Registrations

Users can view the events they have registered for.

### Authentication Guards

Protected Angular routes prevent unauthenticated users from accessing restricted pages.

---

# 📅 Event Management

Each event can contain information such as:

* Event title
* Event description
* Event date
* Event location
* Category
* Capacity
* Registration information

The system provides CRUD functionality:

```text
Create
Read
Update
Delete
```

---

# 🛠️ Technology Stack

## Backend

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| Java              | Main backend programming language |
| Spring Boot       | Backend application framework     |
| Spring Web        | REST API development              |
| Spring Data JPA   | Database access                   |
| Hibernate         | ORM                               |
| Spring Security   | Authentication and authorization  |
| JWT               | Token-based authentication        |
| Maven             | Dependency and build management   |
| PostgreSQL Driver | PostgreSQL connectivity           |

---

## Frontend

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| Angular          | Frontend framework            |
| TypeScript       | Frontend programming language |
| HTML5            | Page structure                |
| CSS3             | Styling                       |
| Angular Router   | Client-side navigation        |
| Angular Services | API communication             |
| Angular Guards   | Route protection              |

---

## Database

| Technology    | Purpose                      |
| ------------- | ---------------------------- |
| PostgreSQL    | Relational database          |
| JPA/Hibernate | ORM and persistence          |
| pgAdmin       | Optional database management |

---

## Development Tools

* Git
* GitHub
* Visual Studio Code
* IntelliJ IDEA
* Postman
* PostgreSQL
* pgAdmin
* Maven
* Node.js
* Angular CLI

---

# 🏗️ System Architecture

EventHub follows a layered full-stack architecture.

```text
                    ┌─────────────────────────┐
                    │       User Browser      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Angular Frontend    │
                    │                         │
                    │  Components             │
                    │  Services               │
                    │  Guards                 │
                    │  Routing                │
                    └────────────┬────────────┘
                                 │
                           REST / HTTP
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Spring Boot API      │
                    │                         │
                    │ Controllers             │
                    │ Services                │
                    │ Repositories            │
                    │ Security                │
                    └────────────┬────────────┘
                                 │
                           JPA / Hibernate
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      PostgreSQL         │
                    │        Database         │
                    └─────────────────────────┘
```

---

# 🔄 Application Workflow

## User Login Flow

```text
User
 │
 ▼
Login Page
 │
 ▼
Enter Credentials
 │
 ▼
Angular Authentication Service
 │
 ▼
POST /api/auth/login
 │
 ▼
Spring Boot
 │
 ▼
Validate Credentials
 │
 ▼
Generate JWT
 │
 ▼
Return Authentication Response
 │
 ▼
Angular Stores Authentication Information
 │
 ▼
User Dashboard
```

---

# 🔐 Protected API Workflow

```text
Angular
   │
   │ JWT Token
   ▼
Spring Security Filter
   │
   ▼
Validate Token
   │
   ├── Invalid → 401 Unauthorized
   │
   └── Valid
         │
         ▼
     Controller
         │
         ▼
      Service
         │
         ▼
    Repository
         │
         ▼
    PostgreSQL
```

---

# 📂 Project Structure

```text
EventHub/
│
├── demo/
│   │
│   ├── pom.xml
│   │
│   └── src/
│       └── main/
│           │
│           ├── java/
│           │   └── com/
│           │       └── example/
│           │           └── demo/
│           │               │
│           │               ├── controller/
│           │               │   ├── AuthController.java
│           │               │   ├── CategoryController.java
│           │               │   ├── DashboardController.java
│           │               │   ├── EventController.java
│           │               │   ├── RegistrationController.java
│           │               │   └── UserController.java
│           │               │
│           │               ├── entity/
│           │               │
│           │               ├── repository/
│           │               │
│           │               ├── security/
│           │               │   │
│           │               │   ├── config/
│           │               │   │
│           │               │   ├── jwt/
│           │               │   │
│           │               │   └── service/
│           │               │
│           │               └── service/
│           │
│           └── resources/
│
├── frontend/
│   │
│   └── eventhub-frontend/
│       │
│       ├── src/
│       │   │
│       │   └── app/
│       │       │
│       │       ├── core/
│       │       │   ├── guards/
│       │       │   │   ├── admin.guard.ts
│       │       │   │   └── auth.guard.ts
│       │       │   │
│       │       │   └── services/
│       │       │       ├── auth.ts
│       │       │       ├── registration.ts
│       │       │       └── users.ts
│       │       │
│       │       ├── features/
│       │       │   │
│       │       │   ├── auth/
│       │       │   │   └── login/
│       │       │   │
│       │       │   ├── dashboard/
│       │       │   │
│       │       │   ├── events/
│       │       │   │   ├── add-event/
│       │       │   │   ├── edit-event/
│       │       │   │   ├── events/
│       │       │   │   ├── my-registrations/
│       │       │   │   └── register-event/
│       │       │   │
│       │       │   └── admin/
│       │       │       ├── registrations/
│       │       │       └── users/
│       │       │
│       │       └── shared/
│       │           └── components/
│       │               └── navbar/
│       │
│       ├── angular.json
│       ├── package.json
│       └── tsconfig.json
│
├── .gitattributes
└── README.md
```

---

# ☕ Backend Architecture

The Spring Boot backend follows a layered architecture.

## Controller Layer

Controllers expose REST API endpoints.

Examples include:

```text
AuthController
CategoryController
DashboardController
EventController
RegistrationController
UserController
```

The controller layer receives HTTP requests and returns appropriate responses.

---

## Service Layer

The service layer contains the application's business logic.

It separates business operations from the HTTP/API layer.

Examples include:

```text
RegistrationService
RegistrationServiceImpl
UserService
UserServiceImpl
```

---

## Repository Layer

The repository layer handles communication with the database using Spring Data JPA.

The repository layer provides database operations without requiring raw SQL for every operation.

---

## Entity Layer

Entities represent database tables and application domain objects.

The entities are mapped using JPA/Hibernate.

---

# 🔒 Authentication & Security

Security is implemented using:

```text
Spring Security
+
JWT
+
Role-Based Authorization
```

## JWT Authentication

JWT provides stateless authentication between the Angular frontend and Spring Boot backend.

The general process is:

```text
Login
  ↓
Credentials Validation
  ↓
JWT Generation
  ↓
Token Returned
  ↓
Frontend Stores Authentication Data
  ↓
Token Sent With Requests
  ↓
JWT Validation
  ↓
Protected Resource
```

---

# 🛡️ Role-Based Authorization

EventHub separates access based on user roles.

```text
ADMIN
  │
  ├── User Management
  ├── Event Management
  ├── Registration Management
  └── Admin Dashboard


USER / STUDENT
  │
  ├── Browse Events
  ├── View Event Details
  ├── Register for Events
  └── View My Registrations
```

This prevents normal users from accessing administrative functionality.

---

# 🌐 Frontend Architecture

The Angular application is organized into reusable and feature-based sections.

## Core

The `core` section contains application-wide functionality.

```text
core/
├── guards/
└── services/
```

### Guards

Guards protect frontend routes.

```text
auth.guard.ts
admin.guard.ts
```

### Services

Services communicate with backend APIs.

```text
auth.ts
registration.ts
users.ts
```

---

# 🧩 Feature Modules

The application separates functionality into features.

```text
features/
├── auth/
├── dashboard/
├── events/
└── admin/
```

This makes the frontend easier to maintain and extend.

---

# 🧭 Routing

Angular Router manages navigation between application pages.

Examples include:

```text
/login
/dashboard
/events
/events/add
/events/edit
/events/register
/my-registrations
/admin
```

Protected routes use Angular guards.

---

# 🗄️ Database Design

PostgreSQL is used as the primary relational database.

The application contains core entities related to:

```text
Users
Categories
Events
Registrations
```

Conceptually:

```text
User
 │
 ├──────────────┐
 │              │
 ▼              ▼
Events       Registrations
 │              │
 ▼              ▼
Category       Event
```

---

# 🔌 REST API

The Spring Boot application exposes RESTful endpoints.

## Authentication API

```http
POST /api/auth/register
POST /api/auth/login
```

---

## User API

```http
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

---

## Event API

```http
GET    /api/events
GET    /api/events/{id}
POST   /api/events
PUT    /api/events/{id}
DELETE /api/events/{id}
```

---

## Category API

```http
GET    /api/categories
POST   /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

---

## Registration API

```http
GET    /api/registrations
GET    /api/registrations/my
POST   /api/registrations
DELETE /api/registrations/{id}
```

> Exact endpoint paths should always be verified against the current controller mappings in the backend.

---

# ⚙️ Installation

## Prerequisites

Before running EventHub, install:

### Java

Java 17 or compatible version.

Verify:

```bash
java -version
```

---

### Maven

Verify:

```bash
mvn -version
```

---

### Node.js

Verify:

```bash
node -v
```

---

### npm

Verify:

```bash
npm -v
```

---

### Angular CLI

Install Angular CLI if required:

```bash
npm install -g @angular/cli
```

Verify:

```bash
ng version
```

---

### PostgreSQL

Install PostgreSQL and create a database for EventHub.

---

# 📥 Clone the Repository

```bash
git clone https://github.com/Laksh-a-d/EventHub_.git
```

Navigate into the project:

```bash
cd EventHub_
```

---

# ☕ Backend Setup

Navigate to:

```bash
cd demo
```

Install/build dependencies:

```bash
mvn clean install
```

Configure PostgreSQL in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/eventhub
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace the database username, password and database name according to your local PostgreSQL configuration.

---

# ▶️ Start Backend

Run:

```bash
mvn spring-boot:run
```

Or:

```bash
mvnw.cmd spring-boot:run
```

The backend will normally be available at:

```text
http://localhost:8080
```

---

# 🌐 Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend/eventhub-frontend
```

Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

Or:

```bash
npm start
```

The frontend will normally be available at:

```text
http://localhost:4200
```

---

# 🔗 Run Full Application

Start PostgreSQL first.

Then:

```text
PostgreSQL
     ↓
Spring Boot Backend
     ↓
Angular Frontend
```

### Backend

```text
http://localhost:8080
```

### Frontend

```text
http://localhost:4200
```

Open:

```text
http://localhost:4200
```

in your browser.

---

# 🧪 Testing

The backend REST APIs can be tested using tools such as:

* Postman
* Browser
* Angular frontend
* Swagger/OpenAPI if configured

A typical test flow is:

```text
1. Register user
       ↓
2. Login
       ↓
3. Receive JWT
       ↓
4. Access protected APIs
       ↓
5. Browse events
       ↓
6. Register for an event
       ↓
7. View My Registrations
```

---

# 🔄 Event Registration Flow

The registration process works conceptually as follows:

```text
User
 │
 ▼
Events Page
 │
 ▼
Select Event
 │
 ▼
Event Details
 │
 ▼
Register
 │
 ▼
Angular Registration Service
 │
 ▼
POST Registration API
 │
 ▼
Spring Boot
 │
 ▼
Registration Service
 │
 ▼
PostgreSQL
 │
 ▼
Registration Saved
 │
 ▼
My Registrations
```

---

# 👤 Automatic User Identification

The application uses authenticated user information instead of relying on manually entered user IDs for normal authenticated operations.

The JWT authentication context can be used to identify information such as:

```text
User ID
Role
Full Name
Email
```

This helps prevent users from registering or accessing information on behalf of another user.

---

# 🛡️ Error Handling

The backend can return appropriate HTTP status codes for different situations.

Examples:

```text
200 OK
201 CREATED
400 BAD REQUEST
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT FOUND
409 CONFLICT
500 INTERNAL SERVER ERROR
```

The frontend can then display suitable feedback to the user.

---

# 📊 Dashboard

EventHub provides dashboard functionality for monitoring application information.

Possible dashboard metrics include:

```text
Total Users
Total Events
Total Registrations
Upcoming Events
```

The dashboard communicates with backend APIs to obtain current information.

---

# 🎨 User Interface

The Angular frontend provides dedicated interfaces for:

### Authentication

```text
Login
Registration
```

### User

```text
Dashboard
Events
Event Details
Register Event
My Registrations
```

### Admin

```text
Admin Dashboard
Users
Registrations
Event Management
```

The frontend is organized using reusable Angular components and services.

---

# 🔐 Security Considerations

EventHub incorporates several security concepts:

* JWT authentication
* Spring Security
* Protected backend endpoints
* Role-based authorization
* Angular authentication guards
* Angular admin guards
* Authenticated API requests
* Server-side authorization

Sensitive configuration values such as database passwords and JWT secrets should **not be committed to GitHub**.

For production deployment, environment variables or secure configuration management should be used.

---

# 📈 Scalability

The layered architecture makes the project easier to extend.

For example, new modules can be added without heavily modifying existing functionality:

```text
EventHub
│
├── Event Management
├── Registration
├── User Management
├── Authentication
│
└── Future Modules
    ├── Notifications
    ├── Payments
    ├── Reviews
    ├── Analytics
    └── QR Check-in
```

---

# 🚀 Future Enhancements

The following features can be added in future versions.

## 📧 Email Notifications

Send confirmation emails when:

* User registers
* Event registration is successful
* Event details change
* Event is cancelled

---

## 🔔 Notifications

Add real-time or application notifications for:

* New events
* Registration confirmation
* Event reminders
* Administrative updates

---

## 📱 QR Code Check-In

Generate QR codes for registered users.

```text
Registration
     ↓
Generate QR
     ↓
User arrives at event
     ↓
Scan QR
     ↓
Verify Registration
     ↓
Mark Attendance
```

---

## 💳 Online Payments

Paid events could support online payment integration.

---

## ⭐ Event Reviews

Users could provide:

* Ratings
* Reviews
* Feedback

after attending an event.

---

## 📊 Advanced Analytics

Administrators could view:

* Registration trends
* Most popular events
* User activity
* Event attendance
* Monthly statistics

---

## 🐳 Docker

The application can be containerized using Docker.

Possible architecture:

```text
Docker
│
├── Angular Container
├── Spring Boot Container
└── PostgreSQL Container
```

---

## ☁️ Cloud Deployment

The project can be deployed to cloud platforms using services for:

* Frontend hosting
* Backend hosting
* PostgreSQL database
* Domain management
* HTTPS
* CI/CD

---

# 📸 Screenshots

Add screenshots of your actual application here.

Recommended screenshots:

```text
screenshots/
├── login.png
├── dashboard.png
├── events.png
├── add-event.png
├── edit-event.png
├── register-event.png
├── my-registrations.png
├── admin-users.png
└── admin-registrations.png
```

Then add them to the README:

```markdown
## Login

![Login](screenshots/login.png)

## Dashboard

![Dashboard](screenshots/dashboard.png)

## Events

![Events](screenshots/events.png)

## My Registrations

![My Registrations](screenshots/my-registrations.png)

## Admin Panel

![Admin Panel](screenshots/admin-users.png)
```

---

# 💡 Project Highlights

### Full-Stack Development

The project demonstrates complete application development across:

```text
Frontend
   ↓
REST API
   ↓
Backend
   ↓
Database
```

### Secure Authentication

JWT and Spring Security provide protected application access.

### Role-Based Access

Different permissions are provided to administrators and normal users.

### RESTful Architecture

The frontend and backend communicate using REST APIs.

### Database Integration

PostgreSQL provides persistent storage.

### Modular Frontend

Angular features are separated into core, feature and shared sections.

### Layered Backend

Spring Boot separates:

```text
Controller
Service
Repository
Entity
Security
```

---

# 📚 Learning Outcomes

This project provides practical experience in:

* Java programming
* Spring Boot development
* REST API development
* Spring Security
* JWT authentication
* Role-based authorization
* JPA/Hibernate
* PostgreSQL
* Angular
* TypeScript
* Angular routing
* Angular guards
* API integration
* CRUD operations
* Git and GitHub
* Full-stack application architecture
* Client-server communication
* Database design
* Authentication workflows

---

# 🧑‍💻 Developer

## Ritesh Nayase

Full-Stack Developer

### Technical Skills

```text
Java
Spring Boot
Spring Security
JWT
REST APIs
JPA / Hibernate
PostgreSQL
Angular
TypeScript
HTML5
CSS3
Git
GitHub
Maven
Postman
```

---

# 🔗 Repository

GitHub:

https://github.com/Laksh-a-d/EventHub_

---

# 📄 License

This project is developed for educational, learning and portfolio purposes.

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  <strong>EventHub</strong>
</p>

<p align="center">
  Full-Stack Event Management System
</p>

<p align="center">
  Built with ❤️ using Java, Spring Boot, Angular and PostgreSQL
</p>
