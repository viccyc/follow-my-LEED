import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import React, { Component } from 'react';
import React from 'react';
// import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

const MapContainer = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.search.latitude, lng: props.search.longitude }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
);

export default MapContainer;