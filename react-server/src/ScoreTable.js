import React, { Component } from 'react';

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(event) {
  //   this.props.handleClick(event.currentTarget.value);
  // }

  render() {
    const transitStops = this.props.transitStops;
    const toggleButton = (value) => {
    //   if (criteriaClicked && criteriaClicked.includes(value)) {
        return (<button type="button" className="btn btn-light" onClick={this.props.showMarkers} >Hide</button>)
    //   } else {
    //     return (<button type="button" className="btn btn-light" onClick={this.props.clearMarkers(value)} >Show</button>)
    //   }
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