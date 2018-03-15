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
      console.log('in axios data = ', data);
      this.setState({
        data: data
      } , () => this.setupMapandMarker(this.props.search));

      console.log('in Projects, axios get call this.state.data: ', this.state.data)
    })

    //this.setupMapandMarker(this.props.search);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setupMapandMarker(nextProps.search);
  }
  
  setupMapandMarker(search) {
    console.log('setupMapandMarker search: ', search);
    console.log('data ', this.state.data);
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
    
    // Create markers.
    // console.log("in ProjectsMapContainer nextProps.search.data.result: ", nextProps.search.data.result);
    this.state.data.result.forEach(function(item) {
      // console.log("type of lat: ", typeof item.lat);
      const marker = new googleMaps.Marker({
        position: { lat: item.lat, lng: item.lng },
        icon: icons[item.certification_level_id],
        map: map
      });
      console.log('marker is ', marker);
    });

  }
  
  render() {
    return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
  };
}

export default ProjectsMapContainer;