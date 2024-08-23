import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text, Title, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ backgroundColor: '#001529', padding: '60px 20px' }}>
      <Row justify="space-between" gutter={[32, 32]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#ffffff' }}>WildLens</Title>
          <Text style={{ color: '#ffffff' }}>
            Explore the wild with us. Your adventure begins here. We offer unique experiences in the heart of nature.
          </Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: '#ffffff' }}>Quick Links</Title>
          <Space direction="vertical">
            <Link href="/" style={{ color: '#ffffff' }}>Home</Link>
            <Link href="/about" style={{ color: '#ffffff' }}>About Us</Link>
            <Link href="/tours" style={{ color: '#ffffff' }}>Tours</Link>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: '#ffffff' }}>Contact Us</Title>
          <Space direction="vertical">
            <Text style={{ color: '#ffffff' }}><PhoneOutlined /> (+91) 93-44-988810</Text>
            <Text style={{ color: '#ffffff' }}><MailOutlined /> sudharshan@wildlens25.com</Text>
          </Space>
          <div style={{ marginTop: '20px' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', marginRight: '10px' }}>
              <FacebookOutlined style={{ fontSize: '24px' }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', marginRight: '10px' }}>
              <TwitterOutlined style={{ fontSize: '24px' }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff' }}>
              <InstagramOutlined style={{ fontSize: '24px' }} />
            </a>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={5} style={{ color: '#ffffff' }}>Our Mission</Title>
          <Text style={{ color: '#ffffff' }}>
            We are committed to promoting sustainable tourism and wildlife conservation through immersive and responsible travel experiences.
          </Text>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '40px 0' }} />
      <div style={{ textAlign: 'center' }}>
        <Text style={{ color: '#ffffff' }}>© 2024 WildLens. All rights reserved.</Text>
      </div>
    </Footer>
  );
};

export default AppFooter;
