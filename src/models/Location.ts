export default class Location {
  public town: string;
  public region: string;
  public country: string;

  public constructor(data: Record<string, any>) {
    this.town = data.town;
    this.region = data.region;
    this.country = data.country;
  }
}
