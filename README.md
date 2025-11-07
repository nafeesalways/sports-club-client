# 🏟️ Champion Sports Club Management System

Welcome to **Champion Sports Club** — a full-featured court and session booking platform that connects sports lovers to available courts, manages booking approvals, and handles user membership and payments through a streamlined dashboard system.

---

## 🔐 Credentials

### Admin Access
- **Email**: `tim@gmail.com`
- **Password**: `123456`  
> Use for testing admin features (manage users, courts, bookings, announcements)

### Member Access
- **Email**: `abc@x.com`
- **Password**: `123456`  
> Use for testing member features (book courts, view bookings, make payments)

---

## 🌐 Live Site

👉 [Champion Club Live Website](https://champion-club1.netlify.app/)

---

## 🚀 Features

### Public Features
- ✅ **Public Courts Page**: Browse all courts with slot options, pricing, and booking features
- 📚 **Blog Section**: Read development insights and platform updates
- 📢 **View Announcements**: Stay updated with club news and events
- 🏆 **About & Location**: Learn about the club and find our location

### Authentication
- 🔒 **Secure Sign-up/Sign-in**: Email/password or Google login
- 🛡️ **Role-Based Access**: Protected routes for user/admin/member access

### Admin Dashboard
- 👥 **User Management**: View and manage all registered users
- 🏀 **Court Management**: Add, edit, or delete courts with images and pricing
- 📋 **Booking Management**: Accept or reject pending booking requests
- 🎟️ **Coupon System**: Create and manage discount coupons
- 📢 **Announcements**: Post important updates for all members
- 📊 **Analytics**: View pie chart summaries of booking statuses

### Member Dashboard
- 👤 **Profile Management**: View and update personal information
- 📅 **Booking Status**: Track all bookings (pending, approved, confirmed)
- 💳 **Payment History**: View completed transactions and receipts
- 🎫 **Apply Coupons**: Use discount codes during checkout
- 📢 **Club Announcements**: Stay informed with latest updates

### Booking System
- 📆 **Multi-slot Booking**: Book one or more time slots per court
- 🕐 **Real-time Availability**: See available time slots instantly
- 💰 **Dynamic Pricing**: Automatic price calculation based on slots selected
- 💳 **Stripe Integration**: Secure payment processing with receipt generation

### Design & UI
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- 🎨 **Modern Design**: Built with **Tailwind CSS** and **Daisy UI**
- ✨ **Smooth Animations**: Enhanced with **Framer Motion**
- 🌙 **Dark Theme**: Professional dark mode throughout

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Daisy UI** - Component library
- **Framer Motion** - Animation library
- **React Query** - Data fetching and state management
- **Axios** - HTTP client

### Backend Integration
- **Node.js** & **Express.js** - Server
- **MongoDB** - Database
- **JWT** - Authentication

### Payment & Services
- **Stripe** - Payment processing
- **Firebase** - Google authentication
- **React DatePicker** - Date selection
- **React Leaflet** - Map integration

---

## 📸 Screenshots

![Champion Sports Club Preview](https://images.unsplash.com/photo-1760783320437-441649e0aa57?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNwb3J0JTIwY291cnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600)

---

## ⚙️ Project Setup Guide (Local Development)

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Stripe account for payment testing

### Installation

1. **Clone the repository**:
  ```bash
   git clone https://github.com/your-username/champion-sports-club.git
   cd champion-sports-club