import React, { Component } from 'react';
import './NavForm.css'

export default class NavForm extends Component {

  constructor(props) {
    super(props);
    // // console.log('initializing in nav form component')
    // this.state = {
    //   autocomplete: null,
    //   location: {
    //     address: null,
    //     longitude: null,
    //     latitude: null
    //   },
    //   radius: '800'
    // };
    this.state = {
      autocomplete: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.focusHandler = this.focusHandler.bind(this);
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  // focusHandler(e){
  //   e.preventDefault();
  //   this.initAutocomplete();
  // }

  handleInputChange(e){
    e.preventDefault();
    this.setState({ radius: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    // console.log(place);
    const place = this.state.autocomplete.getPlace();
    console.log('place addr is ', place.formatted_address);
    this.setState({
      location: {
        address: place.formatted_address,
        longitude: place.geometry.location.lng(),
        latitude: place.geometry.location.lat()
      }});
    const address = {
      address: place.formatted_address,
      longitude: place.geometry.location.lng(),
      latitude: place.geometry.location.lat()
    };
    this.props.handleSearch(address, this.props.path);
  }

  initAutocomplete() {
    const googleMaps = window.google.maps;
    const autocomplete = new googleMaps.places.Autocomplete(document.getElementById('navTextField'));

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

  render() {
    // console.log('rendering in nav form component');
    // console.log('addr from user: ', this.state.location.address);
    //if user submit a location,
    //save details in a variable and pass it to redirect component,
    //then reset location (to null) and radius
    // if (this.state.location.address){
    //   // console.log('trigger redirect from nav form');
    //   let location = Object.assign({}, this.state.location);
    //   location.address = this.state.location.address;
    //   location.longitude = this.state.location.longitude;
    //   location.latitude = this.state.location.latitude;

    //   const radius = this.state.radius;
    //   this.setState({
    //     location: {
    //       address: null,
    //       longitude: null,
    //       latitude: null
    //     },
    //     radius: '800'
    //   })
    //   console.log('location copy is ', location);
    //   return <Redirect to={{
    //     pathname: this.props.action,
    //     state: {
    //       data: {
    //       location: location,
    //       radius: radius
    //       }
    //     }
    //   }} />
    // }
    return (
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="mr-1 text-light">Location</label>
            <input
                  id="navTextField"
                  // onFocus={this.focusHandler}
                  type="text"
                  className="form-control nav-input"
                  defaultValue={this.props.address.name} />
          </div>
          <div className="form-group mx-sm-3">
            <label className="mr-1 text-light">Radius</label>
            <select name="radius"
                  onChange={this.handleInputChange}
                  className="form-control">
              <option value="800">800</option>
              <option value="400">400</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">New search</button>
        </form>
    );
  }
}