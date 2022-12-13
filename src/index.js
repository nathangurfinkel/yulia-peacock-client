import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import YuliaApp from './YuliaApp';
import reportWebVitals from './reportWebVitals';
import LandingPage from './LandingPage';
import AdminPage from './AdminPage';
import CMS from './CMS/CMS';
import Editor from './CMS/Editor';
const router = createBrowserRouter([
  {
    path: '/',
    element: <YuliaApp />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/CMS',
    element: <CMS />,
  },
  {
    path: '/editor',
    element: <Editor />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
