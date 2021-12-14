import React from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";
import DarkMap from "../data/map.json";
import Menusvg from "../media/menuSvg.svg";
import MapStats from "./mapStats";
import "../stylesheets/map.css";

const friendshipData = [
  {
    start: [78.4867, 17.385],
    end: [8.6875, 54.2501],
    email: "Hyderabad",
    friendEmail: "Denmark",
    tooltip: "Hyderbad to Denmark",
  },
  {
    start: [77.1025, 28.7041],
    end: [13.4149, 46.8265],
    fromName: "Delhi",
    toName: "Austria",
    tooltip: "Delhi to Austria",
  },
  {
    start: [78.4867, 17.385],
    end: [77.1025, 28.7041],
    fromName: "Hyderabad",
    toName: "Delhi",
    tooltip: "Hyderbad to Delhi",
  },
  {
    start: [77.1025, 28.7041],
    end: [103.8198, 1.3521],
    fromName: "Delhi",
    toName: "Singapore",
    tooltip: "Delhi to Singapore",
  },
  {
    start: [78.4867, 17.385],
    end: [17.2283, 26.3351],
    fromName: "Hyderabad",
    toName: "Libya",
    tooltip: "Hyderabad to Libya",
  },
  {
    start: [17.2283, 26.3351],
    end: [3.7492, 40.4637],
    fromName: "Libya",
    toName: "Spain",
    tooltip: "Libya to Spain",
  },
  {
    start: [3.7492, 40.4637],
    end: [13.4149, 46.8265],
    fromName: "Spain",
    toName: "Austria",
    tooltip: "Spain to Austria",
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
  {
    type: "major",
    name: "Virat",
    coordinates: [77.1025, 28.7041],
    tooltip: "Virat",
  },
  {
    type: "major",
    name: "Rohit",
    coordinates: [103.8198, 1.3521],
    tooltip: "Rohit",
  },
  {
    type: "major",
    name: "Tarak",
    coordinates: [17.2283, 26.3351],
    tooltip: "Tarak",
  },
  {
    type: "major",
    name: "Charan",
    coordinates: [3.7492, 40.4637],
    tooltip: "Charan",
  },
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
  edges = [];
  nodes = [];
  userEmail = null;

  state = {
    mapStatsDisplay: false,
    layers: [],
  };

  setEdgesData = async () => {
    await fetch("/friends-list", {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.edges = responseJson.friendsList;
        this.nodes = responseJson.nodes;
        this.userEmail = responseJson.userEmail;
        let newState = { ...this.state };
        newState.layers = [
          new LineLayer({
            id: "friendship",
            data: this.edges,
            opacity: 0.8,
            getSourcePosition: (d) => d.start,
            getTargetPosition: (d) => d.end,
            getColor: [225, 0, 0, 123],
            getWidth: 5,
            pickable: true,
          }),
          new ScatterplotLayer({
            id: "person",
            data: this.nodes,
            radiusScale: 50,
            getPosition: (d) => d.coordinates,
            getFillColor: [255, 140, 0],
            getRadius: 200,
            pickable: true,
          }),
        ];
        this.setState(newState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillUpdate() {
    this.setEdgesData();
  }

  render() {
    return (
      <div className="MapDiv">
        <DeckGL
          layers={this.state.layers}
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
        <div className="Menudiv">
          <img
            src={Menusvg}
            alt="menusvg"
            onClick={() => {
              let newState = { ...this.state };
              newState.mapStatsDisplay = !newState.mapStatsDisplay;
              this.setState(newState);
            }}
          />
          {this.state.mapStatsDisplay && (
            <div className="MapStatsDiv">
              <MapStats />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Map;
