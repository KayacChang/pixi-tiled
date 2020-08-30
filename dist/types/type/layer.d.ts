import { Properties } from "./properties";
import { Color } from "./types";
import { Object } from "./object";
/**
 * @description
 * Chunks are used to store the tile layer data for infinite maps.
 */
declare type Chunk = {
    /**
     * Array of unsigned int (GIDs) or base64-encoded data
     */
    data: number[] | string;
    /**
     * Height in tiles
     */
    height: number;
    /**
     * Width in tiles
     */
    width: number;
    /**
     * X coordinate in tiles
     */
    x: number;
    /**
     * Y coordinate in tiles
     */
    y: number;
};
export declare type Base = {
    /**
     * Row count. Same as map height for fixed-size maps.
     */
    height: number;
    /**
     * Incremental ID - unique across all layers
     */
    id: number;
    /**
     * Name assigned to this layer
     */
    name: string;
    /**
     * Horizontal layer offset in pixels (default: 0)
     */
    offsetx: number;
    /**
     * Vertical layer offset in pixels (default: 0)
     */
    offsety: number;
    /**
     * Value between 0 and 1
     */
    opacity: number;
    /**
     * Array of Properties
     */
    properties?: Properties[];
    /**
     * X coordinate where layer content starts (for infinite maps)
     */
    startx?: number;
    /**
     * Y coordinate where layer content starts (for infinite maps)
     */
    starty?: number;
    /**
     * Hex-formatted color (#RRGGBB or #AARRGGBB) that is multiplied with any graphics drawn by this layer or any child layers (optional).
     */
    tintcolor?: Color;
    /**
     * tilelayer, objectgroup, imagelayer or group
     */
    type: "tilelayer" | "objectgroup" | "imagelayer" | "group";
    /**
     * Whether layer is shown or hidden in editor
     */
    visible: boolean;
    /**
     * Column count. Same as map width for fixed-size maps.
     */
    width: number;
    /**
     * Horizontal layer offset in tiles. Always 0.
     */
    x: 0;
    /**
     * Vertical layer offset in tiles. Always 0.
     */
    y: 0;
};
export declare type ImageLayer = {
    /**
     * Image used by this layer. imagelayer only.
     */
    image: string;
    /**
     * Hex-formatted color (#RRGGBB) (optional). imagelayer only.
     */
    transparentcolor?: Color;
    type: "imagelayer";
} & Base;
export declare type TileLayer = {
    /**
     * Array of chunks (optional). tilelayer only.
     */
    chunks: Chunk[];
    /**
     * zlib, gzip, zstd (since Tiled 1.3) or empty (default). tilelayer only.
     */
    compression: "zlib" | "gzip" | "zstd" | "";
    /**
     * Array of unsigned int (GIDs) or base64-encoded data. tilelayer only.
     */
    data: number[] | string;
    /**
     * csv (default) or base64. tilelayer only.
     */
    encoding: "csv" | "base64";
    type: "tilelayer";
} & Base;
export declare type Group = {
    /**
     * Array of layers. group only.
     */
    layers: Layer[];
    type: "group";
} & Base;
export declare type ObjectGroup = {
    /**
     * topdown (default) or index. objectgroup only.
     */
    draworder: "topdown" | "index";
    /**
     * Array of objects. objectgroup only.
     */
    objects: Object[];
    type: "objectgroup";
} & Base;
export declare type Layer = TileLayer | ImageLayer | ObjectGroup | Group;
export {};
