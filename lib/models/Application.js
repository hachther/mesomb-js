"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application = /** @class */ (function () {
    function Application(data) {
        this.key = data.key;
        this.logo = data.logo;
        this.balances = data.balances;
        this.countries = data.countries;
        this.description = data.description;
        this.is_live = data.is_live;
        this.name = data.name;
        this.security = data.security;
        this.status = data.status;
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
