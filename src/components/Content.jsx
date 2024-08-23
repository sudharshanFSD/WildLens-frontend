import React, { useState, useEffect } from 'react';
import { Typography, Divider, Spin, Alert, Row, Col, Card } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Title, Paragraph } = Typography;

const Content = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://wildlens-backend-8aul.onrender.com/home/')
      .then(response => {
        setContent(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Alert message="Error" description="Failed to load content. Please try again later." type="error" showIcon />
      </div>
    );
  }

  if (!content || !content.sections) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>No content available.</div>;
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5' }}>
      <Title level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>
        Why Choose Us
      </Title>
      
      <Paragraph style={{ fontSize: '1.2em', textAlign: 'center', maxWidth: '800px', margin: 'auto' }}>
        {content.intro}
      </Paragraph>
      
      <Divider />
      
      <Row gutter={[16, 16]} justify="center">
        {content.sections.map((section, index) => (
          <Col span={24} md={12} lg={8} key={index}>
            <Card
              title={section.title}
              bordered={false}
              bodyStyle={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}
              style={{ 
                backgroundColor: '#ffffff', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%' 
              }}
            >
              <Paragraph style={{ fontSize: '1.1em', flexGrow: 1 }}>
                {section.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Content;
