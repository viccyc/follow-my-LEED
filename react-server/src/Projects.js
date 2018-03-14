import React, { Component } from 'react';
import Nav from './Nav';
import ProjectsMapContainer from './ProjectsMapContainer';


class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: this.props.location.state ? this.props.location.state.data.location.address : null,
      longitude: this.props.location.state ? this.props.location.state.data.location.longitude : null,
      latitude: this.props.location.state ? this.props.location.state.data.location.latitude : null,
      radius: this.props.location.state ? this.props.location.state.data.radius : '800'

    };
  }


  componentDidMount() {
    //TODO: fetch backend with location data
    //need to provide location and radius
    //with res, use other apis to display and update the map & popups

    //TODO: test google map&popups api
    // //create map using this.state.location
  }

  render() {
    return (
      <div>
        <Nav form={true} />
        {}
        <ProjectsMapContainer search={this.state} />
      </div>
    );
  }
}

export default Projects;
