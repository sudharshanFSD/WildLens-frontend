import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Spin, message, List, Rate, Input, Button, Divider } from 'antd';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const PackageDetail = () => {
    const { packageId } = useParams();
    const navigate = useNavigate();
    const [packageDetail, setPackageDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newRating, setNewRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [ratingValues, setRatingValues] = useState([]);

    const getAuthToken = () => {
        return localStorage.getItem('token');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getAuthToken();
                if (!token) {
                    message.error('No authentication token found');
                    navigate('/login');
                    return;
                }

                // Fetch package details
                const packageResponse = await axios.get(`http://localhost:3000/apiPackages/package/${packageId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPackageDetail(packageResponse.data);

                // Fetch comments
                const commentsResponse = await axios.get(`http://localhost:3000/apiComment/package/${packageId}/comments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComments(commentsResponse.data);

                // Fetch actual rating values
                const ratingsResponse = await axios.get(`http://localhost:3000/apiRating/package/${packageId}/ratings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRatingValues(ratingsResponse.data.map(rating => rating.value));
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    message.error('Unauthorized. Please log in.');
                    navigate('/login');
                } else {
                    message.error('Failed to fetch package details or comments.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [packageId, navigate]);

    const handleRatingChange = (value) => setNewRating(value);

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleSubmit = async () => {
        try {
            const token = getAuthToken();
            if (!token) {
                message.error('No authentication token found');
                navigate('/login');
                return;
            }

            await Promise.all([
                axios.post(`http://localhost:3000/apiRating/package/${packageId}/ratings`, { value: newRating }, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.post(`http://localhost:3000/apiComment/package/${packageId}/comments`, { content: newComment }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            // Refetch comments and ratings
            const commentsResponse = await axios.get(`http://localhost:3000/apiComment/package/${packageId}/comments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(commentsResponse.data);

            const ratingsResponse = await axios.get(`http://localhost:3000/apiRating/package/${packageId}/ratings`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRatingValues(ratingsResponse.data.map(rating => rating.value));

            setNewComment('');
            setNewRating(0);
            message.success('Rating and comment added successfully');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                message.error('Unauthorized. Please log in.');
                navigate('/login');
            } else {
                message.error('Failed to submit rating and comment');
            }
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            const token = getAuthToken();
            if (!token) {
                message.error('No authentication token found');
                navigate('/login');
                return;
            }

            await axios.delete(`http://localhost:3000/apiComment/package/${packageId}/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            message.success('Comment deleted successfully');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                message.error('Unauthorized. Please log in.');
                navigate('/login');
            } else {
                message.error('Failed to delete comment');
            }
        }
    };

    const handleBooking = () => {
        navigate(`/booking/${packageId}`);
    };

    if (loading) return <Spin tip="Loading..." />;

    if (!packageDetail) return <p>Package not found</p>;

    const averageRating = ratingValues.length
        ? ratingValues.reduce((acc, value) => acc + value, 0) / ratingValues.length
        : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1, padding: '50px', borderBottom: '1px solid #ddd', borderTop: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                <Title level={2}>{packageDetail.title}</Title>
                
                {/* Display the first image from the images array */}
                <div style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
                    <img
                        src={packageDetail.images[0] || 'default-image-url.png'} // Change this to your default image URL
                        alt={packageDetail.title}
                        style={{ 
                            width: '100%', 
                            height: 'auto', 
                            objectFit: 'contain', 
                            objectPosition: 'center'
                        }}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Paragraph><strong>Price:</strong> ${packageDetail.price}</Paragraph>

                    <div style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Title level={4} style={{ margin: 0, marginRight: '10px' }}>Average Rating:</Title>
                            <Rate disabled value={averageRating} />
                        </div>
                        <Button type="primary" onClick={handleBooking} style={{ marginTop: '10px' }}>
                            Book Now
                        </Button>
                    </div>
                </div>

                <Divider />

                <Paragraph>{packageDetail.description}</Paragraph>

                <Divider />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Title level={4}>Leave a Rating</Title>
                    <Rate value={newRating} onChange={handleRatingChange} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                    <Title level={4}>Leave a Comment</Title>
                    <TextArea rows={4} value={newComment} onChange={handleCommentChange} />
                    <Button type="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</Button>
                </div>

                <Divider />

                <Title level={4}>Comments</Title>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={(comment) => (
                            <List.Item
                                actions={[
                                    <Button key={comment._id} onClick={() => handleCommentDelete(comment._id)}>Delete</Button>
                                ]}
                            >
                                <List.Item.Meta
                                    title={comment.username || 'Anonymous'}
                                    description={comment.content}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default PackageDetail;
