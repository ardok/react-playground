import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';
import StyletronClient from 'styletron-client';
import {StyletronProvider} from 'styletron-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <StyletronProvider styletron={new StyletronClient()}>
    <App />
  </StyletronProvider>,
  document.getElementById('root')
);
registerServiceWorker();
