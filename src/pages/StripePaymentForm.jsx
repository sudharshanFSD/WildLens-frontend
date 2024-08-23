import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { message, Button, Card, Typography, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa';
import Footer from '../components/Footer';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;

// Load Stripe
const stripePromise = loadStripe('pk_test_51PmFqV03UvysSmY1Ffpvwah6K0HJRfpVlWwvxCbiFx1CCdeVv4vlm7UXXuQJdxWnP3FrfHuo7CyhmFrApgkPgHEI00kGzfwh5N');

const PaymentForm = ({ clientSecret, stripePaymentId, bookingId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            message.error(`Payment failed: ${error.message}`);
            setLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            message.success('Payment succeeded!');
            try {
                // Update payment status in the payment database
                await axios.put(`http://localhost:3000/apiPayment/${stripePaymentId}/status`, { status: 'Completed' });
                console.log('Payment status updated successfully');
  
                // Update booking status in the bookings database only if payment is completed
                await axios.put(`http://localhost:3000/apiBooking/${bookingId}/status`, { status: 'Completed' });
                console.log('Booking status updated to completed successfully');

            } catch (updateError) {
                console.error('Error updating payment or booking status:', updateError);
                message.error('Failed to update payment or booking status. Please contact support.');
            }
            navigate('/'); // Redirect to the homepage after successful payment
        } else {
            message.error('Payment failed. Please try again.');
        }
        setLoading(false);
    };

    return (
        <Card
            title={<Title level={3}>Complete Your Payment</Title>}
            style={{
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <FaCcVisa style={{ fontSize: '40px', color: '#005EB8' }} />
                <FaCcMastercard style={{ fontSize: '40px', color: '#EB001B' }} />
                <FaCcAmex style={{ fontSize: '40px', color: '#2E7D32' }} />
                <FaCcDiscover style={{ fontSize: '40px', color: '#FF6F20' }} />
            </div>
            <Paragraph style={{ marginBottom: '20px' }}>
                Please enter your payment details to complete the booking. Ensure that all information is correct before submitting.
            </Paragraph>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!stripe || loading}
                    loading={loading}
                    style={{ width: '100%', marginTop: '20px' }}
                >
                    Pay
                </Button>
            </form>
        </Card>
    );
};

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve state values with default values
    const { clientSecret = null, stripePaymentId = null, bookingId = null } = location.state || {};

    useEffect(() => {
        if (!clientSecret) {
            message.error('No client secret found. Please try again.');
            navigate('/'); // Redirect to home if clientSecret is not present
        }
    }, [clientSecret, navigate]);

    return (
        <div>
            <Row style={{ padding: '50px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <Col xs={24} md={12} style={{ padding: '20px' }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Title level={2} style={{ color: '#1890ff' }}>Welcome to WildLens!</Title>
                        <Paragraph>
                            At <Text strong style={{ color: '#1890ff' }}>WildLens</Text>, we believe in creating unforgettable wildlife tour experiences that connect you with nature in profound ways. Our expert guides lead you through breathtaking landscapes, allowing you to witness the beauty of wildlife in its natural habitat.
                        </Paragraph>
                        <Paragraph>
                            Whether you're seeking adventure, relaxation, or a deeper understanding of the natural world, our tailor-made packages cater to all your needs. With <Text strong style={{ color: '#1890ff' }}>WildLens</Text>, every journey becomes a story worth sharing.
                        </Paragraph>
                        <Paragraph>
                            <Text strong style={{ color: '#1890ff' }}>Your Satisfaction is Our Priority!</Text> We are committed to ensuring that your experience is seamless and enjoyable. If you have any questions or special requests, please don't hesitate to reach out to our dedicated team.
                        </Paragraph>
                        <Paragraph>
                            Thank you for choosing <Text strong style={{ color: '#1890ff' }}>WildLens</Text>. We look forward to helping you discover the wonders of wildlife. Your adventure begins here!
                        </Paragraph>
                    </motion.div>
                </Col>
                <Col xs={24} md={12} style={{ padding: '20px' }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Elements stripe={stripePromise}>
                            <PaymentForm clientSecret={clientSecret} stripePaymentId={stripePaymentId} bookingId={bookingId} />
                        </Elements>
                    </motion.div>
                </Col>
            </Row>
            <Footer />
        </div>
    );
};

export default PaymentPage;
