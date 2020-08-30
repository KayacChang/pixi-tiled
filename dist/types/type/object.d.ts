import { Point as TPoint, Color } from "./types";
import { Properties } from "./properties";
declare type Base = {
    /**
     * Height in pixels.
     */
    height: number;
    /**
     * Incremental ID, unique across all objects
     */
    id: number;
    /**
     * String assigned to name field in editor
     */
    name: string;
    /**
     * Array of Properties
     */
    properties?: Properties[];
    /**
     * Angle in degrees clockwise
     */
    rotation: number;
    /**
     * String assigned to type field in editor
     */
    type: string;
    /**
     * Whether object is shown in editor.
     */
    visible: boolean;
    /**
     * Width in pixels
     */
    width: number;
    /**
     * X coordinate in pixels
     */
    x: number;
    /**
     * Y coordinate in pixels
     */
    y: number;
};
declare type Text = {
    text: {
        /**
         * Whether to use a bold font (default: false)
         */
        bold?: boolean;
        /**
         * Hex-formatted color (#RRGGBB or #AARRGGBB) (default: #000000)
         */
        color?: Color;
        /**
         * Font family (default: sans-serif)
         */
        fontfamily?: string;
        /**
         * Horizontal alignment (center, right, justify or left (default))
         */
        halign?: string;
        /**
         * Whether to use an italic font (default: false)
         */
        italic?: boolean;
        /**
         * Whether to use kerning when placing characters (default: true)
         */
        kerning?: boolean;
        /**
         * Pixel size of font (default: 16)
         */
        pixelsize?: number;
        /**
         * Whether to strike out the text (default: false)
         */
        strikeout?: boolean;
        /**
         * Text
         */
        text: string;
        /**
         * Whether to underline the text (default: false)
         */
        underline?: boolean;
        /**
         * Vertical alignment (center, bottom or top (default))
         */
        valign?: "center" | "bottom" | "top";
        /**
         * Whether the text is wrapped within the object bounds (default: false)
         */
        wrap: boolean;
    };
} & Base;
declare type Template = {
    /**
     * Reference to a template file, in case object is a template instance
     */
    template: string;
} & Base;
declare type Point = {
    /**
     * Used to mark an object as a point
     */
    point: boolean;
} & Base;
declare type Ellipse = {
    /**
     * Used to mark an object as an ellipse
     */
    ellipse: boolean;
} & Base;
declare type Tile = {
    /**
     * Global tile ID, only if object represents a tile
     */
    gid?: number;
} & Base;
declare type Polygon = {
    /**
     * Array of Points, in case the object is a polygon
     */
    polygon: TPoint[];
};
declare type Polyline = {
    /**
     * Array of Points, in case the object is a polyline
     */
    polyline?: TPoint[];
};
export declare type Object = Tile | Point | Ellipse | Polygon | Polyline | Template | Text;
export {};
