import { Signature } from '../src';

describe("MeSomb Signature", () => {
  it('Should compute signature', () => {
    // const Signature = require('../src/Signature');
    expect(Signature.signRequest('POST', 'GET', 'http://127.0.0.1:8000/en/api/v1.1/payment/collect/', new Date('2023-01-16T08:39:25.894Z'), 'fihser', {accessKey: 'c6c40b76-8119-4e93-81bf-bfb55417b392', secretKey: 'fe8c2445-810f-4caa-95c9-778d51580163'})).toEqual("HMAC-SHA1 Credential=c6c40b76-8119-4e93-81bf-bfb55417b392/2023016/POST/mesomb_request, SignedHeaders=host;x-mesomb-date;x-mesomb-nonce, Signature=e2b12a1c9ae31e2f3380b4cc5625d12ebf976f2f")
  });
})
