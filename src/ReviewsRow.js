import React from 'react';
import { Typography, Row, Col, Divider } from 'antd';
import ReviewsCarousel from './ReviewsCarousel';
import { color } from './LandingPage';
import { styles, colPropsSmall, colPropsBig } from './LandingPage';
const { Title, Paragraph, Text } = Typography;
export function ReviewsRow() {
  return (
    <Row style={styles.rowLast}>
      <Divider
        orientation='left'
        orientationMargin={'10vw'}
        style={styles.divider}
      >
        <Typography
          style={{
            color: color,
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          Satisfied Customers
        </Typography>
      </Divider>
      <Col {...colPropsSmall}>
        <Title level={3}>What people are saying about Yulia</Title>
      </Col>
      <Col {...colPropsBig}>
        {/* carousell with reviews */}
        <div style={{ width: '100%' }} id='reviews'>
          <ReviewsCarousel />
        </div>
      </Col>
      <Col
        span={24}
        style={{
          textAlign: 'center',
        }}
      >
        Yulia Peacock ©2022 Created by{' '}
        <a
          href='https://www.linkedin.com/in/nathan-gurfinkel/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Nathan Gurfinkel
        </a>
      </Col>
    </Row>
  );
}
