export default class Customer {
  private data: Record<string, any>;

  public email: string;
  public phone: string;
  public town: string;
  public region: string;
  public country: string;
  // tslint:disable-next-line:variable-name
  public firstName: string;
  // tslint:disable-next-line:variable-name
  public lastName: string;
  public address: string;

  public constructor(data: Record<string, any>) {
    this.data = data;

    this.email = data.email;
    this.phone = data.phone;
    this.town = data.town;
    this.region = data.region;
    this.country = data.country;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.address = data.address;
  }

  public toJSON() {
    return this.data;
  }
}
