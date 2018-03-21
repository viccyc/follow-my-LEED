import axios from 'axios';
import React, { Component } from 'react';

import InfoContent from './InfoContent';

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
      center: location,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
          'styled_map']
      }   
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

    const styledMapType = new googleMaps.StyledMapType(
      [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6195a0"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": "0"
                },
                {
                    "saturation": "0"
                },
                {
                    "color": "#f5f5f2"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "-3"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bae5ce"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fac9a9"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#787878"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#0a00ff"
                },
                {
                    "saturation": "-77"
                },
                {
                    "gamma": "0.57"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#43321e"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#ff6c00"
                },
                {
                    "lightness": "4"
                },
                {
                    "gamma": "0.75"
                },
                {
                    "saturation": "-68"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#eaf6f8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c7eced"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-49"
                },
                {
                    "saturation": "-53"
                },
                {
                    "gamma": "0.79"
                }
            ]
        }
    ],
      { name: 'Styled Map' });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    let prevInfowindow = false; 
    axios.get('/api/projects')
    .then(res => { 
      // Create markers.
      res.data.result.forEach(function(item) {
        // console.log("creating marker, item: ", item);
        const marker = new googleMaps.Marker({
          position: { lat: item.lat, lng: item.lng },
          icon: icons[item.certification_level_id],
          map: map
        });
  
        const infowindow = new googleMaps.InfoWindow();
          googleMaps.event.addListener(marker, 'click', function() {
          const createdHTML = InfoContent(item);
          if (prevInfowindow) {
           prevInfowindow.close();
          }
          infowindow.setContent(createdHTML);
          prevInfowindow = infowindow;
          infowindow.open(map, this);
        });
      });
    });
  }

  render() {
    return (  
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-10 col-sm-12 pl-0">
            <div id='map' style={{ height: `88vh`, width: `100%` }} />
          </div>
          <div id="tableDiv" className="col-lg-2 col-sm-12 pr-0">
            <table id="table" className="table table-bordered">
                <tbody>
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
                </tbody>
              </table>
         </div>
        </div>
      </div>
   )
  };
}