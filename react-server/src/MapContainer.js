import React, { Component } from 'react';
import bus from './images/bus2.png';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    console.log('initializing MapContainer constructor');
    this.initMapAndMarker = this.initMapAndMarker.bind(this);
  }

  componentDidMount() {
    console.log('in MapContainer componentDidMount');
    // const search = this.props.search;
    this.initMapAndMarker(this.props.search);
  }

  componentWillReceiveProps(nextProps){
    console.log('in MapContainer componentWillReceiveProps', nextProps);
    if (this.props.search !== nextProps.search){
      // const search = nextProps.search
      this.initMapAndMarker(nextProps.search);
    }
  }

  initMapAndMarker(search){
    const googleMaps = window.google.maps;

    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: search.latitude, lng: search.longitude }
    });

    const marker = new googleMaps.Marker({
      position: { lat: search.latitude, lng: search.longitude },
      map: map,
    });

    // const transitLayer = new googleMaps.TransitLayer();
    // transitLayer.setMap(map);

    const cityCircle = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: { lat: search.latitude, lng: search.longitude },
      radius: search.radius ? search.radius : 800
    });

    const service = new googleMaps.places.PlacesService(map);
    service.nearbySearch({
      location: { lat: search.latitude, lng: search.longitude },
      radius: search.radius ? search.radius : 800,
      type: ['transit_station']
    }, callback);
    console.log(search.latitude, search.longitude);

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
      googleMaps.event.addListener(marker, 'click', function () {
        // console.log(place);
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

  }

  render() {
    console.log('--------------------------------');
    console.log('redering in MapContainer');
    return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
  }

}

export default MapContainer;