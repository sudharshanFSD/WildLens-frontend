import React, { useEffect, useState } from 'react';
import { List, Typography, Spin, message, Button, Card, Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const MyBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = getAuthToken();
                if (!token) {
                    message.error('No authentication token found');
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:3000/apiBooking/bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBookings(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    message.error('Unauthorized. Please log in.');
                    navigate('/login');
                } else {
                    message.error('Failed to fetch bookings.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);

    const fetchBookings = async () => {
        const token = getAuthToken();
        const response = await axios.get('http://localhost:3000/apiBooking/bookings', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
    };

    const handleCancelBooking = (bookingId) => {
        const booking = bookings.find((b) => b._id === bookingId);

        // Check if the booking is already cancelled
        if (booking.status === 'Cancelled') {
            message.error('This booking has already been cancelled.');
            return; // Exit the function early
        }

        const confirmCancel = Modal.confirm({
            title: 'Confirm Cancellation',
            content: 'Are you sure you want to cancel this booking?',
            onOk: async () => {
                try {
                    const token = getAuthToken();
                    const response = await axios.delete(`http://localhost:3000/apiBooking/booking/${bookingId}/cancel`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // Check response to confirm cancellation
                    if (response.status === 200) {
                        // Refresh bookings after cancellation
                        await fetchBookings();
                        message.success('Booking cancelled successfully');
                    } else {
                        message.error('Failed to cancel booking');
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        message.error('This booking does not exist.');
                    } else {
                        message.error('Failed to cancel booking');
                    }
                } finally {
                    confirmCancel.destroy(); // Close the modal after action
                }
            },
            onCancel() {
                confirmCancel.destroy(); // Close the modal on cancel
            },
        });
    };

    if (loading) return <Spin tip="Loading..." />;

    if (!bookings.length) return <p>No bookings found</p>;

    // Sort bookings by status (Completed first, Cancelled last) and then by bookingDate
    const sortedBookings = [...bookings].sort((a, b) => {
        const statusOrder = { Completed: 1, Cancelled: 3, Other: 2 }; // Define order
        const statusA = statusOrder[a.status] || statusOrder.Other;
        const statusB = statusOrder[b.status] || statusOrder.Other;

        // Sort by status
        if (statusA !== statusB) {
            return statusA - statusB; // Sort by status order
        }

        // If statuses are the same, sort by bookingDate (most recent first)
        return new Date(b.bookingDate) - new Date(a.bookingDate);
    });

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} style={{ marginBottom: '20px' }}>My Bookings</Title>

            <List
                itemLayout="vertical"
                size="large"
                dataSource={sortedBookings}
                renderItem={(booking) => (
                    <List.Item key={booking._id}>
                        <Card
                            title={booking.package?.title || 'Package Name Not Available'}
                            style={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '10px',
                                padding: '10px',
                                marginBottom: '20px',
                            }}
                        >
                            <img
                                src={booking.package?.images?.[0] || 'default-image-url.png'}
                                alt={booking.package?.name || 'Package Image'}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                    marginBottom: '10px',
                                }}
                            />
                            <List.Item.Meta
                                description={`Booked for: ${new Date(booking.bookingDate).toLocaleDateString()}`}
                            />
                            <p>Number of Persons: {booking.numberOfPersons}</p>
                            <p>Status: {booking.status}</p>
                            {/* Show cancel button only if status is Completed */}
                            {booking.status === 'Completed' && (
                                <Button onClick={() => handleCancelBooking(booking._id)} type="default" danger>
                                    Cancel Booking
                                </Button>
                            )}
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MyBookings;
