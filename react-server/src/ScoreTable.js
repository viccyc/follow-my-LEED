import React, { Component } from 'react';

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
        return (<button type="button" className="btn btn-light" onClick={this.handleHideClick} value={value} >Hide</button>)
      } else {
        return (<button type="button" className="btn btn-light" onClick={this.handleShowClick} value={value} >Show</button>)
      }
    }
    return (
      <table id="scoreTable" className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Criterion</th>
            <th scope="col">Count</th>
            <th scope="col">Show/Hide Markers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Street Network</td>
            <td>{this.props.streetNetwork}</td>
            <td>{toggleButton('street_network')}</td>
          </tr>
          <tr>
            <td>Community Resources</td>
            <td>{this.props.communityResources}</td>
            <td>{toggleButton('community_resources')}</td>
          </tr>
          <tr>
            <td>Transit Stops</td>
            <td>{this.props.transitStops}</td>
            <td>{toggleButton('transit_stops')}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{this.props.streetNetwork + this.props.communityResources + this.props.transitStops}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }

}

export default ScoreTable;