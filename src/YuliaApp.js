import { ConfigProvider } from 'antd';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './YuliaApp.css';
import LandingPage from './LandingPage';
import AdminPage from './AdminPage';
function YuliaApp() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: '0.25rem',
          colorPrimary: '#7f82c7',
        },
      }}
    >
      <div className='YuliaApp'>
        <LandingPage />
      </div>
    </ConfigProvider>
  );
}

export default YuliaApp;
