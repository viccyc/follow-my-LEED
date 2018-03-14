import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home';
import Score from './Score';
import Projects from './Projects';
import Nav from './Nav';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

//render different component according to the url(that user type directly into address bar)
//TODO: support queryString/:param so users can share a link or reload page

class Index extends component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (<div>
      <Nav form={true} />
      <BrowserRouter>
        <Switch>
          <Route path='/find_score' component={Score} />
          <Route path='/projects' component={Projects} />
          <Route path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    </div>)
  }
}


ReactDOM.render(<Index />), document.getElementById('root');

registerServiceWorker();