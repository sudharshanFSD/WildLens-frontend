import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import PackageDetail from './pages/PackageDetail';
import PaymentPage from './pages/StripePaymentForm';
import UserBookings from './pages/UserBookings';
import BookingPage from './pages/BookingPage';
import Tours from './pages/Tours';
import AdminPackages from './pages/AdminPackage';
import auth from './utils/auth';

const { Content } = Layout;

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'admin');

    useEffect(() => {
        // Sync state with local storage on initial load
        setIsLoggedIn(!!localStorage.getItem('token'));
        setIsAdmin(localStorage.getItem('role') === 'admin');
    }, []);

    const handleLogin = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setIsLoggedIn(true);
        setIsAdmin(role === 'admin');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <Router>
            <Layout style={{ width: '100%', position: 'absolute', top: '0' }}>
                <Navbar isAdmin={isAdmin} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Content style={{ padding: '0 50px', marginTop: '64px' }}>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/tours" element={<Tours />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/packages/:packageId" element={<PackageDetail />} />
                        <Route path="/booking/:packageId" element={<BookingPage />} />
                        <Route path="/my-bookings" element={<UserBookings />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/admin/packages" element={isAdmin ? <AdminPackages /> : <Navigate to="/" />} />
                        <Route path="*" element={<Navigate to="/login" />} /> {/* Catch-all route */}
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
