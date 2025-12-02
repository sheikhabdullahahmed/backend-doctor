🩺 Doctor Management Backend

Backend for Doctor Management System using Node.js, Express, and MongoDB. Manages doctor registration, login, profiles, and appointments.

⚡ Features

Doctor registration & login

JWT-based authentication

Profile management

Appointment management

🚀 Setup

Clone repo:

git clone <repo_url>
cd doctor-backend

Install dependencies:

npm install

Run server:

npm run dev

📌 API Endpoints

Auth: /api/doctor/register, /api/doctor/login
Doctor (Protected): /api/doctor/profile, /api/doctor/appointments

Use Authorization: Bearer <token> for protected routes.

🗂️ Folder Structure
controllers/ | models/ | routes/ | middleware/ | config/ | server.js

🔮 Future Enhancements

Role-based access
