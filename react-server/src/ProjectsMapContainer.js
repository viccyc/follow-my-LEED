import React, { Component } from 'react';
import certified from './images/certified.png';
import silver from './images/silver.png';
import gold from './images/gold.png';
import platinum from './images/platinum.png';
import axios from 'axios';

class ProjectsMapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.setupMapandMarker = this.setupMapandMarker.bind(this);
  }
  
  componentWillMount() {    
    axios.get(`/projects`)
    .then(res => {
      const data = res.data;
      this.setState({
        data: data
      } , () => this.setupMapandMarker(this.props.search));
    })
  }
  
  componentWillReceiveProps(nextProps) {
    this.setupMapandMarker(nextProps.search);
  }
  
  setupMapandMarker(search) {
    // console.log('setupMapandMarker search: ', search);
    // console.log('data ', this.state.data);
    const googleMaps = window.google.maps;
    
    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: search.latitude, lng: search.longitude }
    });

    const centreLocMarker = new googleMaps.Marker({
      position: { lat: search.latitude, lng: search.longitude },
      map: map,
    });
    
    const icons = {
      1: certified,
      2: silver,
      3: gold, 
      4: platinum
    };
    
    const certLevel = {
      1: 'LEED Certified',
      2: 'LEED Silver',
      3: 'LEED Gold', 
      4: 'LEED Platinum'
    };

    // Create markers.
    this.state.data.result.forEach(function(item) {
      const marker = new googleMaps.Marker({
        position: { lat: item.lat, lng: item.lng },
        icon: icons[item.certification_level_id],
        map: map
      });

      const infowindow = new googleMaps.InfoWindow();
      googleMaps.event.addListener(marker, 'click', function() {
        infowindow.setContent(item.name + ',  ' + certLevel[item.certification_level_id]);
        infowindow.open(map, this);
      });
    });

  }
  
  render() {
    return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
  };
}

export default ProjectsMapContainer;