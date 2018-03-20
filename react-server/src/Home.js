import React, { Component } from 'react';

import backgroundImg from './images/calgary_tower-min.png';
import './Home.css';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autocomplete: null,
      title: {
        '/': 'FOLLOW MY LEED',
        '/find_score': 'CALCULATE LEED SCORE',
        '/projects': 'SHOW LEED PROJECTS'
      },
      focus: false,
      submitButton: true
    };
    this.blurHandler = this.blurHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  blurHandler() {
    this.setState({ focus: false });
  }

  focusHandler() {
    this.setState({ focus: true });
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
    this.props.handleSearch(address, this.props.location.pathname);
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
      <main id="mainPhoto" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <h1 id="mainTitle" className="title text-center">{this.state.title[this.props.location.pathname]}</h1>
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
              onChange={this.handleChange} />
           <button id="go-button" type="submit" className="btn btn-primary">Go!</button>
          </div>
        </form>
        {flashMessage()}
      </main>
    );
  }
}
