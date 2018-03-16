import React, { Component } from 'react';
import Nav from './Nav';
import MapContainer from './ScoreMapContainer';
import ScoreTable from './ScoreTable';

class Score extends Component {

  constructor(props) {
    super(props);
    // console.log('initializing in the score component');
    this.state = {
      address: props.location.state ? props.location.state.data.location.address : null,
      longitude: props.location.state ? props.location.state.data.location.longitude : null,
      latitude: props.location.state ? props.location.state.data.location.latitude : null,
      radius: props.location.state.data.radius ? props.location.state.data.radius : '800'

    };
  }

  componentDidMount() {
    //create map using this.state.location
  }

  render() {
    // console.log('rendering in score component');
    // console.log('in score, state.address should have a value received from redirect ', this.state.address)
    return (
      <div>
        <Nav form={true} />
        {/* <div className="jumbotron">
          <h1 className="display-4">Hello, find-score page!</h1>
          <hr className="my-4" />
            <p className="lead">
              <a className="btn btn-primary btn-lg" role="button">Learn more</a>
            </p>
        </div> */}
        <div className="container mt-2">
          <div className="row">
            <div className="col-8 pl-0">
              <MapContainer search={this.state} />
            </div>
            <div className="col-4 pr-0">
              <ScoreTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
