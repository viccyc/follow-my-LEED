<<<<<<< HEAD
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"
import { compose, lifecycle } from "recompose";
import React, { Component } from 'react';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
=======
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import React, { Component } from 'react';
import React from 'react';
// import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
>>>>>>> c866f5672eed2e095395508f1f70f0d3f5511165

class MapContainer extends Component {
  
  componentDidMount() {

    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: this.props.search.latitude, lng: this.props.search.longitude }
    });
  
    let marker = new window.google.maps.Marker({
      position: { lat: this.props.search.latitude, lng: this.props.search.longitude },
      map: map,
    });

    // let transitLayer = new window.google.maps.TransitLayer();
    // transitLayer.setMap(map);

    // let cityCircle = new window.google.maps.Circle({
    //   strokeColor: '#FF0000',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: '#FF0000',
    //   fillOpacity: 0.35,
    //   map: map,
    //   radius: this.props.search.radius? this.props.search.radius : 400
    // });

    console.log("I've reached PlacesService");
    let service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: { lat: this.props.search.latitude, lng: this.props.search.longitude },
      radius: 500,
      type: ['transit_station']
    }, callback);
    console.log(this.props.search.latitude, this.props.search.longitude);

    function callback(results, status) {
      // if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      // }
    }

    function createMarker(place) {
      let placeLoc = place.geometry.location;
      let marker = new window.google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      
      let infowindow = new window.google.maps.InfoWindow();
      window.google.maps.event.addListener(marker, 'click', function() {
        console.log(place);
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

  }

  render() {
    return (<div id='map' style={{ height: `400px`, width: `100%` }} />);
  };

}

export default MapContainer;