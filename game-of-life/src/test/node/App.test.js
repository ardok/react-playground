/* global it */
import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
