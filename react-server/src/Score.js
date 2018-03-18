import React, { Component } from 'react';
import Nav from './Nav';
import ScoreMapContainer from './ScoreMapContainer';

class Score extends Component {

  constructor(props) {
    super(props);
    console.log('initializing in the score component');
    this.state={
      address: null,
      longitude: null,
      latitude: null,
      radius: '800'
    };
    this.updateStateWithNewData = this.updateStateWithNewData.bind(this);

  }

  componentWillMount() {
    console.log('in score componentWillMount ', this.props);
    
    if (this.props.location.state) {
      this.updateStateWithNewData(this.props.location.state.data);
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('in score componentWillReceiveProps', nextProps.location.state.data.location);

    if (this.props !== nextProps.location.state.data.location){
      console.log('in if from componentWillReceiveProps in score');
      this.updateStateWithNewData(nextProps.location.state.data);
    }
  }

  updateStateWithNewData(data) {
    const { location, radius } = data;
    this.setState({
      address: location.address,
      longitude: location.longitude,
      latitude: location.latitude,
      radius
    }, () => { console.log('setState is done, updated state ', this.state.address); });
  }

  render() {
    console.log('--------------------------------');
    console.log('rendering in score component');
    console.log('in score, state.address should have a value received from redirect ', this.state.address)
    return (
      <div>
        <Nav form={true} searchAddress={this.state}/>
        <div className="container mt-2">
          <div className="row">
            <div className="col-8 pl-0">
              <MapContainer search={this.state} />
            </div>
            <div className="col-4 pr-0">
              <ScoreTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
