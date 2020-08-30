import { Properties } from "./properties";
import { Color } from "./types";
/**
 * @description
 * WangColor
 */
declare type WangColor = {
    /**
     * Hex-formatted color (#RRGGBB or #AARRGGBB)
     */
    color: Color;
    /**
     * Name of the Wang color
     */
    name: string;
    /**
     * Probability used when randomizing
     */
    probability: number;
    /**
     * Local ID of tile representing the Wang color
     */
    tile: number;
};
declare type WangTile = {
    /**
     * Tile is flipped diagonally (default: false)
     */
    dflip: boolean;
    /**
     * Tile is flipped horizontally (default: false)
     */
    hflip: boolean;
    /**
     * Local ID of tile
     */
    tileid: number;
    /**
     * Tile is flipped vertically (default: false)
     */
    vflip: boolean;
    /**
     * Array of Wang color indexes (uchar[8])
     */
    wangid: [number, number, number, number, number, number, number, number];
};
export declare type WangSet = {
    /**
     * Array of Wang colors
     */
    cornercolors?: WangColor[];
    /**
     * Array of Wang colors
     */
    edgecolors?: WangColor[];
    /**
     * Name of the Wang set
     */
    name: string;
    /**
     * Array of Properties
     */
    properties?: Properties[];
    /**
     * Local ID of tile representing the Wang set
     */
    tile: number;
    /**
     * Array of Wang tiles
     */
    wangtiles?: WangTile[];
};
export {};
