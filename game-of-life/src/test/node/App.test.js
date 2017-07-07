/* global it */
import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';
import StyletronClient from 'styletron-client';
import {StyletronProvider} from 'styletron-react';

import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StyletronProvider styletron={new StyletronClient()}>
      <App />
    </StyletronProvider>,
    div
  );
});
