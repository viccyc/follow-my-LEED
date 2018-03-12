import React, { Component } from 'react';



class Form extends Component {

  constructor() {
    super();
    this.state = {
      result: [],
      location: null,
      radius: '800'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {

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
    const url = this.props.action;
    const data = {location: this.state.location, radius: this.state.radius};
    

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(data => {
        if (url === 'find_score') {
          ReactDOM.render(<Score data={data} />, document.getElementById('root'));
        } else {
          ReactDOM.render(<Leeds data={data} />, document.getElementById('root'));
        }
      });
  }


  render() {
    return (
      <li className="nav-item right-aligned">
        <form action={this.props.action} method="POST" >
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
