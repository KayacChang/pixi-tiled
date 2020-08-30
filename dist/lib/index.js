var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Loader } from "pixi.js";
import { createTile, createTileSet } from "./tile";
import path from "path";
import createTileMap from "./tilemap";
var fetchJson = function (path) {
    return fetch(path).then(function (res) { return res.json(); });
};
function loadByLoader(task) {
    var loader = new Loader();
    loader.add(task);
    return new Promise(function (resolve) {
        return loader.load(function (_, resources) { return resolve(resources); });
    });
}
function fetchTileset(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var tilemap, tasks, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchJson(filePath)];
                case 1:
                    tilemap = _b.sent();
                    tasks = tilemap.tilesets.map(function (_a) { return __awaiter(_this, void 0, void 0, function () {
                        var dirname, file, tileset;
                        var source = _a.source, data = __rest(_a, ["source"]);
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!source) return [3 /*break*/, 2];
                                    dirname = path.dirname(filePath);
                                    file = path.resolve(dirname, source);
                                    return [4 /*yield*/, fetchJson(file)];
                                case 1:
                                    tileset = _b.sent();
                                    return [2 /*return*/, __assign(__assign({}, data), tileset)];
                                case 2: return [2 /*return*/, data];
                            }
                        });
                    }); });
                    _a = tilemap;
                    return [4 /*yield*/, Promise.all(tasks)];
                case 2:
                    _a.tilesets = _b.sent();
                    return [2 /*return*/, tilemap];
            }
        });
    });
}
function loadRes(tilemap, filePath) {
    var dirname = path.dirname(filePath);
    var tasks = tilemap.tilesets
        .map(function (_a) {
        var firstgid = _a.firstgid, tiles = _a.tiles, _b = _a.image, image = _b === void 0 ? "" : _b;
        //
        if (tiles) {
            return tiles === null || tiles === void 0 ? void 0 : tiles.map(function (_a) {
                var id = _a.id, _b = _a.image, image = _b === void 0 ? "" : _b;
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
function toTileSet(tilemap, resources) {
    var tilesets = {};
    tilemap.tilesets.forEach(function (data) {
        //
        if (data.tiles) {
            var firstgid_1 = data.firstgid, tiles = data.tiles;
            tiles.forEach(function (data) {
                var _data = __assign(__assign({}, data), { id: firstgid_1 + data.id });
                tilesets[_data.id] = createTile(_data, resources);
            });
        }
        Object.assign(tilesets, createTileSet(data, resources));
    });
    return tilesets;
}
export default function loadTileMap(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var tilemap, resources, tilesets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTileset(filePath)];
                case 1:
                    tilemap = _a.sent();
                    return [4 /*yield*/, loadRes(tilemap, filePath)];
                case 2:
                    resources = _a.sent();
                    return [4 /*yield*/, toTileSet(tilemap, resources)];
                case 3:
                    tilesets = _a.sent();
                    return [2 /*return*/, createTileMap(tilemap, tilesets)];
            }
        });
    });
}
//# sourceMappingURL=index.js.map