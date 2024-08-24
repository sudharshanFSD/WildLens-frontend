// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useAuth } from './AuthContext'; // Import useAuth hook

const { Header } = Layout;

function Navbar() {
    const { isAuthenticated, isAdmin, logout } = useAuth(); // Destructure values from context

    return (
        <Header>
            <div className='logo' />
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                <Menu.Item key='1'><Link to='/home'>Home</Link></Menu.Item>
                <Menu.Item key='2'><Link to='/about'>About</Link></Menu.Item>
                <Menu.Item key='3'><Link to='/tours'>Tours</Link></Menu.Item>
                <Menu.Item key='4'><Link to='/my-bookings'>My Bookings</Link></Menu.Item>
                {isAdmin && <Menu.Item key='5'><Link to='/admin/packages'>Admin</Link></Menu.Item>}
                {isAuthenticated ? (
                    <Menu.Item key='6' style={{ marginLeft: 'auto' }} onClick={logout}>
                        Logout
                    </Menu.Item>
                ) : (
                    <>
                        <Menu.Item key='7' style={{ marginLeft: 'auto' }}><Link to='/login'>Login</Link></Menu.Item>
                        <Menu.Item key='8'><Link to='/register'>Register</Link></Menu.Item>
                    </>
                )}
            </Menu>
        </Header>
    );
}

export default Navbar;
