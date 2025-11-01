# 💡 Tech Tips & Tricks

## 🚀 Live Site → https://tech-tips-frontend-six.vercel.app

**Tech Tips & Tricks** is a dynamic **full-stack web application** designed for tech enthusiasts who love learning, teaching, and sharing their technical knowledge.  
This platform offers expert insights, user-generated content, and real-world experiences covering everything from **software troubleshooting** to **AI tools, programming, gadgets, and digital productivity.**

---

## 🚀 Project Overview

Empowering users to **create, share, and explore tech tutorials, reviews, and tips** — with community interaction and premium content.  
Built with **Next.js 15, Redux, Node.js, and MongoDB** for performance, scalability, and modern UX.

---

## 🧭 Key Features

### 🧑‍💻 Authentication & Profiles
- Secure JWT-based login, registration, and logout
- **Two roles:** User & Admin
- Editable profiles (name, bio, image, etc.)
- Follow/Unfollow system with live updates
- Verified badges for premium users

---

### 📝 Post Management
- Create, edit, and delete posts with image uploads
- Categorization (AI, Web Dev, Software, etc.)
- Draft mode for posts
- Image preview and responsive content editor

---

### 💬 Social Interaction
- Upvote/downvote system
- Comment threads with edit & delete options
- Replies and real-time updates
- Share posts to social media directly

---

### 💸 Payments & Membership
- Integrated with **Aamarpay / Stripe**
- Premium membership for exclusive content
- Verified badge for paid users
- Admin dashboard for payment analytics

---

### 📈 Dashboards
- **User Dashboard:**
  - View post analytics (views, likes, comments)
  - Payment history and subscription status
- **Admin Dashboard:**
  - Revenue charts
  - Manage users and posts
  - Content moderation tools

---

### 🔍 Smart Feed & Search
- Infinite scroll newsfeed
- Debounced keyword search
- Filters by category, author, or premium
- Sort by most upvoted or trending

---

### 🎨 Design & UX
- Built with **HeroUI**, **TailwindCSS**, and **Framer Motion**
- Fully **responsive** across all devices
- **Dark/Light mode** with smooth transitions
- Modern animations and clean layouts

---

### 🔒 Security
- JWT auth with refresh tokens
- Encrypted password reset
- Admin activity logs
- Safe file uploads via Formidable

---

## 🧠 Bonus Highlights

| Feature | Description |
|----------|-------------|
| 📊 Analytics | Interactive charts using `recharts` & `react-chartjs-2` |
| 🔁 Sharing | Built-in post share system |
| 🕵️‍♂️ Logs | Admin user activity monitoring |

---

## ⚙️ Tech Stack

### Frontend
- **Next.js 15 (App Router + Turbopack)**
- **React + Redux Toolkit + Redux Persist**
- **TailwindCSS + HeroUI + Framer Motion**
- **React Hook Form + Zod Validation**
- **React Quill / TinyMCE** (Rich Text Editor)

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Stripe / Aamarpay Integration**
- **Cloud Storage** for uploads

### Utilities
- **Axios** for API & image upload  
- **SweetAlert2**, **Sonner** for alerts  
- **React Spinners** for loaders  
- **React Timeago**, **LightGallery**, **Photo View** for UX  

---

## 🖼️ Project Screenshots

### 🏠 Main Pages

<p align="center">
  <img src="public/newsfeed.png" alt="Newsfeed" width="700"/>
</p>

<p align="center">
  <img src="public/membership.png" alt="Membership" width="700"/>
</p>

<p align="center">
  <img src="public/profile.png" alt="Profile" width="700"/>
</p>

<p align="center">
  <img src="public/about page.png" alt="About Page" width="700"/>
</p>

<p align="center">
  <img src="public/contact us.png" alt="Contact Us" width="700"/>
</p>

---

### 🧑‍💻 User Dashboard

<p align="center">
  <img src="public/user dashboard.png" alt="User Dashboard" width="700"/>
</p>

<p align="center">
  <img src="public/user's followers and following.png" alt="Followers & Following" width="700"/>
</p>

<p align="center">
  <img src="public/user's membership.png" alt="User Membership" width="700"/>
</p>

<p align="center">
  <img src="public/payment history.png" alt="Payment History" width="700"/>
</p>

---

### 🛠️ Admin Dashboard

<p align="center">
  <img src="public/manage posts.png" alt="Manage Posts" width="700"/>
</p>

<p align="center">
  <img src="public/manage users.png" alt="Manage Users" width="700"/>
</p>

<p align="center">
  <img src="public/admins.png" alt="Admins List" width="700"/>
</p>

<p align="center">
  <img src="public/payment history (2).png" alt="Admin Payment History" width="700"/>
</p>

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/tanzimsiamm/tech-tips-frontend.git
cd tech-tips-frontend
