import React, { Component } from 'react';
import Nav from './Nav';

import './Home.css';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      result: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //event handler onSubmit/onClick
  //   const url = '/find_score';
  //   const data = { location: 'value from address bar' };

  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     })
  //   }).then(res => res.json())
  //     .catch(error => console.error('Error:', error))
  //     .then(response => console.log('Success:', response));

    fetch('/api')
      .then(res => res.json())
      .then(result => this.setState({ result }, () => console.log('Results fetched...', result)))

  }

  handleClick(e){
    e.preventDefault();
    console.log('clicked go on home');
  }

  render() {
    const hello = this.state.result.brand;
    return (
      <div>
        <Nav form={false} />
        <div className="jumbotron">
          <h1 className="display-4">Hello, {hello}!</h1>
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">Location</span>
            </div>
            <input id="home-addr-bar" type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
          </div>
          <hr className="my-4" />
            <p className="lead">
            <a className="btn btn-primary btn-lg" role="button" onClick={this.handleClick}>Go!</a>
            </p>
        </div>
      </div>

    );
  }
}

export default Home;
