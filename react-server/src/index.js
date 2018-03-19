import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './App';

import registerServiceWorker from './registerServiceWorker';

//render different component according to the url(that user types directly into address bar)
//TODO: support queryString/:param so users can share a link or reload page
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
