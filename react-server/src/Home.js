import React, { Component } from 'react';

import backgroundImg from './images/calgary_tower-min.png';
import './Home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      autocomplete: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
    // this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // const place = this.state.autocomplete.getPlace();
    // const address = place.formatted_address;
    // const longitude = place.geometry.location.lng();
    // const latitude = place.geometry.location.lat();
    // const {location} = this.state
    // location.address = address;
    // location.longitude = longitude;
    // location.latitude = latitude;
    // console.log(`clicked GO in Home page,`, address, longitude, latitude);
    // this.setState({location});
    // console.log(this.props.handleSearch);
    const place = this.state.autocomplete.getPlace();
    // console.log(place);
    const address = {
      name: place.formatted_address,
      lat: parseFloat(place.geometry.location.lat().toFixed(7)),
      lng: parseFloat(place.geometry.location.lng().toFixed(7))
    };
    const pathname = this.props.location.pathname;
    this.props.handleSearch(address, pathname);
    this.state.value = '';
  }

  initAutocomplete() {
    const googleMaps = window.google.maps;
    const autocomplete = new googleMaps.places.Autocomplete(document.getElementById('searchTextField'));
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const circle = new googleMaps.Circle({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  
    this.setState({ autocomplete: autocomplete });
  }

  // clickHandler(e){
  //   e.preventDefault();
  //   const action = e.target.href.split('3000')[1];
  //   this.setState({action: action});
  // }

  render() {
    // console.log('in home page, state.location.address is ', this.state.location.address);
    //when submit is clicked and state is reset, trigger rerender the page and redirect to target page
    // if (this.state.location.address){
    //   // console.log('in redirect if statement from home page', this.state.action);
    //   return <Redirect to={{
    //     pathname: this.state.action,
    //     state: {
    //       data: {
    //       location: this.state.location
    //       }
    //     }
    //   }} />
    // }
    return (
      <main id="mainPhoto" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <h1 id="mainTitle" className="title text-center">Follow My LEED</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">Location</span>
            </div>
            <input name="location"
              id="searchTextField"
              type="text"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder='Enter a location'
              value={this.state.value} 
              onChange={this.handleChange} />
           <button id="go-button" type="submit" className="btn btn-primary">Go!</button>
          </div>
          {/* <hr className="my-4" /> */}
        </form>
      </main>      
    );
  }
}
