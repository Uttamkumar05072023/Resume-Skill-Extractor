# Resume Skill Extractor

A tool built as part of the GUVI Hackathon Full Stack Development challenge.

## Problem Description

Create a tool where users can upload their resumes and receive an instant extraction of the key skills present in their document.

## Features

- React frontend for uploading resumes (PDF/text)
- Python backend to extract text and identify skills
- Results page showing extracted skills in tags

## ✨ Live Demo

Check out the live application here: [Demo](https://resume-skill-extractor.netlify.app/)

## 🚀 Tech Stack

### Frontend
- React 18+ with Vite
- Tailwind CSS for styling
- Netlify for deployment

### Backend
- Python 3.x
- FastAPI
- Railway for deployment

## 📋 Prerequisites

### Common Requirements
- Git
- Make (GNU Make)
  - Windows: Install via [Chocolatey](https://chocolatey.org/install) or [Scoop](https://scoop.sh/)
  - macOS: Install via `xcode-select --install` or `brew install make`
  - Linux: Install via package manager (e.g., `sudo apt-get install make`)

### For Frontend Development
- Node.js (v22.13.1)
  - Windows: Download from [Node.js website](https://nodejs.org/)
  - macOS: Install via `brew install node@22` or use [nvm](https://github.com/nvm-sh/nvm)
  - Linux: Install via package manager or use [nvm](https://github.com/nvm-sh/nvm)
- npm or yarn package manager

### For Backend Development
- Python 3.x
  - Windows: Download from [Python website](https://www.python.org/downloads/)
  - macOS: Install via `brew install python@3.11` or download from Python website
  - Linux: Install via package manager (e.g., `sudo apt-get install python3.11`)
- pip (Python package manager)
- Virtual environment (recommended)

## 🛠️ Getting Started

### Environment Variables

Both frontend and backend use environment variables for configuration. Create the following `.env` files:

#### Backend (.env)
Create `backend/.env`:
```env
APP_NAME=Resume-Skill-Extractor
API_VERSION=v1
```

#### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Using Make (Recommended):
```bash
make run-local
```
This command will:
- Check Node.js version
- Install dependencies
- Start the development server
- Open the browser automatically

If you encounter issues with `make run-local`, you can run the commands manually:
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Using Make (Recommended):
```bash
make run-local
```
This command will:
- Check Python installation
- Set up virtual environment
- Install dependencies
- Start the FastAPI server
- Open the API documentation in browser

If you encounter issues with `make run-local`, you can run the commands manually:
```bash
# 1. Create virtual environment
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the server
uvicorn app.main:app --reload --port 3001
```

The backend will be available at `http://localhost:3001`
API documentation will be available at `http://localhost:3001/docs`

## 🚀 Deployment

### Frontend Deployment (Netlify)
Using Make (Recommended):
```bash
cd frontend
make deploy
```
This command will:
- Check Node.js version
- Install dependencies
- Build the project
- Guide you through Netlify deployment

If you encounter issues with `make deploy`, you can deploy manually:
```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

### Backend Deployment (Railway)
Using Make (Recommended):
```bash
cd backend
make deploy
```
This command will:
- Check Railway CLI installation
- Verify authentication
- Guide you through Railway deployment

If you encounter issues with `make deploy`, you can deploy manually:
```bash
# 1. Install Railway CLI
npm install @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize project
railway init

# 4. Deploy
railway up
```

## ⚠️ IMPORTANT: Production Environment Setup

> **CRITICAL STEP**: After deploying your backend to Railway, you MUST create a `.env.production` file in your frontend directory with the production backend URL before building and deploying the frontend.

1. Deploy your backend to Railway first
2. Get your backend URL from Railway (it will look like `https://your-app-name.railway.app`)
3. Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-app-name.railway.app
```
4. Only then proceed with frontend deployment

If you skip this step, your frontend will not be able to connect to your backend in production!


## 📚 Learning Resources

### Frontend
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

### Backend
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python Documentation](https://docs.python.org/3/)
- [Railway Documentation](https://docs.railway.app)

## 🏗️ Project Structure

```
react-python-fsd-v1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   ├── .env
│   ├── Makefile
│   └── package.json
└── backend/
    ├── app/
    │   ├── routes/
    │   ├── models/
    │   └── main.py
    ├── .env
    ├── Makefile
    └── requirements.txt
```

## 🔧 Available Make Commands

### Frontend
- `make run-local` - Start development server
- `make deploy` - Deploy to Netlify

### Backend
- `make run-local` - Start development server
- `make deploy` - Deploy to Railway
