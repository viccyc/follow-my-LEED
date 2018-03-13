import React, { Component } from 'react';
import Nav from './Nav';


class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location.state ? this.props.location.state.data : null
    };
  }

  //TODO: fetch backend with location data
  //with res, use api to display and uodate the map
  componentDidMount() {
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
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
          </p>
        </div>
        <div id="map"></div>
      </div>

    );
  }
}

export default Projects;
