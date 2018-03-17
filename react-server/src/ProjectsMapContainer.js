import React, { Component } from 'react';
import certified from './images/certified.png';
import silver from './images/silver.png';
import gold from './images/gold.png';
import platinum from './images/platinum.png';
import axios from 'axios';
import InfoContent from './InfoContent';

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

    // Create markers.
    this.state.data.result.forEach(function(item) {
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

  }
  
  render() {
    return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
  };
}

export default ProjectsMapContainer;