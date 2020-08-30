import { Sprite } from "pixi.js";
import { Tile, Resources, ITileset, TileSet } from "./type";
export declare function createTile(data: Tile, resources: Resources): () => Sprite;
export declare function createTileSet(data: ITileset, resources: Resources): TileSet;
