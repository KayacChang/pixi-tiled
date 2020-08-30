import { Color } from "./types";
import { Layer } from "./layer";
import { Properties } from "./properties";
import { ITileset } from "./tileset";
export declare type Map = {
    /**
     * Hex-formatted color (#RRGGBB or #AARRGGBB) (optional)
     */
    backgroundcolor?: Color;
    /**
     * The compression level to use for tile layer data (defaults to -1, which means to use the algorithm default)
     */
    compressionlevel: number;
    /**
     * Number of tile rows
     */
    height: number;
    /**
     * Length of the side of a hex tile in pixels (hexagonal maps only)
     */
    hexsidelength?: number;
    /**
     * Whether the map has infinite dimensions
     */
    infinite: boolean;
    /**
     * Array of Layers
     */
    layers: Layer[];
    /**
     * Auto-increments for each layer
     */
    nextlayerid: number;
    /**
     * Auto-increments for each placed object
     */
    nextobjectid: number;
    /**
     * orthogonal, isometric, staggered or hexagonal
     */
    orientation: "orthogonal" | "isometric" | "staggered" | "hexagonal";
    /**
     * Array of Properties
     */
    properties?: Properties[];
    /**
     * 	right-down (the default), right-up, left-down or left-up (currently only supported for orthogonal maps)
     */
    renderorder: "right-down" | "right-up" | "left-down" | "left-up";
    /**
     * x or y (staggered / hexagonal maps only)
     */
    staggeraxis?: "x" | "y";
    /**
     * odd or even (staggered / hexagonal maps only)
     */
    staggerindex?: "odd" | "even";
    /**
     * The Tiled version used to save the file
     */
    tiledversion: string;
    /**
     * Map grid height
     */
    tileheight: number;
    /**
     * Array of Tilesets
     */
    tilesets: ITileset[];
    /**
     * Map grid width
     */
    tilewidth: number;
    /**
     * map (since 1.0)
     */
    type: "map";
    /**
     * The JSON format version
     */
    version: number;
    /**
     * Number of tile columns
     */
    width: number;
};
