export interface SignRequestParams {
  algorithm: string;
  service: string;
  method: string;
  url: string;
  date: Date;
  nonce: string;
  credentials: { secretKey: string; accessKey: string };
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

export interface CanonicalRequestData {
  timestamp: number;
  canonicalQuery: string;
  path: string;
  hostHeader: string;
  headers: Record<string, string>;
  headersKeys: string[];
  canonicalHeaders: string;
  signedHeaders: string;
  scope: string;
}

export interface RequestSigner {
  signRequest(params: SignRequestParams): string | Promise<string>;
}

