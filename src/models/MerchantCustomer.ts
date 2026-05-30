import Address from './Address';

export default class MerchantCustomer {
  private readonly data: Record<string, any>;

  public identifier: string;
  public id: string;
  public email?: string | null;
  public phone?: string | null;
  public town?: string | null;
  public region?: string | null;
  public country?: string | null;
  public firstName?: string | null;
  public lastName?: string | null;
  public address?: Address;
  public metadata?: Record<string, any>;
  public description?: string | null;

  constructor(data: Record<string, any>) {
    this.data = data;
    this.identifier = data.identifier;
    this.id = data.identifier;
    this.email = data.email;
    this.phone = data.phone;
    this.town = data.town;
    this.region = data.region;
    this.country = data.country;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.address = data.address ? new Address(data.address) : undefined;
    this.metadata = data.metadata;
    this.description = data.description;
  }

  public getData(): Record<string, any> {
    return this.data;
  }
}

