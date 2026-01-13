# Prescripto - Medical Appointment Booking System

A comprehensive full-stack medical appointment booking system with separate interfaces for patients, doctors, and administrators. Built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [API Routes](#api-routes)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## 🎯 Project Overview

Prescripto is a medical appointment booking system that allows:
- **Patients** to browse doctors, book appointments, manage their profile, and make payments
- **Doctors** to manage appointments, update availability, and view their dashboard
- **Administrators** to manage doctors, view all appointments, and oversee the system

The system consists of three main applications:
1. **Frontend** - Patient-facing React application
2. **Admin Panel** - Admin and Doctor dashboard (React application)
3. **Backend** - RESTful API server (Node.js/Express)

## ✨ Features

### Patient Features
- User registration and authentication
- Browse doctors by specialty
- View doctor profiles and details
- Book appointments with time slot selection
- Manage appointments (view, cancel)
- Profile management with image upload
- Payment integration (Razorpay)
- Dark mode support

### Doctor Features
- Doctor authentication
- View and manage appointments
- Mark appointments as complete/cancelled
- Update profile information
- View dashboard with statistics
- Manage availability status

### Admin Features
- Admin authentication
- Add new doctors to the system
- View all doctors and manage their availability
- View all appointments across the system
- Cancel appointments
- Dashboard with system statistics

## 🛠 Technology Stack

### Frontend (Patient Portal)
- **React** 19.1.1
- **React Router DOM** 7.9.4
- **Vite** 7.1.6
- **Tailwind CSS** 4.1.14
- **Axios** 1.12.2
- **React Toastify** 11.0.5

### Admin Panel
- **React** 19.1.1
- **React Router DOM** 7.9.4
- **Vite** 7.1.7
- **Tailwind CSS** 4.1.14
- **Axios** 1.12.2
- **React Toastify** 11.0.5

### Backend
- **Node.js** (ES Modules)
- **Express** 5.1.0
- **MongoDB** with **Mongoose** 8.19.1
- **JWT** (JSON Web Tokens) 9.0.2
- **Bcrypt** 6.0.0 (Password hashing)
- **Multer** 2.0.2 (File uploads)
- **Cloudinary** 2.7.0 (Image storage)
- **Razorpay** 2.9.6 (Payment gateway)
- **CORS** 2.8.5
- **Cookie Parser** 1.4.7
- **Validator** 13.15.15

## 📁 Project Structure

```
BOOKING SYSTEM with new ui-production phase/
│
├── admin/                          # Admin & Doctor Panel (React App)
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar.jsx         # Navigation bar component
│   │   │   └── SideBar.jsx        # Sidebar navigation component
│   │   ├── Context/
│   │   │   ├── AdminContext.jsx   # Admin state management
│   │   │   ├── AppContext.jsx     # General app context
│   │   │   └── DoctorContext.jsx  # Doctor state management
│   │   ├── Pages/
│   │   │   ├── Admin/
│   │   │   │   ├── AddDoctor.jsx      # Add new doctor form
│   │   │   │   ├── Allapointments.jsx # View all appointments
│   │   │   │   ├── Dashboard.jsx       # Admin dashboard
│   │   │   │   └── DoctorsList.jsx    # List all doctors
│   │   │   ├── Doctor/
│   │   │   │   ├── DoctorAppointments.jsx # Doctor's appointments
│   │   │   │   ├── DoctorDashboard.jsx     # Doctor dashboard
│   │   │   │   └── DoctorProfile.jsx       # Doctor profile page
│   │   │   └── Login.jsx          # Login page (Admin/Doctor)
│   │   ├── assets/                # Icons and images
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── frontend/                       # Patient Portal (React App)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Banner.jsx         # Homepage banner
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   ├── Header.jsx         # Header component
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── RealtedDocters.jsx # Related doctors component
│   │   │   ├── SpecialityMenu.jsx # Specialty filter menu
│   │   │   └── TopDoctors.jsx     # Top doctors display
│   │   ├── Context/
│   │   │   ├── AppContext.jsx     # Application context
│   │   │   └── ThemeContext.jsx    # Theme (dark/light) context
│   │   ├── pages/
│   │   │   ├── About.jsx          # About page
│   │   │   ├── Appointments.jsx   # Appointment booking page
│   │   │   ├── Contact.jsx        # Contact page
│   │   │   ├── Doctor.jsx         # Doctor listing page
│   │   │   ├── Home.jsx           # Homepage
│   │   │   ├── Login.jsx          # User login/register
│   │   │   ├── MyAppointment.jsx  # User's appointments
│   │   │   └── MyProfile.jsx      # User profile page
│   │   ├── assets/                # Images and icons
│   │   ├── App.jsx                # Main app component
│   │   └── main.jsx               # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                        # Backend API Server
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary configuration
│   │   └── mongodb.js             # MongoDB connection
│   ├── controllers/
│   │   ├── adminContollers.js    # Admin business logic
│   │   ├── DoctorsControllers.js  # Doctor business logic
│   │   └── userControler.js      # User business logic
│   ├── middlewares/
│   │   ├── Authadmin.js          # Admin authentication middleware
│   │   ├── authDoctor.js         # Doctor authentication middleware
│   │   ├── authUser.js           # User authentication middleware
│   │   └── Multer.js             # File upload middleware
│   ├── models/
│   │   ├── AppointModel.js       # Appointment schema
│   │   ├── doctorModel.js        # Doctor schema
│   │   └── userModel.js          # User schema
│   ├── Routes/
│   │   ├── adminRoutes.js        # Admin API routes
│   │   ├── doctorsRooutes.js     # Doctor API routes
│   │   └── userRoutes.js         # User API routes
│   ├── assets/                    # Shared assets
│   ├── server.js                  # Express server entry point
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md            # Deployment instructions
└── readme.md                      # This file
```

## 🗄 Database Models

### User Model (`userModel.js`)
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  image: String (default: base64 avatar),
  address: Object { line1, line2 },
  gender: String (required, default: 'Not Selected'),
  dob: String (required, default: 'Not Selected'),
  phone: String (required, default: '0000000000')
}
```

### Doctor Model (`doctorModel.js`)
```javascript
{
  name: String (required),
  email: String (required),
  password: String (required, hashed),
  image: String (required),
  speciality: String (required),
  degree: String (required),
  experience: String (required),
  about: String (required),
  available: Boolean (required, default: true),
  fees: Number (required),
  address: String (required),
  date: Number (required),
  slots_booked: Object (default: {})
}
```

### Appointment Model (`AppointModel.js`)
```javascript
{
  userId: String (required),
  docId: String (required),
  slotDate: String (required),
  slotTime: String (required),
  userData: Object (required),
  docData: Object (required),
  amount: Number (required),
  date: Number (required),
  cancelled: Boolean (default: false),
  payment: Boolean (default: false),
  isCompleted: Boolean (default: false)
}
```

## 🛣 API Routes

### User Routes (`/api/user`)
- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /getProfile` - Get user profile (protected)
- `POST /updateProfile` - Update user profile with image (protected)
- `POST /bookAppointment` - Book an appointment (protected)
- `GET /listAppointments` - List user's appointments (protected)
- `POST /cancelAppointment` - Cancel an appointment (protected)
- `POST /paymentRazorpay` - Initiate Razorpay payment (protected)
- `POST /verifyRazorpay` - Verify Razorpay payment (protected)

