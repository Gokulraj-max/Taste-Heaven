# 🍽️ Taste Heaven  

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=mongodb" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Backend-Express.js-black?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=25&duration=4000&color=F23A2E&center=true&vCenter=true&width=600&lines=🍴+Welcome+to+Taste+Heaven!;🚀+A+Modern+Restaurant+Web+App+with+MERN+Stack;🔥+Order+Food+%7C+Book+Services+%7C+Track+Orders" alt="Typing Animation" />
</p>

---

## 📖 About the Project  
**Taste Heaven** is a full-featured **Restaurant Management Web App** built with the **MERN stack** (MongoDB, Express, React, Node.js) and styled with **TailwindCSS**.  

It allows users to:  
✅ Order Food Online 🍔  
✅ Book Services (Birthday, Catering, Family Dining, Wedding) 🎉  
✅ Track Orders & Deliveries 📦  
✅ Manage Profiles & Notifications 👤  
✅ Pay via Cash or Online 💳  

Admins can manage orders, users, services, and offers with a dedicated dashboard 📊.  

---

## 📂 Project Structure  

```
FINAL_PROJECT/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env  (must be created manually)
│
│── frontend/
│   ├── public/
│   ├── src/
│   ├── .env  (must be created manually)
│   ├── package.json
│   └── ...
│
│── .env  (must be created manually at root)
│── package.json
│── tailwind.config.js
```

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/Gokulraj-max/Taste-Heaven.git
cd TasteHeaven
```

### 2️⃣ Install Dependencies  

#### Backend  
```sh
cd backend
npm install
```

#### Frontend  
```sh
cd frontend
npm install
```

---

## 🗝️ Environment Variables  

⚠️ `.env` files are **not included** in GitHub. You must create them manually.  

### `/backend/.env`  
```env
MONGO_URI=mongodb://127.0.0.1:27017/mern_auth
JWT_SECRET=YOUR-SECRET-KEY
REACT_APP_BACKEND_URL=http://localhost:5000
```

### `/frontend/.env`  
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### `/.env` (Root)  
```env
MONGO_URI=mongodb://127.0.0.1:27017/mern_auth
JWT_SECRET=your_jwt_secret
```

---

## 🚀 Run the Project  

### Start Backend (Port: 5000)  
```sh
cd backend
npm start
```

### Start Frontend (Port: 3000)  
```sh
cd frontend
npm start
```

Now visit:  
👉 Frontend: [http://localhost:3000](http://localhost:3000)  
👉 Backend API: [http://localhost:5000](http://localhost:5000)  

---

## 🎯 Features  

- 🍔 **Food Ordering** – Browse menu, apply offers, and checkout  
- 🎉 **Service Booking** – Reserve for Birthday, Catering, Family Dining, Wedding  
- 📦 **Order Tracking** – Live status updates & Google Maps integration  
- 👤 **Profile Management** – Edit user info & notifications  
- 💳 **Payment Gateway** – Cash or Online (Stripe Integration)  
- 📊 **Admin Dashboard** – Manage foods, users, orders, services & offers  

---

## 🛠️ Tech Stack  

- **Frontend**: React, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Payments**: Stripe API  
- **Deployment**: (to be added – e.g., Vercel, Render, Heroku, Netlify)  

---

## 🤝 Contributing  

1. Fork the repo 🍴  
2. Create your feature branch (`git checkout -b feature-xyz`)  
3. Commit changes (`git commit -m "Add new feature"`)  
4. Push to branch (`git push origin feature-xyz`)  
5. Open a Pull Request 🚀  

---

## 📜 License  

This project is licensed under the **MIT License**.  

---

<p align="center">🔥 Built with ❤️ by <b>Taste Heaven Team</b> 🔥</p>
