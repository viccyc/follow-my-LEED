import React, { Component } from 'react';

import backgroundImg from './images/calgary_cityscape.png';
import './Home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      autocomplete: null,
      title: {
        '/': 'FOLLOW MY LEED',
        '/find_score': 'CALCULATE LEED SCORE',
        '/projects': 'SHOW LEED PROJECTS'
      },
      focus: false,
      // place: null,
      submitButton: true
    };
    this.blurHandler = this.blurHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
    // this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  blurHandler() {

    // window.google.maps.event.addListener(this.state.autocomplete, 'place_changed', function () {
    //   var place = this.state.autocomplete.getPlace();
    //   console.log(place);
    // });
    this.setState({ focus: false });
  }

  focusHandler() {
    this.setState({ focus: true });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const place = this.state.autocomplete.getPlace();
    if (!place) {
    }
    const address = {
      name: place.formatted_address,
      lat: parseFloat(place.geometry.location.lat().toFixed(7)),
      lng: parseFloat(place.geometry.location.lng().toFixed(7))
    };
    console.log(this.props.location.pathname);
    // const pathname = this.props.location.pathname;
    this.props.handleSearch(address, this.props.location.pathname);
    this.state.value = '';
  }

  initAutocomplete() {
    const googleMaps = window.google.maps;
    const autocomplete = new googleMaps.places.Autocomplete(document.getElementById('searchTextField'));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const circle = new googleMaps.Circle({
          center: {
            lat: position.coords.lat,
            lng: position.coords.lng
          },
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  
  // let place; 
  // googleMaps.event.addListener(autocomplete, 'place_changed', () => {
  //   place = this.state.autocomplete.getPlace();
  // });

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
    // const pathname = this.props.location.pathname;
    const flashMessage = () => {
      if (this.state.focus) {
        return (
          <div className="alert alert-warning" role="alert">
            Please select from one of the drop down options.
          </div>
        );
      }
    };
    return (
      <main style={{ backgroundImage: `url(${backgroundImg})` }}>
        <h1 className="title text-center">{this.state.title.pathname}</h1>
        <h1 className="title text-center">hello</h1>
        {flashMessage()}
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
              onFocus={this.focusHandler}
              onBlur={this.blurHandler}
              value={this.state.value} 
              onChange={this.handleChange} />
          </div>
          {/* <hr className="my-4" /> */}
          <button type="submit" className="btn btn-primary">Go!</button>
        </form>
      </main>
    );
  }
}
