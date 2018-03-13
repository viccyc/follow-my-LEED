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

//TODO: need to use react-router
//TODO: projects not leeds

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
