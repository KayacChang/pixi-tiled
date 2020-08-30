import { Properties } from "./properties";
import { Layer } from "./layer";
/**
 * @description
 * Animation frame
 */
declare type Frame = {
    duration: number;
    tileid: number;
};
/**
 * @description
 * each value is a length-4 array where each element is the index of a terrain on one corner of the tile.
 * The order of indices is: top-left, top-right, bottom-left, bottom-right.
 */
declare type Terrain = [number, number, number, number];
/**
 * @description
 * A tileset that associates information with each tile,
 * like its image path or terrain type, may include a tiles array property.
 * Each tile has an id property, which specifies the local ID within the tileset.
 */
export declare type Tile = {
    /**
     * Each tile can have exactly one animation associated with it.
     * In the future, there could be support for multiple named animations on a tile.
     */
    animation?: Frame[];
    /**
     * Local ID of the tile
     */
    id: number;
    /**
     * Image representing this tile (optional)
     */
    image?: string;
    /**
     * Height of the tile image in pixels
     */
    imageheight: number;
    /**
     * Width of the tile image in pixels
     */
    imagewidth: number;
    /**
     * Layer with type objectgroup, when collision shapes are specified (optional)
     */
    objectgroup?: Layer;
    /**
     * Percentage chance this tile is chosen when competing with others in the editor (optional)
     */
    probability?: number;
    /**
     * Array of Properties
     */
    properties?: Properties[];
    /**
     * Index of terrain for each corner of tile (optional)
     */
    terrain?: Terrain;
    /**
     * The type of the tile (optional)
     */
    type?: string;
};
export {};
