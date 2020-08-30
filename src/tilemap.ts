import {
  Map,
  TileLayer,
  ImageLayer,
  ObjectGroup,
  Group,
  Base,
  TileSet,
  Layer,
} from "./type";
import { Container, Sprite } from "pixi.js";
import { exist, isNumberArray, isString } from "./utils";

function createLayer(layer: Container, props: Base) {
  const { id, name, offsetx, offsety, opacity, visible } = props;

  const container = Object.assign(layer, {
    id,
    name,
    visible,
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

type Props = {
  idx: number;
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
};

function Orthogonal(
  tile: Sprite,
  { idx, width, height, tileWidth, tileHeight }: Props
) {
  const cx = Math.floor(idx % width);
  const cy = Math.floor(idx / height);

  tile.x = cx * tileWidth;
  tile.y = cy * tileHeight;

  return tile;
}

function Isometric(
  tile: Sprite,
  { idx, width, height, tileWidth, tileHeight }: Props
) {
  const cx = Math.floor(idx % width);
  const cy = Math.floor(idx / height);

  const offsetx = Math.floor(tileWidth / 2);
  const offsety = -Math.floor(tileHeight / 2);
  tile.x = cx * offsetx + cy * -offsetx;
  tile.y = cy * offsety - cx * offsety + cy * tileHeight;

  return tile;
}

function Staggered(
  tile: Sprite,
  { idx, width, height, tileWidth, tileHeight }: Props
) {
  return tile;
}

function Hexagonal(
  tile: Sprite,
  { idx, width, height, tileWidth, tileHeight }: Props
) {
  const offset = 2;

  const cx = Math.floor(idx % width);
  const cy = Math.floor(idx / height);

  const isOdd = Math.floor(cy % 2);

  tile.x = cx * tileWidth + (isOdd * tileWidth) / 2;
  tile.y = cy * (tileHeight - offset) * (3 / 4);

  return tile;
}

function projectionBy(
  orientation: "orthogonal" | "isometric" | "staggered" | "hexagonal"
) {
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

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG = 0x20000000;

function getID(id: number) {
  return (
    id &
    ~(
      FLIPPED_HORIZONTALLY_FLAG |
      FLIPPED_VERTICALLY_FLAG |
      FLIPPED_DIAGONALLY_FLAG
    )
  );
}

function rotate(tile: Sprite, id: number) {
  const flipped_horizontally = id & FLIPPED_HORIZONTALLY_FLAG;
  const flipped_vertically = id & FLIPPED_VERTICALLY_FLAG;
  const flipped_diagonally = id & FLIPPED_DIAGONALLY_FLAG;

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

function createTileLayer(props: TileLayer, map: Map, tileset: TileSet) {
  const layer = createLayer(new Container(), props);

  if (isNumberArray(props.data)) {
    //
    props.data.forEach((id, idx) => {
      if (!id) {
        return;
      }

      const tile = tileset[getID(id)]();
      rotate(tile, id);
      projectionBy(map.orientation)(tile, {
        idx,
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

function createImageLayer(props: ImageLayer) {
  // TODO
  const layer = createLayer(new Container(), props);

  return layer;
}

function createObjectGroup(props: ObjectGroup) {
  // TODO
  const layer = createLayer(new Container(), props);

  return layer;
}

function createGroup(props: Group, tilemap: Map, tileset: TileSet) {
  const layer = createLayer(new Container(), props);

  const elements = props.layers.map((layer) =>
    createByType(layer, tilemap, tileset)
  );

  layer.addChild(...elements);

  return layer;
}

function createByType(layer: Layer, tilemap: Map, tileset: TileSet) {
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

export default function createTileMap(tilemap: Map, tileset: TileSet) {
  const container = new Container();

  const elements = tilemap.layers.map((layer) =>
    createByType(layer, tilemap, tileset)
  );

  container.addChild(...elements);

  return container;
}
