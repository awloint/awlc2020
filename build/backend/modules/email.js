"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig = __importStar(require("../envConfig"));
const mailjet = require("node-mailjet").connect(envConfig.mailjetPublicKey, envConfig.mailjetSecretKey);
const fs_1 = __importDefault(require("fs"));
class Email {
    sendWithoutAttachment(firstName, lastName, email, fromName, fromEmail, subject, textBody, htmlBody) {
        mailjet
            .post("send", { version: "v3.1" })
            .request({
            Messages: [
                {
                    From: {
                        Email: fromEmail,
                        Name: fromName
                    },
                    To: [
                        {
                            Email: email,
                            Name: `${firstName} ${lastName}`
                        }
                    ],
                    Subject: subject,
                    TextPart: textBody,
                    HTMLPart: htmlBody
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
    sendWithAttachment(firstName, lastName, email, fromName, fromEmail, subject, textBody, htmlBody, fileName) {
        let buff = fs_1.default.readFileSync(fileName);
        let base64data = buff.toString("base64");
        mailjet
            .post("send", { version: "v3.1" })
            .request({
            Messages: [
                {
                    From: {
                        Email: fromEmail,
                        Name: fromName
                    },
                    To: [
                        {
                            Email: email,
                            Name: `${firstName} ${lastName}`
                        }
                    ],
                    Subject: subject,
                    TextPart: textBody,
                    HTMLPart: htmlBody,
                    Attachments: [
                        {
                            ContentType: "application/pdf",
                            Filename: fileName,
                            Base64Content: base64data
                        }
                    ]
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
exports.Email = Email;
