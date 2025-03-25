"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Location model
 *
 * @property {string} town - The location's town
 * @property {string} region - The location's region
 * @property {string} country - The location's country
 */
var Location = /** @class */ (function () {
    function Location(data) {
        this.data = data;
        this.town = data.town;
        this.region = data.region;
        this.country = data.country;
    }
    /**
     * Get the data receive from the server
     *
     * @returns {Record<string, any>}
     */
    Location.prototype.getData = function () {
        return this.data;
    };
    return Location;
}());
exports.default = Location;
