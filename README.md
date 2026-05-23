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
