import React, { Component } from 'react';

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleTableClick(e.currentTarget.value);
  }

  render() {
    return (
      <table id="scoreTable" className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Criterion</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button type="button" className="btn btn-light" onClick={this.handleClick} value="street_network">Street Network</button></td>
            <td>...</td>
          </tr>
          <tr>
            <td><button type="button" className="btn btn-light" onClick={this.handleClick} value="community_resources">Community Resources</button></td>
            <td>...</td>
          </tr>
          <tr>
            <td><button type="button" className="btn btn-light" onClick={this.handleClick} value="access_to_transit">Access to Transit</button></td>
            <td>...</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    );
  }

}

export default ScoreTable;