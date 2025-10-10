import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Messages from './pages/Messages';
import Layout from './components/Layout';
import SetPassword from './pages/SetPassword';


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
                    <Route path="/login" element={<Login />} />
                    <Route path="/set-password" element={
                        <PrivateRoute>
                            <SetPassword />
                        </PrivateRoute>
                    } />
                    <Route
                        path="/*"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/products" element={<Products />} />
                                        <Route path="/messages" element={<Messages />} />
                                        
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