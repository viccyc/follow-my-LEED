import React, { Component } from 'react';
import bus from './images/bus2.png';

class MapContainer extends Component {
  
  componentDidMount() {
    const googleMaps = window.google.maps;

    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: this.props.search.latitude, lng: this.props.search.longitude }
    });
  
    const marker = new googleMaps.Marker({
      position: { lat: this.props.search.latitude, lng: this.props.search.longitude },
      map: map,
    });

    // const transitLayer = new googleMaps.TransitLayer();
    // transitLayer.setMap(map);

    const cityCircle = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: { lat: this.props.search.latitude, lng: this.props.search.longitude },
      radius: this.props.search.radius? this.props.search.radius : 800
    });

    const service = new googleMaps.places.PlacesService(map);
    service.nearbySearch({
      location: { lat: this.props.search.latitude, lng: this.props.search.longitude },
      radius: this.props.search.radius? this.props.search.radius : 800,
      type: ['transit_station']
    }, callback);
    console.log(this.props.search.latitude, this.props.search.longitude);

    function callback(results, status) {
      if (status === googleMaps.places.PlacesServiceStatus.OK) {
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      const placeLoc = place.geometry.location;
      const marker = new googleMaps.Marker({
        map: map,
        icon: bus,
        position: place.geometry.location
      });

      
      const infowindow = new googleMaps.InfoWindow();
      googleMaps.event.addListener(marker, 'click', function() {
        // console.log(place);
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

  }

  render() {
    return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
  };

}

export default MapContainer;