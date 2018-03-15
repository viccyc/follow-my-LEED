import React, { Component } from 'react';
import bus from './images/bus2.png';
import axios from 'axios';

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

    const cityCircle = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: { lat: this.props.search.latitude, lng: this.props.search.longitude },
      radius: this.props.search.radius? this.props.search.radius : 100
    });


    // get all ways around a certain address
    // axios.get(`http://overpass-api.de/api/interpreter?[out:json];way["footway"!~"."]["cycleway"!~"."](around:800,${this.props.search.latitude},${this.props.search.longitude});out;`)
    //   .then(results => {
    //     // console.log(results.data.elements);
    //     return results.data.elements;
    //   })
    //   // remove duplicate nodes within a certain way
    //   // to prep data for the next step
    //   .then(elements => {
    //     elements.forEach(element => {
    //       element.nodes = element.nodes.sort().filter((node, pos, array) => {
    //         return !pos || node !== array[pos-1];
    //       })
    //     });
    //     return elements;
    //   })
    //   // put all nodes in one array
    //   // filter out all nodes that only appear once
    //   // output a list of unique node ids
    //   .then(newElements => {
    //     let nodes = [];
    //     newElements.forEach(newElement => {
    //       nodes = nodes.concat(newElement.nodes);
    //     })
        
    //     nodes = nodes.sort().filter((node, index, array) => {
    //       return array.indexOf(node) === index && array.lastIndexOf(node) !== index;
    //     })
    //     // console.log(nodes);
    //     return nodes;
    //   })
    //   .then(nodes => {
    //     let intersections = [];

    //     axios.get(`http://overpass-api.de/api/interpreter?[out:json];node["footway"!~"."]["cycleway"!~"."](around:800,${this.props.search.latitude},${this.props.search.longitude});out;`)
    //       .then(results => {
    //         // console.log(results.data.elements);
    //         // console.log(nodes);
    //         intersections = results.data.elements.filter(element => {
    //           return nodes.indexOf(element.id) !== -1;
    //         });
    //         console.log(intersections);
    //         return intersections;
    //       })
    //       .then(intersections => {
    //         intersections.forEach(intersection => {
    //           let marker = new googleMaps.Marker({
    //             map: map,
    //             position: {lat: intersection.lat, lng: intersection.lon }
    //           });
    //         })
    //       })

    //   })


// get all ways around a certain address
axios.get('http://overpass-api.de/api/interpreter?[out:json];way(around:400,51.041853,-114.072356);out;')
  .then(results => {
    results = results.data.elements.filter(element => {
      return element.hasOwnProperty('tags') &&
        element.tags.hasOwnProperty('highway') &&
        !element.tags.hasOwnProperty('bridge') &&
        // !element.tags.hasOwnProperty('cycleway') &&
        !(element.tags.hasOwnProperty('service') && (element.tags.service === 'parking_aisle' || element.tags.service === 'driveway' || element.tags.service === 'alley')) &&
        // element.tags.highway !== 'service' &&
        // element.tags.highway !== 'traffic_signals' &&
        element.tags.highway !== 'cycleway' &&
        element.tags.highway !== 'footway'
    })

    // console.log(results);
    return results;
  })
  // remove duplicate nodes within a certain way
  // to prep data for the next step
  .then(elements => {
    elements.forEach(element => {
      element.nodes = element.nodes.sort().filter((node, pos, array) => {
        return !pos || node !== array[pos-1];
      })
    });
    return elements;
  })
  // put all nodes in one array
  // filter out all nodes that only appear once
  // output a list of unique node ids
  .then(newElements => {
    let nodes = {};
    // newElements.forEach(newElement => {
    //   nodes = nodes.concat(newElement.nodes);
    // })

    newElements.forEach(newElement => {
      newElement.nodes.forEach(node => {
        if (!nodes.hasOwnProperty(node)) {
          nodes[node] = [newElement.tags.name? newElement.tags.name : newElement.id];
        } else {
          nodes[node].push(newElement.tags.name? newElement.tags.name : newElement.id);
        }
      })
    })
    
    let list = [];
    for (let node in nodes) {
      nodes[node] = nodes[node].filter((item, index, array) => {
        return !(array.indexOf(item) === index && array.lastIndexOf(item) !== index);
      });
      if (nodes[node].length > 1) {
        list.push(node);
      }
    }

    console.log(list.length);
    
    return list;
  })
  .then(nodes => {
    let intersections = [];

    axios.get('http://overpass-api.de/api/interpreter?[out:json];node(around:400,51.041853,-114.072356);out;')
      .then(results => {
        // console.log(results.data.elements);
        // console.log(nodes);
        intersections = results.data.elements.filter(element => {
          return nodes.indexOf(element.id.toString()) !== -1;
        });
        // console.log(intersections);
        console.log(intersections.length);

        let list = [];
        intersections.forEach(intersection => {
          list.push(intersection.id);
        })
        console.log(list);
        return intersections;
      })
      .then(intersections => {
        intersections.forEach(intersection => {
          let marker = new googleMaps.Marker({
            map: map,
            position: {lat: intersection.lat, lng: intersection.lon }
          });
        })
      })
  })

    // const service = new googleMaps.places.PlacesService(map);
    // service.nearbySearch({
    //   location: { lat: this.props.search.latitude, lng: this.props.search.longitude },
    //   radius: this.props.search.radius? this.props.search.radius : 800,
    //   type: ['transit_station']
    // }, callback);
    // console.log(this.props.search.latitude, this.props.search.longitude);

    // function callback(results, status) {
    //   if (status === googleMaps.places.PlacesServiceStatus.OK) {
    //     console.log(results);
    //     for (let i = 0; i < results.length; i++) {
    //       createMarker(results[i]);
    //     }
    //   }
    // }

    // function createMarker(place) {
    //   const placeLoc = place.geometry.location;
    //   const marker = new googleMaps.Marker({
    //     map: map,
    //     icon: bus,
    //     position: place.geometry.location
    //   });
      
    //   const infowindow = new googleMaps.InfoWindow();
    //   googleMaps.event.addListener(marker, 'click', function() {
    //     // console.log(place);
    //     infowindow.setContent(place.name);
    //     infowindow.open(map, this);
    //   });
    // }

  }

  render() {
    return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
  };

}

export default MapContainer;