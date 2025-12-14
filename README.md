# 🧠 DevSpace Backend – Blog & Portfolio API

This repository contains the **backend API** for the **DevSpace** platform.  
It provides authentication, role-based authorization, and CRUD APIs for blogs, projects, and users.

---

---

## 📖 Project Overview

The DevSpace backend is built using **Node.js, Express, and TypeScript**, following a **clean and scalable architecture**.  
It handles user authentication, role-based access control, and secure data management using **PostgreSQL (Neon)** and **Prisma ORM**.

---

## ✨ Features

- 🔐 JWT-based authentication (access token via HttpOnly cookies)
- 🧑‍💼 Role-based access control (Admin, Editor, User)
- 📝 Blog management (Create, Update, Delete)
- 📁 Project management APIs
- 👤 User management
- 🍪 Secure cookie handling
- 🌐 CORS configuration for cross-domain frontend
- 📦 Prisma ORM with PostgreSQL
- 🧪 Centralized error handling
- ⚡ Optimized for serverless deployment (Vercel)

---

## 🛠️ Technology Stack

### Backend

- **Node.js**
- **Express.js**
- **TypeScript**

### Authentication

- **JWT**
- **bcrypt**
- **HttpOnly Cookies**

### Database

- **PostgreSQL (Neon)**
- **Prisma ORM**

### Tooling

- **ts-node-dev**
- **dotenv**
- **compression**
- **cors**

---

## 📦 Package Scripts

```bash
npm run dev       # Start development server
npm run build     # Build TypeScript
npm start         # Run production build
npm run postinstall # Generate Prisma client


git clone https://github.com/your-username/devspace-backend.git
cd devspace-backend

npm install

PORT=5000
NODE_ENV=development

DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret

FRONTEND_URL=https://raju-portfolio-five.vercel.app
```

npx prisma generate
npx prisma migrate deploy
npx prisma studio
npm run dev
