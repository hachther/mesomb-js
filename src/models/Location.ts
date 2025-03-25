import { LocationData } from '../types';

/**
 * Location model
 *
 * @property {string} town - The location's town
 * @property {string} region - The location's region
 * @property {string} country - The location's country
 */
export default class Location {
  private readonly data: Record<string, any>;

  public town: string;
  public region: string;
  public country: string;

  public constructor(data: LocationData) {
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
  public getData() {
    return this.data;
  }
}
