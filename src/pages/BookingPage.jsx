import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Input, Button, message, Spin, Image, Card, Space, Row, Col, Modal } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const BookingPage = () => {
    const { packageId } = useParams();
    const navigate = useNavigate();
    const [packageDetail, setPackageDetail] = useState(null);
    const [numberOfPersons, setNumberOfPersons] = useState(1); // Default to 1
    const [bookingDate, setBookingDate] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getAuthToken = () => localStorage.getItem('token');

    useEffect(() => {
        const fetchPackageDetail = async () => {
            try {
                const token = getAuthToken();
                if (!token) {
                    message.error('No authentication token found');
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:3000/apiPackages/package/${packageId}`, { 
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setPackageDetail(response.data);
                
            } catch (error) {
                message.error('Failed to fetch package details');
            } finally {
                setLoading(false);
            }
        };

        fetchPackageDetail();
    }, [packageId, navigate]);

    const handleBooking = async () => {
        if (numberOfPersons <= 0) {
            message.error('Number of persons must be a positive number');
            return;
        }
        setIsModalVisible(true); // Show confirmation dialog
    };

    const confirmBooking = async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                message.error('No authentication token found');
                navigate('/login');
                return;
            }

            const response = await axios.post(`http://localhost:3000/apiBooking/package/${packageId}/book`, {
                numberOfPersons,
                bookingDate,
                additionalInfo
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        
            if (response.data.clientSecret) {
                navigate('/payment', { state: { clientSecret: response.data.clientSecret, stripePaymentId: response.data.stripePaymentId , bookingId: response.data.bookingId} });
            } else {
                message.error('Client secret is missing. Please try again.');
            }
        } catch (error) {
            message.error('Failed to book package: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsModalVisible(false); // Hide confirmation dialog
        }
    };

    if (loading) return <Spin tip="Loading..." />;

    if (!packageDetail) return <p>Package not found</p>;

    const totalPrice = packageDetail.price * numberOfPersons;

    return (
        <div style={{ padding: '50px', backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '900px' }} 
            >
                <Card
                    title={<Title level={3} style={{ margin: 0 }}>{packageDetail.title}</Title>}
                    style={{
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#ffffff',
                        padding: '20px',
                        marginTop: '-120px'
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24} md={12}>
                            <Image 
                                width="100%" 
                                height={350} 
                                src={packageDetail.images[0] || 'default-image-url.png'} 
                                alt={packageDetail.title} 
                                style={{ objectFit: 'cover', borderRadius: '10px', transition: 'opacity 0.5s ease-in' }} 
                                preview={false}
                                onLoad={(e) => e.currentTarget.style.opacity = 1}
                            />
                        </Col>
                        <Col span={24} md={12}>
                            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                <Paragraph style={{ margin: '5px 0', fontSize: '16px' }}>
                                    <strong>Price per person:</strong> ${packageDetail.price}
                                </Paragraph>
                                <Paragraph style={{ margin: '5px 0', fontSize: '16px' }}>
                                    <strong>Total Price:</strong> ${totalPrice}
                                </Paragraph>

                                <Input
                                    type="number"
                                    min={1}
                                    value={numberOfPersons}
                                    onChange={(e) => setNumberOfPersons(Number(e.target.value))}
                                    placeholder="Number of Persons"
                                    style={{ borderRadius: '5px', marginBottom: '10px', transition: 'box-shadow 0.3s ease-in-out' }}
                                    onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 2px rgba(24, 144, 255, 0.7)'}
                                    onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
                                />
                                <Input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    placeholder="Booking Date"
                                    style={{ borderRadius: '5px', marginBottom: '10px' }}
                                />
                                <TextArea
                                    rows={3}
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                    placeholder="Additional Information"
                                    style={{ borderRadius: '5px', marginBottom: '10px' }}
                                />
                            </Space>
                        </Col>
                    </Row>

                    <Button
                        type="primary"
                        onClick={handleBooking}
                        style={{
                            width: '100%',
                            marginTop: '20px',
                            padding: '10px',
                            transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#0056b3';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = '#1890ff';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Book Now
                    </Button>

                    <Modal
                        title={<span style={{ color: '#1890ff' }}>Confirm Booking</span>}
                        visible={isModalVisible}
                        onOk={confirmBooking}
                        onCancel={() => setIsModalVisible(false)}
                        style={{ top: 250 }} 
                    >
                        <p>Number of Persons: {numberOfPersons}</p>
                        <p>Total Price: ${totalPrice}</p>
                    </Modal>
                </Card>
            </motion.div>
        </div>
    );
};

export default BookingPage;
