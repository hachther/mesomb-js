import Contribution from './Contribution';

export default class TransactionResponse {
  public readonly success: boolean;
  public message: string;
  public redirect: string;
  public contribution: Contribution;
  public reference: string;
  public status: 'SUCCESS' | 'FAILED' | 'PENDING';

  constructor(data: Record<string, any>) {
    this.success = data.success;
    this.message = data.message;
    this.redirect = data.redirect;
    this.contribution = new Contribution(data.contribution);
    this.reference = data.reference;
    this.status = data.status;
  }

  public isOperationSuccess(): boolean {
    return this.success;
  }

  public isContributionSuccess(): boolean {
    return this.contribution?.isSuccess() === true;
  }
}
