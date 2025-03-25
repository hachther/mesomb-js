import { LocationData } from '../types';
/**
 * Location model
 *
 * @property {string} town - The location's town
 * @property {string} region - The location's region
 * @property {string} country - The location's country
 */
export default class Location {
    private readonly data;
    town: string;
    region: string;
    country: string;
    constructor(data: LocationData);
    /**
     * Get the data receive from the server
     *
     * @returns {Record<string, any>}
     */
    getData(): Record<string, any>;
}
