# HRMS Lite - Full Stack Assignment

A lightweight Human Resource Management System built with React, FastAPI, and PostgreSQL.

## 🚀 Live Demo

- **Frontend:** https://hrms-lite-kartikey.vercel.app/
- **Backend API:** https://hrms-lite-qzdg.onrender.com/docs

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Shadcn/UI, TanStack Query, React Hook Form.
- **Backend:** FastAPI, Python, SQLAlchemy, Pydantic.
- **Database:** PostgreSQL (Hosted on Render).

## ✨ Features

- **Employee Management:** Add, View, Delete employees.
- **Attendance Tracking:** Mark Present/Absent for specific dates.
- **Dashboard:** Real-time overview of total employees and daily attendance stats.
- **Validation:** robust form validation on both frontend (Zod) and backend (Pydantic).

## ⚙️ How to Run Locally

### Backend

1. Navigate to `hrms-backend`
2. Create virtual env: `python -m venv venv` & activate it.
3. Install dependencies: `pip install -r requirements.txt`
4. Run server: `uvicorn app.main:app --reload`
5. API will be at: `http://localhost:8000`

### Frontend

1. Navigate to `hrms-lite-frontend`
2. Install dependencies: `npm install`
3. Create `.env` file and add: `VITE_API_URL=http://localhost:8000`
4. Run app: `npm run dev`

## 📋 API Endpoints

- `GET /employees` - List all employees
- `POST /employees` - Create new employee
- `POST /attendance` - Mark attendance
- `GET /attendance` - View history
