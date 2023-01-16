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
