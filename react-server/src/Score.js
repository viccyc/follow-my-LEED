import React, { Component } from 'react';
import Nav from './Nav';


class Score extends Component {

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
    return (
      <div>
        <Nav form={true}/>
        <div className="jumbotron">
          <h1 className="display-4">Hello, find-score page!</h1>
          <hr className="my-4" />
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
        </div>
      </div>

    );
  }
}

export default Score;
