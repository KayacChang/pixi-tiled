import { Properties } from "./properties";

/**
 * @description
 * Terrains
 */
export type Terrains = {
  /**
   * Name of terrain
   */
  name: string;

  /**
   * Array of Properties
   */
  properties?: Properties[];

  /**
   * Local ID of tile representing terrain
   */
  tile: number;
};
