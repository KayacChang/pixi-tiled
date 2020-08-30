import { Container } from "pixi.js";
import { exist, isNumberArray, isString } from "./utils";
function createLayer(layer, props) {
    var id = props.id, name = props.name, offsetx = props.offsetx, offsety = props.offsety, opacity = props.opacity, visible = props.visible;
    var container = Object.assign(layer, {
        id: id,
        name: name,
        visible: visible,
        alpha: opacity,
    });
    if (exist(props.properties)) {
        // TODO
    }
    if (exist(props.startx)) {
        // TODO
    }
    if (exist(props.starty)) {
        // TODO
    }
    if (exist(props.tintcolor)) {
        // TODO
    }
    return container;
}
function Orthogonal(tile, _a) {
    var idx = _a.idx, width = _a.width, height = _a.height, tileWidth = _a.tileWidth, tileHeight = _a.tileHeight;
    var cx = Math.floor(idx % width);
    var cy = Math.floor(idx / height);
    tile.x = cx * tileWidth;
    tile.y = cy * tileHeight;
    return tile;
}
function Isometric(tile, _a) {
    var idx = _a.idx, width = _a.width, height = _a.height, tileWidth = _a.tileWidth, tileHeight = _a.tileHeight;
    var cx = Math.floor(idx % width);
    var cy = Math.floor(idx / height);
    var offsetx = Math.floor(tileWidth / 2);
    var offsety = -Math.floor(tileHeight / 2);
    tile.x = cx * offsetx + cy * -offsetx;
    tile.y = cy * offsety - cx * offsety + cy * tileHeight;
    return tile;
}
function Staggered(tile, _a) {
    var idx = _a.idx, width = _a.width, height = _a.height, tileWidth = _a.tileWidth, tileHeight = _a.tileHeight;
    return tile;
}
function Hexagonal(tile, _a) {
    var idx = _a.idx, width = _a.width, height = _a.height, tileWidth = _a.tileWidth, tileHeight = _a.tileHeight;
    var offset = 2;
    var cx = Math.floor(idx % width);
    var cy = Math.floor(idx / height);
    var isOdd = Math.floor(cy % 2);
    tile.x = cx * tileWidth + (isOdd * tileWidth) / 2;
    tile.y = cy * (tileHeight - offset) * (3 / 4);
    return tile;
}
function projectionBy(orientation) {
    switch (orientation) {
        case "orthogonal":
            return Orthogonal;
        case "isometric":
            return Isometric;
        case "staggered":
            return Staggered;
        case "hexagonal":
            return Hexagonal;
    }
}
var FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
var FLIPPED_VERTICALLY_FLAG = 0x40000000;
var FLIPPED_DIAGONALLY_FLAG = 0x20000000;
function getID(id) {
    return (id &
        ~(FLIPPED_HORIZONTALLY_FLAG |
            FLIPPED_VERTICALLY_FLAG |
            FLIPPED_DIAGONALLY_FLAG));
}
function rotate(tile, id) {
    var flipped_horizontally = id & FLIPPED_HORIZONTALLY_FLAG;
    var flipped_vertically = id & FLIPPED_VERTICALLY_FLAG;
    var flipped_diagonally = id & FLIPPED_DIAGONALLY_FLAG;
    if (Math.sign(flipped_horizontally)) {
        tile.scale.x = -1;
        tile.anchor.x = 1;
    }
    if (Math.sign(flipped_vertically)) {
        tile.scale.y = -1;
        tile.anchor.y = 1;
    }
    if (Math.sign(flipped_diagonally)) {
        tile.rotation = Math.PI / 2;
        tile.anchor.y = 1;
    }
    return tile;
}
function createTileLayer(props, map, tileset) {
    var layer = createLayer(new Container(), props);
    if (isNumberArray(props.data)) {
        //
        props.data.forEach(function (id, idx) {
            if (!id) {
                return;
            }
            var tile = tileset[getID(id)]();
            rotate(tile, id);
            projectionBy(map.orientation)(tile, {
                idx: idx,
                width: props.width,
                height: props.height,
                tileWidth: map.tilewidth,
                tileHeight: map.tileheight,
            });
            layer.addChild(tile);
        });
    }
    if (isString(props.data)) {
        // TODO
    }
    return layer;
}
function createImageLayer(props) {
    // TODO
    var layer = createLayer(new Container(), props);
    return layer;
}
function createObjectGroup(props) {
    // TODO
    var layer = createLayer(new Container(), props);
    return layer;
}
function createGroup(props, tilemap, tileset) {
    var layer = createLayer(new Container(), props);
    var elements = props.layers.map(function (layer) {
        return createByType(layer, tilemap, tileset);
    });
    layer.addChild.apply(layer, elements);
    return layer;
}
function createByType(layer, tilemap, tileset) {
    switch (layer.type) {
        case "tilelayer":
            return createTileLayer(layer, tilemap, tileset);
        case "imagelayer":
            return createImageLayer(layer);
        case "objectgroup":
            return createObjectGroup(layer);
        case "group":
            return createGroup(layer, tilemap, tileset);
    }
}
export default function createTileMap(tilemap, tileset) {
    var container = new Container();
    var elements = tilemap.layers.map(function (layer) {
        return createByType(layer, tilemap, tileset);
    });
    container.addChild.apply(container, elements);
    return container;
}
//# sourceMappingURL=tilemap.js.map