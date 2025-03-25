"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Application model
 *
 * @property {string} key - Application key
 * @property {string} logo - Application logo
 * @property {Array<{ country: string; service: string; value: number }>} balances - Application balances
 * @property {string[]} countries - Application countries
 * @property {string} description - Application description
 * @property {string} name - Application name
 * @property {any} security - Application security
 * @property {string} url - Application url
 */
var Application = /** @class */ (function () {
    function Application(data) {
        this.key = data.key;
        this.logo = data.logo;
        this.balances = data.balances;
        this.countries = data.countries;
        this.description = data.description;
        this.name = data.name;
        this.security = data.security;
        this.url = data.url;
    }
    /**
     * Get current balance
     *
     * @param country
     * @param service
     */
    Application.prototype.getBalance = function (country, service) {
        var balances = this.balances;
        if (country) {
            balances = balances.filter(function (b) { return b.country === country; });
        }
        if (service) {
            balances = balances.filter(function (b) { return b.service === service; });
        }
        return balances.reduce(function (acc, item) { return acc + item.value; }, 0);
    };
    return Application;
}());
exports.default = Application;
