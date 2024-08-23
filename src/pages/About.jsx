import React from 'react';
import { Card, Row, Col, Typography, Divider, Space } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles
import sudharshanImg from '../../public/images/jack3.png';
import balapng from '../../public/images/balapng.png' ;

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* About Us Section */}
      <section style={{ marginBottom: '40px' }}>
        <Title level={1} style={{ textAlign: 'center', fontSize: '2.5em', fontWeight: 'bold' }}>About Us</Title>
        <Divider />
        <Paragraph style={{ fontSize: '1.2em', lineHeight: '1.8', textAlign: 'center' }}>
          Welcome to WildLens! We are dedicated to providing the best services and tour experiences
          in the industry. Our mission is to deliver exceptional value and service to our customers
          while maintaining the highest standards of integrity and professionalism.
        </Paragraph>
      </section>

      {/* Meet Our Team Section */}
      <section style={{ marginBottom: '40px' }}>
        <Title level={2} style={{ textAlign: 'center', fontSize: '2em' }}>Meet Our Team</Title>
        <Divider />
        <Row gutter={[16, 24]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered={false} style={{ textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <img
                src={sudharshanImg}
                alt="Sudharshan"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto'
                }}
              />
              <Title level={4} style={{ marginTop: '15px', fontSize: '1.5em' }}>Sudharshan </Title>
              <Paragraph style={{ fontSize: '1.1em' }}>CEO</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered={false} style={{ textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <img
                src={balapng}
                alt="bala"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto'
                }}
              />
              <Title level={4} style={{ marginTop: '15px', fontSize: '1.5em' }}>Udhaya Shabari</Title>
              <Paragraph style={{ fontSize: '1.1em' }}>CTO</Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Contact Us Section */}
      <section>
        <Title level={2} style={{ textAlign: 'center', fontSize: '2em' }}>Contact Us</Title>
        <Divider />
        <Paragraph style={{ fontSize: '1.2em', textAlign: 'center' }}>
          If you have any questions or need further information, please reach out to us at:
        </Paragraph>
        <Space direction="vertical" size="large" style={{ display: 'flex', alignItems: 'center' }}>
          <Paragraph style={{ fontSize: '1.2em', textAlign: 'center' }}>
            Email: <a href="mailto:sudharshan@wildlens25.com">sudharshan@wildlens25.com</a>
          </Paragraph>
          <Paragraph style={{ fontSize: '1.2em', textAlign: 'center' }}>
            Phone: <a href="tel:+919344988810">(+91) 93-44-988810</a>
          </Paragraph>
          <Paragraph style={{ fontSize: '1.2em', textAlign: 'center' }}>
            Address: KMK Street 11, Salem, India
          </Paragraph>
        </Space>
      </section>
    </div>
  );
};

export default About;
