import React, { Component } from 'react';
import Form from './Nav-form';


import './Nav.css';


class Nav extends Component {

  constructor() {
    super();
    this.state = {
      result: [],
      purpose: {}
    };
  }

  componentDidMount() {

  }

  render() {
    //not display address bar in home page
    let form = null;
    if (this.props.form) {
      form = <Form action={this.state.purpose.action}/>;
    }
    //need to add event listener for two tabs
    //onclick, setState, purpose: {action: 'api route to either find score or show leed'}
      return (
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" href="/find_score" onClick={this.props.clickHandler}>Find Score</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/projects" onClick={this.props.clickHandler}>Show LEEDS</a>
          </li>
          {form}
        </ul>
      );

    }
  }


export default Nav;
