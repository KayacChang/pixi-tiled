import { Texture, AnimatedSprite, Sprite, Rectangle } from "pixi.js";
import { Tile, Resources, ITileset, TileSet } from "./type";

export function createTile(data: Tile, resources: Resources) {
  const { id, image, animation } = data;

  if (animation) {
    const textures = animation
      .map(({ tileid }) => resources[tileid]?.texture)
      .filter(Boolean) as Texture[];

    return () => new AnimatedSprite(textures);
  }

  if (image) {
    const texture = resources[id]?.texture as Texture;

    return () => new Sprite(texture);
  }

  throw new Error(`can not handle this tile data ${data}`);
}

export function createTileSet(data: ITileset, resources: Resources): TileSet {
  const {
    firstgid,
    image,
    imagewidth,
    imageheight,
    tilewidth,
    tileheight,
    spacing,
  } = data;

  if (!image || !imagewidth || !imageheight) {
    return {};
  }

  const _texture = resources[image]?.texture;

  if (!_texture) {
    return {};
  }

  const tileset: TileSet = {};

  const cx = Math.ceil(imagewidth / (tilewidth + spacing));
  const cy = Math.ceil(imageheight / (tileheight + spacing));

  for (let y = 0; y < cy; y++) {
    for (let x = 0; x < cx; x++) {
      const rect = new Rectangle(
        x * (tilewidth + spacing),
        y * (tileheight + spacing),
        tilewidth,
        tileheight
      );

      const texture = new Texture(_texture.baseTexture, rect);

      tileset[firstgid + x + y * cx] = () => new Sprite(texture);
    }
  }

  return tileset;
}
