export default class Customer {
  public email: string;
  public phone: string;
  public town: string;
  public region: string;
  public country: string;
  // tslint:disable-next-line:variable-name
  public first_name: string;
  // tslint:disable-next-line:variable-name
  public last_name: string;
  public address: string;

  public constructor(data: Record<string, any>) {
    this.email = data.email;
    this.phone = data.phone;
    this.town = data.town;
    this.region = data.region;
    this.country = data.country;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.address = data.address;
  }
}
