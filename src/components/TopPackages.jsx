import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Spin, Alert } from 'antd';
import 'antd/dist/reset.css';

const { Meta } = Card;

const TopPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  const fetchTopPackages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tours/topPackages');
     

      if (Array.isArray(response.data)) {
        setPackages(response.data);
      } else {
        console.error('Expected an array but got:', JSON.stringify(response.data, null, 2));
        setPackages([]);
      }
    } catch (err) {
      console.error('Error status:', err.response?.status);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopPackages();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  const containerStyle = {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: '600', // Bold font weight for the title
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333', // Darker color 
  };

  const scrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    paddingBottom: '20px',
    overflowY: 'hidden', // Hide vertical scrollbar
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // Internet Explorer and Edge
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    minWidth: '300px',
    boxSizing: 'border-box',
    margin: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transformStyle: 'preserve-3d',
    fontWeight: 400, // Medium font weight for card content
  };

  const cardHoverStyle = {
    transform: 'scale(1.05) rotateY(10deg)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  const infoStyle = {
    textAlign: 'center',
  };

  const textStyle = {
    fontSize: '14px',
    color: '#555', // Darker color
    margin: '5px 0',
    fontWeight: 400, // Medium font weight for better readability
  };

  const titleTextStyle = {
    ...textStyle,
    fontWeight: '600', // Bold font weight 
    fontSize: '16px',
    color: '#333', // Darker color 
  };

  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '24px',
    cursor: 'pointer',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '5px',
    borderRadius: '50%',
  };

  const leftArrowStyle = {
    ...arrowStyle,
    left: '10px',
  };

  const rightArrowStyle = {
    ...arrowStyle,
    right: '10px',
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Top 5 Packages</h2>
      <LeftOutlined style={leftArrowStyle} onClick={scrollLeft} />
      <RightOutlined style={rightArrowStyle} onClick={scrollRight} />
      <div style={scrollContainerStyle} ref={scrollContainerRef}>
        {packages.map((pkg) => (
          <Link to={`/packages/${pkg._id}`} key={pkg._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img src={pkg.images[0]} alt={pkg.title} style={imageStyle} />
              <div style={infoStyle}>
                <h3 style={titleTextStyle}>{pkg.title}</h3>
                <p style={textStyle}>{pkg.description}</p>
                <p style={textStyle}>Price: ${pkg.price}</p>
               
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopPackages;
