import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./assets/fontawesome-free-6.6.0-web/css/all.min.css"
import "./assets/css/style.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);

