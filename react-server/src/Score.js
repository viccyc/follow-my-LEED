import React, { Component } from 'react';
import Nav from './Nav';


class Score extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Nav form={true} />
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
