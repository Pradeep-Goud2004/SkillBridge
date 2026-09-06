# 🚀 SkillBridge

> A full-stack mentorship and career development platform that connects learners with experienced mentors and provides tools for mentorship, skill development, sessions, reviews, jobs, and applications.

## 🌐 Live Application

**Frontend:**  
https://skillbridge-frontend-production.up.railway.app

**Backend API:**  
https://skillbridge-backend-production-0b9c.up.railway.app

---

## 📌 Overview

SkillBridge is a Java Full Stack web application designed to connect learners with mentors based on their skills and career interests.

The platform provides separate experiences for:

- 👨‍🎓 Learners
- 👨‍🏫 Mentors
- 🛠️ Administrators

Learners can discover mentors, send mentorship requests, schedule and manage sessions, provide reviews, explore jobs, and track applications.

Mentors can manage their profiles and skills, respond to mentorship requests, conduct sessions, post jobs, review applications, and receive learner feedback.

Administrators can manage users, monitor jobs, manage skills, and oversee the platform.

---

## ✨ Key Features

### 👨‍🎓 Learner

- User registration and login
- JWT-based authentication
- Learner profile management
- Add and manage skills
- Search mentors by skill
- Send mentorship requests
- Track mentorship request status
- View mentorship sessions
- Cancel sessions
- Submit reviews and ratings
- View notifications
- Browse available jobs
- Apply for jobs
- Track job applications

### 👨‍🏫 Mentor

- Mentor registration and login
- Mentor profile management
- Add and manage professional skills
- Specify years of experience
- Search/manage mentorship requests
- Accept or reject mentorship requests
- Create mentorship sessions
- Complete or cancel sessions
- Post jobs
- Manage posted jobs
- Review job applications
- View learner reviews
- Receive notifications

### 🛡️ Administrator

- Admin authentication
- Admin dashboard
- View platform statistics
- View all users
- Manage users
- Manage skills
- View jobs
- Close jobs

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       Users         │
                         │      Browser        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │      + Vite         │
                         └──────────┬──────────┘
                                    │
                              REST API / JWT
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Spring Boot API    │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                              Spring Data JPA
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       MySQL         │
                         │      Database       │
                         └─────────────────────┘


🛠️ Technology Stack
Backend
Java 21
Spring Boot 4
Spring Web
Spring Data JPA
Spring Security
JWT Authentication
Hibernate
Maven
MySQL
Lombok
Bean Validation

Frontend

React
Vite
JavaScript
Axios
React Router

Database

MySQL

Deployment

Railway
GitHub

Development Tools

IntelliJ IDEA
Postman
Git
GitHub
MySQL

🔐 Authentication & Security

SkillBridge uses Spring Security with JWT-based authentication.

Authentication Flow
User
 │
 ▼
Login / Register
 │
 ▼
Spring Boot Authentication
 │
 ▼
JWT Token
 │
 ▼
Frontend stores token
 │
 ▼
Axios attaches Bearer Token
 │
 ▼
JWT Filter
 │
 ▼
Spring Security
 │
 ▼
Protected API

Roles

LEARNER
MENTOR
ADMIN

📂 Project Structure

SkillBridge/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── Skillbridge/
│   │       │           └── backend/
│   │       │               ├── config/
│   │       │               ├── controller/
│   │       │               ├── dto/
│   │       │               ├── entity/
│   │       │               ├── exception/
│   │       │               ├── mapper/
│   │       │               ├── repository/
│   │       │               ├── security/
│   │       │               └── service/
│   │       │
│   │       └── resources/
│   │           ├── application.properties
│   │           └── data.sql
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── learner/
│   │   │   ├── mentor/
│   │   │   └── admin/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   └── package.json
│
├── .gitignore
├── README.md
└── docker-compose.yml

🚀 Running the Project Locally
Prerequisites

Make sure you have:

Java 21
Maven
Node.js
MySQL
Git

Start the backend

cd backend
mvn spring-boot:run

Start the frontend

Open another terminal:

cd frontend
npm install
npm run dev

🌍 Deployment

SkillBridge is deployed using Railway.

Production Architecture

GitHub Repository
       │
       ├──────────────► Railway Frontend
       │
       └──────────────► Railway Backend
                              │
                              ▼
                       Railway MySQL

👨‍💻 Author

Pradeep Kumar

Java Full Stack Developer

⭐ Project Highlights

SkillBridge demonstrates practical experience in:

Full-stack application development
REST API design
Secure authentication
Role-based authorization
Database relationships
JPA/Hibernate
Frontend-backend integration
Exception handling
API testing
Git/GitHub workflow
Cloud deployment
Production configuration
