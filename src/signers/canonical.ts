import { CanonicalRequestData, SignRequestParams } from './types.js';

function parseUrl(url: string): { protocol: string; host: string; pathname: string; query: string } {
  const parsed = new URL(url);
  return {
    protocol: parsed.protocol,
    host: parsed.host,
    pathname: parsed.pathname,
    query: parsed.search,
  };
}

export function buildCanonicalRequestData(params: SignRequestParams): CanonicalRequestData {
  const parsedUrl = parseUrl(params.url);
  const timestamp = params.date.getTime();
  const headers = { ...(params.headers || {}) };
  const canonicalQuery = parsedUrl.query ? parsedUrl.query.substring(1) : '';

  headers.host = `${parsedUrl.protocol}//${parsedUrl.host}`;
  headers['x-mesomb-date'] = String(timestamp);
  headers['x-mesomb-nonce'] = params.nonce;

  const headersKeys = Object.keys(headers).sort();
  const canonicalHeaders = headersKeys.map((key) => `${key}:${headers[key]}`).join('\n');
  const signedHeaders = headersKeys.join(';');
  const path = encodeURI(parsedUrl.pathname);

  // Keep scope generation unchanged for backward compatibility.
  const scope = `${params.date.getFullYear()}${params.date.getMonth()}${params.date.getDate()}/${params.service}/mesomb_request`;

  return {
    timestamp,
    canonicalQuery,
    path,
    hostHeader: headers.host,
    headers,
    headersKeys,
    canonicalHeaders,
    signedHeaders,
    scope,
  };
}

export function buildCanonicalRequest(
  method: string,
  path: string,
  canonicalQuery: string,
  canonicalHeaders: string,
  signedHeaders: string,
  payloadHash: string,
): string {
  return `${method}\n${path}\n${canonicalQuery}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
}



