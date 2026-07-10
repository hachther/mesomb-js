import { AddressData } from '../types.js';

export default class Address {
  private readonly data: Record<string, any>;

  public line1: string;
  public town: string;
  public region: string;
  public country: string;
  public line2?: string;
  public zip?: string;

  public constructor(data: AddressData) {
    this.data = data;

    this.line1 = data.line1;
    this.town = data.town;
    this.region = data.region;
    this.country = data.country;
    this.line2 = data.line2;
    this.zip = data.zip;
  }
}
