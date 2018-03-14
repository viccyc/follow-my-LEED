import React, { Component } from 'react';
import certified from './images/certified.png';
import silver from './images/silver.png';
import gold from './images/gold.png';
import platinum from './images/platinum.png';

class ProjectsMapContainer extends Component {
  
  componentDidMount() {

    const googleMaps = window.google.maps;

    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: this.props.search.latitude, lng: this.props.search.longitude }
    });

    const icons = {
      1: certified,
      2: silver,
      3: gold, 
      4: platinum
    };

    const data = [
      {
      name: "Nexen Wellness Centre",
      address: "801 7 Ave. SW, 10th Floor",
      city: "Calgary",
      lat: 51.0465,
      lng: -114.079,
      certification_level_id: 1
      },
      {
      name: "IHS Calgary Office",
      address: "1331 MacLeod Trail SE",
      city: "Calgary",
      lat: 51.0398,
      lng: -114.059,
      certification_level_id: 3
      },
      {
      name: "Municipal Building 9th Floor",
      address: "9th Fl., 800 Macleod Trail SE",
      city: "Calgary",
      lat: 51.0456,
      lng: -114.057,
      certification_level_id: 2
      },
      {
        name: "FT Services - Corporate Office",
        address: "715 - 5th Avenue S.W.",
        city: "Calgary",
        lat: 51.0485,
        lng: -114.077,
        certification_level_id: 4
      }
    ]

    // Create markers.
    data.forEach(function(item) {
      var marker = new googleMaps.Marker({
        position: { lat: item.lat, lng: item.lng },
        icon: icons[item.certification_level_id],
        map: map
      });
    });
  }

    render() {
      return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
    };
}

export default ProjectsMapContainer;