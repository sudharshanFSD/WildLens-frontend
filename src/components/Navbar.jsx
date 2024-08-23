import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

function Navbar({ isAdmin }) { // Accept isAdmin as a prop
    const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.reload(); // Reload to reflect changes
    };

    return (
        <Header>
            <div className='logo' />
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
                <Menu.Item key='1'><Link to='/home'>Home</Link></Menu.Item>
                <Menu.Item key='2'><Link to='/about'>About</Link></Menu.Item>
                <Menu.Item key='3'><Link to='/tours'>Tours</Link></Menu.Item>
                <Menu.Item key='4'><Link to='/my-bookings'>My Bookings</Link></Menu.Item>
                {isAdmin && <Menu.Item key='5'><Link to='/admin/packages'>Admin</Link></Menu.Item>} {/* Admin link */}
                {isLoggedIn ? (
                    <Menu.Item key='6' style={{ marginLeft: 'auto' }} onClick={handleLogout}>
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
