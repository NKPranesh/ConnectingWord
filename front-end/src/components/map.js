import React from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";
import DarkMap from "../data/map.json";
import Menusvg from "../media/menuSvg.svg";
import MapStats from "./mapStats";
import Loading from "./loading";
import "../stylesheets/map.css";

// const friendshipData = [
//   {
//     start: [78.4867, 17.385],
//     end: [8.6875, 54.2501],
//     email: "Hyderabad",
//     friendEmail: "Denmark",
//     tooltip: "Hyderbad to Denmark",
//   },
// ];

// const peopleData = [
//   {
//     type: "mid",
//     name: "Pranesh",
//     coordinates: [78.4867, 17.385],
//     tooltip: "Pranesh",
//   },
// ];

let INITIAL_VIEW_STATE = {
  longitude: 78.4867,
  latitude: 17.385,
  zoom: 5,
  maxZoom: 20,
  pitch: 30,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

class Map extends React.Component {
  edges = [];
  nodes = [];
  userEmail = null;

  state = {
    mapStatsDisplay: false,
    layers: [],
    loadingDisplay: true,
  };

  setEdgesData = async () => {
    await fetch("https://connectingworld-api.cyclic.app/friends-list", {
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
            radiusScale: 0,
            radiusMinPixels: 10,
            radiusMaxPixels: 20,
            getPosition: (d) => d.coordinates,
            getFillColor: [255, 140, 0],
            pickable: true,
          }),
        ];
        newState.loadingDisplay = false;
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
        {this.state.loadingDisplay ? (
          <Loading />
        ) : (
          <React.Fragment>
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
                  <MapStats mobile={false} />
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Map;
