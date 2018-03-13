import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'



class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectReady: false,
      location: null,
      radius: '800'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    //TODO: fetch backend /api to get all leed buildings

  }

  handleInputChange(e){
    e.preventDefault();
    console.log('in onchange', e.target.type);
    if (e.target.type === 'text'){
      this.setState({ location: e.target.value});
    } else {
      this.setState({ radius: e.target.value });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    //change state to triger redirect to target page with data input
    if (this.state.location) {
      this.setState({ redirectReady: true});
    }
  }


  render() {
    //when clicking submit, render redirect with data
    if (this.state.redirectReady){
      return <Redirect to={{
        pathname: this.props.action,
        state: {
          data: {
          location: this.state.location,
          radius: this.state.radius
          }
        }
      }} />
    }
    return (
      <li className="nav-item right-aligned">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Location</label>
            <input name="location"
                  type="text"
                  onChange={this.handleInputChange}
                  className="form-control"
                  placeholder="Enter the target location here" />
          </div>
          <div className="form-group">
            <label >Radius</label>
            <select name="radius"
                  onChange={this.handleInputChange}
                  className="form-control">
              <option value="800">800</option>
              <option value="500">500</option>
            </select>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </li>
    );

  }
}

export default Form;
