/**
 * @description
 * When you add a property (using the ‘+’ button at the bottom of the Properties view),
 * you are prompted for its name and its type. Currently Tiled supports the following basic property types:
 *
 * - bool (true or false)
 * - color (a 32-bit color value)
 * - file (a relative path referencing a file)
 * - float (a floating point number)
 * - int (a whole number)
 * - object (a reference to an object) - Since Tiled 1.4
 * - string (any text, including multi-line text)
 */
export declare type Properties = {
    /**
     * Name of the property
     */
    name: string;
    /**
     * Type of the property (string (default), int, float, bool, color or file (since 0.16, with color and file added in 0.17))
     */
    type: "string" | "int" | "float" | "bool" | "color" | "file";
    /**
     * Value of the property
     */
    value: any;
};
