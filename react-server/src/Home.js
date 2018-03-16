import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

import Nav from './Nav';
import './index.css';
import './Home.css';

const google = window.google;
// const $ = window.$;

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: {
        address: null,
        longitude: null,
        latitude: null
      },
      action: '/find_score',
      autocomplete: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    }

    // const input = document.getElementById('searchTextField');

    const autocomplete = new google.maps.places.Autocomplete(this.input);
    geolocate();

    this.setState({ autocomplete: autocomplete});

  }

  handleSubmit(e){
    e.preventDefault();
    const place = this.state.autocomplete.getPlace();
    const address = place.formatted_address;
    const longitude = place.geometry.location.lng();
    const latitude = place.geometry.location.lat();
    const {location} = this.state
    location.address = address;
    location.longitude = longitude;
    location.latitude = latitude;
    console.log(`clicked GO in Home page,`, address, longitude, latitude);
    this.setState({location});
  }

  clickHandler(e){
    e.preventDefault();
    const action = e.target.href.split('3000')[1];
    this.setState({action: action});
  }

  render() {
    // console.log('in home page, state.location.address is ', this.state.location.address);
    //when submit is clicked and state is reset, trigger rerender the page and redirect to target page
    if (this.state.location.address){
      // console.log('in redirect if statement from home page', this.state.action);
      return <Redirect to={{
        pathname: this.state.action,
        state: {
          data: {
          location: this.state.location
          }
        }
      }} />
    }
    return (
      <div>
        <Nav form={false} clickHandler={this.clickHandler}/>
        <div className="jumbotron">
          <h1 className="display-4">Hello!</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">Location</span>
              </div>
              <input name="location"
                    ref={(input) => this.input = input}
                    id="searchTextField"
                    type="text"
                    className="form-control"
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm" />
            </div>
            <hr className="my-4" />
            <button type="submit" className="btn btn-primary">Go!</button>
          </form>
        </div>
      </div>

    );
  }
}

export default Home;
