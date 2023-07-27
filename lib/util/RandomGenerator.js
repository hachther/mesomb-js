"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomGenerator = void 0;
var RandomGenerator = /** @class */ (function () {
    function RandomGenerator() {
    }
    RandomGenerator.nonce = function (length) {
        if (length === void 0) { length = 40; }
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    return RandomGenerator;
}());
exports.RandomGenerator = RandomGenerator;
