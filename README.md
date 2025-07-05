# 🚀 LINKHUB

A visually stunning, user-friendly, and secure link manager and professional dashboard. Built with React, TypeScript, Supabase, and Tailwind CSS, LINKHUB lets you organize, store, and access your most important links and resources—all in one place.

![LINKHUB Demo Banner](https://user-images.githubusercontent.com/your-demo-image.png)

---

## ✨ Features

- **Modern UI**: Beautiful, responsive design with smooth animations (Framer Motion)
- **Authentication**: Secure login/signup powered by Supabase Auth
- **User-Specific Data**: Each user sees only their own links (Supabase RLS)
- **Categories**: Coding, AI Tools, Resume, Courses, Others
- **Add/Edit/Delete Links**: Manage your links with ease
- **Search & Filter**: Quickly find links by title, URL, or description
- **Protected Routes**: Only authenticated users can access dashboard & categories
- **Mobile Ready**: Fully responsive for all devices

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth & DB**: Supabase
- **Routing**: React Router

---

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AkshithaReddy005/LINKHUB.git
cd LINKHUB
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Supabase
- Create a [Supabase](https://supabase.com/) project
- Set up a `links` table with RLS (Row Level Security) enabled
- Add the following environment variable:
  - `VITE_SUPABASE_KEY` in a `.env` file

### 4. Start the Development Server
```bash
npm run dev
```

---

## 📦 Build & Deploy
```bash
npm run build
```

---

## 🌐 Live Demo

> _Coming soon!_

---

## 🖼️ Screenshots

| Dashboard | Auth Modal | Add Link |
|-----------|------------|----------|
| ![Dashboard](https://user-images.githubusercontent.com/your-dashboard-image.png) | ![Auth Modal](https://user-images.githubusercontent.com/your-auth-modal-image.png) | ![Add Link](https://user-images.githubusercontent.com/your-add-link-image.png) |

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feat/YourFeature`)
5. Open a Pull Request

---

## 📄 License

MIT

---

## 📝 Git Commands to Push Your Code

If your code is not already in a git repo:
```bash
git init
git remote add origin https://github.com/AkshithaReddy005/LINKHUB.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

If you already have a git repo:
```bash
git add .
git commit -m "Update project"
git push origin main
```

---

**Made with ❤️ by Akshitha Reddy**
