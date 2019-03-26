import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App columns={100} rows={100}/>, document.getElementById('index'));
registerServiceWorker();