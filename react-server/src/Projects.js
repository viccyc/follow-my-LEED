import React, { Component } from 'react';
import Nav from './Nav';


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
    // let map;
    // let service;
    // let infowindow;

    // function initialize() {
    //   const pyrmont = new google.maps.LatLng(51.0486, 114.0708);

    //   map = new google.maps.Map(document.getElementById('map'), {
    //     center: pyrmont,
    //     zoom: 15
    //   });

    //   const request = {
    //     location: pyrmont,
    //     radius: '800',
    //     query: 'restaurant'
    //   };

    //   service = new google.maps.places.PlacesService(map);
    //   service.textSearch(request, callback);
    // }

    // function callback(results, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     for (let i = 0; i < results.length; i++) {
    //       let place = results[i];
    //       createMarker(results[i]);
    //     }
    //   }
    // }

  }

  render() {
    return (
      <div>
        <Nav form={true}/>
        <div className="jumbotron">
          <h1 className="display-4">Hello, show-leeds page!</h1>
          <hr className="my-4" />
          <p className="lead">
            <a className="btn btn-primary btn-lg"role="button">Learn more</a>
          </p>
        </div>
        <div id="map"></div>
      </div>

    );
  }
}

export default Projects;
