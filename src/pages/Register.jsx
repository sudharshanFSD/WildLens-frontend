import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import register from '../../public/images/register.png'; 

const { Title } = Typography;

function Register() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Initialize navigate

    const onFinish = (values) => {
        setLoading(true);
        axios.post('http://localhost:3000/apiAuth/register', values)
            .then(response => {
                message.success(response.data.message || 'Registration successful!');
                navigate('/login');  // Redirect to login page upon successful registration
            })
            .catch(error => {
                message.error(error.response?.data?.message || 'Registration failed. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Row justify="center">
                <Col>
                    <Card
                        style={{
                            width: '60vw',
                            maxWidth: '800px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            borderRadius: '8px',
                            padding: '20px',
                            marginTop:'-170px'
                        }}
                    >
                        <Row gutter={16} align="middle">
                            <Col span={10}>
                                <img
                                    src={register}
                                    alt="Register"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '8px'
                                    }}
                                />
                            </Col>
                            <Col span={14}>
                                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <Title level={2}>Register</Title>
                                </div>
                                <Form name='register' onFinish={onFinish} layout='vertical'>
                                    <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                                        <Input placeholder='Username' />
                                    </Form.Item>
                                    <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                                        <Input placeholder='Email' />
                                    </Form.Item>
                                    <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                                        <Input.Password placeholder='Password' />
                                    </Form.Item>
                                    <Row gutter={8}>
                                        <Col span={8}>
                                            <Form.Item name='countryCode' rules={[{ required: true, message: 'Please input your country code!' }]}>
                                                <Input placeholder='Code' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={16}>
                                            <Form.Item name='phoneNumber' rules={[{ required: true, message: 'Please input your phone number!' }]}>
                                                <Input placeholder='Phone Number' />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    {/* Hidden role field */}
                                    <Form.Item name="role" initialValue="user" style={{ display: 'none' }}>
                                        <Input type="hidden" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='primary' htmlType='submit' loading={loading} block>
                                            Register
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

export default Register;
