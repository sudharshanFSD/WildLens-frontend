import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from '../../public/images/login.png';

const { Title } = Typography;

function Login({ onLogin }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        setLoading(true);
        axios.post('https://wildlens-backend-8aul.onrender.com/apiAuth/login', values)
            .then(response => {
                onLogin(response.data.token, response.data.role);
                message.success('Login successful');
                navigate('/home');
            })
            .catch(error => {
                console.error('Login failed:', error.response ? error.response.data : error.message);
                message.error('Login failed. Please check your credentials and try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 10px' // Added padding to prevent horizontal overflow
        }}>
            <Row justify="center" style={{ width: '100%' }}>
                <Col xs={24} sm={22} md={18} lg={16} xl={12}>
                    <Card
                        style={{
                            width: '100%',
                            maxWidth: '800px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            borderRadius: '8px',
                            padding: '20px',
                            margin: '0 auto',
                            marginTop:'-130px' 
                        }}
                    >
                        <Row gutter={16} align="middle">
                            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                <img
                                    src={login}
                                    alt="Login"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px'
                                    }}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <Title level={2}>Login</Title>
                                </div>
                                <Form name='login' onFinish={onFinish} layout='vertical'>
                                    <Form.Item
                                        name='email'
                                        rules={[
                                            { required: true, message: 'Please input your email!' },
                                            { type: 'email', message: 'Please enter a valid email!' }
                                        ]}
                                    >
                                        <Input placeholder='Email' />
                                    </Form.Item>
                                    <Form.Item
                                        name='password'
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password placeholder='Password' />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' htmlType='submit' loading={loading} block>
                                            Log in
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
 