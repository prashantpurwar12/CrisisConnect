# CrisisConnect

A comprehensive crisis management and reporting platform that enables users to report emergencies, view crisis locations on an interactive map, and connect with help during critical situations.

## Features

- 🚨 **Emergency Reporting**: Submit detailed crisis reports with location data
- 🗺️ **Interactive Map**: Visualize crisis locations and severity in real-time
- 🔐 **Secure Authentication**: OTP-based email verification system
- 👤 **User Profiles**: Manage personal information and view report history
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🌐 **Geocoding**: Automatic address-to-coordinates conversion

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Maps**: Leaflet with React-Leaflet
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer
- **Geocoding**: OpenCage Geocoding API

## Project Structure

```
CrisisConnect/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory (pages and layouts)
│   ├── components/   # Reusable React components
│   ├── lib/          # Utility functions and configurations
│   └── public/       # Static assets
│
├── backend/          # Express.js backend API
│   ├── controllers/  # Request handlers
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   └── server.js     # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
OPENCAGE_API_KEY=your_opencage_api_key
```

#### Frontend (.env.local)
Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prashantpurwar12/CrisisConnect.git
   cd CrisisConnect
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables** (see above)

5. **Run the development servers**

   Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Frontend (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and login/signup
- `POST /api/auth/logout` - Logout user

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create new report
- `GET /api/reports/:id` - Get report by ID
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `DELETE /api/user/account` - Delete user account

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.
