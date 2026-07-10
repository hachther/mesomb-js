import { AOperation } from './AOperation.js';
import { MoneyContributeRequest } from '../types.js';
import ContributionResponse from '../models/ContributionResponse.js';
import Contribution from '../models/Contribution.js';
import RandomGenerator from '../util/RandomGenerator.js';


export class FundraisingOperation extends AOperation {
  protected service = 'fundraising';

  public constructor({
    fundKey,
    accessKey,
    secretKey,
    language = 'en',
    timeout,
  }: {
    fundKey: string;
    accessKey: string;
    secretKey: string;
    language?: string;
    timeout?: number;
  }) {
    super({ target: fundKey, accessKey, secretKey, language, timeout });
  }

  /**
   * Collect money a user account
   * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
   *
   * @param {MoneyContributeRequest} params - amount to collect
   * @param {'MTN' | 'ORANGE' | 'AIRTEL'} params.service - payment service with the possible values MTN, ORANGE, AIRTEL
   * @param {string} params.payer - account number to collect from
   * @param {string} [params.nonce] - unique string on each request
   * @param {string} [params.country='CM'] - 2 letters country code of the service (configured during your service registration in MeSomb)
   * @param {string} [params.currency='XAF'] - currency of your service depending on your country
   * @param {string} [params.mode] - asynchronous or synchronous
   * @param {boolean} [params.conversion=false] - true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param {LocationRequest} [params.location] - Map containing the location of the customer with the following attributes: town, region and location all string.
   * @param {boolean} [params.anonymous=false] - true if the contribution is anonymous
   * @param {boolean} [params.acceptTerms=true] - true if the contributor accept the terms
   * @param {Contact} [params.contact] - Contact of the contributor with the following attributes: phoneNumber string, email string. If contribution is anonymous, this field is not required
   * @param {FullName} [params.fullName] - Full name of the contributor with the following attributes: firstName string, lastName string. If contribution is anonymous, this field is not required
   * @param {string} [params.trxID] - if you want to include your contribution ID in the request
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

    return new ContributionResponse(
      await this.executeRequest('POST', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body, mode),
    );
  }

  /**
   * Fetch contributions base on MeSomb IDs or external IDs
   *
   * @param {string[]} ids - ids of the contributions
   * @param {'MESOMB' | 'EXTERNAL'} [source='MESOMB'] - origin of the ID of the contributions (MESOMB for MeSomb and EXTERNAL for your system)
   *
   * @return Contribution[]
   */
  public async getContributions(
    ids: string[],
    source: 'MESOMB' | 'EXTERNAL' = 'MESOMB',
  ): Promise<Record<string, any>[]> {
    const endpoint = `fundraising/contributions/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Contribution(d));
  }

  /**
   * Check contributions base on MeSomb IDs or external IDs
   *
   * @param {string[]} ids - ids of the contributions
   * @param {'MESOMB' | 'EXTERNAL'} [source='MESOMB'] - origin of the ID of the contributions (MESOMB for MeSomb and EXTERNAL for your system)
   *
   * @return Contribution[]
   */
  public async checkContributions(ids: string[], source = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `fundraising/contributions/check/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Contribution(d));
  }
}
