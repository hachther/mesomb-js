export default class PaymentAppResponse {
  private readonly data: Record<string, any>;

  public key: string;
  public name: string;

  constructor(data: { key: string; name: string } & Record<string, any>) {
    this.data = data;
    this.key = data.key;
    this.name = data.name;
  }

  public getData(): Record<string, any> {
    return this.data;
  }
}

