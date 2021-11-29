import React from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";
import DarkMap from "../data/map.json";

const friendshipData = [
  {
    start: [78.4867, 17.385],
    end: [8.6875, 54.2501],
    fromName: "Hyderabad",
    toName: "Denmark",
    tooltip: "Hyderbad to Denmark",
  },
  {
    start: [78.4867, 17.385],
    end: [13.4149, 46.8265],
    fromName: "Hyderabad",
    toName: "Austria",
    tooltip: "Hyderabad to Austria",
  },
];

const peopleData = [
  {
    type: "mid",
    name: "Pranesh",
    coordinates: [78.4867, 17.385],
    tooltip: "Pranesh",
  },
  {
    type: "major",
    name: "Vamshi",
    coordinates: [8.6875, 54.2501],
    tooltip: "Vamshi",
  },
  {
    type: "major",
    name: "Mahesh",
    coordinates: [13.4149, 46.8265],
    tooltip: "Mahesh",
  },
];

const layers = [
  new LineLayer({
    id: "friendship",
    data: friendshipData,
    opacity: 0.8,
    getSourcePosition: (d) => d.start,
    getTargetPosition: (d) => d.end,
    getColor: [225, 0, 0, 123],
    getWidth: 5,
    pickable: true,
  }),
  new ScatterplotLayer({
    id: "person",
    data: peopleData,
    radiusScale: 50,
    getPosition: (d) => d.coordinates,
    getFillColor: [255, 140, 0],
    getRadius: 200,
    pickable: true,
  }),
];

let INITIAL_VIEW_STATE = {
  longitude: 78.4867,
  latitude: 17.385,
  zoom: 5,
  maxZoom: 20,
  pitch: 30,
  bearing: 0,
};

const MAP_STYLE = DarkMap;

class Map extends React.Component {
  render() {
    return (
      <div className="MapDiv">
        <DeckGL
          layers={layers}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          getTooltip={({ object }) => object && `${object.tooltip}`}
        >
          <StaticMap
            reuseMaps
            className="StaticMap"
            mapStyle={MAP_STYLE}
            preventStyleDiffing={true}
            mapboxApiAccessToken="pk.eyJ1IjoiY29ubmVjdGluZ3dvcmxkIiwiYSI6ImNrd2l3anlzdDB3bTAycG1kYXVlYnZtaXAifQ.fsAb70tSq-vGoIwjXuqreg"
          />
        </DeckGL>
      </div>
    );
  }
}

export default Map;
