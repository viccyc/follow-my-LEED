import React, { Component } from 'react';
import Form from './Nav-form';


import './Nav.css';


class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action: 'find_score'
    };
    this.clickHandler = this.clickHandler.bind(this);
    // console.log('initializing nav component');
  }

  componentDidMount() {

  }

  componentWillUnmount(){
    // console.log('should unmount nav');
  }

  clickHandler(e) {
    e.preventDefault();
    const action = e.target.href.split('3000')[1];
    this.setState({ action: action });
  }

  render() {
    //not display address bar in home page
    let form = null;
    // console.log('in nav, this.props.form should be true ', this.props.form);
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
