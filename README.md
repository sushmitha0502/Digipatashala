
# DigiPatashala

DigiPatashala is a fullstack online learning platform built with React, Vite, Node.js, Express, and MongoDB.

## Repository Structure

- `.vscode/` — editor settings
- `backend/` — Node.js + Express server code
- `frontend/` — React + Vite frontend application
- `.env.example` — example environment variables
- `package.json` — project dependencies for the root workspace

## Features

- User authentication for students, teachers, and admin
- Course browsing, creation, and enrollment
- Document verification and approval workflows
- Payment integration using Razorpay
- Email notifications via SMTP
- Cloudinary uploads for images/videos
- Role-based dashboards for students and teachers

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Material Tailwind
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT tokens
- File uploads: Cloudinary
- Payment: Razorpay

## Available Commands

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend uses:
- `nodemon -r dotenv/config --experimental-json-modules src/index.js`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Available frontend commands:
- `npm run dev`
- `npm run build`
- `npm run preview`

## Environment Variables

Copy `.env.example` to `.env` and update the values.

Example variables:

```env
TEST=true
PORT=5002
DB_NAME=elearning_db
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/elearning_db
JWT_SECRET=secretkey
ACCESS_TOKEN_SECRET=secretkey
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=refreshsecretkey
REFRESH_TOKEN_EXPIRY=7d
CORS=*
SMTP_EMAIL=yourgmail@gmail.com
SMTP_PASS=your_app_password
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
KEY_ID=rzp_test_xxxxx
KEY_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

## Notes

- This repository currently includes separate `backend` and `frontend` folders.
- Make sure MongoDB Atlas or local MongoDB is available before starting the backend.
- Set correct frontend URL and CORS values in `.env` if you deploy the frontend and backend separately.


