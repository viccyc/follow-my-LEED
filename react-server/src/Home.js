import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

import Nav from './Nav';
import './index.css';
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      action: '/find_score'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(e){
    e.preventDefault();
    const location = this.input.value;
    console.log(`clicked GO in Home page, location is ${location}`);
    this.setState({ location: location });
  }

  clickHandler(e){
    e.preventDefault();
    const action = e.target.href.split('3000')[1];
    console.log(`clicked tab in Nav from Home page, action is ${action}`);
    this.setState({action: action});
  }

  render() {
    if (this.state.location){
      return <Redirect to={{
        pathname: this.state.action,
        state: { data: this.state.location }
      }} />
    }
    return (
      <div>
        <Nav form={false} clickHandler={this.clickHandler}/>
        <div className="jumbotron">
          <h1 className="display-4">Hello!</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Location</span>
              </div>
              <input name="location"
                    ref={(input) => this.input = input}
                    type="text"
                    className="form-control"
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm" />
            </div>
            <hr className="my-4" />
            <button type="submit" className="btn btn-primary">Go!</button>
          </form>
        </div>
      </div>

    );
  }
}

export default Home;
