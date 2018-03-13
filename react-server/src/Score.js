import React, { Component } from 'react';
import Nav from './Nav';


class Score extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location.state ? this.props.location.state.data.location : null,
      radius: this.props.location.state ? this.props.location.state.data.radius : null

    };
  }

  componentDidMount() {
    //create map using this.state.location
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
