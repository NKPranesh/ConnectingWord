
import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {GeolocateControl} from 'react-map-gl';
//import DarkMap from "../data/map.json";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY29ubmVjdGluZ3dvcmxkIiwiYSI6ImNrd2l3anlzdDB3bTAycG1kYXVlYnZtaXAifQ.fsAb70tSq-vGoIwjXuqreg"; // Set your mapbox token here

const geolocateStyle = {
  top: 0,
  left: 0,
  margin: 10,
};
const positionOptions = { enableHighAccuracy: true };

export default function App(props) {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: 96,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });
  const viewportChangeHandle  = (e)=>{
    setViewport(e)
    props.locate.latitudeLongitudeUpdate(e.latitude,e.longitude)
  }
  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={viewportChangeHandle}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={positionOptions}
        trackUserLocation
        auto
      />
    </MapGL>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
