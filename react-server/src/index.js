import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Score from './Score';
import Leeds from './Leeds';
import registerServiceWorker from './registerServiceWorker';

//Since the create-react-app only allows for single entry point,
//use JQuery to get the url params and render accordingly
function getUrlParam() {
  var url = window.location.href;
  var urlParams = url.split('3000/');
  return urlParams[1];
}

switch (getUrlParam()) {
  case "find_score":
    ReactDOM.render(<Score />, document.getElementById('root'));
    break;

  case "projects":
    ReactDOM.render(<Leeds />, document.getElementById('root'));
    break;

  default:
    ReactDOM.render(<Home />, document.getElementById('root'));
    break;
}

registerServiceWorker();
