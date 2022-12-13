// content editor shows the content for each row and column in the landing page

import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Space,
  Typography,
  Divider,
  Row,
  Col,
  Card,
  Avatar,
  Carousel,
  ConfigProvider,
  Affix,
  Layout,
  Menu,
  Breadcrumb,
  Checkbox,
  Radio,
  InputNumber,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FirstRow } from './Rows/FirstRow';
import { ReviewsRow } from './Rows/FourthRow';
import { RegisterRow } from './Rows/SecondRow';
import { useRequest } from 'ahooks';
import { getContentList } from './apiCalls';
import { color, styles } from './LandingPage';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function ContentEditor() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  const {
    data: contentData,
    loading: loadingContent,
    error: errorContent,
  } = useRequest(getContentList, {
    refreshDeps: [currentRow, currentCol],
  });
}
