import { Texture, AnimatedSprite, Sprite, Rectangle } from "pixi.js";
export function createTile(data, resources) {
    var _a;
    var id = data.id, image = data.image, animation = data.animation;
    if (animation) {
        var textures_1 = animation
            .map(function (_a) {
            var _b;
            var tileid = _a.tileid;
            return (_b = resources[tileid]) === null || _b === void 0 ? void 0 : _b.texture;
        })
            .filter(Boolean);
        return function () { return new AnimatedSprite(textures_1); };
    }
    if (image) {
        var texture_1 = (_a = resources[id]) === null || _a === void 0 ? void 0 : _a.texture;
        return function () { return new Sprite(texture_1); };
    }
    throw new Error("can not handle this tile data " + data);
}
export function createTileSet(data, resources) {
    var _a;
    var firstgid = data.firstgid, image = data.image, imagewidth = data.imagewidth, imageheight = data.imageheight, tilewidth = data.tilewidth, tileheight = data.tileheight, spacing = data.spacing;
    if (!image || !imagewidth || !imageheight) {
        return {};
    }
    var _texture = (_a = resources[image]) === null || _a === void 0 ? void 0 : _a.texture;
    if (!_texture) {
        return {};
    }
    var tileset = {};
    var cx = Math.ceil(imagewidth / (tilewidth + spacing));
    var cy = Math.ceil(imageheight / (tileheight + spacing));
    for (var y = 0; y < cy; y++) {
        var _loop_1 = function (x) {
            var rect = new Rectangle(x * (tilewidth + spacing), y * (tileheight + spacing), tilewidth, tileheight);
            var texture = new Texture(_texture.baseTexture, rect);
            tileset[firstgid + x + y * cx] = function () { return new Sprite(texture); };
        };
        for (var x = 0; x < cx; x++) {
            _loop_1(x);
        }
    }
    return tileset;
}
//# sourceMappingURL=tile.js.map