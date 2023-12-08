import { PaymentOperation, RandomGenerator, MeSomb } from '../src';

const applicationKey = '2bb525516ff374bb52545bf22ae4da7d655ba9fd';
const accessKey = 'c6c40b76-8119-4e93-81bf-bfb55417b392';
const secretKey = 'fe8c2445-810f-4caa-95c9-778d51580163';

jest.setTimeout(30000);

describe("Deposit Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://192.168.100.10:8000';
  })
  it('Should make deposit test with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey: applicationKey + "f", accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeDeposit({amount: 5, service: 'MTN', receiver: '670000000', nonce, trxID: 1});
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should make deposit test with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey: accessKey + 'f', secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeDeposit({amount: 5, service: 'MTN', receiver: '670000000', nonce, trxID: 1});
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should make deposit test with invalid amount',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeDeposit({amount: 5, service: 'MTN', receiver: '670000000', nonce, trxID: 1});
    } catch (e: any) {
      expect(e.name).toEqual('InvalidClientRequestError');
    }
  });
  it('Should make deposit test with success', async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.makeDeposit({amount: 100, service: 'MTN', receiver: '670000000', nonce: RandomGenerator.nonce(), trxID: 1});
    expect(response.success).toBeTruthy();
    expect(response.status).toEqual('SUCCESS');
    expect(response.transaction.amount).toEqual(100);
    expect(response.transaction.fees).toEqual(0);
    expect(response.transaction.service).toEqual('MTN');
    expect(response.transaction.b_party).toEqual('237670000000');
    expect(response.transaction.country).toEqual('CM');
    expect(response.transaction.currency).toEqual('XAF');
  });
  it('Should make deposit test with success with customer and product data', async () => {
    const customer = {
      phone: '+237677550439',
      email: 'fisher.bank@gmail.com',
      first_name: 'Fisher',
      last_name: 'BANK'
    }
    const location = {town: 'Douala', country: 'Cameroun'};
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.makeDeposit({
      amount: 100,
      service: 'MTN',
      receiver: '670000000',
      nonce: RandomGenerator.nonce(),
      trxID: 1,
      customer,
      products: [{name: 'Sac a Dos', category: 'Sac'}],
      location
    });
    expect(response.success).toBeTruthy();
    expect(response.status).toEqual('SUCCESS');
    expect(response.transaction.amount).toEqual(100);
    expect(response.transaction.fees).toEqual(0);
    expect(response.transaction.service).toEqual('MTN');
    expect(response.transaction.b_party).toEqual('237670000000');
    expect(response.transaction.country).toEqual('CM');
    expect(response.transaction.currency).toEqual('XAF');
    Object.keys(customer).forEach((key: string) => {
      // @ts-ignore
      expect(response.transaction.customer[key]).toEqual(customer[key]);
    })
    Object.keys(location).forEach((key: string) => {
      // @ts-ignore
      expect(response.transaction.location[key]).toEqual(location[key]);
    })
    expect(response.transaction.products?.length).toEqual(1);
    // @ts-ignore
    expect(response.transaction.products[0].name).toEqual('Sac a Dos');
    // @ts-ignore
    expect(response.transaction.products[0].category).toEqual('Sac');
    // @ts-ignore
    // expect(response.transaction.products[0].quantity).toEqual(1);
    // @ts-ignore
    // expect(response.transaction.products[0].amount).toEqual(100);
  });
});

