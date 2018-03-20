import axios from 'axios';
import React, { Component } from 'react';

import InfoContent from './InfoContent';
import Home from './Home';

import certified from './images/certified.png';
import silver from './images/silver.png';
import gold from './images/gold.png';
import platinum from './images/platinum.png';

export default class Projects extends Component {

  constructor(props) {
    super(props);
    this.initMapAndMarker = this.initMapAndMarker.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount');
    if (this.props.address) {
      this.initMapAndMarker(this.props.address);
    };
  }

  componentDidUpdate() {
    console.log('did update');
    if (this.props.address) {
      this.initMapAndMarker(this.props.address);
    };
  }
  
  initMapAndMarker(address) {
    console.log('initMapAndMarker');
    const googleMaps = window.google.maps;
    const location = { lat: address.lat, lng: address.lng };
    
    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location
    });
    
    const marker = new googleMaps.Marker({
      position: location,
      map: map,
    });

    const circle = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: location,
      radius: 800
    });
    
    const icons = {
      1: certified,
      2: silver,
      3: gold, 
      4: platinum
    };

    axios.get('/api/projects')
    .then(res => { 
      // Create markers.
      res.data.result.forEach(function(item) {
        // console.log("creating marker, item: ", item);
        const marker = new googleMaps.Marker({
          position: { lat: item.lat, lng: item.lng },
          // icon: item.level,
          icon: icons[item.certification_level_id],
          map: map
        });
  
        const infowindow = new googleMaps.InfoWindow();
        googleMaps.event.addListener(marker, 'click', function() {
          // infowindow.setContent(item.name + ',  ' + certLevel[item.certification_level_id]);
          // infowindow.setContent(InfoContent);
          // const content = "<html><head><h1><infoContnet/h1></head><body><div><p> Hello InfoContent! </p></div></body></html>";
          const createdHTML = InfoContent(item);
          infowindow.setContent(createdHTML);
          infowindow.open(map, this);
        });
      });
    });

  }

  render() {
    // return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
    return (  
      <div className="container mt-2">
        <div className="row">
          <div className="col-10 pl-0">
            <div id='map' style={{ height: `600px`, width: `100%` }} />
          </div>
          <div id="tableDiv" className="col-2 pr-0">
          <table id="scoreTable">
              <tr>
                <td><img src={platinum} /></td>
               <td id="tableCell">LEED Platinum</td>
              </tr>
              <tr>
                <td><img src={gold} /></td>
                <td id="tableCell">LEED Gold</td>
              </tr>
              <tr>
                <td><img src={silver} /></td>
                <td id="tableCell">LEED Silver</td>
              </tr>
              <tr>
                <td><img src={certified} /></td>
                <td id="tableCell">LEED Certified</td>
              </tr>
            </table>
         </div>
        </div>
      </div>
   )
  };
}