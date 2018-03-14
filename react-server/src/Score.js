import React, { Component } from 'react';
import Nav from './Nav';
import MapContainer from './MapContainer';

class Score extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.location.state ? this.props.location.state.data.location.address : null,
      longitude: this.props.location.state ? this.props.location.state.data.location.longitude : null,
      latitude: this.props.location.state ? this.props.location.state.data.location.latitude : null,
      radius: this.props.location.state ? this.props.location.state.data.radius : '800'

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
              <a className="btn btn-primary btn-lg" role="button">Learn more</a>
            </p>
        </div>
        <MapContainer search={this.state} />
      </div>
    );
  }
}

export default Score;
