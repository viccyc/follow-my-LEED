import React, { Component } from 'react';
import Form from './Nav-form';


import './Nav.css';


class Nav extends Component {

  constructor() {
    super();
    this.state = {
      action: 'find_score'
    };
    this.clickHandler = this.clickHandler.bind(this);

  }

  componentDidMount() {

  }

  clickHandler(e) {
    e.preventDefault();
    const action = e.target.href.split('3000')[1];
    console.log(`clicked tab in Nav, action is ${action}`);
    this.setState({ action: action });
  }

  render() {
    //not display address bar in home page
    let form = null;
    if (this.props.form) {
      form = <Form action={this.state.action}/>;
    }
    //need to add event listener for two tabs
    //onclick, setState, purpose: {action: 'api route to either find score or show leed'}
      return (
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" href="/find_score" onClick={this.props.clickHandler || this.clickHandler}>Find Score</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/projects" onClick={this.props.clickHandler || this.clickHandler}>Show Projects</a>
          </li>
          {form}
        </ul>
      );

    }
  }


export default Nav;
