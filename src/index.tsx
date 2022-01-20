import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';
import '@styles/style.scss';
import App from './app';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);