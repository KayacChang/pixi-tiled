import { Terrains } from "./terrains";
import { Grid } from "./grid";
import { TileOffset } from "./tileoffset";
import { Tile } from "./tile";
import { Properties } from "./properties";
import { WangSet } from "./wangset";
import { Color } from "./types";

/**
 * @description
 * A tileset is a collection of tiles.
 * Tiled currently supports two types of tilesets, which are chosen when creating a new tileset:
 * - Based on Tileset Image: <br>
 *   This tileset defines a fixed size for all tiles and the image from which these tiles are supposed to be cut.
 *   In addition it supports a margin around the tiles and a spacing between the tiles,
 *   which allows for using tileset images that either happen to have space between or around their tiles
 *   or those that have extruded the border pixels of each tile to avoid color bleeding.
 * - Collection of Images: <br>
 *  In this type of tileset each tile refers to its own image file.
 *  It is useful when the tiles aren’t the same size, or when the packing of tiles into a texture is done later on.
 */
export type ITileset = {
  /**
   * Hex-formatted color (#RRGGBB or #AARRGGBB)(optional)
   */
  backgroundcolor?: Color;

  /**
   * The number of tile columns in the tileset
   */
  columns: number;

  /**
   * GID corresponding to the first tile in the set
   */
  firstgid: number;

  /**
   * @see Grid
   */
  grid?: Grid;

  /**
   * Image used for tiles in this set
   */
  image?: string;

  /**
   * Height of source image in pixels
   */
  imageheight?: number;

  /**
   * Width of source image in pixels
   */
  imagewidth?: number;

  /**
   * Buffer between image edge and first tile (pixels)
   */
  margin: number;

  /**
   * Name given to this tileset
   */
  name: string;

  /**
   * Alignment to use for tile objects
   * ( unspecified (default), topleft, top, topright, left, center, right, bottomleft, bottom or bottomright )(since 1.4)
   */
  objectalignment?:
    | "unspecified"
    | "topleft"
    | "top"
    | "topright"
    | "left"
    | "center"
    | "right"
    | "bottomleft"
    | "bottom"
    | "bottomright";

  /**
   * Array of Properties
   */
  properties?: Properties[];

  /**
   * The external file that contains this tilesets data
   */
  source?: string;

  /**
   * Spacing between adjacent tiles in image (pixels)
   */
  spacing: number;

  /**
   * Array of Terrains (optional)
   */
  terrains?: Terrains[];

  /**
   * The number of tiles in this tileset
   */
  tilecount: number;

  /**
   * The Tiled version used to save the file
   */
  tiledversion: string;

  /**
   * Maximum height of tiles in this set
   */
  tileheight: number;

  /**
   * @see TileOffset
   */
  tileoffset?: TileOffset;

  /**
   * Array of Tiles (optional)
   */
  tiles?: Tile[];

  /**
   * Maximum width of tiles in this set
   */
  tilewidth: number;

  /**
   * Hex-formatted color (#RRGGBB) (optional)
   */
  transparentcolor?: Color;

  /**
   * tileset (for tileset files, since 1.0)
   */
  type: "tileset";

  /**
   * The JSON format version
   */
  version: number;

  /**
   * Array of Wang sets (since 1.1.5)
   */
  wangsets?: WangSet[];
};
