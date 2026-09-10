# 🤖 AI Resume Analyzer

An AI-powered resume analysis platform built using the **MERN Stack** and **Google Gemini AI**. The application helps users analyze their resumes, identify skills, discover skill gaps, receive AI-powered recommendations, and understand how well their resume matches potential job opportunities.

---

## 🚀 Features

### 📄 Resume Upload

* Upload resumes in **PDF/DOCX** format
* Resume text extraction
* File validation
* Secure resume processing

### 🤖 AI Resume Analysis

Powered by **Google Gemini AI** to analyze resume content and generate structured results.

The system provides:

* Overall Resume Score
* Resume Strengths
* Skills Detected
* Missing / Recommended Skills
* Resume Improvement Suggestions
* Career Recommendations
* Job Matching Insights

### 🧠 Skill Detection

Automatically identifies technical and professional skills from the uploaded resume.

Examples:

* JavaScript
* React
* Node.js
* MongoDB
* Python
* Java
* SQL
* HTML
* CSS

### 📊 Skill Gap Analysis

Compares the user's existing skills with skills required for potential career opportunities and highlights areas that can be improved.

### 💼 Job Matching

Analyzes the user's resume skills and provides job-match insights based on relevant skills and requirements.

### ✨ AI Recommendations

Provides personalized suggestions to improve:

* Resume content
* Technical skills
* Career readiness
* Missing skills
* Resume quality

### 📈 Dashboard

The dashboard provides an overview of:

* Resume score
* Skills
* Skill gaps
* Recent analyses
* Resume statistics

### 🗂️ Analysis History

Users can access previous resume analyses.

Available actions include:

* View previous analysis
* Check previous score
* Review recommendations
* Delete analysis

### 🔐 Authentication

The application includes user authentication functionality:

* User Registration
* User Login
* Logout
* Protected Routes
* Authentication Middleware

### 📱 Responsive UI

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile
* Small-screen devices

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router
* Axios
* HTML5
* CSS3
* Responsive CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* PDF.js
* Mammoth

## Artificial Intelligence

* Google Gemini AI
* `@google/genai`

## Database

* MongoDB
* MongoDB Atlas for production deployment

## Deployment

* GitHub
* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

---

# 📂 Project Structure

```text
ai-resume-analyzer/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── Resume.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── Services/
│   │   └── aiService.js
│   │
│   ├── uploads/
│   │
│   ├── Server.js
│   ├── package.json
│   └── package-lock.json
│
├── resume-ai/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── Components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── Pages/
│   │   │   ├── Analysis.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── UploadResume.jsx
│   │   │
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Abhaypatel001/ai-resume-analyzer.git
```

Go inside the project:

```bash
cd ai-resume-analyzer
```

---

# 🔹 Frontend Setup

Open a terminal:

```bash
cd resume-ai
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on the Vite development server.

---

# 🔹 Backend Setup

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node Server.js
```

For development with Nodemon:

```bash
npx nodemon Server.js
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

```text
backend/
└── .env
```

Add your environment variables:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Never upload `.env` to GitHub.

The `.gitignore` file is configured to prevent environment variables from being committed.

---

# 🧠 Gemini AI Integration

The project uses Google Gemini AI to analyze extracted resume text.

The general flow is:

```text
Resume Upload
      ↓
File Validation
      ↓
PDF / DOCX Text Extraction
      ↓
Extracted Resume Text
      ↓
Gemini AI
      ↓
Structured JSON Analysis
      ↓
MongoDB
      ↓
Frontend Dashboard
```

Gemini generates structured analysis that can be displayed on the analysis page.

---

# 📄 Resume Processing Flow

```text
User
  │
  │ Upload Resume
  ↓
Frontend
  │
  │ POST Request
  ↓
Express Backend
  │
  ├── Multer
  │
  ├── PDF.js / Mammoth
  │
  ↓
Resume Text
  │
  ↓
Gemini AI
  │
  ↓
Resume Analysis
  │
  ↓
MongoDB
  │
  ↓
Frontend
  │
  ↓
Analysis Dashboard
```

---

# 🔐 Authentication Flow

```text
Register
   ↓
