import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const google = window.google;


class Form extends Component {

  constructor(props) {
    super(props);
    // console.log('initializing in nav form component')
    this.state = {
      autocomplete: null,
      location: {
        address: null,
        longitude: null,
        latitude: null
      },
      radius: '800'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
    this.focusHandler = this.focusHandler.bind(this);

  }

  componentDidMount() {
    // console.log('componentDidMount in nav form component')
    this.initAutocomplete();
}

  initAutocomplete(){
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

    this.setState({ autocomplete: autocomplete });

  }

  handleInputChange(e){
    e.preventDefault();
    this.setState({ radius: e.target.value });
  }

  focusHandler(e){
    e.preventDefault();
    this.initAutocomplete();
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(place);
    const place = this.state.autocomplete.getPlace();
    console.log('place addr is ', place.formatted_address);
    this.setState({
      location: {
        address: place.formatted_address,
        longitude: place.geometry.location.lng(),
        latitude: place.geometry.location.lat()
      }});
  }


  render() {
    console.log('rendering in nav form component');
    console.log('addr from user: ', this.state.location.address);
    //if user submit a location,
    //save details in a variable and pass it to redirect component,
    //then reset location (to null) and radius
    if (this.state.location.address){
      // console.log('trigger redirect from nav form');
      let location = Object.assign({}, this.state.location);
      location.address = this.state.location.address;
      location.longitude = this.state.location.longitude;
      location.latitude = this.state.location.latitude;

      const radius = this.state.radius;
      this.setState({
        location: {
          address: null,
          longitude: null,
          latitude: null
        },
        radius: '800'
      })
      console.log('location copy is ', location);
      return <Redirect to={{
        pathname: this.props.action,
        state: {
          data: {
          location: location,
          radius: radius
          }
        }
      }} />
    }
    return (
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="mr-1 text-light">Location</label>
            <input name="location"
                  id="searchTextField"
                  ref={(input) => this.input = input}
                  onFocus={this.focusHandler}
                  type="text"
                  className="form-control"
                  placeholder="Where?" />
          </div>
          <div className="form-group mx-sm-3">
            <label className="mr-1 text-light">Radius</label>
            <select name="radius"
                  onChange={this.handleInputChange}
                  className="form-control">
              <option value="800">800</option>
              <option value="500">500</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );

  }
}

export default Form;