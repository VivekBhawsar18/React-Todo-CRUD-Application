import React from 'react';
import ReactDOM from 'react-dom/client';  // Corrected Import
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Create root using ReactDOM from 'react-dom/client'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
