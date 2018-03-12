import React, { Component } from 'react';



class Form extends Component {

  constructor() {
    super();
    this.state = {
      result: []
    };
  }

  componentDidMount() {

  }

  render() {
    //form: {location: "string", radius: "string"}
    //need to add event listener for form
    //onSubmit, send form to action by method
    return (
      <li className="nav-item right-aligned">
        <form action={this.props.action} method="POST">
          <div className="form-group">
            <label htmlFor="nav-form-location">Location</label>
            <input name="location" type="text" className="form-control" id="nav-form-location" placeholder="Enter the target location here" />
          </div>
          <div className="form-group">
            <label htmlFor="nav-form-radius">Radius</label>
            <select name="radius" className="form-control" id="av-form-radius">
              <option value="800">800</option>
              <option value="500">500</option>
            </select>
          </div>
        </form>
      </li>
    );

  }
}

export default Form;
