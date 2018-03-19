import React, { Component } from 'react';

class ScoreTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.handleScoreTableClick(event.currentTarget.value);
  }

  render() {
    const toggleButton = (value) => {
      if (this.props.criteriaClicked.includes(value)) {
        return (<button type="button" className="btn btn-light" onClick={this.handleClick} value={value} >Hide</button>)
      } else {
        return (<button type="button" className="btn btn-light" onClick={this.handleClick} value={value} >Hide</button>)
      }
    }
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Criterion</th>
            <th scope="col">Score</th>
            <th scope="col">Show/Hide Markers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Street Network</td>
            <td>...</td>
            <td>{toggleButton('street_network')}</td>
          </tr>
          <tr>
            <td>Community Resources</td>
            <td>...</td>
            <td>{toggleButton('community_resources')}</td>
          </tr>
          <tr>
            <td>Access to Transit</td>
            <td>...</td>
            <td>{toggleButton('access_to_transit')}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>...</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }

}

export default ScoreTable;