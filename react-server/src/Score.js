import axios from 'axios';
import React, { Component } from 'react';

import Home from './Home';
import ScoreTable from './ScoreTable';

import info from './images/info.png';
// import m1 from './images/m1.png';

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

class ScoreMapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: {},
      criteriaClicked: []
    };
    // console.log('initializing MapContainer constructor');
    this.initMapAndMarker = this.initMapAndMarker.bind(this);
    this.handleTableClick = this.handleTableClick.bind(this);
  }

  componentDidMount() {
    console.log('in MapContainer componentDidMount');
    if (this.props.address) {
      this.initMapAndMarker(this.props.address);
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    // console.log('in MapContainer componentWillReceiveProps', nextProps);
    if (this.props.search !== nextProps.search) {
      this.setState({ 
        services: {},
        criteriaClicked: []
      })
      // this.initMapAndMarker(nextProps.search);
    };
  }

  componentDidUpdate() {
    console.log('did update');
    if (this.props.address) {
      this.initMapAndMarker(this.props.address);
    };
  }

  // componentWillUpdate(nextProps) {
    // console.log('will update');
    // if (nextProps.address) {
    //   this.initMapAndMarker(nextProps.address);
    // };
  // }

  initMapAndMarker(address){
    const googleMaps = window.google.maps;
    const MarkerClusterer = window.Cluster;
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

    // const service = new googleMaps.places.PlacesService(map);
    // let markerList = [];

    // function showService(type, icon, label){
    //   service.nearbySearch({
    //     location: location,
    //     radius: '800',
    //     type: type
    //   }, (results, status)=>{
    //     if (status === googleMaps.places.PlacesServiceStatus.OK) {
    //       countService(services, label, results);
    //       results.forEach((place) => {
    //         const marker = new googleMaps.Marker({
    //           map: map,
    //           icon: icon,
    //           position: place.geometry.location
    //         });
    //         markerList.push(marker);
    //         const infowindow = new googleMaps.InfoWindow();
    //         googleMaps.event.addListener(marker, 'click', function () {
    //           // console.log(place);
    //           infowindow.setContent(place.name);
    //           infowindow.open(map, this);
    //         });
    //       });
    //     }
    //   });
    // }

    // let services = this.state.services;
    // const countService = (services, label, data) => {
    //   services[label] = data.length;
    //   this.setState({services});
    // }

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

    // // Community - Serving Retail:
    // // Clothing store or department store selling clothes;
    // showService(['department_store', 'clothing_store'], info, 'Clothing store/department store selling clothes');
    // // Convenience Store;
    // showService(['convenience_store'], info, 'Convenience Store');
    // // Farmers Market;
    // // Hardware Store;
    // showService(['hardware_store'], info, 'Hardware Store');
    // // Pharmacy;
    // showService('pharmacy', info, 'Pharmacy');
    // // Other Retail;

    // // Services:
    // // Bank;
    // showService(['bank'], info, 'Bank');
    // // Gym, health club, exercise studio;
    // showService(['gym'], info, 'Gym, health club, exercise studio');
    // // Hair care;
    // showService(['hair_care'], info, 'Hair care');
    // // Laundry, dry cleaner;
    // showService(['laundry'], info, 'Laundry/dry cleaner');
    // // Restaurant, café, diner(excluding those with only drive - thru service);
    // showService(['bar', 'cafe', 'restaurant'], info, 'Restaurant/café/diner');

    // //Civic and Community Facilities
    // //Adult or senior care(licensed)
    // //Child care(licensed)
    // //Community or recreation center
    // //Cultural arts facility(museum, performing arts)
    // showService(['art_gallery', 'museum'], info, 'Cultural arts facility');
    // //Education facility(e.g.K - 12 school, university, adult education center, vocational school, community college)
    // showService(['school'], info, 'Education facility');
    // //Family entertainment venue(e.g.theater, sports)
    // showService(['bowling_alley', 'movie_theater'], info, 'Family entertainment venue');
    // //Government office that serves public on-site
    // showService(['local_government_office', 'city_hall'], info, 'Government office serving public on-site');
    // // Medical clinic or office that treats patients
    // showService(['hospital', 'physiotherapist', 'dentist', 'doctor',], info, 'Medical clinic/office');
    // // Place of worship
    // showService(['church'], info, 'Place of worship');
    // // Police or fire station
    // showService(['police', 'fire_station'], info, 'Police or fire station');
    // // Post office
    // showService(['post_office'], info, 'Post office');
    // // Public library
    // showService(['library'], info, 'Public library');
    // // Public park
    // showService(['park'], info, 'Public park');
    // // Social services center

    // if (this.state.criteriaClicked.includes('access_to_transit')) {
    //   showService(['transit_station'], crossroads, 'Intersections');
    // }


    // get all ways around a certain address
    if (this.state.criteriaClicked.includes('street_network')) {
      axios.get(`http://overpass-api.de/api/interpreter?[out:json];way(around:400,${address.lat},${address.lng});out;`)
        .then(results => {
          results = results.data.elements.filter(element => {
            return element.hasOwnProperty('tags') &&
              element.tags.hasOwnProperty('highway') &&
              !element.tags.hasOwnProperty('bridge') &&
              !(element.tags.hasOwnProperty('service') && (element.tags.service === 'parking_aisle' || element.tags.service === 'driveway' || element.tags.service === 'alley')) &&
              element.tags.highway !== 'cycleway' &&
              element.tags.highway !== 'footway'
          }) 
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
  
          return list;
        })
        .then(nodes => {
          let intersections = [];
  
          axios.get(`http://overpass-api.de/api/interpreter?[out:json];node(around:400,${address.lat},${address.lng});out;`)
            .then(results => {
              intersections = results.data.elements.filter(element => {
                return nodes.indexOf(element.id.toString()) !== -1;
              });
              console.log(intersections);
              return intersections;
            })
            .then(intersections => {
              intersections.forEach(intersection => {
                console.log(typeof intersection.lat);
                const intersectionMarker = new googleMaps.Marker({
                  map: map,
                  icon: crossroads,
                  position: { lat: intersection.lat, lng: intersection.lon }
                });
              })
            })
        })
    }

  }

  handleTableClick(value) {
    let criteriaClicked = this.state.criteriaClicked;
    if (criteriaClicked.includes(value)) {
      criteriaClicked = criteriaClicked.filter(criterion => criterion !== value);
    } else {
      criteriaClicked.push(value);
    }
    this.setState({ criteriaClicked: criteriaClicked });  
  }

  render() {
    if (this.props.address) {
      return (      
        <div className="container mt-2">
          <div className="row">
            <div className="col-8 pl-0">
              <div id='map' style={{ height: `600px`, width: `100%` }} />
            </div>
            <div className="col-4 pr-0">
              <ScoreTable handleTableClick={this.handleTableClick} />
            </div>
          </div>
        </div>
        );
    } else {
      return (<Home location={this.props.location} autocomplete={this.props.autocomplete} handleSearch={this.props.handleSearch} />
        // <main style={{ backgroundImage: `url(${backgroundImg})` }}>
        //   <h1 className="title text-center">Follow My LEED</h1>
        //   <form onSubmit={this.handleSubmit}>
        //     <div className="input-group input-group-lg">
        //       <div className="input-group-prepend">
        //         <span className="input-group-text" id="inputGroup-sizing-lg">Location</span>
        //       </div>
        //       <input name="location"
        //         id="searchTextField"
        //         type="text"
        //         className="form-control"
        //         aria-label="Large"
        //         aria-describedby="inputGroup-sizing-sm"
        //         value={this.state.value} 
        //         onChange={this.handleChange} />
        //     </div>
        //     {/* <hr className="my-4" /> */}
        //     <button type="submit" className="btn btn-primary">Go!</button>
        //   </form>
        // </main>      
      );
    }
  }

}

export default ScoreMapContainer;