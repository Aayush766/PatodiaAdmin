// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Messages from './pages/Messages';
import Layout from './components/Layout';
import SetPassword from './pages/SetPassword';
import SetupAdmin from './pages/SetupAdmin';
import ForgotPassword from './pages/ForgotPassword';
import AboutSettings from './pages/AboutSettings'; // <- NEW

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/setup" element={<SetupAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Set password (protected) */}
          <Route
            path="/set-password"
            element={
              <PrivateRoute>
                <SetPassword />
              </PrivateRoute>
            }
          />

          {/* Protected app routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/about-section" element={<AboutSettings />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
