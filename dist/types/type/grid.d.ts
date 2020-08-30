/**
 * @description
 * Specifies common grid settings used for tiles in a tileset
 */
export declare type Grid = {
    /**
     * Cell height of tile grid
     */
    height: number;
    /**
     * orthogonal (default) or isometric
     */
    orientation: "orthogonal" | "isometric";
    /**
     * Cell width of tile grid
     */
    width: number;
};
