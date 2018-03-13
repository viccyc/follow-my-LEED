import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
      return (
        <Map google={this.props.google} zoom={14} 
          style={{width: '85%', height: '100%', position: 'relative'}}
          initialCenter={{
            lat: this.props.search.latitude,
            lng: this.props.search.longitude
          }}>

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              {/* <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div> */}
          </InfoWindow>
        </Map>
      );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVUNahj_Lx06vet-sGaPLHBs0svgXwX98'
})(MapContainer)