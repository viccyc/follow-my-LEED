import React, { Component } from 'react';
import './Nav.css';
import './NavForm.css'

export default class MenuItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (    
      <div>
        <a id="navbar-link1" className="nav-link" href="/find_score" >CALCULATE SCORE <span class="sr-only">(current)</span></a>
        <a id="navbar-link2" className="nav-link" href="/projects" >SHOW PROJECTS</a>
      </div>
    );

    // if (this.props.title === 'CALCULATE SCORE') {
    //   return (<div id="navbar-link">{this.props.title}</div>);
    // } else if (this.props.title === 'SHOW PROJECTS') {
    //   return (<div id="navbar-link2">{this.props.title}</div>);
    // }
  }

}