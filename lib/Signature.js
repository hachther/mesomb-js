"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
var Settings_1 = require("./Settings");
var Signature = /** @class */ (function () {
    function Signature() {
    }
    Signature.nonceGenerator = function (length) {
        if (length === void 0) { length = 40; }
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    Signature.signRequest = function (service, method, url, date, nonce, credentials, headers, body) {
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = undefined; }
        var algorithm = Settings_1.default.ALGORITHM;
        var parse = new URL(url);
        var canonicalQuery = parse.searchParams.toString();
        var timestamp = date.getTime();
        headers.host = "".concat(parse.protocol, "//").concat(parse.host);
        headers['x-mesomb-date'] = String(timestamp);
        headers['x-mesomb-nonce'] = nonce;
        var headersKeys = Object.keys(headers).sort();
        var canonicalHeaders = headersKeys.map(function (key) { return "".concat(key, ":").concat(headers[key]); }).join('\n');
        var sha1 = require('crypto-js/sha1');
        var hmacSha1 = require('crypto-js/hmac-sha1');
        var payloadHash = sha1(body ? JSON.stringify(body) : '{}');
        var signedHeaders = headersKeys.join(';');
        var path = encodeURI(parse.pathname);
        var canonicalRequest = "".concat(method, "\n").concat(path, "\n").concat(canonicalQuery, "\n").concat(canonicalHeaders, "\n").concat(signedHeaders, "\n").concat(payloadHash);
        var scope = "".concat(date.getFullYear()).concat(date.getMonth()).concat(date.getDate(), "/").concat(service, "/mesomb_request");
        var stringToSign = "".concat(algorithm, "\n").concat(timestamp, "\n").concat(scope, "\n").concat(sha1(canonicalRequest));
        var signature = hmacSha1(stringToSign, credentials.secretKey);
        return "".concat(algorithm, " Credential=").concat(credentials.accessKey, "/").concat(scope, ", SignedHeaders=").concat(signedHeaders, ", Signature=").concat(signature);
    };
    return Signature;
}());
exports.Signature = Signature;
