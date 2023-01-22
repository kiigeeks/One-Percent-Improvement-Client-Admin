import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/authContext';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import id from 'javascript-time-ago/locale/id.json'

axios.defaults.withCredentials = true;
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(id)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);