User Account
   ↓
Login
   ↓
JWT Token
   ↓
Protected Routes
   ↓
Dashboard
   ↓
Resume Upload
   ↓
AI Analysis
```

Authentication is handled using JWT-based authentication and middleware-protected routes.

---

# 📊 Application Pages

## 🏠 Home

Landing page introducing the AI Resume Analyzer.

Includes:

* AI-powered resume analysis
* Resume score preview
* Features
* How it works
* Call-to-action

---

## 🔑 Login

Allows registered users to securely log in.

---

## 📝 Register

Allows new users to create an account.

---

## 📊 Dashboard

Displays the user's resume analysis overview and statistics.

---

## 📤 Upload Resume

Allows users to upload their resume and start an AI analysis.

Supported formats:

```text
PDF
DOCX
```

---

## 🧠 Analysis

Displays the AI-generated resume analysis.

Possible analysis sections include:

* Overall Score
* Skills
* Skill Gaps
* Recommendations
* Job Matches

---

## ✨ Features

Explains the major capabilities of the platform.

---

## ⚙️ How It Works

Explains the resume analysis process step-by-step.

---

# 🌐 API Architecture

The backend follows a basic REST API architecture.

```text
Frontend
   ↓
Axios
   ↓
Express Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
```

---

# 📌 Main Backend Modules

### Controllers

Responsible for handling application logic and HTTP requests.

```text
authController.js
resumeController.js
userController.js
```

### Routes

Defines backend API endpoints.

```text
authRoutes.js
resumeRoutes.js
userRoutes.js
```

### Models

MongoDB data models:

```text
User.js
Resume.js
```

### Middleware

Handles:

* Authentication
* File upload

```text
authMiddleware.js
upload.js
```

### AI Service

Handles communication with Gemini AI:

```text
Services/aiService.js
```

---

# 🔒 Security

The project follows several security practices:

* JWT-based authentication
* Environment variables for secrets
* API keys excluded from Git
* Protected API routes
* File upload validation
* MongoDB authentication
* `.gitignore` configuration

---

# 📱 Responsive Design

The UI includes responsive layouts for different screen sizes.

Supported layout ranges include:

```text
320px+
400px+
576px+
768px+
1024px+
1200px+
```

The application adapts:

* Navigation
* Hero section
* Cards
* Forms
* Dashboard
* Resume upload
* Analysis results
* Authentication pages

for different screen sizes.

---

# 🚀 Production Deployment

The recommended production architecture is:

```text
                 GitHub
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
       Vercel               Render
          │                   │
          │              Node + Express
          │                   │
          │          ┌────────┴────────┐
          │          ↓                 ↓
          │    MongoDB Atlas      Gemini AI
          │
          ↓
     React Frontend
```

### Frontend

Deploy the `resume-ai` folder using Vercel.

### Backend

Deploy the `backend` folder using Render.

### Database

Use MongoDB Atlas for the production database.

### Environment Variables

Production secrets should be configured through the hosting platform's environment-variable settings.

---

# 🧪 Testing

Before production deployment, test:

* User registration
* User login
* Logout
* Protected routes
* Resume upload
* PDF extraction
* DOCX extraction
* Gemini analysis
* Resume score
* Skill detection
* Skill gaps
* Recommendations
* MongoDB save
* Analysis history
* Delete analysis
* Mobile responsiveness

---

# 🔮 Future Improvements

Possible future enhancements include:

* Advanced AI Resume Improvement
* Resume rewriting
* ATS optimization
* More advanced job matching
* Job search API integration
* Resume templates
* Downloadable resume reports
* Email notifications
* Career roadmap generation
* Multiple resume comparison
* Analytics and progress tracking

---

# 👨‍💻 Developer

**Abhay Patel**

AI Resume Analyzer — BCA Final Year Project

---

# 📜 License

This project is developed for educational and portfolio purposes.

---

## ⭐ Project Goal

The goal of AI Resume Analyzer is to help students and job seekers understand the quality of their resumes, identify missing skills, receive AI-powered recommendations, and improve their career readiness using modern web technologies and artificial intelligence.
