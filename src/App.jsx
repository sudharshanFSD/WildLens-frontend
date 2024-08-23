import React from 'react';
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
import auth from './utils/auth';
import Tours from './pages/Tours';
import AdminPackages from './pages/AdminPackage'; 

const { Content } = Layout;

const App = () => {
    const isAuthenticated = auth.isAuthenticated(); 
    const isAdmin = auth.isAdmin(); 

    return (
        <Router>
            <Layout style={{ width: '100%', position: 'absolute', top: '0' }}>
                <Navbar isAdmin={isAdmin} /> {/* Pass isAdmin to Navbar */}
                <Content style={{ padding: '0 50px', marginTop: '64px' }}>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/tours" element={<Tours />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/packages/:packageId" element={<PackageDetail />} />
                        <Route path="/booking/:packageId" element={<BookingPage />} />
                        <Route path="/my-bookings" element={<UserBookings/>}/>
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/admin/packages" element={isAdmin ? <AdminPackages /> : <Navigate to="/" />} /> {/* Protect admin route */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
