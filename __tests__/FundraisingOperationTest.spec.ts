import { FundraisingOperation, RandomGenerator, MeSomb } from '../src';

const fundKey = 'fa78bded201b791712ee398c7ddfb8652669404f';
const accessKey = 'c6c40b76-8119-4e93-81bf-bfb55417b392';
const secretKey = 'fe8c2445-810f-4caa-95c9-778d51580163';

jest.setTimeout(30000);

describe("Contribution Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://127.0.0.1:8000';
  })
  it('Should make payment contribution with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new FundraisingOperation({fundKey: fundKey + "f", accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeContribution({amount: 5, service: 'MTN', payer: '670000000', nonce});
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should make payment contribution with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new FundraisingOperation({fundKey, accessKey: accessKey + 'f', secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeContribution({amount: 5, service: 'MTN', payer: '670000000', nonce});
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should make payment contribution with invalid amount',  async () => {
    expect.assertions(1);
    try {
      const payment = new FundraisingOperation({fundKey, accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeContribution({amount: 5, service: 'MTN', payer: '670000000', nonce});
    } catch (e: any) {
      expect(e.name).toEqual('InvalidClientRequestError');
    }
  });
  it('Should make payment contribution with success', async () => {
    const payment = new FundraisingOperation({fundKey, accessKey, secretKey});
    const response = await payment.makeContribution({
      amount: 100,
      service: 'MTN',
      payer: '670000000',
      trxID: '1',
      fullName: {firstName: 'John', lastName: 'Doe'},
      contact: {email: 'contact@gmail.com', phoneNumber: '+237677550203'},
    });
    expect(response.success).toBeTruthy();
    expect(response.status).toEqual('SUCCESS');
    expect(response.isContributionSuccess()).toBeTruthy();
    expect(response.contribution.amount).toEqual(98);
    expect(response.contribution.fees).toEqual(2);
    expect(response.contribution.service).toEqual('MTN');
    expect(response.contribution.bParty).toEqual('237670000000');
    expect(response.contribution.country).toEqual('CM');
    expect(response.contribution.currency).toEqual('XAF');
    expect(response.contribution.reference).toEqual('1');
    expect(response.contribution.contributor!.firstName).toEqual('John');
    expect(response.contribution.contributor!.lastName).toEqual('Doe');
    expect(response.contribution.contributor!.email).toEqual('contact@gmail.com');
    expect(response.contribution.contributor!.phone).toEqual('+237677550203');
    expect(response.contribution.getData()).not.toBeNull()
  });
  it('Should make payment test with success without fees', async () => {
    const payment = new FundraisingOperation({fundKey, accessKey, secretKey});
    const response = await payment.makeContribution({
      amount: 100,
      service: 'MTN',
      payer: '670000000',
      nonce: RandomGenerator.nonce(),
      trxID: '1',
      anonymous: true,
    });
    expect(response.success).toBeTruthy();
    expect(response.status).toEqual('SUCCESS');
    expect(response.contribution.amount).toEqual(98);
    expect(response.contribution.fees).toEqual(2);
    expect(response.contribution.service).toEqual('MTN');
    expect(response.contribution.bParty).toEqual('237670000000');
    expect(response.contribution.country).toEqual('CM');
    expect(response.contribution.currency).toEqual('XAF');
    expect(response.contribution.reference).toEqual('1');
    expect(response.contribution.contributor).toBeUndefined();
  });
});


describe("Get Contributions Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://127.0.0.1:8000';
  })

  it('Should get contributions with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new FundraisingOperation({fundKey: fundKey + "f", accessKey, secretKey});
      await payment.getContributions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should get contributions with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new FundraisingOperation({fundKey, accessKey: accessKey + 'f', secretKey});
      await payment.getContributions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should get contributions success',  async () => {
    const payment = new FundraisingOperation({fundKey, accessKey, secretKey});
    const response = await payment.getContributions(['0685831f-4145-4352-ae81-155fec42c748']);
    expect(response.length).toEqual(1);
    expect(response[0].pk).toEqual('0685831f-4145-4352-ae81-155fec42c748');
  });
  it('Should get contributions success',  async () => {
    const payment = new FundraisingOperation({fundKey, accessKey, secretKey});
    const response = await payment.getContributions(['1'], 'EXTERNAL');
    expect(response.length).toBeGreaterThan(1);
    // expect(response[0].pk).toEqual('0685831f-4145-4352-ae81-155fec42c748');
  });
});

describe("Check Contributions Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://127.0.0.1:8000';
  })

  it('Should check contributions with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new FundraisingOperation({fundKey: fundKey + "f", accessKey, secretKey});
      await payment.checkContributions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should check contributions with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new FundraisingOperation({fundKey, accessKey: accessKey + 'f', secretKey});
      await payment.checkContributions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should check contributions success',  async () => {
    const payment = new FundraisingOperation({fundKey, accessKey, secretKey});
    const response = await payment.checkContributions(['0685831f-4145-4352-ae81-155fec42c748']);
    expect(response.length).toEqual(1);
    expect(response[0].pk).toEqual('0685831f-4145-4352-ae81-155fec42c748');
  });
});
