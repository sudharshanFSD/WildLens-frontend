import React, { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';

const { Title, Paragraph } = Typography;

const QuotesWithImages = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get('https://wildlens-backend-8aul.onrender.com/home/quotes')
      .then(response => setQuotes(response.data))
      .catch(error => console.error('Error fetching quotes:', error));
  }, []);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Inspirational Wildlife Quotes
      </Title>

      {quotes.map((item, index) => (
        <Row key={index} gutter={16} style={{ marginBottom: '40px' }}>
          {index % 2 === 0 ? (
            <>
              <Col xs={24} sm={12} md={12} lg={12}>
                <img
                  src={item.image}
                  alt={`quote ${index}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '20px' }}>
                  <Paragraph style={{ fontSize: '1.4em', fontStyle: 'oblique', lineHeight: 1.5 }}>
                    {item.quote}
                  </Paragraph>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xs={24} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '20px' }}>
                  <Paragraph style={{ fontSize: '1.4em', fontStyle: 'oblique', lineHeight: 1.5 }}>
                    {item.quote}
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <img
                  src={item.image}
                  alt={`quote ${index}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Col>
            </>
          )}
        </Row>
      ))}
    </div>
  );
};

export default QuotesWithImages;
