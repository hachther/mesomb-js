"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
var MeSomb_1 = require("./MeSomb");
var Signature = /** @class */ (function () {
    function Signature() {
    }
    Signature.signRequest = function (service, method, url, date, nonce, credentials, headers, body) {
        if (headers === void 0) { headers = {}; }
        var algorithm = MeSomb_1.default.ALGORITHM;
        var parse = new URL(url);
        var canonicalQuery = parse.searchParams.toString();
        var timestamp = date.getTime();
        headers.host = "".concat(parse.protocol, "//").concat(parse.host);
        headers['x-mesomb-date'] = String(timestamp);
        headers['x-mesomb-nonce'] = nonce;
        var headersKeys = Object.keys(headers).sort();
        var canonicalHeaders = headersKeys.map(function (key) { return "".concat(key, ":").concat(headers[key]); }).join('\n');
        var crypto = require('crypto');
        var payloadSha1 = crypto.createHash('sha1');
        var canonicalSha1 = crypto.createHash('sha1');
        var hmac = crypto.createHmac('sha1', credentials.secretKey);
        payloadSha1.update(body ? JSON.stringify(body) : '{}');
        var payloadHash = payloadSha1.digest('hex');
        var signedHeaders = headersKeys.join(';');
        var path = encodeURI(parse.pathname);
        var canonicalRequest = "".concat(method, "\n").concat(path, "\n").concat(canonicalQuery, "\n").concat(canonicalHeaders, "\n").concat(signedHeaders, "\n").concat(payloadHash);
        var scope = "".concat(date.getFullYear()).concat(date.getMonth()).concat(date.getDate(), "/").concat(service, "/mesomb_request");
        canonicalSha1.update(canonicalRequest);
        var stringToSign = "".concat(algorithm, "\n").concat(timestamp, "\n").concat(scope, "\n").concat(canonicalSha1.digest('hex'));
        var signature = hmac.update(stringToSign).digest('hex');
        return "".concat(algorithm, " Credential=").concat(credentials.accessKey, "/").concat(scope, ", SignedHeaders=").concat(signedHeaders, ", Signature=").concat(signature);
    };
    return Signature;
}());
exports.Signature = Signature;
