# 💡 Tech Tips & Tricks

**Tech Tips & Tricks** is a dynamic **full-stack web application** designed for tech enthusiasts who love learning, teaching, and sharing their technical knowledge.  
This platform offers expert insights, user-generated content, and real-world tech experiences covering everything from **software troubleshooting** to **AI tools, programming, gadgets, and digital productivity.**

---

## 🚀 Project Overview

The platform empowers users to **create, share, and explore tech tutorials, reviews, and tips** — with a blend of community interaction and premium content.  
It includes features like **authentication, content management, payments, analytics dashboards, commenting, and social features** — all built with **Next.js 15, Redux, and MongoDB**.

---

## 🧭 Features at a Glance

### 🧑‍💻 User Authentication & Profile Management
- JWT-based secure **login, registration, and logout**
- **Two roles**: User & Admin
- Profile editing (name, bio, image, and other details)
- View followers, following, and own posts
- Verified badge for subscribed users

---

### 📝 Post Creation & Management
- Create posts 
- Upload and attach images or screenshots
- Categorize posts (e.g., “Web Development”, “AI”, “Software Engineering”)
- CRUD operations for posts (Create, Update, Delete)
- Draft mode (optional but recommended)

---

### 💬 Interactions
- **Upvote/Downvote** system for quality control
- **Comment system** with edit & delete options
- Replies to comments for threaded conversations
- Share posts directly to social media platforms

---

### 💸 Payment Integration
- Integrated with **Aamarpay / Stripe**
- premium subscription for exclusive access
- Payment triggers verified badge and unlocks premium content
- Admin dashboard shows monthly revenue analytics

---

### 📈 Analytics & Reporting
- Personalized **User Dashboard**:
  - My Posts analytics (views, comments, reactions, shares)
  - Payment status & history
- **Admin Dashboard**:
  - Monthly revenue graph
  - Total posts, active users, and premium subscriptions
  - User control (block/unblock, delete)
  - Post management and content moderation

---

### 🔍 Search, Filter & News Feed
- Infinite scroll feed displaying latest posts
- Search bar with **debounced** keyword search
- Filter posts by categories, author, or premium status
- Sort by most upvoted, trending, or recent posts

---

### 👥 Following System
- Follow other users and get updates on their latest content
- Personalized feed based on followed authors

---

### 🎨 User Interface & Experience
- Built with **HeroUI**, **TailwindCSS**, and **Framer Motion**
- Fully **responsive and accessible**
- **Dark/Light themes** with Next-Themes
- Micro-animations for smoother interactions
- Clean, modern, and consistent design system

---

### 🔒 Security Features
- JWT-based authentication and refresh tokens
- Password reset & change via secure endpoints
- Admin-level **activity logs** tracking logins, roles, and timestamps
- Secure file uploads via Formidable

---

## 🧠 Bonus Features

| Feature | Description |
|----------|-------------|
| 📊 Analytics | User & Admin dashboards with interactive charts (using `react-chartjs-2` & `recharts`) |
| 🔁 Share System | Social media sharing integration |
| 🕵️‍♂️ Activity Logs | Admins can monitor user activity

---

## ⚙️ Tech Stack

### **Frontend**
- **Next.js 15 (App Router + Turbopack)**
- **React**
- **Redux Toolkit + Redux Persist**
- **TailwindCSS + HeroUI + Framer Motion**
- **React Hook Form + Zod Validation**
- **React Quill / TinyMCE** for Rich Text Editing

### **Backend**
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Stripe / Aamarpay Payment Integration**
- **Cloud Storage** for user uploads

### **Utilities**
- **Axios** for uploadin image  
- **SweetAlert2 + Sonner** for toast notifications  
- **React Spinners** for loaders  
- **React Timeago**, **LightGallery**, **React Photo View** for UX

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/tanzimsiamm/tech-tips-frontend.git
cd tech-tips-frontend

2️⃣ Install Dependencies
npm install

