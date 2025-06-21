# 📊 ExpMan - Personal Expenses Manager

![Next.js](https://img.shields.io/badge/Next.js-13-blue?logo=next.js)
![PostgreSQL](https://img.shields.io/badge/Database-Neon%20PostgreSQL-blue)
![Clerk](https://img.shields.io/badge/Auth-Clerk-orange)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

**Exp-Man** is a web-based personal finance management tool designed to help users track and manage their income, expenses, budgets, and debts efficiently. Built with a modern tech stack, it includes features for both users and admin to monitor financial data with insightful visualizations.

![image alt]()

---

## 🚀 Features

### 👤 User Side
- 📥 Add & track **income** and **expenses**
- 📌 Set and monitor **budgets**
- 💰 Manage and view **debt tracking**
- 📊 Interactive **financial dashboards**
- 📄 Downloadable reports *(coming soon)*

---

## 🛠 Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| **Frontend** | Next.js 13, React, ShadCN UI |
| **Backend**  | API Routes (Next.js)         |
| **Database** | Neon PostgreSQL (Serverless) |
| **Auth**     | Clerk                        |
| **Hosting**  | Vercel                       |

---

🧪 Testing

For now, manual testing is supported:

Sign up as a user

Add income/expense entries

Create a budget and add debt

Log in as admin (with proper Clerk role)

View reports, stats, and users

---

📂 Folder Structure

/expman

  ├── app/                # Next.js app directory
  
  ├── components/         # UI and logic components
  
  ├── lib/                # Clerk, DB, and utility functions
  
  ├── db/                 # Database config/schema
  
  ├── public/             # Static assets
  
  └── ...

---

  🤝 Contributing
  
Contributions are welcome!

Fork the repo

Create your branch: git checkout -b feature/awesome-feature

Commit your changes: git commit -m "feat: add new feature"

Push to the branch: git push origin feature/awesome-feature

Open a Pull Request

---

🧑‍💻 Developer

Rahul Pal

🎓 B.Sc. Computer Science | MERN & Data Enthusiast

🔗 GitHub: @rahulpalcodes

📧 Email: rahulpal2142005@gmail.com (replace with your actual email)

---

📄 License

This project is licensed under the MIT License

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/expman.git
cd expman

2. Install Dependencies
npm install


3. Set Up Environment Variables
Create a .env.local file and add:

DATABASE_URL=your_neon_database_url
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

4. Start Development Server
npm run dev
