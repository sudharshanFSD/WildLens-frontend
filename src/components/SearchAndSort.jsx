import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Button, Card, Typography, Spin, Alert, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

const SearchAndSort = () => {
  const [packages, setPackages] = useState([]);
  const [title, setTitle] = useState('');
  const [sortOrder, setSortOrder] = useState('ascend');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const fetchPackages = async (searchTitle = title, sortOption = sortOrder) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/apiPackages/search', {
        params: {
          title: searchTitle,
          sort: sortOption,
        },
      });
      setPackages(response.data);
    } catch (error) {
      setError('Error fetching packages. Please try again.');
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const handleSearch = () => {
    fetchPackages(title, sortOrder);
  };

  const handleCardClick = (packageId) => {
    navigate(`/packages/${packageId}`);
  };

  const handleMouseEnter = (id) => setHoveredCard(id);
  const handleMouseLeave = () => setHoveredCard(null);

  if (loading) return <Spin size="large" />;

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: "'Lato', sans-serif" }}>
      <Title level={2} style={{ fontFamily: "'Lato', sans-serif" }}>Search Packages</Title>
      {error && <Alert message={error} type="error" showIcon />}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <Input
          placeholder="Search by title"
          value={title}
          onChange={handleTitleChange}
          style={{ width: '300px', marginRight: '10px', fontFamily: "'Lato', sans-serif" }}
        />
        <Select
          value={sortOrder}
          onChange={handleSortChange}
          style={{ width: '200px', fontFamily: "'Lato', sans-serif" }}
        >
          <Option value="ascend" style={{ fontFamily: "'Lato', sans-serif" }}>Price: Low to High</Option>
          <Option value="descend" style={{ fontFamily: "'Lato', sans-serif" }}>Price: High to Low</Option>
        </Select>
        <Button type="primary" onClick={handleSearch} style={{ marginRight: '10px', marginLeft: '10px', fontFamily: "'Lato', sans-serif" }}>
          Search
        </Button>
      </div>
      {packages.length === 0 ? (
        <Empty description="No packages found" style={{ fontFamily: "'Lato', sans-serif" }} />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontFamily: "'Lato', sans-serif" }}>
          {packages.map(pkg => (
            <Card
              key={pkg._id}
              hoverable
              cover={<img alt={pkg.title} src={pkg.images[0]} style={{ height: '200px', objectFit: 'cover', borderRadius: '8px' }} />}
              style={{
                width: '300px',
                margin: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                transform: hoveredCard === pkg._id ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
                boxShadow: hoveredCard === pkg._id ? '0 10px 20px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
                fontFamily: "'Lato', sans-serif"
              }}
              onClick={() => handleCardClick(pkg._id)}
              onMouseEnter={() => handleMouseEnter(pkg._id)}
              onMouseLeave={handleMouseLeave}
            >
              <Card.Meta
                title={<span style={{ fontFamily: "'Lato', sans-serif" }}>{pkg.title}</span>}
                description={
                  <div style={{ fontFamily: "'Lato', sans-serif" }}>
                    <p>{pkg.description}</p>
                    <p>Price: ${pkg.price}</p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndSort;
