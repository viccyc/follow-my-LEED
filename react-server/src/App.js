import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      result: []
    };
  }

  componentDidMount() {

    fetch('/api')
    .then(res => res.json())
    .then(result => this.setState({ result }, () => console.log('Results fetched...', result)))

  }

  render() {
    const hello = this.state.result.brand;
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hello, {hello}!</h1>
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Location</span>
          </div>
          <input type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <hr className="my-4" />
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">Go!</a>
          </p>
      </div>

    );
  }
}

export default App;
