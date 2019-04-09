import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App columns={10} rows={10}/>, document.getElementById('index'));
registerServiceWorker();