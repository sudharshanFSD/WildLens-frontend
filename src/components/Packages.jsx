import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://wildlens-backend-8aul.onrender.com/apiPackages/search');
        setPackages(response.data);
      } catch (error) {
        setError('Error fetching packages.');
        setPackages([]);
      }
    };

    fetchPackages();
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
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', sans-serif`,
  };

  const titleStyle = {
    fontSize: '20px', // Slightly reduced font size for the title
    fontWeight: '400', // Lighter font weight for the title
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  };

  const scrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    paddingBottom: '20px',
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
    width: '300px', // Fixed width
    height: '400px', // Fixed height
    boxSizing: 'border-box',
    margin: '10px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    zIndex: 1,
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
    color: '#666',
    margin: '5px 0',
    fontWeight: '300', // Lighter font weight for text
  };

  const titleTextStyle = {
    ...textStyle,
    fontWeight: '400', // Lighter font weight for the title
    fontSize: '16px',
    color: '#333',
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

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Available Packages</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LeftOutlined style={leftArrowStyle} onClick={scrollLeft} />
      <RightOutlined style={rightArrowStyle} onClick={scrollRight} />
      <div style={scrollContainerStyle} ref={scrollContainerRef}>
        {packages.map(pkg => (
          <Link
            to={`/packages/${pkg._id}`}
            key={pkg._id}
            style={{ textDecoration: 'none', color: 'inherit' }}
            onMouseEnter={() => setHoveredCard(pkg._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              style={{
                ...cardStyle,
                ...(hoveredCard === pkg._id ? cardHoverStyle : {}),
              }}
            >
              <img src={pkg.images[0]} alt={pkg.title} style={imageStyle} />
              <div style={infoStyle}>
                <h3 style={titleTextStyle}>{pkg.title}</h3>
                <p style={textStyle}>{pkg.description}</p>
                <p style={textStyle}>${pkg.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Packages;
