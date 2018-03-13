import React, { Component } from 'react';
import Nav from './Nav';
import MapContainer from './MapContainer';


class Projects extends Component {

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
    //TODO: fetch backend with location data
    //need to provide location and radius
    //with res, use other apis to display and update the map & popups

    //TODO: test google map&popups api
    // //create map using this.state.location
  }

  render() {
    return (
      <div>
        <Nav form={true}/>
        <div className="jumbotron">
          <h1 className="display-4">Hello, show-projects page!</h1>
          <hr className="my-4" />
          <p className="lead">
            <a className="btn btn-primary btn-lg"role="button">Learn more</a>
          </p>
        </div>
        <div id="map"></div>
        <MapContainer search={this.state} />
      </div>
    );
  }
}

export default Projects;
