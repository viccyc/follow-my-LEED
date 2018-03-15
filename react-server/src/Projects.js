import React, { Component } from 'react';
import Nav from './Nav';
import ProjectsMapContainer from './ProjectsMapContainer';


class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: null,
      longitude: null,
      latitude: null,
      radius: '800'
    }
    this.updateStateForData = this.updateStateForData.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.updateStateForData(newProps.location.state.data);
    }
  }

  
  componentWillMount() {
    //TODO: fetch backend with location data
    //need to provide location and radius
    //with res, use other apis to display and update the map & popups

    //TODO: test google map&popups api
    // //create map using this.state.location
    this.updateStateForData(this.props.location.state.data);


  }

  updateStateForData(data) {
    const {location, radius} = data;
    this.setState({
      address: location.address,
      longitude: location.longitude,
      latitude: location.latitude,
      radius
    })
  }

  render() {
    return (
      <div>
        <Nav form={true} />
        <ProjectsMapContainer search={this.state}/>
      </div>
    );
  }
}

export default Projects;
