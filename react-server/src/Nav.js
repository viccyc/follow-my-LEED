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
      form = <Form action={this.state.action} searchAddress={this.props.searchAddress}/>;
    }

    //onclick, setState, purpose: {action: 'api route to either find score or show leed'}
      return (
        <nav id="navbar" className="navbar navbar">      
          <div>
            <a id="navbar-link" className="nav-link" href="/find_score" onClick={this.props.clickHandler || this.clickHandler}>CALCULATE SCORE <span class="sr-only">(current)</span></a>
            <a id="navbar-link2" className="nav-link" href="/projects" onClick={this.props.clickHandler || this.clickHandler}>SHOW PROJECTS</a>
          </div>
          {form}    
        </nav>
      );

    }
  }


export default Nav;