describe("Collect Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://192.168.100.10:8000';
  })
  it('Should make payment test with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey: applicationKey + "f", accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeCollect({amount: 5, service: 'MTN', payer: '670000000', nonce});
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should make payment test with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey: accessKey + 'f', secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeCollect({amount: 5, service: 'MTN', payer: '670000000', nonce});
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should make payment test with invalid amount',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeCollect({amount: 5, service: 'MTN', payer: '670000000', nonce});
    } catch (e: any) {
      expect(e.name).toEqual('InvalidClientRequestError');
    }
  });
  it('Should make payment test with success', async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.makeCollect({
      amount: 100,
      service: 'MTN',
      payer: '670000000',
      nonce: RandomGenerator.nonce(),
      trxID: '1'
    });
    expect(response.success).toBeTruthy();
    expect(response.status).toEqual('SUCCESS');
    expect(response.transaction.amount).toEqual(97);
    expect(response.transaction.fees).toEqual(3);
    expect(response.transaction.service).toEqual('MTN');
    expect(response.transaction.b_party).toEqual('237670000000');
    expect(response.transaction.country).toEqual('CM');
    expect(response.transaction.currency).toEqual('XAF');
    expect(response.transaction.reference).toEqual('1');
  });
  it('Should make payment test with success without fees', async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.makeCollect({
      amount: 100,
      service: 'MTN',
      payer: '670000000',
      nonce: RandomGenerator.nonce(),
      trxID: '1',
      fees: false
    });
    expect(response.success).toBeTruthy();
    expect(response.status).toEqual('SUCCESS');
    expect(response.transaction.amount).toEqual(100);
    expect(response.transaction.fees).toEqual(3);
    expect(response.transaction.service).toEqual('MTN');
    expect(response.transaction.b_party).toEqual('237670000000');
    expect(response.transaction.country).toEqual('CM');
    expect(response.transaction.currency).toEqual('XAF');
    expect(response.transaction.reference).toEqual('1');
  });
  it('Should make payment test with success with customer and product data', async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const customer = {
      phone: '+237677550439',
      email: 'fisher.bank@gmail.com',
      first_name: 'Fisher',
      last_name: 'BANK'
    }
    const location = {town: 'Douala', country: 'Cameroun'}
    const response = await payment.makeCollect({
      amount: 100,
      service: 'MTN',
      payer: '670000000',
      nonce: RandomGenerator.nonce(),
      trxID: '1',
      customer,
      products: [{name: 'Sac a Dos', category: 'Sac'}],
      location
    });
    expect(response.success).toBeTruthy();
    expect(response.status).toEqual('SUCCESS');
    expect(response.transaction.amount).toEqual(97);
    expect(response.transaction.fees).toEqual(3);
    expect(response.transaction.service).toEqual('MTN');
    expect(response.transaction.b_party).toEqual('237670000000');
    expect(response.transaction.country).toEqual('CM');
    expect(response.transaction.currency).toEqual('XAF');
    Object.keys(customer).forEach((key: string) => {
      // @ts-ignore
      expect(response.transaction.customer[key]).toEqual(customer[key]);
    })
    Object.keys(location).forEach((key: string) => {
      // @ts-ignore
      expect(response.transaction.location[key]).toEqual(location[key]);
    })
    expect(response.transaction.products?.length).toEqual(1);
    // @ts-ignore
    expect(response.transaction.products[0].name).toEqual('Sac a Dos');
    // @ts-ignore
    expect(response.transaction.products[0].category).toEqual('Sac');
  });
  it('Should make payment test with pending', async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.makeCollect({amount: 100, service: 'MTN', payer: '670000000', nonce: RandomGenerator.nonce(), trxID: '1', mode: 'asynchronous'});
    expect(response.isOperationSuccess()).toBeTruthy();
    expect(response.isTransactionSuccess()).toBeFalsy();
  });
});

describe("Security Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://192.168.100.10:8000';
  })

  it('Should unset whitelist IP',  async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const application = await payment.updateSecurity('whitelist_ips', 'UNSET');
    expect(application.security.whitelist_ips).toBeUndefined();
  });

  it('Should unset blacklist receiver',  async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const application = await payment.updateSecurity('blacklist_receivers', 'UNSET');
    expect(application.security.blacklist_receivers).toBeUndefined();
  });
});

describe("Status Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://192.168.100.10:8000';
  })

  it('Should get status with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey: applicationKey + "f", accessKey, secretKey});
      await payment.getStatus();
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should get status with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey: accessKey + 'f', secretKey});
      await payment.getStatus();
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should get status success',  async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.getStatus();
    expect(response.name).toEqual('Meudocta Shop');
  });
});

describe("Get Transactions Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://192.168.100.10:8000';
  })

  it('Should get transactions with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey: applicationKey + "f", accessKey, secretKey});
      await payment.getTransactions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should get transactions with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey: accessKey + 'f', secretKey});
      await payment.getTransactions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should get transactions success',  async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.getTransactions(['9886f099-dee2-4eaa-9039-e92b2ee33353']);
    expect(response.length).toEqual(1);
    expect(response[0].pk).toEqual('9886f099-dee2-4eaa-9039-e92b2ee33353');
  });
});

describe("Check Transactions Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://192.168.100.10:8000';
  })

  it('Should check transactions with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey: applicationKey + "f", accessKey, secretKey});
      await payment.checkTransactions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should check transactions with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey: accessKey + 'f', secretKey});
      await payment.checkTransactions(['c6c40b76-8119-4e93-81bf-bfb55417b392']);
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should check transactions success',  async () => {
    const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
    const response = await payment.checkTransactions(['9886f099-dee2-4eaa-9039-e92b2ee33353']);
    expect(response.length).toEqual(1);
    expect(response[0].pk).toEqual('9886f099-dee2-4eaa-9039-e92b2ee33353');
  });
});
