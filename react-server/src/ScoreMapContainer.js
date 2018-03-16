import React, { Component } from 'react';
import axios from 'axios';

import info from './images/info.png';
import m1 from './images/m1.png';

// import supermarket from './images/supermarket.png';
// import clothing from './images/clothing.png';
// import convinientStore from './images/convinientStore.png';
// import hardwareStore from './images/hardwareStore.png';
// import pharmacy from './images/pharmacy.png';
// import bank from './images/bank.png';
// import gym from './images/gym.png';
// import haircare from './images/haircare.png';
// import laundry from './images/laundry.png';
// import food from './images/food.png';
// import art from './images/art.png';
// import education from './images/education.png';
// import entertainment from './images/entertainment.png';
// import government from './images/government.png';
// import doctor from './images/doctor.png';
// import worship from './images/worship.png';
// import police from './images/police.png';
// import postOffice from './images/postOffice.png';
// import library from './images/library.png';
// import park from './images/park.png';
import crossroads from './images/crossroads.png';



class MapContainer extends Component {
  constructor(props) {
    super(props);
    console.log('initializing MapContainer constructor');
    this.state = {services: {}};
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

    const googleMaps = window.google.maps;
    const MarkerClusterer = window.Cluster;

    const map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: search.latitude, lng: search.longitude }
    });

    const marker = new googleMaps.Marker({
      position: { lat: search.latitude, lng: search.longitude },
      map: map,
    });

    const cityCircle = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: { lat: search.latitude, lng: search.longitude },
      radius: search.radius ? search.radius : 800
    });

    const service = new googleMaps.places.PlacesService(map);
    const location = { lat: search.latitude, lng: search.longitude };
    let markerList = [];

    function showService(type, icon, label){
      service.nearbySearch({
        location: location,
        radius: '800',
        type: type
      }, (results, status)=>{
        if (status === googleMaps.places.PlacesServiceStatus.OK) {
          countService(services, label, results);
          results.forEach((place) => {
            const marker = new googleMaps.Marker({
              map: map,
              icon: icon,
              position: place.geometry.location
            });
            markerList.push(marker);
            const infowindow = new googleMaps.InfoWindow();
            googleMaps.event.addListener(marker, 'click', function () {
              // console.log(place);
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
          });
        }
      });
    }

  let services = this.state.services;
  const countService = (services, label, data) => {
    services[label] = data.length;
    this.setState({services});
  }

  // const markerCluster = new MarkerClusterer(map, markerList, { imagePath: m1 });

  // const communityResources = {};
  //   communityResources['Supermarket'] = ['supermarket'],
  //   communityResources['Supermarket'] = ['supermarket'],
  //   communityResources['Supermarket'] = ['supermarket'],
  //   communityResources['Supermarket'] = ['supermarket'],


    // Food Retail:
    // Supermarket;
    // showService(['supermarket'], info, 'Supermarket');
    // Grocery with produce section;

    // Community - Serving Retail:
    // Clothing store or department store selling clothes;
    showService(['department_store', 'clothing_store'], info, 'Clothing store/department store selling clothes');
    // Convenience Store;
    showService(['convenience_store'], info, 'Convenience Store');
    // Farmers Market;
    // Hardware Store;
    showService(['hardware_store'], info, 'Hardware Store');
    // Pharmacy;
    showService('pharmacy', info, 'Pharmacy');
    // Other Retail;

    // Services:
    // Bank;
    showService(['bank'], info, 'Bank');
    // Gym, health club, exercise studio;
    showService(['gym'], info, 'Gym, health club, exercise studio');
    // Hair care;
    showService(['hair_care'], info, 'Hair care');
    // Laundry, dry cleaner;
    showService(['laundry'], info, 'Laundry/dry cleaner');
    // Restaurant, café, diner(excluding those with only drive - thru service);
    showService(['bar', 'cafe', 'restaurant'], info, 'Restaurant/café/diner');

    //Civic and Community Facilities
    //Adult or senior care(licensed)
    //Child care(licensed)
    //Community or recreation center
    //Cultural arts facility(museum, performing arts)
    showService(['art_gallery', 'museum'], info, 'Cultural arts facility');
    //Education facility(e.g.K - 12 school, university, adult education center, vocational school, community college)
    showService(['school'], info, 'Education facility');
    //Family entertainment venue(e.g.theater, sports)
    showService(['bowling_alley', 'movie_theater'], info, 'Family entertainment venue');
    //Government office that serves public on-site
    showService(['local_government_office', 'city_hall'], info, 'Government office serving public on-site');
    // Medical clinic or office that treats patients
    showService(['hospital', 'physiotherapist', 'dentist', 'doctor',], info, 'Medical clinic/office');
    // Place of worship
    showService(['church'], info, 'Place of worship');
    // Police or fire station
    showService(['police', 'fire_station'], info, 'Police or fire station');
    // Post office
    showService(['post_office'], info, 'Post office');
    // Public library
    showService(['library'], info, 'Public library');
    // Public park
    showService(['park'], info, 'Public park');
    // Social services center


    showService(['transit_station'], crossroads, 'Intersections');


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

        // console.log('number of results', list.length);

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
            console.log('number of intersections', intersections.length);

            let list = [];
            intersections.forEach(intersection => {
              list.push(intersection.id);
            })
            console.log('intersections', list);
            return intersections;
          })
          .then(intersections => {
            intersections.forEach(intersection => {
              let marker = new googleMaps.Marker({
                map: map,
                icon: crossroads,
                position: {lat: intersection.lat, lng: intersection.lon }
              });
            })
          })
      })

  }

  render() {
    console.log('--------------------------------');
    console.log('redering in MapContainer');
    return (<div id='map' style={{ height: `600px`, width: `100%` }} />);
  }

}

export default MapContainer;