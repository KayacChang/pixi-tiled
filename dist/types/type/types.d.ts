import { ITileset } from "./tileset";
import { Object } from "./object";
import { LoaderResource, Sprite } from "pixi.js";
/**
 * @description
 * Hex-formatted color (#RRGGBB or #AARRGGBB)
 */
export declare type Color = string;
/**
 * @description
 * A point on a polygon or a polyline, relative to the position of the object.
 */
export declare type Point = {
    /**
     * X coordinate in pixels
     */
    x: number;
    /**
     * Y coordinate in pixels
     */
    y: number;
};
/**
 * An object template is written to its own file and referenced by any instances of that template.
 */
export declare type Template = {
    type: "template";
    tileset?: ITileset;
    object: Object;
};
export declare type Resources = Partial<Record<string, LoaderResource>>;
export declare type TileSet = Record<number, () => Sprite>;
