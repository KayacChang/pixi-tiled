export function exist(data: any): boolean {
  return data !== undefined;
}

export function isNumberArray(data: any): data is number[] {
  return Array.isArray(data) && Number.isFinite(data[0]);
}

export function isString(data: any): data is string {
  return typeof data === "string";
}
