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
import auth from './utils/auth'; // Assuming this contains the authentication logic

const { Content } = Layout;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(auth.isAdmin());

    const handleLogin = (token, role) => {
        auth.login(token, role); // Implement login logic in auth.js
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
    };

    const handleLogout = () => {
        auth.logout(); // Implement logout logic in auth.js
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    useEffect(() => {
        // Update state based on local storage or other methods
        setIsAuthenticated(auth.isAuthenticated());
        setIsAdmin(auth.isAdmin());
    }, []);

    return (
        <Router>
            <Layout style={{ width: '100%', position: 'absolute', top: '0' }}>
                <Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