### Doctor Routes (`/api/doctor`)
- `GET /list` - List all doctors (public)
- `POST /login` - Doctor login
- `GET /appointments` - Get doctor's appointments (protected)
- `POST /complete-appointment` - Mark appointment as complete (protected)
- `POST /cancel-appointment` - Cancel appointment (protected)
- `POST /dashboard` - Get doctor dashboard data (protected)
- `GET /profile` - Get doctor profile (protected)
- `POST /update-profile` - Update doctor profile (protected)

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /add-doctor` - Add new doctor with image (protected)
- `POST /all-doctors` - Get all doctors list (protected)
- `POST /change-availability` - Change doctor availability (protected)
- `POST /appointments` - Get all appointments (protected)
- `POST /cancel-appointment` - Cancel any appointment (protected)
- `GET /dashboard` - Get admin dashboard statistics (protected)

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image storage)
- Razorpay account (for payments)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd "BOOKING SYSTEM with new ui-production phase"
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Install Admin Panel Dependencies
```bash
cd ../admin
npm install
```

### Step 5: Configure Environment Variables
Create a `.env` file in the `backend` directory with the following variables (see Environment Variables section below).

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=4000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/prescripto
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/prescripto

# JWT Secrets
JWT_SECRET_USER=your_user_jwt_secret_key
JWT_SECRET_DOCTOR=your_doctor_jwt_secret_key
JWT_SECRET_ADMIN=your_admin_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## ▶ Running the Application

### Development Mode

1. **Start Backend Server**
   ```bash
   cd backend
   npm run server  # Uses nodemon for auto-reload
   # OR
   npm start       # Standard node
   ```
   Backend will run on `http://localhost:4000`

2. **Start Frontend (Patient Portal)**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` (or next available port)

3. **Start Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```
   Admin panel will run on `http://localhost:5174` (or next available port)

### Production Build

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Build Admin Panel**
   ```bash
   cd admin
   npm run build
   ```

3. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

## 🔒 Authentication

The system uses JWT (JSON Web Tokens) for authentication:
- **User tokens** - Stored in cookies for patient portal
- **Doctor tokens** - Stored in context for admin panel
- **Admin tokens** - Stored in context for admin panel

All protected routes require valid JWT tokens passed via:
- Cookies (for user routes)
- Authorization headers (for admin/doctor routes)

## 📦 Key Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `multer` - File upload handling
- `cloudinary` - Image storage service
- `razorpay` - Payment gateway
- `cors` - Cross-origin resource sharing
- `cookie-parser` - Cookie parsing middleware

### Frontend & Admin
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-toastify` - Toast notifications
- `tailwindcss` - CSS framework

## 🎨 Features Highlights

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode** - Theme switching support in patient portal
- **Image Upload** - Profile pictures and doctor images via Cloudinary
- **Payment Integration** - Razorpay payment gateway
- **Real-time Updates** - Appointment status updates
- **Role-based Access** - Separate authentication for users, doctors, and admins
- **Slot Management** - Time slot booking system
- **Dashboard Analytics** - Statistics for admins and doctors

## 📝 Notes

- The backend uses ES Modules (`"type": "module"` in package.json)
- All three applications run independently and communicate via REST API
- CORS is enabled for cross-origin requests
- File uploads are handled via Multer and stored in Cloudinary
- Passwords are hashed using bcrypt before storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License

---

**Note**: Make sure to configure all environment variables before running the application. Refer to `DEPLOYMENT_GUIDE.md` for production deployment instructions.
