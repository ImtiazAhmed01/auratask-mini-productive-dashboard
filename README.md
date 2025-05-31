![AuraTasks Screenshot](https://i.ibb.co/4y4fgV6/Screenshot-92.png)
# Mini Productivity Dashboard

A simple, elegant web-based productivity dashboard that helps users manage daily tasks, set personal goals, and stay inspired with motivational quotes. Built using **React.js**, **TailwindCSS**, **Node.js**, **Express**, and **MongoDB**, this full-stack app includes user authentication, task/goal tracking, a motivational quote widget, and features like dark/light mode and drag-and-drop task reordering.



## 📑Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## ✨ Features

- 🧾 User registration & login with JWT Authentication
- ✅ Daily Task Management (Add/Edit/Delete/Mark Complete)
- 🎯 Weekly/Monthly Goal Tracking
- 💬 Daily Motivational Quotes from public APIs
- 🔁 Drag-and-drop task reordering
- 🌗 Dark/Light Mode toggle
- 🔒 Secure, token-based authentication
- 📦 Full RESTful API with MongoDB

---

## Live Link

 - Click [here](https://auratasks-fb8eb.web.app/login) to watch the website.

---

## 🛠️ Tech Stack

### 🔹 Frontend

- [React](https://reactjs.org/) ^19.1.0
- [Vite](https://vitejs.dev/) ^6.3.5
- [Tailwind CSS](https://tailwindcss.com/) ^4.1.7
- [DaisyUI](https://daisyui.com/) ^5.0.38
- [React Router DOM](https://reactrouter.com/) ^7.6.1
- [Framer Motion](https://www.framer.com/motion/) ^12.15.0
- [DnD Kit](https://dndkit.com/) for drag-and-drop
- [React Toastify](https://fkhadra.github.io/react-toastify/) for notifications
- [LocalForage](https://localforage.github.io/localForage/) for local storage
- [Axios](https://axios-http.com/) for HTTP requests

### 🔹 Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JSON Web Token (JWT)](https://jwt.io/)
- CORS, dotenv, bcrypt, and more

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mini-productivity-dashboard.git
cd mini-productivity-dashboard
````

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## ▶️ Usage

### Run the Frontend (Vite)

```bash
cd client
npm run dev
```

### Run the Backend (Express)

```bash
cd server
npm start
```

The frontend will typically run at `http://localhost:5173`
The backend will run at `http://localhost:5000`

---

## 🗂️ Project Structure

```
mini-productivity-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.jsx
│   └── public/
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── .env
└── README.md
```

---

## 🔌 API Endpoints

### 🧑 Auth Routes

* `POST /api/auth/register` – Register a new user
* `POST /api/auth/login` – Login and receive JWT
* `GET /api/auth/verify` – Verify JWT token

### 📝 Task Routes

* `GET /api/tasks` – Get all tasks
* `POST /api/tasks` – Add a new task
* `PUT /api/tasks/:id` – Update a task
* `DELETE /api/tasks/:id` – Delete a task

### 🎯 Goal Routes

* `GET /api/goals` – Get all goals
* `POST /api/goals` – Add a new goal
* `PUT /api/goals/:id` – Update a goal
* `DELETE /api/goals/:id` – Delete a goal

---

## ⚙️ Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

> 🛠 Be sure to never commit `.env` files publicly!

---

## 💡 Examples

* ✅ Add tasks like "Go to gym", "Read book"
* 🔄 Drag-and-drop to prioritize tasks
* 🌙 Toggle dark/light mode from UI
* 📆 Set a goal: “Finish project by Friday”
* 💬 Read daily quotes from [zenquotes.io](https://zenquotes.io/) or [quotable.io](https://github.com/lukePeavey/quotable)

---

## 🧰 Troubleshooting

| Issue                  | Solution                                           |
| ---------------------- | -------------------------------------------------- |
| MongoDB not connecting | Check `.env` file and your MongoDB Atlas URI       |
| CORS Errors            | Ensure backend allows the frontend origin via CORS |
| Token Expired          | Re-login or refresh your access token              |
| Animation overlapping  | Used z-indexing and relative positioning           |

---


