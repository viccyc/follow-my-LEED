import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import Home from './Home';
import Score from './Score';
import Projects from './Projects';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

//render different component according to the url(that user types directly into address bar)
//TODO: support queryString/:param so users can share a link or reload page
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route path='/find_score' component={Score} />
      <Route path='/projects' component={Projects} />
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();
