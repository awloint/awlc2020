"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const envConfig = __importStar(require("../envConfig"));
const name = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
};
class Payment {
    start(delegate, amount, currency) {
        let txref = "AWLCSierra2020-" + Math.floor(Math.random() * 1111) + 9999;
        if (delegate.membershipCode === envConfig.membershipCode) {
            if (delegate.country === "Nigeria") {
                amount = 54525;
            }
            else {
                amount = 150;
                currency = "USD";
            }
        }
        else {
            if (delegate.country !== "Nigeria") {
                currency = "USD";
                amount = 350;
            }
        }
        return axios_1.default({
            method: "post",
            url: "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay",
            data: {
                amount: amount,
                customer_email: delegate.email,
                customer_phone: delegate.phone,
                customer_firstname: delegate.firstName,
                customer_lastname: delegate.lastName,
                custom_title: "AWLCSierraLeone2020",
                custom_logo: "https://awlo.org/wp-content/uploads/2019/01/awlox120.png",
                custom_description: "African Women in Leadership Conference 2020",
                currency: currency,
                txref: txref,
                PBFPubKey: envConfig.raveKey,
                redirect_url: "http://localhost:3000/verify",
                subaccounts: [
                    {
                        id: "RS_D68E8E1087312CB80F3BD77721EEA468"
                    }
                ]
            }
        });
    }
}
exports.Payment = Payment;
