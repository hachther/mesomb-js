/**
 * @class Signature
 */
export declare class Signature {
    /**
     * @method signRequest
     *
     * @param {string} service - The targeted service
     * @param {string} method - The HTTP method
     * @param {string} url - The URL
     * @param {Date} date - The date
     * @param {string} nonce - The nonce
     * @param {{ accessKey: string, secretKey: string }} credentials - The credentials
     * @param {Record<string, string>} [headers={}] - The headers
     * @param {Record<string, any>} [body] - The body
     */
    static signRequest(service: string, method: string, url: string, date: Date, nonce: string, credentials: {
        accessKey: string;
        secretKey: string;
    }, headers?: Record<string, string>, body?: Record<string, any> | undefined): string;
}
