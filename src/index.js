import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'; // Import App.js from the components folder

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root')
);
