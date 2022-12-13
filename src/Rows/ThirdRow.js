import React from 'react';
import {
  Typography,
  Row,
  Col,
  Divider,
  Select,
  Form,
  Spin,
  Button,
  Space,
} from 'antd';
import { Input } from 'antd';
import { color } from '../LandingPage';
import { styles, colPropsBig, colPropsSmall } from '../LandingPage';
import { useRequest } from 'ahooks';
import { postNewAppointment } from '../apiCalls';
const spaceProps = {
  direction: 'vertical',
  size: 'large',
  style: { textAlign: 'center', width: '100%' },
};

const { Title, Paragraph, Text } = Typography;
// this is a third row component that has embedded video and button to scroll to the next section
export function ThirdRow(content) {
  const RegistrationButton = () => (
    <Button
      type='primary'
      size='large'
      block
      onClick={() => {
        document.getElementById('registerExt').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }}
    >
      {content ? content.buttonText : 'Register'}
    </Button>
  );
  if (!content) {
    return (
      <>
        <Divider
          orientation='right'
          orientationMargin={'15vw'}
          style={styles.divider}
        >
          <Typography style={styles.dividerTypography}>
            {/* landing.freeSession */}
            {content ? content.dividerTitle : 'Подробное предложение'}
          </Typography>
        </Divider>
        <Row style={styles.row} id='video'>
          <Col {...colPropsBig}>
            <Space {...spaceProps}>
              <Spin size='large'></Spin>
              <Text>Video Loading...</Text>
            </Space>
          </Col>
          <Col {...colPropsSmall}>
            <Space {...spaceProps}>
              <RegistrationButton />
            </Space>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <Row style={styles.row} id='video'>
      <Col {...colPropsSmall}>
        <iframe
          width='100%'
          height='100%'
          src={content.video}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe>
      </Col>
      <Col {...colPropsBig}>
        <Title level={2} style={{ color: color.primary }}>
          {content.title}
        </Title>
        <Paragraph style={{ color: color.primary }}>{content.text}</Paragraph>
        <RegistrationButton />
      </Col>
    </Row>
  );
}
