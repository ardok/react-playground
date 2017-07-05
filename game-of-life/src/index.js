import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';
// import StyletronClient from 'styletron-client';
// import {StyletronProvider} from 'styletron-react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*
const styleElements = document.getElementsByClassName('_styletron_hydrate_');
<StyletronProvider styletron={new StyletronClient(styleElements)}>
  <App/>
</StyletronProvider>,
*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
