## 🏘️ Colony Management System
A full-stack web application built with the MERN Stack to digitize and automate the day-to-day management of residential colonies, housing societies, and apartment complexes.

--- 

## 📋 Table of Contents 
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Screenshots](#screenshots)

---
 
## 📖 About
 
Colony Management System (CMS) is a role-based web application that serves **four types of users**:
 
| Role | Description |
|------|-------------|
| 🌐 **Visitor** | Browse public pages (Home, About, Gallery, Contact) |
| 🛡️ **Admin** | Manage buildings, flats, residents, helpers, guards & complaints |
| 🏠 **Resident** | Pay rent, register visitors, add vehicles, submit complaints |
| 🔒 **Security Guard** | Mark visitor arrivals, assign parking slots |
 
---

## ✨ Features
 
### 🛡️ Admin Portal
- Manage Blocks, Buildings, and Flats (with full details)
- Manage Residents and assign flats
- Add/delete Helpers by type (Electrician, Plumber, etc.)
- Register and activate/deactivate Security Guards (PAN + Aadhaar validation)
- View all complaints, assign helpers, and close resolved complaints
- Change admin password
### 🏠 Resident Portal
- Dashboard with vehicle, complaint, and visitor counts
- Pay rent + deposit via **Razorpay** payment gateway
- View flat details and payment transaction history
- Pre-register visitors with date scheduling (Ant Design DatePicker)
- Add and manage vehicles (auto-fill from profile)
- Submit and track complaints with status updates
- Edit profile and change password
### 🔒 Guard Portal
- Live dashboard with today's visitor and vehicle counts
- Mark visitors as arrived
- View complete visitor history
- Assign parking slots with area prefix (Basement A/B/C, Ground, EV Zone)
- Change guard password
### 🌐 Public Interface
- Home, About, Gallery pages
- Contact Us form with colony helpdesk details
- Embedded Google Map
---
 
## 🛠️ Tech Stack
 
### Frontend
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=reactrouter)
![Ant Design](https://img.shields.io/badge/Ant_Design-5-0170FE?logo=antdesign)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4)
 
| Library | Purpose |
|---------|---------|
| React.js 18 | Component-based SPA UI |
| React Router DOM v6 | Client-side routing |
| React Hook Form | Form state & validation |
| Axios | REST API communication |
| Ant Design (antd) | Drawer, Button, DatePicker |
| Bootstrap 5 | Grid, tables, alerts, badges |
| Day.js | Date formatting (DD-MM-YYYY) |
| React Toastify | Toast notifications |
 
### Backend
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=nodedotjs)
![Express.js](https://img.shields.io/badge/Express.js-4-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb)
 
| Library | Purpose |
|---------|---------|
| Node.js + Express.js | REST API server (port 3000) |
| MongoDB + Mongoose | Database & ODM |
| JWT + Cookies | Secure session authentication |
| bcrypt.js | Password hashing |
| Razorpay | Payment gateway |
 
---

## 📁 Project Structure
 
```
colony-management-system/
│
├── React/                         # React frontend
│   ├── public/
│   │   └── assets/images/
│   └── src/
│       ├── layout/
│       │   ├── AdminLayout.jsx
│       │   ├── GuardLayout.jsx
│       │   ├── PublicLayout.jsx
│       │   ├── UserLayout.jsx
│       ├── pages/
│       │   ├── admin/              # Admin interface
│       │   │   ├── AdminLogin.jsx
│       │   │   ├── Dashboard.jsx
│       │   │   ├── ManageBuilding.jsx
│       │   │   ├── ManageFlats.jsx
│       │   │   ├── ManageResidents.jsx
│       │   │   ├── ManageHelper.jsx
│       │   │   ├── ManageComplaints.jsx
│       │   │   ├── SecurityGuard.jsx
│       │   │   └── ChangePassword.jsx
│       │   ├── users/              # Resident interface
│       │   │   ├── UserLogin.jsx
│       │   │   ├── UserDashboard.jsx
│       │   │   ├── UserProfile.jsx
│       │   │   ├── MyFlat.jsx
│       │   │   ├── AddVisitors.jsx
│       │   │   ├── AddVehicle.jsx
│       │   │   ├── Complaints.jsx
│       │   │   ├── Payment.jsx
│       │   │   └── UChangePassword.jsx
│       │   ├── security/           # Guard interface
│       │   │   ├── GuardLogin.jsx
│       │   │   ├── GuardDashboard.jsx
│       │   │   ├── GuardProfile.jsx
│       │   │   ├── ManageVisitors.jsx
│       │   │   ├── Vehicles.jsx
│       │   │   └── GChangePassword.jsx
│       │   └── public/             # Public pages
│       │       ├── Home.jsx
│       │       ├── About.jsx
│       │       ├── Gallery.jsx
│       │       ├── Contact.jsx
│       |       ├── LoginPage.jsx
│       |       └── PageNotFound.jsx
│       └── components/
│           ├── AssignFlats.jsx
│           ├── Footer.jsx
│           ├── FooterAdmin.jsx
│           ├── FooterGuard.jsx
│           ├── FooterUser.jsx
│           ├── Navbar.jsx
│           ├── NavbarAdmin.jsx
│           ├── NavbarGuard.jsx
│           ├── NavbarUser.jsx
│           └── EditFlats.jsx
│
└── NodeJS/
    ├── config/
    │   ├── connection.js
    │   ├── mongoose.js                    # Node.js backend
    ├── models/                     # Mongoose schemas
    │   ├── Admin.js
    │   ├── Block.js
    │   ├── Building.js
    │   ├── Complaint.js
    │   ├── Flat.js
    │   ├── Helper.js
    │   ├── Resident.js
    │   ├── Security.js
    │   ├── Vehicle.js
    │   ├── Visitor.js
    ├── controllers/
    │   ├── adminController.js                # /admin/* routes api
    │   ├── userController.js                 # /user/* routes api
    │   └── guardController.js                # /guard/* routes api
    ├── routes/
    │   ├── admin.js                # /admin/* routes
    │   ├── user.js                 # /user/* routes
    │   └── guard.js                # /guard/* routes
    ├── middleware/
    │   ├── adminAuth.js
    │   ├── guardAuth.js   
    │   └── userAuth.js                 # JWT cookie middleware
    └── .env 
    └── app.js                    # Express app entry point
```
 
---

 ## 🏁 Getting Started
 
### Prerequisites
 
- Node.js v18+
- MongoDB v6+ (local or [MongoDB Compass](https://www.mongodb.com/atlas))
- npm v9+
### Installation
 
1. **Clone the repository**
```bash
git clone https://github.com/your-username/colony-management-system.git
cd colony-management-system
```
 
2. **Install backend dependencies**
```bash
cd NodeJS
npm init -y
npm install express
npm i dotenv
npm i cors
npm i cookie-parser
npm i mongoose
npm i nodemailer
npm i nodemon -D
npm i jsonwebtoken
```
 
3. **Install frontend dependencies**
```bash
cd ../React
npm init vite
npm install
npm i react-router-hook
npm i react-router-dom
npm i axios
npm i antd
npm i toastify
```
 
4. **Set up environment variables** (see below)
5. **Run the backend server**
```bash
cd NodeJs
npm run dev
# Server runs on http://localhost:3000
```
 
6. **Run the frontend**
```bash
cd React
npm run dev
# App runs on http://localhost:5173
``` 
---
 
## 🔌 API Routes
 
### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/admin/login` | Admin login |
| `POST` | `/user/login` | Resident login |
| `POST` | `/guard/login` | Guard login |
 
### Admin Routes (`/admin/*`) — JWT protected
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET/POST` | `/admin/building` | Get / add buildings |
| `DELETE` | `/admin/building/:id` | Delete building |
| `GET/POST` | `/admin/flats` | Get / add flats |
| `DELETE` | `/admin/flats/:id` | Delete flat |
| `GET/POST` | `/admin/helper` | Get / add helpers |
| `DELETE` | `/admin/helper/:id` | Delete helper |
| `GET/POST` | `/admin/guards` | Get / add guards |
| `PUT/DELETE` | `/admin/guards/:id` | Toggle status / delete guard |
| `GET` | `/admin/complaint` | Get all complaints |
| `PUT` | `/admin/assign-helper` | Assign helper to complaint |
| `PUT` | `/admin/close-complaint/:id` | Close complaint |
| `PUT` | `/admin/change-password` | Change admin password |
 
### User Routes (`/user/*`) — JWT protected
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user/dashboard` | Resident dashboard stats |
| `GET/PUT` | `/user/profile/:id` | Get / update profile |
| `GET` | `/user/my-flat` | Get flat details |
| `GET/POST/DELETE` | `/user/visitor` | Manage visitors |
| `GET/POST/DELETE` | `/user/vehicle` | Manage vehicles |
| `GET/POST` | `/user/complaint` | Get / submit complaints |
| `GET` | `/user/payments` | Payment history |
| `PUT` | `/user/pay_status` | Update payment after Razorpay |
| `GET` | `/user/rent/:flat_id` | Get rent + deposit |
| `PUT` | `/user/change-password` | Change password |
 
### Guard Routes (`/guard/*`) — JWT protected
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/guard/stats` | Visitor + vehicle counts |
| `GET` | `/guard/today-visitor` | Today's visitors |
| `GET` | `/guard/visitor` | All visitor history |
| `PUT` | `/guard/visitor/:id` | Mark visitor as arrived |
| `GET` | `/guard/vehicle` | All vehicles |
| `PUT` | `/guard/assign-parking` | Assign parking slot |
| `PUT` | `/guard/change-password` | Change password |
 
---
 
## 🤝 Contributing
 
Contributions are welcome! Please follow these steps:
 
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request
---
 
## 📄 License
 
This project is licensed under the [MIT License](LICENSE).
 
---
 
## 👨‍💻 Author
 
**Gursimrat Kaur**
- GitHub: [Gursimrat Kaur](https://github.com/Gu-4/Mern-Colony_Management)
