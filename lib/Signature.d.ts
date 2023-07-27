export declare class Signature {
    static signRequest(service: string, method: string, url: string, date: Date, nonce: string, credentials: Record<string, string>, headers?: Record<string, string>, body?: Record<string, any> | undefined): string;
}
