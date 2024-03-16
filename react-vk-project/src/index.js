import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import bridge from '@vkontakte/vk-bridge';

bridge.send('VKWebAppInit');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
