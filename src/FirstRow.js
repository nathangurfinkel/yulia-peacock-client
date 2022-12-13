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
          width='40%'
          // sample image
          src='yulia3.jpg'
          style={{ borderRadius: '50%' }}
          preview={false}
        ></Image>
      </Col>
      <Col {...colPropsBig}>
        <div style={{ textAlign: 'justify' }}>
          <Text
            style={{
              fontSize: '1.5rem',
            }}
            type='primary'
          >
            Я Юля Гурфинкель, системный психотерапевт и коуч максимальной
            эффективности, помогаю откорректировать жизненный сценарий и начать
            жить полноценной жизнью и наслаждаться отношениями, любимой работой,
            здоровьем, желаемыми доходами.
          </Text>
        </div>
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
