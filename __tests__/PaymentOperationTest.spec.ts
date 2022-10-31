import Settings from '../src/Settings';
import { PaymentOperation, Signature } from '../src';
import "isomorphic-fetch";

const applicationKey = '2bb525516ff374bb52545bf22ae4da7d655ba9fd';
const accessKey = 'c6c40b76-8119-4e93-81bf-bfb55417b392';
const secretKey = 'fe8c2445-810f-4caa-95c9-778d51580163';

jest.setTimeout(20000);

describe("Deposit Operation", () => {
  beforeEach(() => {
    Settings.HOST = 'http://127.0.0.1:8000';
  })
  it('Should make deposit test with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey: applicationKey + "f", accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeDeposit(5, 'MTN', '677550203', new Date(), nonce, 1);
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should make deposit test with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey: accessKey + 'f', secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeDeposit(5, 'MTN', '677550203', new Date(), nonce, 1);
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should make deposit test with invalid amount',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeDeposit(5, 'MTN', '677550203', new Date(), nonce, 1);
    } catch (e: any) {
      expect(e.name).toEqual('InvalidClientRequestError');
    }
  });
  it('Should make deposit test with success', async () => {
    const payment = new PaymentOperation({applicationKey: applicationKey, accessKey, secretKey});
    const response = await payment.makeDeposit(100, 'MTN', '677550203', new Date(), Signature.nonceGenerator(), 1);
    expect(response.isOperationSuccess()).toBeTruthy();
    expect(response.isTransactionSuccess()).toBeTruthy();
  });
});

describe("Collect Operation", () => {
  beforeEach(() => {
    Settings.HOST = 'http://127.0.0.1:8000';
  })
  it('Should make payment test with not service found',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey: applicationKey + "f", accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeCollect(5, 'MTN', '677550203', new Date(), nonce, null);
    } catch (e: any) {
      expect(e.name).toEqual('ServiceNotFoundError');
    }
  });
  it('Should make payment test with not permission denied',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey: accessKey + 'f', secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeCollect(5, 'MTN', '677550203', new Date(), nonce, null);
    } catch (e: any) {
      expect(e.name).toEqual('PermissionDeniedError');
    }
  });
  it('Should make payment test with invalid amount',  async () => {
    expect.assertions(1);
    try {
      const payment = new PaymentOperation({applicationKey, accessKey, secretKey});
      const nonce = 'lkakdio90fsd8fsf';

      await payment.makeCollect(5, 'MTN', '677550203', new Date(), nonce, null);
    } catch (e: any) {
      expect(e.name).toEqual('InvalidClientRequestError');
    }
  });
  it('Should make payment test with success', async () => {
    const payment = new PaymentOperation({applicationKey: applicationKey, accessKey, secretKey});
    const response = await payment.makeCollect(100, 'MTN', '677550203', new Date(), Signature.nonceGenerator(), '1');
    expect(response.isOperationSuccess()).toBeTruthy();
    expect(response.isTransactionSuccess()).toBeTruthy();
  });
  it('Should make payment test with pending', async () => {
    const payment = new PaymentOperation({applicationKey: applicationKey, accessKey, secretKey});
    const response = await payment.makeCollect(100, 'MTN', '677550203', new Date(), Signature.nonceGenerator(), 1, 'CM', 'XAF', true, 'asynchronous', false);
    expect(response.isOperationSuccess()).toBeTruthy();
    expect(response.isTransactionSuccess()).toBeFalsy();
  });
});

describe("Security Operation", () => {
  beforeEach(() => {
    Settings.HOST = 'http://127.0.0.1:8000';
  })

  it('Should unset whitelist IP',  async () => {
    const payment = new PaymentOperation({applicationKey: applicationKey, accessKey, secretKey});
    const application = await payment.updateSecurity('whitelist_ips', 'UNSET');
    expect(application.getSecurityField('whitelist_ips')).toBeUndefined();
  });

  it('Should unset blacklist receiver',  async () => {
    const payment = new PaymentOperation({applicationKey: applicationKey, accessKey, secretKey});
    const application = await payment.updateSecurity('blacklist_receivers', 'UNSET');
    expect(application.getSecurityField('blacklist_receivers')).toBeUndefined();
  });
});

describe("Status Operation", () => {
  beforeEach(() => {
    Settings.HOST = 'http://127.0.0.1:8000';
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

describe("Transactions Operation", () => {
  beforeEach(() => {
    Settings.HOST = 'http://127.0.0.1:8000';
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
  });
});
