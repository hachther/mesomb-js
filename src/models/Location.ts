export default class Location {
  private data: Record<string, any>;

  public town: string;
  public region: string;
  public country: string;

  public constructor(data: Record<string, any>) {
    this.data = data;

    this.town = data.town;
    this.region = data.region;
    this.country = data.country;
  }

  public toJSON() {
    return this.data;
  }
}
