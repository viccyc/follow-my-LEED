import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ScoreTable extends Component {

  render() {
    return (
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Criterion</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Street Network</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Community Resources</td>
            <td>...</td>
          </tr>
          <tr>
            <td>Access to Transit</td>
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