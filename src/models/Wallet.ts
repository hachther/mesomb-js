export default class Wallet {
  private readonly data: Record<string, any>;

  public identifier: number;
  public number: string;
  public country: string;
  public status: string;
  public lastActivity?: Date;
  public balance?: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phoneNumber: string;
  public gender: 'MAN' | 'WOMAN';

  public constructor(data: Record<string, any>) {
    this.data = data;

    this.identifier = data.identifier;
    this.status = data.status;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.phoneNumber = data.phone_number;
    this.country = data.country;
    this.gender = data.gender;
    this.number = data.number;
    if (data.last_activity) {
      this.lastActivity = new Date(data.last_activity);
    }
    this.balance = data.balance;
  }

  /**
   * @return: data from the server
   */
  public toJSON(): Record<string, any> {
    return this.data;
  }
}
