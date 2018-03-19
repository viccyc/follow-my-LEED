import axios from 'axios';
import React, { Component } from 'react';

import Home from './Home';
import ScoreTable from './ScoreTable';

import info from './images/info.png';
import crossroads from './images/crossroads.png';

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: {},
      area: null,
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

  componentWillReceiveProps(nextProps) {
    // console.log('in MapContainer componentWillReceiveProps', nextProps);
    // if (this.props.address !== nextProps.address) {
    this.setState({
      services: {},
      criteriaClicked: []
    });
    this.initMapAndMarker(nextProps.search);
  }

  initMapAndMarker(address) {
    const googleMaps = window.google.maps;
    const MarkerClusterer = window.MarkerClusterer;

    const location = { lat: address.latitude, lng: address.longitude };

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


    const styledMapType = new googleMaps.StyledMapType(
      [
        { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#c9b2a6' }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#dcd2be' }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ae9e90' }]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#93817c' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{ color: '#a5b076' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#447530' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#f5f1e6' }]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{ color: '#fdfcf8' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#f8c967' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#e9bc62' }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{ color: '#e98d58' }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#db8555' }]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#806b63' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#8f7d77' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#ebe3cd' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#b9d3c2' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#92998d' }]
        }
      ],
      { name: 'Styled Map' });



    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');


    const drawingManager = new googleMaps.drawing.DrawingManager({
      drawingMode: googleMaps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: googleMaps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      }
    });

    drawingManager.setMap(map);

    googleMaps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
      const area = googleMaps.geometry.spherical.computeArea(polygon.getPath());
      console.log('polygon complete, area is ', Math.ceil(area), 'suqare meters');
      this.setState({ area: Math.ceil(area) });
    });

    const cityCircle = new googleMaps.Circle({
      strokeWeight: 0,
      fillColor: '#87cefa',
      fillOpacity: 0.25,
      map: map,
      center: location,
      radius: 800
    });

    let markersList = [];
    let services = this.state.services;
    const markerCluster = new MarkerClusterer(map, markersList,
      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
    );
    const addNewMarker = MarkerClusterer.prototype.addMarker.bind(markerCluster);
    const service = new googleMaps.places.PlacesService(map);

    const showService = (type, label) => {
      const request = {
        location: location,
        radius: '800',
        type: type
      };
      const callback = (results, status, pagination) => {
        if (status !== googleMaps.places.PlacesServiceStatus.OK) return;
        countService(services, label, results);
        results.forEach((place) => {
          const marker = new googleMaps.Marker({
            icon: info,
            position: place.geometry.location
          });
          const infowindow = new googleMaps.InfoWindow();
          googleMaps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
          addNewMarker(marker, true);
        });
        if (pagination.hasNextPage) {
          pagination.nextPage();
        };
      }
      service.nearbySearch(request, callback);
      markerCluster.redraw();
    };

    const countService = (services, label, data) => {
      if (services[label]) {
        services[label] += data.length;
        this.setState({ services });
        return;
      }
      services[label] = data.length;
      this.setState({ services });
    }

    const showTransit = (type, label) => {
      const request = {
        location: location,
        radius: '400',
        type: type
      };
      const callback = (results, status) => {
        if (status !== googleMaps.places.PlacesServiceStatus.OK) return;
        countService(services, label, results);
        results.forEach((place) => {
          const marker = new googleMaps.Marker({
            map: map,
            icon: crossroads,
            position: place.geometry.location
          });
          const infowindow = new googleMaps.InfoWindow();
          googleMaps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
          });
        });

      };
      service.nearbySearch(request, callback);
    }

    showTransit(['transit_station'], 'Intersections');

    // // Food Retail:
    // // Supermarket;
    showService(['supermarket'], 'Supermarket');
    // // Grocery with produce section;

    // // // Community - Serving Retail:
    // // // Clothing store or department store selling clothes;
    showService(['department_store', 'clothing_store'], 'Clothing store/department store selling clothes');
    // // // Convenience Store;
    showService(['convenience_store'], 'Convenience Store');
    // // // Farmers Market;
    // // // Hardware Store;
    showService(['hardware_store'], 'Hardware Store');
    // // // Pharmacy;
    showService(['pharmacy'], 'Pharmacy');
    // // // Other Retail;

    // // // Services:
    // // // Bank;
    showService(['bank'], 'Bank');
    // // // Gym, health club, exercise studio;
    showService(['gym'], 'Gym, health club, exercise studio');
    // // // Hair care;
    showService(['hair_care'], 'Hair care');
    // // // Laundry, dry cleaner;
    showService(['laundry'], 'Laundry/dry cleaner');
    // // // Restaurant, café, diner(excluding those with only drive - thru service);
    showService(['bar', 'cafe', 'restaurant'], 'Restaurant/café/diner');

    // // //Civic and Community Facilities
    // // //Adult or senior care(licensed)
    // // //Child care(licensed)
    // // //Community or recreation center
    // // //Cultural arts facility(museum, performing arts)
    showService(['art_gallery', 'museum'], 'Cultural arts facility');
    // // //Education facility(e.g.K - 12 school, university, adult education center, vocational school, community college)
    showService(['school'], 'Education facility');
    // // //Family entertainment venue(e.g.theater, sports)
    showService(['bowling_alley', 'movie_theater'], 'Family entertainment venue');
    // // //Government office that serves public on-site
    showService(['local_government_office', 'city_hall'], 'Government office serving public on-site');
    // // // Medical clinic or office that treats patients
    showService(['hospital', 'physiotherapist', 'dentist', 'doctor',], 'Medical clinic/office');
    // // // Place of worship
    showService(['church'], 'Place of worship');
    // // // Police or fire station
    showService(['police', 'fire_station'], 'Police or fire station');
    // // // Post office
    showService(['post_office'], 'Post office');
    // // // Public library
    showService(['library'], 'Public library');
    // // // Public park
    showService(['park'], 'Public park');
    // // // Social services center




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