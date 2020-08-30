import { Loader } from "pixi.js";
import { Map as IMap, ITileset, Resources, TileSet } from "./type";
import { createTile, createTileSet } from "./tile";
import path from "path";
import createTileMap from "./tilemap";

const fetchJson = <T>(path: string): Promise<T> =>
  fetch(path).then((res) => res.json());

function loadByLoader(task: any[]) {
  const loader = new Loader();

  loader.add(task);

  return new Promise<Resources>((resolve) =>
    loader.load((_, resources) => resolve(resources))
  );
}

async function fetchTileset(filePath: string) {
  const tilemap = await fetchJson<IMap>(filePath);

  const tasks = tilemap.tilesets.map(async ({ source, ...data }: ITileset) => {
    if (source) {
      const dirname = path.dirname(filePath);
      const file = path.resolve(dirname, source);
      const tileset = await fetchJson<ITileset>(file);

      return { ...data, ...tileset };
    }
    return data;
  });

  tilemap.tilesets = await Promise.all(tasks);

  return tilemap;
}

function loadRes(tilemap: IMap, filePath: string) {
  const dirname = path.dirname(filePath);

  const tasks = tilemap.tilesets
    .map(({ firstgid, tiles, image = "" }) => {
      //
      if (tiles) {
        return tiles?.map(({ id, image = "" }) => {
          return {
            name: String(firstgid + id),
            url: path.resolve(dirname, image),
          };
        });
      }

      return { name: image, url: path.resolve(dirname, image) };
    })
    .flat();

  return loadByLoader(tasks);
}

function toTileSet(tilemap: IMap, resources: Resources) {
  const tilesets: TileSet = {};

  tilemap.tilesets.forEach((data) => {
    //
    if (data.tiles) {
      const { firstgid, tiles } = data;

      tiles.forEach((data) => {
        const _data = { ...data, id: firstgid + data.id };

        tilesets[_data.id] = createTile(_data, resources);
      });
    }

    Object.assign(tilesets, createTileSet(data, resources));
  });

  return tilesets;
}

export default async function loadTileMap(filePath: string) {
  const tilemap = await fetchTileset(filePath);

  const resources = await loadRes(tilemap, filePath);

  const tilesets = await toTileSet(tilemap, resources);

  return createTileMap(tilemap, tilesets);
}
