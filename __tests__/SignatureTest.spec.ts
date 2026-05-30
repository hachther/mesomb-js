import { Signature } from '../src';

describe("MeSomb Signature", () => {
  it('Should compute signature', () => {
    const date = new Date(2023, 0, 16, 0, 0, 0, 0);
    const signature = Signature.signRequest(
      'payment',
      'GET',
      'http://127.0.0.1:8000/en/api/v1.1/payment/collect/',
      date,
      'fihser',
      {
        accessKey: 'c6c40b76-8119-4e93-81bf-bfb55417b392',
        secretKey: 'fe8c2445-810f-4caa-95c9-778d51580163',
      },
    );

    expect(signature).toContain('HMAC-SHA1 Credential=c6c40b76-8119-4e93-81bf-bfb55417b392/2023016/payment/mesomb_request');
    expect(signature).toContain('SignedHeaders=host;x-mesomb-date;x-mesomb-nonce');
    expect(signature).toMatch(/Signature=[a-f0-9]{40}$/);
  });

  it('supports async signers through signRequestAsync', async () => {
    const asyncSigner = {
      signRequest: jest.fn(async () => 'async-signature'),
    };
    Signature.setSigner(asyncSigner as any);

    await expect(
      Signature.signRequestAsync(
        'payment',
        'GET',
        'https://example.com/api/v1.1/payment/status/',
        new Date(),
        'nonce',
        { accessKey: 'access', secretKey: 'secret' },
      ),
    ).resolves.toBe('async-signature');

    expect(() =>
      Signature.signRequest(
        'payment',
        'GET',
        'https://example.com/api/v1.1/payment/status/',
        new Date(),
        'nonce',
        { accessKey: 'access', secretKey: 'secret' },
      ),
    ).toThrow('Current signer is async');

    Signature.resetSigner();
  });
})
