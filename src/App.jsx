import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import QRGenerator from './pages/QRGenerator'
import QRHistory from './pages/QRHistory'
import Analytics from './pages/Analytics'
import LandingPage from './pages/LandingPage'

import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Pricing from './pages/Pricing'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/generator" element={<DashboardLayout><QRGenerator /></DashboardLayout>} />
            <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
            <Route path="/history" element={<DashboardLayout><QRHistory /></DashboardLayout>} />
            <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
            <Route path="/pricing" element={<DashboardLayout><Pricing /></DashboardLayout>} />
            <Route path="/payment-success" element={<DashboardLayout><PaymentSuccess /></DashboardLayout>} />
            <Route path="/payment-cancel" element={<DashboardLayout><PaymentCancel /></DashboardLayout>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
