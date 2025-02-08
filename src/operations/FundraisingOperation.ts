import { AOperation } from './AOperation';
import { MoneyContributeRequest } from '../types';
import ContributionResponse from '../models/ContributionResponse';
import Contribution from '../models/Contribution';


export class FundraisingOperation extends AOperation {
  protected service = 'fundraising';

  public constructor({ fundKey, accessKey, secretKey }: { fundKey: string; accessKey: string; secretKey: string }) {
    super({ target: fundKey, accessKey, secretKey });
  }

  /**
   * Collect money a user account
   * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
   *
   * @param amount: amount to collect
   * @param service: payment service with the possible values MTN, ORANGE, AIRTEL
   * @param payer: account number to collect from
   * @param date: date of the request
   * @param nonce: unique string on each request
   * @param country: 2 letters country code of the service (configured during your service registration in MeSomb)
   * @param currency: currency of your service depending on your country
   * @param mode: asynchronous or synchronous
   * @param conversion: true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param location: Map containing the location of the customer with the following attributes: town, region and location all string.
   * @param contact: Contact of the contributor with the following attributes: phoneNumber string, email string. If contribution is anonymous, this field is not required
   * @param fullName: Full name of the contributor with the following attributes: firstName string, lastName string. If contribution is anonymous, this field is not required
   * @param trxID: if you want to include your contribution ID in the request
   *
   * @return TransactionResponse
   */
  public async makeContribution({
    contact,
    service,
    payer,
    fullName,
    amount,
    anonymous = false,
    location,
    acceptTerms = true,
    date = new Date(),
    nonce,
    trxID,
    mode = 'synchronous',
    country = 'CM',
    currency = 'XAF',
    conversion = false,
  }: MoneyContributeRequest): Promise<ContributionResponse> {
    const endpoint = 'fundraising/contribute/';

    const body: Record<string, any> = {
      service,
      payer,
      amount,
      anonymous,
      accept_terms: acceptTerms,
      country,
      amount_currency: currency,
      conversion,
    };
    if (trxID) {
      body.trxID = trxID;
    }
    if (location) {
      body.location = location;
    }
    if (contact) {
      body.contact = {
        phone_number: contact.phoneNumber,
      };
      if (contact.email) {
        body.contact.email = contact.email;
      }
    }
    if (fullName) {
      body.full_name = {
        last_name: fullName.lastName,
      };
      if (fullName.firstName) {
        body.full_name.first_name = fullName.firstName;
      }
    }

    return new ContributionResponse(await this.executeRequest('POST', endpoint, date, nonce, body, mode));
  }

  /**
   * Fetch contributions base on MeSomb IDs or external IDs
   *
   * @param ids: ids of the contributions
   * @param source: origin of the ID of the contributions (MESOMB for MeSomb and EXTERNAL for your system)
   *
   * @return Contribution[]
   */
  public async getContributions(ids: string[], source: 'MESOMB' | 'EXTERNAL' = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `fundraising/contributions/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Contribution(d));
  }

  /**
   * Check contributions base on MeSomb IDs or external IDs
   *
   * @param ids: ids of the contributions
   * @param source: origin of the ID of the contributions (MESOMB for MeSomb and EXTERNAL for your system)
   *
   * @return Contribution[]
   */
  public async checkContributions(ids: string[], source = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `fundraising/contributions/check/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Contribution(d));
  }
}
