import React, { Component } from 'react';

import communityresourcesImg from './images/communityresources.png';
import intersectionsImg from './images/intersections.png';
import transitstopsImg from './images/transitstops3.png';

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'street_network': false,
      'community_resources': false,
      'transit_stops': false
    }
    this.handleHideClick = this.handleHideClick.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
  }

  handleHideClick(event) {
    this.props.hideMarkers(event.currentTarget.value);
    switch (event.currentTarget.value) {
      case 'street_network':
        this.setState({ 'street_network': false });
        break;
      case 'community_resources':
        this.setState({ 'community_resources': false });
        break;
      case 'transit_stops':
        this.setState({ 'transit_stops': false });
        break;
      default: break;
    };
  }

  handleShowClick(event) {
    this.props.showMarkers(event.currentTarget.value);
    switch (event.currentTarget.value) {
      case 'street_network':
        this.setState({ 'street_network': true });
        break;
      case 'community_resources':
        this.setState({ 'community_resources': true });
        break;
      case 'transit_stops':
        this.setState({ 'transit_stops': true });
        break;
      default: break;
    };
    // this.props.showMarkers(event.currentTarget.value);
  }

  render() {
    // const transitStops = this.props.transitStops;
    const toggleButton = (value) => {
      if (this.state[value]) {
        return (<button type="button" className="btn btn-secondary" onClick={this.handleHideClick} value={value} >Hide</button>)
      } else {
        return (<button type="button" className="btn btn-secondary" onClick={this.handleShowClick} value={value} >Show</button>)
      }
    };
    const areaSize = (area) => {
      if (area) {
        return (<span>{area.toLocaleString()} square meters</span>)
      } else {
        return (<span>No area selected</span>)
      }
    }
    return (
      <div>
        <table id="table" className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Criterion</th>
              <th scope="col">Count</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src={intersectionsImg} alt="inersectionsImg" />  Intersections</td>
              <td>{this.props.streetNetwork}</td>
              <td>{toggleButton('street_network')}</td>
            </tr>
            <tr>
              <td><img src={communityresourcesImg} alt="communityresourcesImg" />  Services</td>
              <td>{this.props.communityResources}</td>
              <td>{toggleButton('community_resources')}</td>
            </tr>
            <tr>
              <td><img src={transitstopsImg} alt="transitstopsImg" />  Transit Stops</td>
              <td>{this.props.transitStops}</td>
              <td>{toggleButton('transit_stops')}</td>
            </tr>
            <tr>
              <th scope="row">Total</th>
              <th scope="row">{this.props.streetNetwork + this.props.communityResources + this.props.transitStops}</th>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div></div>
        <table id="table" className="table table-bordered">
          <thead>
            <tr>
              <th>Open Space Area Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{areaSize(this.props.area)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default ScoreTable;