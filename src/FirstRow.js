import React from 'react';
import { Button, Typography, Row, Col, Image } from 'antd';
import { color } from './LandingPage';
import { styles, colPropsSmall, colPropsBig } from './LandingPage';
const { Title, Paragraph, Text } = Typography;
export function FirstRow() {
  return (
    <Row style={styles.row} id='about'>
      <Col {...colPropsSmall}>
        <Image
          width='60%'
          // sample image
          src='yulia3.jpg'
          style={{ borderRadius: '25px' }}
          preview={false}
        ></Image>
      </Col>
      <Col {...colPropsBig}>
        <Title type='primary'>Yulia</Title>
        <Title
          style={{
            fontSize: '1.5rem',
            // fontWeight: 'bold',
          }}
          type='secondary'
        >
          Want to get rid of your anxiety? Want to feel more confident?
        </Title>
        <Button
          type='primary'
          onClick={() => {
            document.getElementById('register').scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
            setTimeout(() => {
              document.getElementById('nameinput').focus();
            }, 500);
          }}
          block
          style={{
            height: '3rem',
          }}
        >
          <Typography
            style={{
              color: 'white',
              //   fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            Register for a free session now
          </Typography>
        </Button>
        {/* <Button
          type='secondary'
          onClick={() => {
            document.getElementById('reviews').scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }}
        >
          <Typography
            style={{
              color: color,
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            See what others have to say
          </Typography>
        </Button> */}
      </Col>
    </Row>
  );
}
