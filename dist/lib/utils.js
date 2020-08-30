export function exist(data) {
    return data !== undefined;
}
export function isNumberArray(data) {
    return Array.isArray(data) && Number.isFinite(data[0]);
}
export function isString(data) {
    return typeof data === "string";
}
//# sourceMappingURL=utils.js.map