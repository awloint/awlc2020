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
class SMS {
    send(from, phone, body) {
        axios_1.default({
            method: "post",
            url: "https://www.bulksmsnigeria.com/api/v1/sms/create",
            data: {
                api_token: envConfig.smsToken,
                from: from,
                to: phone,
                body: body
            }
        });
    }
}
exports.SMS = SMS;
