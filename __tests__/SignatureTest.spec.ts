import Signature from '../src/Signature';

describe("MeSomb Signature", () => {
  it('Should compute signature', () => {
    // const Signature = require('../src/Signature');
    Signature.signRequest('POST', 'GET', 'http://127.0.0.1:8000/en/api/v1.1/payment/collect/', new Date(), 'fihser', {accessKey: 'c6c40b76-8119-4e93-81bf-bfb55417b392', secretKey: 'fe8c2445-810f-4caa-95c9-778d51580163'})
  });
})
