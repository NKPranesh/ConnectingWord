"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deckUtils = require("./deck-utils");

class MapboxLayer {
  constructor(props) {
    if (!props.id) {
      throw new Error('Layer must have an unique id');
    }

    this.id = props.id;
    this.type = 'custom';
    this.renderingMode = props.renderingMode || '3d';
    this.map = null;
    this.deck = null;
    this.props = props;
  }

  onAdd(map, gl) {
    this.map = map;
    this.deck = (0, _deckUtils.getDeckInstance)({
      map,
      gl,
      deck: this.props.deck
    });
    (0, _deckUtils.addLayer)(this.deck, this);
  }

  onRemove() {
    (0, _deckUtils.removeLayer)(this.deck, this);
  }

  setProps(props) {
    Object.assign(this.props, props, {
      id: this.id
    });

    if (this.deck) {
      (0, _deckUtils.updateLayer)(this.deck, this);
    }
  }

  render(gl, matrix) {
    (0, _deckUtils.drawLayer)(this.deck, this.map, this);
  }

}

exports.default = MapboxLayer;
//# sourceMappingURL=mapbox-layer.js.map