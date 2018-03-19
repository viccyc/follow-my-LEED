import React, { Component } from 'react';
import './NavForm.css'

export default class NavForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      address: {},
      autocomplete: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
    // this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  // focusHandler(e){
  //   e.preventDefault();
  //   this.initAutocomplete();
  // }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.autocomplete.getPlace()){
      if (!this.state.address.address){
        console.log('empty state, use props');
        this.props.handleSearch(this.props.address, this.props.path);
        return;
      }
        console.log('empty input, use old state');
        this.props.handleSearch(this.state.address, this.props.path);
        return;
      }

    const place = this.state.autocomplete.getPlace();
    const address = {
      name: place.formatted_address,
      lat: parseFloat(place.geometry.location.lat().toFixed(7)),
      lng: parseFloat(place.geometry.location.lng().toFixed(7))
    };
    const pathname = this.props.location.pathname;
    this.props.handleSearch(address, pathname);
    this.state.address = address;
    this.state.value = '';
  }

  initAutocomplete() {
    const googleMaps = window.google.maps;
    const autocomplete = new googleMaps.places.Autocomplete(document.getElementById('navTextField'));

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

    this.setState({ autocomplete: autocomplete });
  }

  render() {
    return (
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="mr-1 text-light">Location</label>
            <input
                  id="navTextField"
                  onFocus={this.focusHandler}
                  type="text"
                  className="form-control nav-input"
                  defaultValue={this.props.address.name}
                  value={this.state.value} />
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
          <button id="sub-btn" type="submit" className="btn btn-primary">New search</button>
        </form>
    );
  }
}