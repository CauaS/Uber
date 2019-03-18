import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyDD5BM8MmH_Fk7qVOR8gvYNlGvjHp45Xmo"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;