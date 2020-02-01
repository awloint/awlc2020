"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig = __importStar(require("../envConfig"));
const mailjet = require("node-mailjet").connect(envConfig.mailjetPublicKey, envConfig.mailjetSecretKey);
class Newsletter {
    addToList(firstname, lastname, name, email, phone, country, list) {
        mailjet
            .post("contactslist", { version: "v3" })
            .id(list)
            .action("managemanycontacts")
            .request({
            Action: "addnoforce",
            Contacts: [
                {
                    Email: email,
                    IsExcludedFromCampaigns: "false",
                    Name: name,
                    Properties: {
                        firstname: firstname,
                        lastname: lastname,
                        phone: phone,
                        country: country
                    }
                }
            ]
        })
            .then((result) => {
            console.log(result.body);
        })
            .catch((err) => {
            console.log(err.statusCode);
        });
    }
}
exports.Newsletter = Newsletter;
