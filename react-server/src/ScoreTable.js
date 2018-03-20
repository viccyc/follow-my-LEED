import React, { Component } from 'react';

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.handleShowClick = this.handleShowClick.bind(this);
    this.handleHideClick = this.handleHideClick.bind(this);

  }

  handleShowClick(event) {
    event.preventDefault();
    console.log('in handleShowClick', event.target.value, this.props.showMarkers);
    this.props.showMarkers(event.target.value);
  }

  handleHideClick(event) {
    event.preventDefault();
    console.log('in handleHideClick', event.target.value, this.props.hideMarkers);
    this.props.hideMarkers(event.target.value);
  }

  render() {
    const transitStops = this.props.transitStops;
    // const toggleButton = (value) => {
    // //   if (criteriaClicked && criteriaClicked.includes(value)) {
    //     return (<button type="button" className="btn btn-light" onClick={this.props.showMarkers} >Show</button>)
    // //   } else {
    //   return (<button type="button" className="btn btn-light" onClick={this.props.hideMarkers} >Hide</button>)
    // //   }
    // }
    const toggleButton = (value) => {
      return (
        <div>
          <button type="button" className="btn btn-light" value={value} onClick={this.handleShowClick} >Show</button>
          <button type="button" className="btn btn-light" value={value} onClick={this.handleHideClick} >Hide</button>
      </div>)

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
            {/* <td>{toggleButton('community_resources')}</td> */}
          </tr>
          <tr>
            <td>Transit Stops</td>
            <td>{transitStops}</td>
            {/* <td>{toggleButton('transit_stops')}</td> */}
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